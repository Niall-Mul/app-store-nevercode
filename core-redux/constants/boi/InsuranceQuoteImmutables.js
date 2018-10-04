/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Record } from 'immutable';

const Quote = Record(
  ({
    vendor: '-',
    pros: [],
    price: 0,
  }: {
    vendor: string,
    pros: string[],
    price: number,
  }),
);

const QuoteResponse = Record(
  ({
    quoteId: '-',
  }: {
    quoteId: string,
  }),
);

const QuoteResults = Record(
  ({
    quoteId: '-',
    quoteReturned: false,
    loading: false,
    errorMsg: null,
    quotes: [],
  }: {
    quoteId: QuoteResponse,
    quoteReturned: boolean,
    loading: boolean,
    errorMsg: string | null,
    quotes: Quote[],
  }),
);

export { Quote, QuoteResponse, QuoteResults };
