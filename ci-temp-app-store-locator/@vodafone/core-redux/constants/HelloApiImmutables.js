/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Record } from 'immutable';

const HelloApiRecord = Record(
  ({ name: '', origin: '', dateOfVisit: '' }: {
    name: string,
    origin: string,
    dateOfVisit: string,
  }),
);

const HelloApiResults = Record(
  ({
    loading: false,
    errorMsg: null,
    records: null,
  }: {
    loading: boolean,
    errorMsg: string | null,
    records: HelloApiRecord[] | null,
  }),
);

export { HelloApiRecord, HelloApiResults };
