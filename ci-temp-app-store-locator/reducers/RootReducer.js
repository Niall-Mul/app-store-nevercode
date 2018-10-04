/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { combineReducers } from 'redux';
import { DeviceReducer } from '@vodafone/core-redux/device';
import {
  GoogleMapReducer,
  GoogleMapChangeViewpointReducer,
  GoogleMapAutocompleteQueryReducer,
  GoogleMapAutocompleteReducer,
  GoogleMapSuggestionDetailsReducer,
  GoogleMapDirectionsReducer,
  NearbyStoresReducer,
} from '@vodafone/core-redux/maps';

const reducers = {
  DeviceReducer,
  GoogleMapReducer,
  GoogleMapChangeViewpointReducer,
  GoogleMapAutocompleteQueryReducer,
  GoogleMapAutocompleteReducer,
  GoogleMapSuggestionDetailsReducer,
  GoogleMapDirectionsReducer,
  NearbyStoresReducer,
};

export default combineReducers(reducers);
