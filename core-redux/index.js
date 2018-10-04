/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

// $FlowFixMe
import Config from './config';

import { CounterActions } from './actions/CounterActions';
import { CounterRecord } from './constants/CounterImmutables';
import CounterReducer from './reducers/CounterReducer';

import { HelloApiActions } from './actions/HelloApiActions';
import {
  HelloApiRecord,
  HelloApiResults,
} from './constants/HelloApiImmutables';
import HelloApiReducer from './reducers/HelloApiReducer';

export {
  CounterActions,
  CounterRecord,
  CounterReducer,
  HelloApiActions,
  HelloApiRecord,
  HelloApiResults,
  HelloApiReducer,
};

export default Config;
