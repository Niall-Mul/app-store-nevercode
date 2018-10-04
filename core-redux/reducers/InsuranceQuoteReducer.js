/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Action } from 'redux';
import { RequestFSA, RSAAType, RequestErrorFSA } from 'redux-api-middleware';
import { ActionTypes } from '../actions/boi/InsuranceQuoteActions';
import {
  QuoteResults,
  QuoteResponse,
} from '../constants/boi/InsuranceQuoteImmutables';
import { logger } from '../lib/ConnxLogger';

interface QuoteSuccessAction extends Action {
  type: typeof ActionTypes.QUOTE_SUCCESS;
  payload: QuoteResponse;
}

const InsuranceQuoteReducer = (
  state: QuoteResults = new QuoteResults(),
  action: QuoteSuccessAction | RequestFSA | RSAAType | RequestErrorFSA | Action,
): QuoteResults => {
  const { type } = action;
  logger.debug('InsuranceQuoteReducer ' + type);
  switch (type) {
    case ActionTypes.QUOTE_REQUEST: {
      return new QuoteResults({
        loading: true,
      });
    }
    case ActionTypes.QUOTE_SUCCESS: {
      const payload: QuoteSuccessAction = action;
      logger.debug('QUOTE_SUCCESS: %o', payload);
      return new QuoteResults({
        quoteId: payload.quoteId,
        quoteReturned: true,
        quotes: [],
      });
    }
    case ActionTypes.QUOTE_FAILURE: {
      const payload: RequestErrorFSA = action;
      logger.error('InsuranceQuote error %o', payload.message);
      let errorMsg = 'InsuranceQuote failed';
      if (payload.error) {
        errorMsg = 'The information provided is incorrect';
      }
      return new QuoteResults({
        errorMsg: errorMsg,
      });
    }
    default:
      return state;
  }
};

export default InsuranceQuoteReducer;
