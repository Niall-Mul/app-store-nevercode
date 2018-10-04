/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import idx from 'idx';
import { Action } from 'redux';
import { RequestErrorFSA } from 'redux-api-middleware';
import type { ApiActionTypes } from '../constants/ApiActionTypes';
import { ActionTypes } from '../actions/HelloApiActions';
import {
  HelloApiRecord,
  HelloApiResults,
} from '../constants/HelloApiImmutables';

interface GetHelloApiAction extends Action {
  type: typeof ActionTypes.HELLO_API_SUCCESS;
  payload: HelloApiRecord;
}

const HelloApiReducer = (
  state: HelloApiResults = new HelloApiResults(),
  action: GetHelloApiAction | ApiActionTypes | Action,
): HelloApiResults => {
  const { type } = action;
  switch (type) {
    case ActionTypes.HELLO_API_REQUEST: {
      const actionObj: RequestErrorFSA = action;
      if (actionObj.error !== true)
        return new HelloApiResults({
          loading: true,
        });
      return new HelloApiResults({
        errorMsg: actionObj.payload.message.toString(),
      });
    }
    case ActionTypes.HELLO_API_SUCCESS: {
      const actionObj: GetHelloApiAction = action;
      return new HelloApiResults({
        records: idx(actionObj.payload, _ => _._embedded.lineItems),
      });
    }
    case ActionTypes.HELLO_API_FAILURE: {
      const actionObj: RequestErrorFSA = action;
      return new HelloApiResults({
        errorMsg: actionObj.payload.message.toString(),
      });
    }
    default:
      return state;
  }
};

export default HelloApiReducer;
