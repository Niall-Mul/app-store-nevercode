/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import keyMirror from 'key-mirror';

const ActionTypes = keyMirror({
  INCREASE_REQUEST: null,
  PERSIST_REQUEST: null,
});

const CounterActions = {
  ActionTypes,
  increaseCounter(): Function {
    return (dispatch: Function): void => {
      dispatch({
        type: ActionTypes.INCREASE_REQUEST,
        payload: {},
      });
    };
  },
  persistCounter(): Function {
    return (dispatch: Function): void => {
      dispatch({
        type: ActionTypes.PERSIST_REQUEST,
        payload: {},
      });
    };
  },
};

export {
  CounterActions,
  ActionTypes,
};
