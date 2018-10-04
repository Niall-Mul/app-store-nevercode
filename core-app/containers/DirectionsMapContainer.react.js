/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import {
  GoogleMapActions,
  NearbyStoreActions,
  GoogleMapAutocompleteActions,
  RegionRecord,
  GoogleMapRecord,
  NearbyStoresRecord,
  AutocompleteSuggestionsRecord,
  GoogleMapDirectionActions,
  AutoCompleteQuery,
  SuggestionDetailsContainerRecord,
  GoogleMapDirectionsRecord,
  OriginDestinationRequest,
} from '@vodafone/core-redux/maps';
import Directions from '../components/Directions.react';

const {
  onLayoutReady,
  getCurrentUserPosition,
  regionChange,
  clearViewpointChange,
} = GoogleMapActions;
const { getDirections } = GoogleMapDirectionActions;
const { getNearbyStores } = NearbyStoreActions;
const {
  getAutocompleteSuggestions,
  getSuggestionDetails,
} = GoogleMapAutocompleteActions;

interface StateProps {
  googleMap: GoogleMapRecord;
  nearbyStores: NearbyStoresRecord;
  autoCompleteQuery: AutoCompleteQuery;
  autocompleteSuggestions: AutocompleteSuggestionsRecord[];
  suggestionDetailsRecords: SuggestionDetailsContainerRecord[];
  directionsRecord: GoogleMapDirectionsRecord;
  changeToViewpoint: RegionRecord | null;
}
interface DispatchProps {
  onLayoutReady: () => any;
  regionChange: () => any;
  getNearbyStores: () => any;
  getCurrentUserPosition: () => any;
  getAutocompleteSuggestions: () => any;
  getSuggestionDetails: () => any;
  getDirections: (originDestination: OriginDestinationRequest) => any;
  clearViewpointChange: () => any;
}
export interface Props extends StateProps, DispatchProps {}

const mapStateToProps = (
  state: any,
  ownProps: any,
): {
  googleMap: GoogleMapRecord,
  nearbyStores: NearbyStoresRecord,
  autoCompleteQuery: AutoCompleteQuery,
  autocompleteSuggestions: AutocompleteSuggestionsRecord[],
  suggestionDetailsRecords: SuggestionDetailsContainerRecord[],
  directionsRecord: GoogleMapDirectionsRecord,
  changeToViewpoint: RegionRecord | null,
} => {
  return {
    googleMap: state.GoogleMapReducer,
    nearbyStores: state.NearbyStoresReducer,
    autoCompleteQuery: state.GoogleMapAutocompleteQueryReducer,
    autocompleteSuggestions: state.GoogleMapAutocompleteReducer,
    suggestionDetailsRecords: state.GoogleMapSuggestionDetailsReducer,
    directionsRecord: state.GoogleMapDirectionsReducer,
    changeToViewpoint: state.GoogleMapChangeViewpointReducer,
  };
};

const mapDispatchToProps = {
  onLayoutReady,
  regionChange,
  getNearbyStores,
  getCurrentUserPosition,
  getAutocompleteSuggestions,
  getSuggestionDetails,
  getDirections,
  clearViewpointChange,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Directions);
