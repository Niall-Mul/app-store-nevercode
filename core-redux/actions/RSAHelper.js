/**
 * Copyright 2018-present Vodafone. All Rights Reserved.
 *
 * @flow
 */

import idx from 'idx';
import keyMirror from 'key-mirror';
import {
  RSAA,
  RSAAction,
  HttpMethod,
  RSAATypes,
  BailoutFactory,
  BodyFactory,
} from 'redux-api-middleware';
import Config from '@vodafone/core-redux/maps';

const ApiTypes = keyMirror({
  VODAFONE_STORES_API: null,
  GOOGLE_AUTOCOMPLETE_API: null,
  GOOGLE_PLACE_DETAILS_API: null,
  GOOGLE_DIRECTIONS_API: null,
  GOOGLE_DISTANCE_API: null,
});

const sessionID = Math.floor(Math.random() * 10000000000 + 1);

const request: (opts: {
  path: string,
  types: RSAATypes,
  api: ApiTypes,
  method?: HttpMethod,
  bailout?: boolean | BailoutFactory,
  body?: any | string | BodyFactory,
  headers?: any | string,
}) => RSAAction = ({
  path,
  types,
  api,
  method = 'GET',
  bailout = false,
  body,
  passThrough,
  headers,
}) => {
  const apiKeyGooglePlaces = encodeURIComponent(
    idx(Config, _ => _.REACT_APP_GOOGLE_PLACES_API_KEY) || '',
  );
  const apiKeyGoogleDirections = encodeURIComponent(
    idx(Config, _ => _.REACT_APP_GOOGLE_DIRECTIONS_API_KEY) || '',
  );
  // This is a workaround for the CORS issue:
  const cors = 'https://cors-anywhere.herokuapp.com/';
  // ----------------------------------------
  const ApiEndpoints = {
    VODAFONE_STORES_API: idx(Config, _ => _.REACT_APP_API_ENDPOINT),
    GOOGLE_AUTOCOMPLETE_API: `${cors}https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKeyGooglePlaces}&sessiontoken=${sessionID}`,
    GOOGLE_PLACE_DETAILS_API: `${cors}https://maps.googleapis.com/maps/api/place/details/json?key=${apiKeyGooglePlaces}&sessiontoken=${sessionID}`,
    GOOGLE_DIRECTIONS_API: `${cors}https://maps.googleapis.com/maps/api/directions/json?key=${apiKeyGoogleDirections}&sessiontoken=${sessionID}`,
    GOOGLE_DISTANCE_API: `${cors}https://maps.googleapis.com/maps/api/distancematrix/json?key=${apiKeyGoogleDirections}&sessiontoken=${sessionID}`,
  };
  const endpoint = ApiEndpoints[api];
  console.info('GET ' + api + ': ' + endpoint + path);
  return {
    [RSAA]: {
      endpoint: endpoint + path,
      body,
      bailout,
      types,
      method,
      headers: headers,
      options: { timeout: 3000 },
    },
  };
};

export { request, ApiTypes };
