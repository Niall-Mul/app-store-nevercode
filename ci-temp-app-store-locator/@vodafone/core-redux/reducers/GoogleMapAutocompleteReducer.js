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
  AutocompleteSuggestionRecord,
  AutocompleteSuggestionsRecord,
} from '../constants/GoogleMapAutocompleteImmutables';

interface AutocompleteSuggestionsAction extends Action {
  type: typeof ActionTypes.GOOGLE_QUERY_AUTOCOMPLETE_SUCCESS;
  payload: AutocompleteSuggestionRecord[] | null;
  status: string;
  meta: { query: string, locale: string };
}

const GoogleMapAutocompleteReducer = (
  state: AutocompleteSuggestionsRecord[] = [],
  action: AutocompleteSuggestionsAction | ApiActionTypes | Action,
): AutocompleteSuggestionsRecord[] => {
  const { type } = action;
  switch (type) {
    case ActionTypes.GOOGLE_QUERY_AUTOCOMPLETE_REQUEST: {
      const actionObj: RequestErrorFSA = action;
      const query = idx(actionObj, _ => _.meta.query);
      if (query) {
        let suggestionsCont = new AutocompleteSuggestionsRecord({
          query,
          loading: true,
        });
        const actionObj: RequestErrorFSA = action;
        if (actionObj.error === true) {
          suggestionsCont = new AutocompleteSuggestionsRecord({
            query,
            errorMsg: actionObj.payload.message.toString(),
          });
        }
        return [
          ...state.filter((container, i) => container.query !== query),
          suggestionsCont,
        ];
      }
      return state;
    }
    case ActionTypes.GOOGLE_QUERY_AUTOCOMPLETE_SUCCESS: {
      const actionObj: AutocompleteSuggestionsAction = action;
      const query = idx(actionObj, _ => _.meta.query);
      if (query) {
        const suggestionsCont = new AutocompleteSuggestionsRecord({
          query,
          suggestions: actionObj.payload || [],
        });
        return [
          ...state.filter((container, i) => container.query !== query),
          suggestionsCont,
        ];
      }
      return state;
    }
    case ActionTypes.GOOGLE_QUERY_AUTOCOMPLETE_FAILURE: {
      const actionObj: RequestErrorFSA = action;
      const query = idx(actionObj, _ => _.meta.query);
      if (query) {
        const suggestionsCont = new AutocompleteSuggestionsRecord({
          query,
          errorMsg: actionObj.payload.message.toString(),
        });
        return [
          ...state.filter((container, i) => container.query !== query),
          suggestionsCont,
        ];
      }
      return state;
    }
    default:
      return state;
  }
};

export default GoogleMapAutocompleteReducer;
