/**
 * Copyright 2015-present Vodafone. All Rights Reserved.
 *
 * @flow
 */

// $FlowFixMe
import Config from './config';

import { AuthenticationActions } from './actions/boi/AuthenticationActions';
import { ConnxUserActions } from './actions/boi/ConnxUserActions';
import {
  InsuranceQuoteActions,
  QuoteTypes,
} from './actions/boi/InsuranceQuoteActions';

import {
  User,
  AuthenticationStatus,
} from './constants/boi/AuthenticationImmutables';
import {
  PersonalDetails,
  UserPreferences,
} from './constants/boi/UserPreferencesImmutables';
import {
  Quote,
  QuoteResponse,
  QuoteResults,
} from './constants/boi/InsuranceQuoteImmutables';

import AuthenticationReducer from './reducers/AuthenticationReducer';
import UserPreferencesReducer from './reducers/UserPreferencesReducer';
import InsuranceQuoteReducer from './reducers/InsuranceQuoteReducer';

export {
  AuthenticationActions,
  ConnxUserActions,
  InsuranceQuoteActions,
  QuoteTypes,
  User,
  AuthenticationStatus,
  PersonalDetails,
  UserPreferences,
  Quote,
  QuoteResponse,
  QuoteResults,
  AuthenticationReducer,
  UserPreferencesReducer,
  InsuranceQuoteReducer,
};

export default Config;
