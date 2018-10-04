/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { connect } from 'react-redux';

import { DeviceActions, DeviceRecord } from '@vodafone/core-redux/device';
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
} from '@vodafone/core-redux/maps';
import GoogleMapView from '../components/GoogleMapView.react';

const { getDeviceCharacteristics, changeOrientation } = DeviceActions;
const {
  onLayoutReady,
  getCurrentUserPosition,
  regionChange,
  viewpointChange,
  clearViewpointChange,
} = GoogleMapActions;
const { getDirections } = GoogleMapDirectionActions;
const { getNearbyStores } = NearbyStoreActions;
const {
  getAutocompleteSuggestions,
  getSuggestionDetails,
} = GoogleMapAutocompleteActions;

interface StateProps {
  isPortrait: boolean;
  device: DeviceRecord;
  googleMap: GoogleMapRecord;
  nearbyStores: NearbyStoresRecord;
  autoCompleteQuery: AutoCompleteQuery;
  autocompleteSuggestions: AutocompleteSuggestionsRecord[];
  suggestionDetailsRecords: SuggestionDetailsContainerRecord[];
  directionsRecord: GoogleMapDirectionsRecord;
  changeToViewpoint: RegionRecord | null;
}
interface DispatchProps {
  getDeviceCharacteristics: () => any;
  changeOrientation: () => any;
  onLayoutReady: () => any;
  regionChange: () => any;
  getNearbyStores: () => any;
  getCurrentUserPosition: () => any;
  getDirections: () => any;
  getAutocompleteSuggestions: () => any;
  getSuggestionDetails: () => any;
  viewpointChange: () => any;
  clearViewpointChange: () => any;
}
export interface Props extends StateProps, DispatchProps {}

const mapStateToProps = (
  state: any,
  ownProps: any,
): {
  isPortrait: boolean,
  device: DeviceRecord,
  googleMap: GoogleMapRecord,
  nearbyStores: NearbyStoresRecord,
  autoCompleteQuery: AutoCompleteQuery,
  autocompleteSuggestions: AutocompleteSuggestionsRecord[],
  suggestionDetailsRecords: SuggestionDetailsContainerRecord[],
  directionsRecord: GoogleMapDirectionsRecord,
  changeToViewpoint: RegionRecord | null,
} => {
  return {
    isPortrait: state.DeviceReducer.isPortrait,
    device: state.DeviceReducer,
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
  getDeviceCharacteristics,
  changeOrientation,
  onLayoutReady,
  regionChange,
  getNearbyStores,
  getCurrentUserPosition,
  getDirections,
  getAutocompleteSuggestions,
  getSuggestionDetails,
  viewpointChange,
  clearViewpointChange,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoogleMapView);
