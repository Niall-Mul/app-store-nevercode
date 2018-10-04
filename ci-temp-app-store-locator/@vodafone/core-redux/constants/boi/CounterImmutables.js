/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Record } from 'immutable';

const Counter = Record(
  ({
    value: 0,
    persisted: false,
  }: {
    value: number,
    persisted: boolean,
  }),
);

export { Counter };
