/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Action } from 'redux';
import { RequestFSA, RSAAType, RequestErrorFSA } from 'redux-api-middleware';
import { ActionTypes } from '../actions/boi/UserPreferencesActions';
import {
  PersonalDetails,
  UserPreferences,
} from '../constants/boi/UserPreferencesImmutables';
import { logger } from '../lib/ConnxLogger';

interface GetUserPreferencesSuccessAction extends Action {
  type: typeof ActionTypes.GET_USER_PREFERENCES_SUCCESS;
  payload: PersonalDetails;
}

interface UpdateUserPreferencesSuccessAction extends Action {
  type: typeof ActionTypes.UPDATE_USER_PREFERENCES_SUCCESS;
  payload: PersonalDetails;
}

const UserPreferencesReducer = (
  state: UserPreferences = new UserPreferences(),
  action:
    | GetUserPreferencesSuccessAction
    | RequestFSA
    | RSAAType
    | RequestErrorFSA
    | Action,
): UserPreferences => {
  const { type } = action;
  logger.debug('UserPreferencesReducer ' + type);
  switch (type) {
    case ActionTypes.GET_USER_PREFERENCES_REQUEST: {
      return new UserPreferences({
        loading: true,
      });
    }
    case ActionTypes.GET_USER_PREFERENCES_SUCCESS: {
      const actionObj: GetUserPreferencesSuccessAction = action;
      logger.debug('GetUserPreferencesSuccessAction SUCCESS %o', actionObj);
      return new UserPreferences({
        personalDetails: actionObj.payload,
        loading: false,
      });
    }
    case ActionTypes.GET_USER_PREFERENCES_FAILURE: {
      const payload: RequestErrorFSA = action;
      logger.error('UserPreferences error %o', payload.message);
      return new UserPreferences({
        errorMsg: payload.message,
      });
    }
    case ActionTypes.UPDATE_USER_PREFERENCES_REQUEST: {
      return new UserPreferences({
        loading: true,
      });
    }
    case ActionTypes.UPDATE_USER_PREFERENCES_SUCCESS: {
      const actionObj: UpdateUserPreferencesSuccessAction = action;
      logger.debug('UpdateUserPreferencesSuccessAction SUCCESS %o', actionObj);
      return new UserPreferences({
        personalDetails: actionObj.payload,
        loading: false,
      });
    }
    case ActionTypes.UPDATE_USER_PREFERENCES_FAILURE: {
      const payload: RequestErrorFSA = action;
      logger.error('UserPreferences error %o', payload.message);
      return new UserPreferences({
        errorMsg: payload.message,
      });
    }
    default:
      return state;
  }
};

export default UserPreferencesReducer;
