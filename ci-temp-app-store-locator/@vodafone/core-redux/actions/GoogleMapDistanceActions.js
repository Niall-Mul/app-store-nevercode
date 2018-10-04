/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import keyMirror from 'key-mirror';
import { request, ApiTypes } from './RSAHelper';
import { OriginDestinationBatchRequest } from '../constants/GoogleMapDirectionsImmutables';

const ActionTypes = keyMirror({
  GET_DISTANCE_REQUEST: null,
  GET_DISTANCE_SUCCESS: null,
  GET_DISTANCE_FAILURE: null,
});

const GoogleMapDistanceActions = {
  ActionTypes,
  getDistance(params: OriginDestinationBatchRequest): Function {
    const { units } = params;
    const origins = params.origins
      .map((pos, index) => `${pos.latitude},${pos.longitude}`)
      .join('|');
    const destinations = params.destinations
      .map((pos, index) => `${pos.latitude},${pos.longitude}`)
      .join('|');
    let requestUrl = `&origins=${origins}&destinations=${destinations}&units=${units}`;
    return request({
      path: requestUrl,
      api: ApiTypes.GOOGLE_DISTANCE_API,
      types: [
        {
          type: ActionTypes.GET_DISTANCE_REQUEST,
          meta: params,
        },
        {
          type: ActionTypes.GET_DISTANCE_SUCCESS,
          meta: params,
        },
        {
          type: ActionTypes.GET_DISTANCE_FAILURE,
          meta: params,
        },
      ],
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      bailout: false,
    });
  },
};

export { GoogleMapDistanceActions, ActionTypes };
