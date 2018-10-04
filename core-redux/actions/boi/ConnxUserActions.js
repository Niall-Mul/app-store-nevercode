/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import keyMirror from 'key-mirror';
import { RSAATypes, RSAAction } from 'redux-api-middleware';
import { request } from './RSAHelper';

const ActionTypes = keyMirror({
  USER_REQUEST: null,
  USER_SUCCESS: null,
  USER_FAILURE: null,
  LOGOUT_SUCCESS: null,
});

const types: RSAATypes = [
  ActionTypes.USER_REQUEST,
  ActionTypes.USER_SUCCESS,
  ActionTypes.USER_FAILURE,
];

export interface UserQueryRequest {
  userID: string;
}

const ConnxUserActions = {
  ActionTypes,
  getUserDetails(params: UserQueryRequest): RSAAction {
    return request({
      path: `/core/accounts/${params.userID}/preferences`,
      types,
      method: 'GET',
      bailout: false,
    });
  },
};

export { ConnxUserActions, ActionTypes };
