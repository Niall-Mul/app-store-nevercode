/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import idx from 'idx';
import { Action } from 'redux';
import { RequestErrorFSA } from 'redux-api-middleware';
import type { ApiActionTypes } from '../constants/ApiActionTypes';
import { ActionTypes } from '../actions/GoogleMapAutocompleteActions';
import {
  SuggestionDetailsQuery,
  SuggestionDetailsRecord,
  SuggestionDetailsContainerRecord,
} from '../constants/GoogleMapAutocompleteImmutables';

interface SuggestionDetailsAction extends Action {
  type: typeof ActionTypes.GOOGLE_SUGGESTION_DETAILS_SUCCESS;
  payload: {
    status: string,
    predictions: SuggestionDetailsRecord[] | null,
  };
  meta: SuggestionDetailsQuery;
}

const GoogleMapSuggestionDetailsReducer = (
  state: SuggestionDetailsContainerRecord[] = [],
  action: SuggestionDetailsAction | ApiActionTypes | Action,
): SuggestionDetailsContainerRecord[] => {
  const { type } = action;
  switch (type) {
    case ActionTypes.GOOGLE_SUGGESTION_DETAILS_REQUEST: {
      const actionObj: RequestErrorFSA = action;
      const place_id = idx(actionObj, _ => _.meta.place_id);
      if (place_id) {
        let suggestionCont = new SuggestionDetailsContainerRecord({
          place_id,
          loading: true,
        });
        const actionObj: RequestErrorFSA = action;
        if (actionObj.error === true) {
          suggestionCont = new SuggestionDetailsContainerRecord({
            place_id,
            errorMsg: actionObj.payload.message.toString(),
          });
        }
        return [
          ...state.filter((container, i) => container.place_id !== place_id),
          suggestionCont,
        ];
      }
      return state;
    }
    case ActionTypes.GOOGLE_SUGGESTION_DETAILS_SUCCESS: {
      const actionObj: SuggestionDetailsAction = action;
      const place_id = idx(actionObj, _ => _.meta.place_id);
      if (place_id) {
        const suggestionCont = new SuggestionDetailsContainerRecord({
          place_id,
          suggestions: idx(actionObj, _ => _.payload.predictions) || [],
        });
        return [
          ...state.filter((container, i) => container.place_id !== place_id),
          suggestionCont,
        ];
      }
      return state;
    }
    case ActionTypes.GOOGLE_SUGGESTION_DETAILS_FAILURE: {
      const actionObj: RequestErrorFSA = action;
      const place_id = idx(actionObj, _ => _.meta.place_id);
      if (place_id) {
        const suggestionCont = new SuggestionDetailsContainerRecord({
          place_id,
          errorMsg: actionObj.payload.message.toString(),
        });
        return [
          ...state.filter((container, i) => container.place_id !== place_id),
          suggestionCont,
        ];
      }
      return state;
    }
    default:
      return state;
  }
};

export default GoogleMapSuggestionDetailsReducer;
