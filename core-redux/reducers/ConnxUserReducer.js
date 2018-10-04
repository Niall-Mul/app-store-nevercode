/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Action } from 'redux';
import { RequestFSA, RSAAType, RequestErrorFSA } from 'redux-api-middleware';
import { ActionTypes } from '../actions/boi/ConnxUserActions';
import {
  ConnxUser,
  ConnxUserContainer,
} from '../constants/boi/ConnxUserImmutables';
import { logger } from '../lib/ConnxLogger';

interface GetUserSuccessAction extends Action {
  type: typeof ActionTypes.USER_SUCCESS;
  payload: ConnxUser;
}

const ConnxUserReducer = (
  state: ConnxUserContainer = new ConnxUserContainer(),
  action:
    | GetUserSuccessAction
    | RequestFSA
    | RSAAType
    | RequestErrorFSA
    | Action,
): ConnxUserContainer => {
  const { type } = action;
  logger.debug('ConnxUserReducer ' + type);
  switch (type) {
    case ActionTypes.USER_REQUEST: {
      return new ConnxUserContainer({
        loading: true,
      });
    }
    case ActionTypes.USER_SUCCESS: {
      const payload: GetUserSuccessAction = action.payload;
      logger.debug('GetUserSuccessAction SUCCESS %o', payload);
      return new ConnxUserContainer({
        user: payload,
      });
    }
    case ActionTypes.USER_FAILURE: {
      const payload: RequestErrorFSA = action;
      logger.error('User error %o', payload.message);
      return new ConnxUserContainer({
        errorMsg: payload.message,
      });
    }
    case ActionTypes.LOGOUT_SUCCESS: {
      return new ConnxUserContainer();
    }
    default:
      return state;
  }
};

export default ConnxUserReducer;
