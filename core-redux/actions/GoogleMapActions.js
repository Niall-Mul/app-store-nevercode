/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import keyMirror from 'key-mirror';
import { RegionRecord } from '../constants/GoogleMapImmutables';
import { NearbyStoreActions, MIN_RADIUS } from './NearbyStoreActions';

const { getNearbyStores } = NearbyStoreActions;

const ActionTypes = keyMirror({
  LAYOUT_READY_REQUEST: null,
  USER_POSITION_OBTAINED: null,
  USER_POSITION_UNOBTAINABLE: null,
  REGION_CHANGE_REQUEST: null,
  REGION_CHANGE_COMPLETE_REQUEST: null,
  CHANGE_VIEWPOINT: null,
  CLEAR_VIEWPOINT_CHANGE: null,
  GOOGLE_SUGGESTION_DETAILS_SUCCESS: null,
});

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: string,
) => {
  let radlat1 = (Math.PI * lat1) / 180;
  let radlat2 = (Math.PI * lat2) / 180;
  let theta = lon1 - lon2;
  let radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') {
    dist = dist * 1.609344;
  }
  if (unit === 'N') {
    dist = dist * 0.8684;
  }
  return dist;
};

const GoogleMapActions = {
  ActionTypes,
  onLayoutReady(isMapReady: boolean): Function {
    return (dispatch: Function): void => {
      dispatch({
        type: ActionTypes.LAYOUT_READY_REQUEST,
        payload: { isMapReady },
      });
    };
  },
  getCurrentUserPosition(): Function {
    return (dispatch: Function): void => {
      if (!navigator.geolocation) {
        return dispatch({
          type: ActionTypes.USER_POSITION_UNOBTAINABLE,
        });
      }
      navigator.geolocation.getCurrentPosition(
        position => {
          dispatch({
            type: ActionTypes.USER_POSITION_OBTAINED,
            payload: new RegionRecord({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }),
          });
          dispatch(
            getNearbyStores({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              maxRadius: 0.01 * 100,
              locale: 'en',
            }),
          );
          return;
        },
        error =>
          dispatch({
            type: ActionTypes.USER_POSITION_UNOBTAINABLE,
          }),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
    };
  },
  regionChange(region: RegionRecord, locale?: string): Function {
    return (dispatch: Function, getState): void => {
      const {
        region: prevRegion,
        isUserPositionAccessible,
        isUserPositionObtained,
      } = getState().GoogleMapReducer;
      const distance = calculateDistance(
        prevRegion.latitude,
        prevRegion.longitude,
        region.latitude,
        region.longitude,
        'K',
      );
      if (isUserPositionAccessible && !isUserPositionObtained) {
        return;
      }
      if (distance > MIN_RADIUS / 2) {
        dispatch(
          getNearbyStores({
            latitude: region.latitude,
            longitude: region.longitude,
            maxRadius: region.latitudeDelta * 100,
            locale: locale ? locale : 'en',
          }),
        );
        dispatch({
          type: ActionTypes.REGION_CHANGE_REQUEST,
          payload: { region },
        });
      }
    };
  },
  viewpointChange(region: RegionRecord): Function {
    return (dispatch: Function): void => {
      dispatch({
        type: ActionTypes.CHANGE_VIEWPOINT,
        payload: region,
      });
    };
  },
  clearViewpointChange(): Function {
    return (dispatch: Function): void => {
      dispatch({
        type: ActionTypes.CLEAR_VIEWPOINT_CHANGE,
      });
    };
  },
};

export { GoogleMapActions, ActionTypes, calculateDistance };
