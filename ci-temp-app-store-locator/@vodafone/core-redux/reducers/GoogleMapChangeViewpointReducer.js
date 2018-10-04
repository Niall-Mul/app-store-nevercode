/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import idx from 'idx';
import { Action } from 'redux';
import { ActionTypes } from '../actions/GoogleMapActions';
import { RegionRecord } from '../constants/GoogleMapImmutables';
import type {
  SuggestionDetailsRecord,
  SuggestionDetailsQuery,
} from '../constants/GoogleMapAutocompleteImmutables';

interface GoogleMapAction extends Action {
  type:
    | typeof ActionTypes.CHANGE_VIEWPOINT
    | typeof ActionTypes.USER_POSITION_OBTAINED;
  payload: RegionRecord;
}

interface SuggestionDetailsAction extends Action {
  type: typeof ActionTypes.GOOGLE_SUGGESTION_DETAILS_SUCCESS;
  payload: {
    status: string,
    result: SuggestionDetailsRecord | null,
  };
  meta: SuggestionDetailsQuery;
}

const GoogleMapChangeViewpointReducer = (
  state: RegionRecord = null,
  action: Action,
): RegionRecord | null => {
  const { type } = action;
  switch (type) {
    case ActionTypes.CHANGE_VIEWPOINT: {
      const actionObj: GoogleMapAction = action;
      return new RegionRecord(actionObj.payload);
    }
    case ActionTypes.USER_POSITION_OBTAINED: {
      const actionObj: GoogleMapAction = action;
      return new RegionRecord(actionObj.payload);
    }
    case ActionTypes.GOOGLE_SUGGESTION_DETAILS_SUCCESS: {
      const actionObj: SuggestionDetailsAction = action;
      const location = idx(actionObj, _ => _.payload.result.geometry.location);
      return location
        ? new RegionRecord({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          })
        : state;
    }
    case ActionTypes.CLEAR_VIEWPOINT_CHANGE: {
      return null;
    }
    default:
      return state;
  }
};

export default GoogleMapChangeViewpointReducer;
