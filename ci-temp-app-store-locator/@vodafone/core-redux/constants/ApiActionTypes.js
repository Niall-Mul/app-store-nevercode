/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import {
  RequestFSA,
  RSAAType,
  RequestErrorFSA,
  InvalidRSAA,
  InternalError,
  RequestError,
  ApiError,
} from 'redux-api-middleware';

export type ApiActionTypes =
  | RequestFSA
  | RSAAType
  | RequestErrorFSA
  | InvalidRSAA
  | RequestError
  | ApiError;
