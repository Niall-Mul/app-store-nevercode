/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 *
 * See https://developers.google.com/places/web-service/autocomplete
 * for details on the Google APIs used here
 */

import idx from 'idx';
import keyMirror from 'key-mirror';
import { request, ApiTypes } from './RSAHelper';
import {
  AutoCompleteQuery,
  SuggestionDetailsQuery,
  AutocompleteSuggestionRecord,
  SuggestionDetailsRecord,
} from '../constants/GoogleMapAutocompleteImmutables';
import { NearbyStoreActions } from './NearbyStoreActions';

const MIN_RADIUS = 75; // 75 km

const { getNearbyStores } = NearbyStoreActions;

const ActionTypes = keyMirror({
  GOOGLE_UPDATE_AUTOCOMPLETE_QUERY: null,
  GOOGLE_QUERY_AUTOCOMPLETE_REQUEST: null,
  GOOGLE_QUERY_AUTOCOMPLETE_SUCCESS_STEP1: null,
  GOOGLE_QUERY_AUTOCOMPLETE_SUCCESS: null,
  GOOGLE_QUERY_AUTOCOMPLETE_FAILURE: null,
  GOOGLE_SUGGESTION_DETAILS_REQUEST: null,
  GOOGLE_SUGGESTION_DETAILS_SUCCESS: null,
  GOOGLE_SUGGESTION_DETAILS_FAILURE: null,
  NEARBY_STORES_AUTOCOMPLETE_SUCCESS: null,
});

const GoogleMapAutocompleteActions = {
  ActionTypes,
  getAutocompleteSuggestions(params: AutoCompleteQuery): Function {
    const { query, locale, region, includeStores } = params;
    if (query.length < 3) {
      return (dispatch: Function): void => {
        dispatch({
          type: ActionTypes.GOOGLE_UPDATE_AUTOCOMPLETE_QUERY,
          payload: params,
        });
      };
    }
    return async (dispatch, getState) => {
      dispatch({
        type: ActionTypes.GOOGLE_UPDATE_AUTOCOMPLETE_QUERY,
        payload: params,
      });
      const queryEscaped = encodeURIComponent(query);
      // The region to search in with radius in metres
      const radius =
        region.latitudeDelta * 1000 > MIN_RADIUS * 1000
          ? region.latitudeDelta * 1000
          : MIN_RADIUS * 1000;
      const regionQuery = region
        ? `&location=${region.latitude},${region.longitude}&radius=${radius}`
        : '';
      const requestUrl = `&input=${queryEscaped}${regionQuery}&language=${locale}`;
      const googleAutoCompleteResponse = await dispatch(
        request({
          path: requestUrl,
          api: ApiTypes.GOOGLE_AUTOCOMPLETE_API,
          types: [
            {
              type: ActionTypes.GOOGLE_QUERY_AUTOCOMPLETE_REQUEST,
              meta: params,
            },
            {
              type: ActionTypes.GOOGLE_QUERY_AUTOCOMPLETE_SUCCESS_STEP1,
              meta: params,
            },
            {
              type: ActionTypes.GOOGLE_QUERY_AUTOCOMPLETE_FAILURE,
              meta: params,
            },
          ],
          headers: { 'Content-Type': 'application/json' },
          method: 'GET',
          bailout: false,
        }),
      );
      if (
        googleAutoCompleteResponse.type !==
        ActionTypes.GOOGLE_QUERY_AUTOCOMPLETE_SUCCESS_STEP1
      ) {
        return googleAutoCompleteResponse;
      }
      if (includeStores !== true) {
        return dispatch({
          type: ActionTypes.GOOGLE_QUERY_AUTOCOMPLETE_SUCCESS,
          payload: googleAutoCompleteResponse.payload.predictions,
          status: googleAutoCompleteResponse.payload.status,
          meta: params,
        });
      }
      const nearbyStoresResponse = await dispatch(
        getNearbyStores({
          name: query,
          latitude: region.latitude,
          longitude: region.longitude,
          maxRadius: MIN_RADIUS,
          isAutoCompleteQuery: true,
          locale,
        }),
      );
      if (
        nearbyStoresResponse.type !==
          ActionTypes.NEARBY_STORES_AUTOCOMPLETE_SUCCESS ||
        !nearbyStoresResponse.payload ||
        nearbyStoresResponse.payload.length === 0
      ) {
        return dispatch({
          type: ActionTypes.GOOGLE_QUERY_AUTOCOMPLETE_SUCCESS,
          payload: googleAutoCompleteResponse.payload.predictions,
          status: googleAutoCompleteResponse.payload.status,
          meta: params,
        });
      }
      const storeSuggestions = nearbyStoresResponse.payload
        ? nearbyStoresResponse.payload.map((store, index) => {
            return new AutocompleteSuggestionRecord({
              description: store.contact.name,
              id: store.id,
              location: {
                lat: store.geometry.coordinates[1],
                lng: store.geometry.coordinates[0],
              },
              types: ['vodafone-store'],
            });
          })
        : [];
      return dispatch({
        type: ActionTypes.GOOGLE_QUERY_AUTOCOMPLETE_SUCCESS,
        payload: [
          ...storeSuggestions,
          ...googleAutoCompleteResponse.payload.predictions,
        ],
        status: googleAutoCompleteResponse.payload.status,
        meta: params,
      });
    };
  },
  getSuggestionDetails(params: SuggestionDetailsQuery): Function {
    const { suggestion, locale } = params;

    if (suggestion.types && suggestion.types[0] === 'vodafone-store') {
      getNearbyStores({
        latitude: suggestion.location.lat,
        longitude: suggestion.location.lng,
        maxRadius: MIN_RADIUS,
        locale,
      });
      return (dispatch: Function): void => {
        dispatch({
          type: ActionTypes.GOOGLE_SUGGESTION_DETAILS_SUCCESS,
          payload: {
            result: new SuggestionDetailsRecord({
              name: suggestion.description,
              place_id: suggestion.id,
              geometry: {
                location: suggestion.location,
              },
            }),
          },
          meta: params,
        });
      };
    }

    const placeIdEscaped = encodeURIComponent(suggestion.place_id);
    const requestUrl = `&place_id=${placeIdEscaped}&language=${locale}`;

    return async (dispatch, getState) => {
      const actionStoreDetailsResponse = await dispatch(
        request({
          path: requestUrl,
          api: ApiTypes.GOOGLE_PLACE_DETAILS_API,
          types: [
            {
              type: ActionTypes.GOOGLE_SUGGESTION_DETAILS_REQUEST,
              meta: params,
            },
            {
              type: ActionTypes.GOOGLE_SUGGESTION_DETAILS_SUCCESS,
              meta: params,
            },
            {
              type: ActionTypes.GOOGLE_SUGGESTION_DETAILS_FAILURE,
              meta: params,
            },
          ],
          headers: { 'Content-Type': 'application/json' },
          method: 'GET',
          bailout: false,
        }),
      );
      if (
        actionStoreDetailsResponse.type !==
        ActionTypes.GOOGLE_SUGGESTION_DETAILS_SUCCESS
      ) {
        return actionStoreDetailsResponse;
      }
      const coordinates = idx(
        actionStoreDetailsResponse,
        _ => _.payload.result.geometry.location,
      );
      if (coordinates) {
        // TODO: Add in filter parameters
        getNearbyStores({
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          maxRadius: MIN_RADIUS,
          locale,
        });
      }
      return actionStoreDetailsResponse;
    };
  },
};

export { GoogleMapAutocompleteActions, ActionTypes };
