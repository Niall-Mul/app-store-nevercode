/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 */

import { Action } from 'redux';
import { ActionTypes } from '../actions/CounterActions';
import { CounterRecord } from '../constants/CounterImmutables';
import { logger } from '../lib/ConnxLogger';

const CounterReducer = (
  state = new CounterRecord({
    value: isNaN(Number(sessionStorage.getItem('counter')))
      ? 0
      : Number(sessionStorage.getItem('counter')),
    persisted: true,
  }),
  action: Action,
): Counter => {
  const { type } = action;
  logger.debug('CounterReducer ' + type);
  switch (type) {
    case ActionTypes.INCREASE_REQUEST: {
      if (state.persisted) {
        sessionStorage.setItem('counter', (state.value + 1).toString());
      }
      return new CounterRecord({
        value: state.value + 1,
        persisted: state.persisted,
      });
      // return {
      //   ...state,
      //   {
      //     value: state.value + 1,
      //   }
      // };
    }
    case ActionTypes.PERSIST_REQUEST: {
      if (!state.persisted) {
        sessionStorage.setItem('counter', state.value.toString());
      }
      return new CounterRecord({
        value: state.value,
        persisted: !state.persisted,
      });
    }
    default:
      return state;
  }
};

export default CounterReducer;
