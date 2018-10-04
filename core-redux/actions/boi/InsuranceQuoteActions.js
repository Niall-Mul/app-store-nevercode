/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import keyMirror from 'key-mirror';
import { RSAATypes, RSAAction } from 'redux-api-middleware';
import { request } from './RSAAuthHelper';

const ActionTypes = keyMirror({
  QUOTE_REQUEST: null,
  QUOTE_SUCCESS: null,
  QUOTE_FAILURE: null,
});

const QuoteTypes = keyMirror({
  car: null,
  travel: null,
});

const types: RSAATypes = [
  ActionTypes.QUOTE_REQUEST,
  ActionTypes.QUOTE_SUCCESS,
  ActionTypes.QUOTE_FAILURE,
];

export interface QuoteRequest {
  accountId: string;
  quoteType: typeof QuoteTypes;
}

const InsuranceQuoteActions = {
  ActionTypes,
  requestQuote(params: QuoteRequest): RSAAction {
    return request({
      path: '/core/accounts/' + params.accountId + '/quotes',
      types,
      method: 'POST',
      bailout: false,
      body: JSON.stringify(params),
    });
  },
};

export { InsuranceQuoteActions, ActionTypes, QuoteTypes };
