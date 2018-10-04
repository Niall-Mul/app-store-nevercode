/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import keyMirror from 'key-mirror';
import { RSAAction } from 'redux-api-middleware';
import { request, ApiTypes } from './RSAHelper';

const ActionTypes = keyMirror({
  HELLO_API_REQUEST: null,
  HELLO_API_SUCCESS: null,
  HELLO_API_FAILURE: null,
});

const HelloApiActions = {
  ActionTypes,
  getHelloApiResults(): RSAAction {
    let requestUrl = '/lineItems';
    return request({
      path: requestUrl,
      api: ApiTypes.VODAFONE_STORES_API,
      types: [
        {
          type: ActionTypes.HELLO_API_REQUEST,
        },
        {
          type: ActionTypes.HELLO_API_SUCCESS,
        },
        {
          type: ActionTypes.HELLO_API_FAILURE,
        },
      ],
      method: 'GET',
      bailout: false,
    });
  },
  clearResults(): Function {
    return (dispatch: Function): void => {
      dispatch({
        type: ActionTypes.HELLO_API_SUCCESS,
        payload: {},
      });
    };
  },
};

export { HelloApiActions, ActionTypes };
