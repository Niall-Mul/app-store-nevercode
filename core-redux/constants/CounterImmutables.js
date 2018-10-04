/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Record } from 'immutable';

const CounterRecord = Record(
  ({
    value: 0,
  }: {
    value: number,
  }),
);

export { CounterRecord };
