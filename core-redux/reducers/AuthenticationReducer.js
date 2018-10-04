/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Action } from 'redux';
import { RequestFSA, RSAAType, RequestErrorFSA } from 'redux-api-middleware';
import { ActionTypes } from '../actions/boi/AuthenticationActions';
import {
  User,
  AuthenticationStatus,
} from '../constants/boi/AuthenticationImmutables';
import { logger } from '../lib/ConnxLogger';

interface LoginSuccessAction extends Action {
  type: typeof ActionTypes.LOGIN_SUCCESS;
  payload: User;
}

interface RegisterSuccessAction extends Action {
  type: typeof ActionTypes.REQUEST_SUCCESS;
  payload: User;
}

const AuthenticationReducer = (
  state: AuthenticationStatus = new AuthenticationStatus(),
  action:
    | LoginSuccessAction
    | RegisterSuccessAction
    | RequestFSA
    | RSAAType
    | RequestErrorFSA
    | Action,
): AuthenticationStatus => {
  const { type } = action;
  logger.debug('AuthenticationReducer ' + type);
  switch (type) {
    case ActionTypes.LOGIN_REQUEST: {
      return new AuthenticationStatus({
        loading: true,
      });
    }
    case ActionTypes.LOGIN_SUCCESS: {
      const payload: LoginSuccessAction = action.payload;
      const user = {
        accountId: payload.accountId,
        name: payload.name,
      };
      logger.debug('LOGIN_SUCCESS: %o', user);
      return new AuthenticationStatus({
        authenticated: true,
        user: user,
        loading: false,
      });
    }
    case ActionTypes.LOGIN_FAILURE: {
      const payload: RequestErrorFSA = action.payload;
      logger.error('Authentication error %o', payload.message);
      let errorMsg = 'Authentication failed';
      if (payload.message.startsWith('401')) {
        errorMsg = 'The username / password combination is incorrect';
      }
      return new AuthenticationStatus({
        errorMsg: errorMsg,
        loading: false,
      });
    }
    case ActionTypes.REGISTER_REQUEST: {
      return new AuthenticationStatus({
        loading: true,
      });
    }
    case ActionTypes.REGISTER_SUCCESS: {
      const payload: RegisterSuccessAction = action.payload;
      const user = {
        accountId: payload.accountId,
        name: payload.name,
        username: payload.username,
      };
      logger.debug('REGISTER_SUCCESS: %o', user);
      return new AuthenticationStatus({
        authenticated: true,
        user: user,
        loading: false,
      });
    }
    case ActionTypes.REGISTER_FAILURE: {
      const payload: RequestErrorFSA = action.payload;
      logger.error('REGISTER error %o', payload.message);
      let errorMsg = 'REGISTER failed';
      if (payload.message.startsWith('401')) {
        errorMsg = payload.response.message;
      }
      return new AuthenticationStatus({
        errorMsg: payload.message,
        loading: false,
      });
    }
    case ActionTypes.LOGOUT_SUCCESS: {
      return new AuthenticationStatus();
    }
    default:
      return state;
  }
};

export default AuthenticationReducer;
