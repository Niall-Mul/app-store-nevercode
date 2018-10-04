/**
 * Copyright 2015-present Vodafone. All Rights Reserved.
 *
 * @flow
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import AuthenticationReducer from '@vodafone/core-redux/reducers/AuthenticationReducer';
import UserPreferencesReducer from '@vodafone/core-redux/reducers/UserPreferencesReducer';
import InsuranceQuoteReducer from '@vodafone/core-redux/reducers/InsuranceQuoteReducer';

const reducers = {
  routerReducer,
  AuthenticationReducer,
  UserPreferencesReducer,
  InsuranceQuoteReducer,
};

export default combineReducers(reducers);
