/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import type { OriginDestinationRequest } from '../constants/GoogleMapDirectionsImmutables';

import keyMirror from 'key-mirror';
import { request, ApiTypes } from './RSAHelper';

const ActionTypes = keyMirror({
  GET_DIRECTIONS_REQUEST: null,
  GET_DIRECTIONS_SUCCESS: null,
  GET_DIRECTIONS_FAILURE: null,
});

const GoogleMapDirectionActions = {
  ActionTypes,
  getDirections(params: OriginDestinationRequest): Function {
    const { origin, destination, mode } = params;
    let requestUrl = `&origin=${origin.latitude},${
      origin.longitude
    }&destination=${destination.latitude},${destination.longitude}`;
    requestUrl = mode
      ? (requestUrl += `&mode=${mode.toLowerCase()}`)
      : requestUrl;
    return request({
      path: requestUrl,
      api: ApiTypes.GOOGLE_DIRECTIONS_API,
      types: [
        {
          type: ActionTypes.GET_DIRECTIONS_REQUEST,
          meta: params,
        },
        {
          type: ActionTypes.GET_DIRECTIONS_SUCCESS,
          meta: params,
        },
        {
          type: ActionTypes.GET_DIRECTIONS_FAILURE,
          meta: params,
        },
      ],
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      bailout: false,
    });
  },
};

export { GoogleMapDirectionActions, ActionTypes };
