/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import idx from 'idx';
import {
  RSAA,
  RSAAction,
  HttpMethod,
  RSAATypes,
  BailoutFactory,
  BodyFactory,
} from 'redux-api-middleware';

const endpoint = idx(process.env, _ => _.REACT_APP_API_ENDPOINT) || '';

const request: (opts: {
  path: string,
  types: RSAATypes,
  method?: HttpMethod,
  bailout?: boolean | BailoutFactory,
  body?: any | string | BodyFactory,
}) => RSAAction = ({ path, types, method = 'GET', bailout = false, body }) => {
  return {
    [RSAA]: {
      endpoint: endpoint + path,
      body,
      bailout,
      types,
      method,
      options: { timeout: 3000 },
    },
  };
};

export { request };
