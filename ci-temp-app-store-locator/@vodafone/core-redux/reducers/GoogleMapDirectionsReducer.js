/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import idx from 'idx';
import { Action } from 'redux';
import Polyline from '@mapbox/polyline';
import { RequestErrorFSA } from 'redux-api-middleware';
import type { ApiActionTypes } from '../constants/ApiActionTypes';
import { ActionTypes } from '../actions/GoogleMapDirectionActions';
import {
  GoogleMapDirectionsRecord,
  LegRecord,
} from '../constants/GoogleMapDirectionsImmutables';
import { StoreRecord } from '../constants/NearbyStoreImmutables';

interface GetDirectionsAction extends Action {
  type: typeof ActionTypes.NEARBY_STORES_SUCCESS;
  payload: {
    status: string,
    routes: [
      {
        legs: LegRecord[],
        overview_polyline: {
          points: string,
        },
        summary: string,
      },
    ],
  };
  meta: {
    destinationStore: StoreRecord | null,
  };
}

const GoogleMapDirectionsReducer = (
  state: GoogleMapDirectionsRecord = new GoogleMapDirectionsRecord(),
  action: GetDirectionsAction | ApiActionTypes | Action,
): GoogleMapDirectionsRecord => {
  const { type } = action;
  switch (type) {
    case ActionTypes.GET_DIRECTIONS_REQUEST: {
      const actionObj: RequestErrorFSA = action;
      if (actionObj.error !== true)
        return new GoogleMapDirectionsRecord({
          loading: true,
        });
      return new GoogleMapDirectionsRecord({
        errorMsg: actionObj.payload.message.toString(),
      });
    }
    case ActionTypes.GET_DIRECTIONS_SUCCESS: {
      const actionObj: GetDirectionsAction = action;
      if (
        actionObj.payload.status === 'OK' &&
        idx(actionObj.payload, _ => _.routes[0].legs[0])
      ) {
        const routes = actionObj.payload.routes[0];
        const points = Polyline.decode(routes.overview_polyline.points);
        const distance = routes.legs[0].distance;
        const duration = routes.legs[0].duration;

        const coordinates = points.map((point, index) => {
          return {
            latitude: point[0],
            longitude: point[1],
          };
        });
        return new GoogleMapDirectionsRecord({
          coordinates,
          steps: routes.legs[0].steps,
          distance,
          duration,
          destinationStore: actionObj.meta.destinationStore,
        });
      }
      return state;
    }
    case ActionTypes.GET_DIRECTIONS_FAILURE: {
      const actionObj: RequestErrorFSA = action;
      return new GoogleMapDirectionsRecord({
        errorMsg: actionObj.payload.message.toString(),
      });
    }
    default:
      return state;
  }
};

export default GoogleMapDirectionsReducer;
