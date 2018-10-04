import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import GoogleMapsAutocomplete from './GoogleMapsAutocomplete.react';
import Swiper from './Swiper.react';
import GoogleMapView from './GoogleMapView.react';
import StoreList from './StoreList.react';
import SwitchViewsButton from './SwitchViewsButton.react.js';
import { colors, containers, basicComponents } from '../styles';
import LocaleDetector from '../i18n/i18nLocaleDetector';
import {
  StoreRecord,
  NearbyStoresRecord,
  RegionRecord,
  AutoCompleteQuery,
  AutocompleteSuggestionsRecord,
  GoogleMapRecord,
  DefaultRegion,
  SuggestionDetailsContainerRecord,
  GoogleMapDirectionsRecord,
} from '@vodafone/core-redux/maps';
import { DeviceRecord } from '@vodafone/core-redux/device';

interface Props {
  isPortrait: boolean;
  device: DeviceRecord;
  googleMap: GoogleMapRecord;
  nearbyStores: NearbyStoresRecord;
  autoCompleteQuery: AutoCompleteQuery;
  autocompleteSuggestions: AutocompleteSuggestionsRecord[];
  suggestionsDetails: SuggestionDetailsContainerRecord[];
  directionsRecord: GoogleMapDirectionsRecord;
  changeToViewpoint: RegionRecord | null;
  getDeviceCharacteristics: () => any;
  changeOrientation: () => any;
  onLayoutReady: (isMapReady: boolean) => any;
  getCurrentUserPosition: () => any;
  regionChange: (region: RegionRecord, locale?: string) => any;
  getNearbyStores: (region: RegionRecord) => any;
  getAutocompleteSuggestions: () => any;
  getSuggestionDetails: () => any;
  viewpointChange: (region: RegionRecord) => any;
  clearViewpointChange: () => any;
}

interface State {}

class GoogleMapViewSwiper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.props.getDeviceCharacteristics();
    this.props.getCurrentUserPosition();
    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.props.changeOrientation();
    });
  }

  componentDidMount() {
    const initialRegion = this.getDefaultRegion();
    this.props.getNearbyStores(initialRegion);
  }

  getDefaultRegion(): RegionRecord {
    return DefaultRegion.hasOwnProperty(LocaleDetector.detect())
      ? DefaultRegion[LocaleDetector.detect()]
      : DefaultRegion['en'];
  }

  moveSwiper = (index: number, offset: number) => {
    const { state, scrollBy } = this.refs.swiper;
    state.index === index ? scrollBy(offset) : null;
  };

  render() {
    const {
      isPortrait,
      navigation,
      autoCompleteQuery,
      autocompleteSuggestions,
      googleMap,
      nearbyStores,
      directionsRecord,
      viewpointChange,
      changeToViewpoint,
      onLayoutReady,
    } = this.props;
    const { region, isMapReady } = googleMap;
    const suggestionsList = autocompleteSuggestions.filter((container, i) => {
      return container.query === autoCompleteQuery.query;
    });
    const suggestionsContainer = suggestionsList ? suggestionsList[0] : null;
    const initialRegion = this.getDefaultRegion();

    const myLocationButton =
      googleMap && googleMap.isUserPositionObtained ? (
        <Icon
          name={'my-location'}
          size={28}
          iconStyle={basicComponents.iconButton}
          color={colors.grey.light}
          onPress={() => viewpointChange(googleMap.userPosition)}
        />
      ) : null;
    return (
      <View
        style={
          isPortrait
            ? containers.containerPortrait
            : containers.containerLandscape
        }
      >
        <SwitchViewsButton
          leftButtonAction={() => this.moveSwiper(1, -1)}
          rightButtonAction={() => this.moveSwiper(0, 1)}
        />
        <GoogleMapsAutocomplete
          region={region}
          suggestions={
            suggestionsContainer ? suggestionsContainer.suggestions : []
          }
          isLoading={
            suggestionsContainer ? suggestionsContainer.loading : false
          }
          getSuggestions={this.props.getAutocompleteSuggestions}
          onSelectSuggestion={this.props.getSuggestionDetails}
          query={autoCompleteQuery.query}
        />
        <Swiper
          isPortrait={isPortrait}
          index={1}
          ref="swiper"
          autoplay={false}
          scrollEnabled={false}
          loop={false}
          showsPagination={false}
        >
          <View
            style={
              isPortrait
                ? containers.containerPortrait
                : containers.containerLandscape
            }
          >
            <StoreList {...this.props} />
          </View>
          <View
            style={
              isPortrait
                ? containers.containerPortrait
                : containers.containerLandscape
            }
          >
            <GoogleMapView {...this.props} initialRegion={initialRegion} />
            <View style={containers.GoogleMapsMyLocationButton}>
              {myLocationButton}
            </View>
          </View>
        </Swiper>
      </View>
    );
  }
}

export default GoogleMapViewSwiper;
