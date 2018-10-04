/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import type { GoogleMapRecord } from '../constants/GoogleMapImmutables';

import idx from 'idx';
import keyMirror from 'key-mirror';
import { StoreRecord } from '../constants/NearbyStoreImmutables';
import { request, ApiTypes } from './RSAHelper';
import {
  OriginDestinationBatchRequest,
  PositionRecord,
} from '../constants/GoogleMapDirectionsImmutables';
import { GoogleMapDistanceActions } from './GoogleMapDistanceActions';

const { getDistance } = GoogleMapDistanceActions;

const MIN_RADIUS: number = 75; // in KM

const ActionTypes = keyMirror({
  NEARBY_STORES_REQUEST: null,
  NEARBY_STORES_SUCCESS_STEP1: null,
  NEARBY_STORES_SUCCESS_STEP2: null,
  NEARBY_STORES_SUCCESS: null,
  NEARBY_STORES_FAILURE: null,
  GET_DISTANCE_SUCCESS: null,
  NEARBY_STORES_AUTOCOMPLETE_SUCCESS: null,
});

export interface NearbyStoresRequest {
  latitude: number;
  longitude: number;
  minRadius?: number;
  maxRadius: number;
  locale: string;
  name?: string;
  broadband?: boolean;
  bizAdvisor?: boolean;
  rechargePoint?: boolean;
  techTeam?: boolean;
  tradeIn?: boolean;
  topUp?: boolean;
  time?: number;
  isAutoCompleteQuery?: boolean;
}

const NearbyStoreActions = {
  ActionTypes,
  getNearbyStores(params: NearbyStoresRequest): Function {
    const {
      latitude,
      longitude,
      minRadius,
      maxRadius,
      locale,
      name,
      broadband,
      bizAdvisor,
      rechargePoint,
      techTeam,
      tradeIn,
      topUp,
      time,
      isAutoCompleteQuery,
    } = params;
    const maxRadiusQuery = maxRadius > MIN_RADIUS ? maxRadius : MIN_RADIUS;
    const minRadiusQuery = minRadius
      ? minRadius > maxRadiusQuery
        ? 0
        : minRadius
      : 0;
    const optionalParams = {
      name,
      broadband,
      bizAdvisor,
      rechargePoint,
      techTeam,
      tradeIn,
      topUp,
      time,
    };
    let requestUrl = `/nearbyStores?lat=${latitude}&lon=${longitude}&maxRadius=${maxRadiusQuery}&locale=${locale}`;
    requestUrl = minRadius
      ? requestUrl + `&minRadius=${minRadiusQuery}`
      : requestUrl;
    for (let param of Object.keys(optionalParams)) {
      requestUrl = optionalParams[param]
        ? requestUrl + `&${param}=${optionalParams[param].toString()}`
        : requestUrl;
    }
    return async (dispatch, getState) => {
      const actionStoresResponse = await dispatch(
        request({
          path: requestUrl,
          api: ApiTypes.VODAFONE_STORES_API,
          types: [
            ActionTypes.NEARBY_STORES_REQUEST,
            ActionTypes.NEARBY_STORES_SUCCESS_STEP1,
            ActionTypes.NEARBY_STORES_FAILURE,
          ],
          method: 'GET',
          bailout: false,
        }),
      );
      if (
        actionStoresResponse.type !== ActionTypes.NEARBY_STORES_SUCCESS_STEP1
      ) {
        return actionStoresResponse;
      }
      const googleMap: GoogleMapRecord = getState().GoogleMapReducer;
      let destinations: PositionRecord[] = [];
      let units = 'metric';
      const stores = actionStoresResponse.payload
        ? actionStoresResponse.payload.map((store, index) => {
            const storeLatitude = store.geometry.coordinates[1];
            const storeLongitude = store.geometry.coordinates[0];
            // Get distance to store if current position is known
            if (googleMap.isUserPositionObtained) {
              units = locale === 'en' ? 'imperial' : 'metric';
              destinations.push({
                description: store.contact.name,
                latitude: storeLatitude,
                longitude: storeLongitude,
              });
            }
            // Google Reviews example:
            // https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyBZEBNkNXEI5zv3_CJ8bj37bx3-AhTVwbU&sessiontoken=9505714207&place_id=ChIJX4XeA5wOZ0gRAEApInv-Fkg&language=en-US
            const id = storeLatitude + ':' + storeLongitude;
            return new StoreRecord({
              id,
              type: store.type,
              geometry: store.geometry,
              properties: store.properties,
              contact: store.contact,
              openingDetails: store.openingDetails,
              rating: 4.1,
              reviews: 70,
            });
          })
        : [];
      if (isAutoCompleteQuery === true) {
        return dispatch({
          type: ActionTypes.NEARBY_STORES_AUTOCOMPLETE_SUCCESS,
          payload: [...stores],
        });
      }
      if (!googleMap.isUserPositionObtained) {
        return dispatch({
          type: ActionTypes.NEARBY_STORES_SUCCESS,
          payload: [...stores],
        });
      }
      const actionStoresDistanceResponse = await dispatch(
        getDistance(
          new OriginDestinationBatchRequest({
            origins: [
              {
                description: 'Current Position',
                latitude: googleMap.userPosition.latitude,
                longitude: googleMap.userPosition.longitude,
              },
            ],
            destinations,
            mode: 'driving',
            units,
          }),
        ),
      );
      if (
        actionStoresDistanceResponse.type !== ActionTypes.GET_DISTANCE_SUCCESS
      ) {
        // Ignore distance errors
        return dispatch({
          type: ActionTypes.NEARBY_STORES_SUCCESS,
          payload: [...stores],
        });
      }
      const storesArray = [...stores];
      const distances = idx(
        actionStoresDistanceResponse,
        _ => _.payload.rows[0].elements,
      );
      const storesWithDistance = distances
        ? distances.map((distance, index) => {
            const store = storesArray[index];
            return new StoreRecord({
              id: store.id,
              distance: {
                text: distance.distance.text,
                value: distance.distance.value,
              },
              type: store.type,
              geometry: store.geometry,
              properties: store.properties,
              contact: store.contact,
              openingDetails: store.openingDetails,
              rating: 4.1,
              reviews: 70,
            });
          })
        : storesArray;
      dispatch({
        type: ActionTypes.NEARBY_STORES_SUCCESS,
        payload: storesWithDistance,
      });
    };
  },
  clearResults(): Function {
    return (dispatch: Function): void => {
      dispatch({
        type: ActionTypes.NEARBY_STORES_SUCCESS,
        payload: {},
      });
    };
  },
};

export { NearbyStoreActions, ActionTypes, MIN_RADIUS };
