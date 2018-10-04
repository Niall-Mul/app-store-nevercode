/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { combineReducers } from 'redux';
import { HelloApiReducer, CounterReducer } from '@vodafone/core-redux';

const reducers = {
  HelloApiReducer,
  CounterReducer,
};

export default combineReducers(reducers);
