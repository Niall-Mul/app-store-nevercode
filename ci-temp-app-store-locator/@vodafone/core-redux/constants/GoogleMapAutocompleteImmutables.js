/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Record } from 'immutable';
import { RegionRecord } from './GoogleMapImmutables';

const LocationRecord = Record(
  ({ lat: 0, lng: 0 }: {
    lat: number,
    lng: number,
  }),
);

const AutocompleteSuggestionRecord = Record(
  ({ description: '', id: '', place_id: null, location: null, types: null }: {
    description: string,
    id: string,
    place_id: string | null,
    location: LocationRecord | null,
    types: [string] | null,
  }),
);

const AutoCompleteQuery = Record(
  ({
    query: '',
    region: null,
    locale: 'en',
    includeStores: false,
  }: {
    query: string,
    region: RegionRecord,
    locale: string,
    includeStores?: boolean,
  }),
);

const SuggestionDetailsQuery = Record(
  ({
    suggestion: null,
    locale: 'en',
  }: {
    suggestion: AutocompleteSuggestionRecord | null,
    locale: string,
  }),
);

const AutocompleteSuggestionsRecord = Record(
  ({
    query: '',
    loading: false,
    errorMsg: null,
    suggestions: null,
  }: {
    query: string,
    loading: boolean,
    errorMsg: string | null,
    suggestions: AutocompleteSuggestionRecord[] | null,
  }),
);

const SuggestionDetailsRecord = Record(
  ({
    name: '',
    place_id: '',
    geometry: {
      location: new LocationRecord(),
      viewport: {
        northeast: new LocationRecord(),
        southwest: new LocationRecord(),
      },
    },
  }: {
    name: string,
    place_id: string,
    geometry: {
      location: LocationRecord,
      viewport: {
        northeast: LocationRecord,
        southwest: LocationRecord,
      },
    },
  }),
);

const SuggestionDetailsContainerRecord = Record(
  ({
    place_id: '',
    loading: false,
    errorMsg: null,
    details: null,
  }: {
    place_id: string,
    loading: boolean,
    errorMsg: string | null,
    details: SuggestionDetailsRecord | null,
  }),
);

export {
  AutoCompleteQuery,
  SuggestionDetailsQuery,
  AutocompleteSuggestionRecord,
  AutocompleteSuggestionsRecord,
  SuggestionDetailsRecord,
  SuggestionDetailsContainerRecord,
};
