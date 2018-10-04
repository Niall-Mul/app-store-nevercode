/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import keyMirror from 'key-mirror';
import { RSAATypes, RSAAction } from 'redux-api-middleware';
import { request } from './RSAHelper';
import { PersonalDetails } from '../../constants/boi/UserPreferencesImmutables';

const ActionTypes = keyMirror({
  GET_USER_PREFERENCES_REQUEST: null,
  GET_USER_PREFERENCES_SUCCESS: null,
  GET_USER_PREFERENCES_FAILURE: null,
  UPDATE_USER_PREFERENCES_REQUEST: null,
  UPDATE_USER_PREFERENCES_SUCCESS: null,
  UPDATE_USER_PREFERENCES_FAILURE: null,
});

export interface UserPreferencesQueryRequest {
  accountId: string;
}

const UserPreferencesActions = {
  ActionTypes,
  getUserDetails(params: UserPreferencesQueryRequest): RSAAction {
    return async (dispatch: Function) =>
      await dispatch(
        request({
          path: `/core/accounts/${params.accountId}/preferences`,
          types: [
            ActionTypes.GET_USER_PREFERENCES_REQUEST,
            ActionTypes.GET_USER_PREFERENCES_SUCCESS,
            ActionTypes.GET_USER_PREFERENCES_FAILURE,
          ],
          method: 'GET',
          bailout: false,
        }),
      );
  },
  updateUserDetails(accountId: string, params: PersonalDetails): RSAAction {
    return async (dispatch: Function) => {
      const formattedParams = { personalDetails: params };
      const updateRequest = await dispatch(
        request({
          path: `/core/accounts/${accountId}/preferences`,
          types: [
            ActionTypes.UPDATE_USER_PREFERENCES_REQUEST,
            ActionTypes.UPDATE_USER_PREFERENCES_SUCCESS,
            ActionTypes.UPDATE_USER_PREFERENCES_FAILURE,
          ],
          method: 'PUT',
          bailout: false,
          body: JSON.stringify(formattedParams),
        }),
      );
      return dispatch({
        type: ActionTypes.UPDATE_USER_PREFERENCES_SUCCESS,
        payload: new PersonalDetails(params).toJS(),
      });
    };
  },
};

export { UserPreferencesActions, ActionTypes };
