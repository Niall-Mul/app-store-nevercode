/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

// $FlowFixMe
import Config from './config';

import { NearbyStoreActions } from './actions/NearbyStoreActions';
import {
  StoreRecord,
  NearbyStoresRecord,
} from './constants/NearbyStoreImmutables';
import NearbyStoresReducer from './reducers/NearbyStoreReducer';

import { GoogleMapActions } from './actions/GoogleMapActions';
import {
  PositionRecord,
  GoogleMapRecord,
  DefaultRegion,
  RegionRecord,
} from './constants/GoogleMapImmutables';
import GoogleMapReducer from './reducers/GoogleMapReducer';

import { GoogleMapAutocompleteActions } from './actions/GoogleMapAutocompleteActions';
import {
  AutoCompleteQuery,
  SuggestionDetailsQuery,
  AutocompleteSuggestionRecord,
  AutocompleteSuggestionsRecord,
  SuggestionDetailsRecord,
  SuggestionDetailsContainerRecord,
} from './constants/GoogleMapAutocompleteImmutables';
import GoogleMapAutocompleteReducer from './reducers/GoogleMapAutocompleteReducer';
import GoogleMapAutocompleteQueryReducer from './reducers/GoogleMapAutocompleteQueryReducer';
import GoogleMapSuggestionDetailsReducer from './reducers/GoogleMapSuggestionDetailsReducer';
import GoogleMapChangeViewpointReducer from './reducers/GoogleMapChangeViewpointReducer';
import { GoogleMapDirectionActions } from './actions/GoogleMapDirectionActions';
import {
  OriginDestinationRequest,
  GoogleMapDirectionsRecord,
} from './constants/GoogleMapDirectionsImmutables';
import GoogleMapDirectionsReducer from './reducers/GoogleMapDirectionsReducer';
import { GoogleMapDistanceActions } from './actions/GoogleMapDistanceActions';

export {
  NearbyStoreActions,
  StoreRecord,
  NearbyStoresRecord,
  NearbyStoresReducer,
  GoogleMapActions,
  PositionRecord,
  GoogleMapRecord,
  DefaultRegion,
  RegionRecord,
  GoogleMapReducer,
  GoogleMapAutocompleteActions,
  AutoCompleteQuery,
  SuggestionDetailsQuery,
  AutocompleteSuggestionRecord,
  AutocompleteSuggestionsRecord,
  SuggestionDetailsRecord,
  SuggestionDetailsContainerRecord,
  GoogleMapAutocompleteReducer,
  GoogleMapAutocompleteQueryReducer,
  GoogleMapSuggestionDetailsReducer,
  GoogleMapChangeViewpointReducer,
  GoogleMapDirectionActions,
  OriginDestinationRequest,
  GoogleMapDirectionsRecord,
  GoogleMapDirectionsReducer,
  GoogleMapDistanceActions,
};

export default Config;
