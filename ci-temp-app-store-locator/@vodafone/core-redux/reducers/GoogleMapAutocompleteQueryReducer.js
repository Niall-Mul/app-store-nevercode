/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Action } from 'redux';
import type { ApiActionTypes } from '../constants/ApiActionTypes';
import { ActionTypes } from '../actions/GoogleMapAutocompleteActions';
import {
  AutoCompleteQuery,
  SuggestionDetailsQuery,
} from '../constants/GoogleMapAutocompleteImmutables';

interface AutocompleteSuggestionsAction extends Action {
  type: typeof ActionTypes.GOOGLE_UPDATE_AUTOCOMPLETE_QUERY;
  meta: { query: string, locale: string };
}

interface AutocompleteSuggestionDetailsRequestAction extends Action {
  type: typeof ActionTypes.GOOGLE_QUERY_AUTOCOMPLETE_REQUEST;
  meta: AutoCompleteQuery;
}

interface AutocompleteSuggestionsRequestAction extends Action {
  type: typeof ActionTypes.GOOGLE_SUGGESTION_DETAILS_REQUEST;
  meta: SuggestionDetailsQuery;
}

const GoogleMapAutocompleteQueryReducer = (
  state: AutoCompleteQuery = new AutoCompleteQuery(),
  action:
    | AutocompleteSuggestionsRequestAction
    | AutocompleteSuggestionsAction
    | ApiActionTypes
    | Action,
): AutoCompleteQuery => {
  const { type } = action;
  switch (type) {
    case ActionTypes.GOOGLE_UPDATE_AUTOCOMPLETE_QUERY: {
      const actionObj: AutocompleteSuggestionsAction = action;
      const { query, locale } = actionObj.payload;
      return new AutoCompleteQuery({
        query,
        locale,
      });
    }
    case ActionTypes.GOOGLE_QUERY_AUTOCOMPLETE_REQUEST: {
      const actionObj: AutocompleteSuggestionsRequestAction = action;
      const { query, locale } = actionObj.meta;
      return new AutoCompleteQuery({
        query,
        locale,
      });
    }
    case ActionTypes.GOOGLE_SUGGESTION_DETAILS_REQUEST: {
      const actionObj: AutocompleteSuggestionDetailsRequestAction = action;
      const { description, locale } = actionObj.meta;
      return new AutoCompleteQuery({
        query: description,
        locale,
      });
    }
    default:
      return state;
  }
};

export default GoogleMapAutocompleteQueryReducer;
