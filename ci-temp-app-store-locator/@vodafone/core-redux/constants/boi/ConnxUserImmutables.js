/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Record } from 'immutable';

const ConnxEntity = Record(
  ({}: {
    salutation: string | null,
    firstName: string,
    surname: string,
    title: string | null,
    companyName: string | null,
    statusCode: string,
  }),
);

const ConnxUser = Record(
  ({}: {
    title: string | null,
    description: string | null,
    userName: string,
    userType: string,
    cxTbEntity: ConnxEntity,
  }),
);

const ConnxUserContainer = Record(
  ({
    loading: false,
    errorMsg: null,
    user: null,
  }: {
    loading: boolean,
    errorMsg: string | null,
    user: ConnxUser | null,
  }),
);

export { ConnxEntity, ConnxUser, ConnxUserContainer };
