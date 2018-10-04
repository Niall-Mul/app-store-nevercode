/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Record } from 'immutable';

const User = Record(
  ({
    accountId: '-',
    name: '-',
  }: {
    accountId: string,
    name: string,
  }),
);

const AuthenticationStatus = Record(
  ({
    loading: false,
    authenticated: false,
    errorMsg: null,
    user: new User(),
  }: {
    loading: boolean,
    authenticated: boolean,
    errorMsg: string | null,
    user: User,
  }),
);

export { User, AuthenticationStatus };
