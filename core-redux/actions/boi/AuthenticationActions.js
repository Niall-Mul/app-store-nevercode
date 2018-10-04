/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import keyMirror from 'key-mirror';
import { RSAAction } from 'redux-api-middleware';
import { request } from './RSAAuthHelper';
import { UserPreferencesActions } from './UserPreferencesActions';
import { PersonalDetails } from '../../constants/boi/UserPreferencesImmutables';
const { getUserDetails, updateUserDetails } = UserPreferencesActions;
const ActionTypes = keyMirror({
  LOGIN_REQUEST: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,
  REGISTER_REQUEST: null,
  REGISTER_SUCCESS: null,
  REGISTER_FAILURE: null,
  LOGOUT_SUCCESS: null,
  GET_USER_PREFERENCES_SUCCESS: null,
  UPDATE_USER_PREFERENCES_SUCCESS: null,
});

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
}

const AuthenticationActions = {
  ActionTypes,
  attemptLogin(params: LoginRequest): RSAAction {
    return async (dispatch: Function) => {
      const loginRequest = await dispatch(
        request({
          path: '/core/login',
          types: [
            ActionTypes.LOGIN_REQUEST,
            ActionTypes.LOGIN_SUCCESS,
            ActionTypes.LOGIN_FAILURE,
          ],
          method: 'POST',
          bailout: false,
          body: JSON.stringify(params),
        }),
      );
      const { payload } = loginRequest;
      const userDetails = await dispatch(
        getUserDetails({
          accountId: payload.accountId,
        }),
      );
      return dispatch({
        type: ActionTypes.GET_USER_PREFERENCES_SUCCESS,
        payload: userDetails.payload.personalDetails,
      });
    };
  },
  attemptRegister(params: RegisterRequest): RSAAction {
    const {
      firstName,
      lastName,
      username,
      password,
      securityQuestion,
      securityAnswer,
    } = params;
    return async (dispatch: Function) => {
      const registerRequest = await dispatch(
        request({
          path: '/core/accounts',
          types: [
            ActionTypes.REGISTER_REQUEST,
            ActionTypes.REGISTER_SUCCESS,
            ActionTypes.REGISTER_FAILURE,
          ],
          method: 'POST',
          bailout: false,
          body: JSON.stringify({
            username,
            password,
            securityQuestion,
            securityAnswer,
            name: firstName,
          }),
        }),
      );
      const { payload } = registerRequest;
      const userDetails = await dispatch(
        updateUserDetails(payload.accountId, { firstName, lastName }),
      );
      return dispatch({
        type: ActionTypes.UPDATE_USER_PREFERENCES_SUCCESS,
        payload: new PersonalDetails({ firstName, lastName }),
      });
    };
  },
  logout(): Function {
    return (dispatch: Function): void => {
      dispatch({
        type: ActionTypes.LOGOUT_SUCCESS,
        payload: {},
      });
    };
  },
};

export { AuthenticationActions, ActionTypes };
