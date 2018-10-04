/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Action } from 'redux';
import { ActionTypes } from '../actions/GoogleMapActions';
import {
  GoogleMapRecord,
  RegionRecord,
} from '../constants/GoogleMapImmutables';

interface GoogleMapAction extends Action {
  type:
    | typeof ActionTypes.USER_POSITION_OBTAINED
    | typeof ActionTypes.REGION_CHANGE_REQUEST;
  payload: RegionRecord;
}

const GoogleMapReducer = (
  state: GoogleMapRecord = new GoogleMapRecord(),
  action: Action,
): GoogleMapRecord => {
  const { type } = action;
  switch (type) {
    case ActionTypes.LAYOUT_READY_REQUEST: {
      if (state.isMapReady === action.payload.isMapReady) {
        return state;
      }
      return new GoogleMapRecord({
        isMapReady: action.payload.isMapReady,
        isUserPositionAccessible: state.isUserPositionAccessible,
        isUserPositionObtained: state.isUserPositionObtained,
        region: state.region,
        userPosition: state.userPosition,
      });
    }
    case ActionTypes.USER_POSITION_OBTAINED: {
      const actionObj: GoogleMapAction = action;
      return new GoogleMapRecord({
        isMapReady: state.isMapReady,
        isUserPositionAccessible: true,
        isUserPositionObtained: true,
        region: actionObj.payload,
        userPosition: actionObj.payload,
      });
    }
    case ActionTypes.USER_POSITION_UNOBTAINABLE: {
      return new GoogleMapRecord({
        isMapReady: state.isMapReady,
        isUserPositionAccessible: false,
        isUserPositionObtained: false,
        region: state.region,
        userPosition: state.userPosition,
      });
    }
    case ActionTypes.REGION_CHANGE_REQUEST: {
      const actionObj: GoogleMapAction = action;
      return new GoogleMapRecord({
        isMapReady: state.isMapReady,
        isUserPositionAccessible: state.isUserPositionAccessible,
        isUserPositionObtained: state.isUserPositionObtained,
        region: actionObj.payload.region,
        userPosition: state.userPosition,
      });
    }
    default:
      return state;
  }
};

export default GoogleMapReducer;
