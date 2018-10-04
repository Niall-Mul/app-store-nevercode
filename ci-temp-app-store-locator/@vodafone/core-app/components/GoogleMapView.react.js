/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { View, Platform } from 'react-native';
import { Button, Card } from 'react-native-elements';
import MapView from 'react-native-maps';
import _ from 'underscore';
import { isLandscape } from '../styles/utils/landscape';

import { LocaleDetector } from '@vodafone/core-app/i18n';
import GoogleMapMarker from './GoogleMapMarker.react.js';
import StoreCard from './StoreCard.react.js';
import {
  StoreRecord,
  NearbyStoresRecord,
  RegionRecord,
  GoogleMapRecord,
} from '@vodafone/core-redux/maps';
import { colors, containers, basicComponents } from '../styles';

interface Props {
  isPortrait: boolean;
  googleMap: GoogleMapRecord;
  nearbyStores: NearbyStoresRecord;
  changeToViewpoint: RegionRecord | null;
  initialRegion: RegionRecord;
  changeOrientation: () => any;
  onLayoutReady: (isMapReady: boolean) => any;
  regionChange: (region: RegionRecord, locale?: string) => any;
  viewpointChange: (region: RegionRecord) => any;
  clearViewpointChange: () => any;
}

interface State {
  selectedStore?: StoreRecord;
  error?: boolean;
  storeDetailsVisible: boolean;
}

class GoogleMapView extends React.Component<Props, State> {
  map: ?MapView;

  state = {
    selectedStore: null,
    storeDetailsVisible: false,
    error: true,
  };

  componentDidMount() {
    this.map = this.refs['map'];
  }

  onMapPressed = () => {
    if (this.state.storeDetailsVisible === true) {
      this.setState({ storeDetailsVisible: false });
    }
  };

  onStorePressed = (store: StoreRecord) => {
    this.setState({ selectedStore: store, storeDetailsVisible: true });
    if (Platform.OS === 'ios') {
      // workaround for iOS triggering onStorePressed and onMapPressed
      // at the same time
      setTimeout(() => {
        this.setState({ storeDetailsVisible: true });
      }, 250);
    }
  };

  onRegionChanged = (region: RegionRecord) => {
    this.props.regionChange(region, LocaleDetector.detect());
    this.setState({ error: this.props.nearbyStores.errorMsg ? true : false });
  };

  shouldComponentUpdate = (nextProps: Props, nextState: State) => {
    const { changeToViewpoint } = nextProps;
    if (changeToViewpoint && this.map) {
      this.map.animateToRegion(changeToViewpoint, 300);
      this.props.clearViewpointChange();
    }
    return true;
  };

  render() {
    const {
      isPortrait,
      initialRegion,
      googleMap,
      nearbyStores,
      viewpointChange,
      changeToViewpoint,
      onLayoutReady,
    } = this.props;
    const { region, isMapReady } = googleMap;
    const { selectedStore, storeDetailsVisible } = this.state;
    const errorCard =
      nearbyStores.errorMsg && this.state.error ? (
        <Card title={nearbyStores.errorMsg}>
          <Button
            icon={{ name: 'close' }}
            backgroundColor={colors.red.default}
            buttonStyle={basicComponents.errorButton}
            title="OK"
            onPress={() => this.setState({ error: false })}
          />
        </Card>
      ) : null;
    const storeSelected =
      storeDetailsVisible && selectedStore ? (
        <StoreCard
          store={selectedStore}
          currentLocation={googleMap.userPosition}
        />
      ) : null;

    const selectedStoreID = selectedStore ? selectedStore.id : null;
    const storeMarkers = nearbyStores.stores
      ? nearbyStores.stores.map((store, index) => {
          return (
            <GoogleMapMarker
              key={index}
              id={index}
              store={store}
              selected={store.id === selectedStoreID}
              onPress={this.onStorePressed}
              displayTitle={false}
            />
          );
        })
      : null;

    return (
      <View style={isPortrait ? containers.map : containers.mapLandscape}>
        <MapView
          ref="map"
          onPress={this.onMapPressed}
          style={isPortrait ? containers.map : containers.mapLandscape}
          mapType="standard"
          showsScale
          showsCompass={false}
          showsPointsOfInterest
          showsBuildings
          // NOTE: You need to add NSLocationWhenInUseUsageDescription key in
          // Info.plist to enable geolocation, otherwise it is going to fail
          // silently! You will also need to add an explanation for why you need
          // the users location against NSLocationWhenInUseUsageDescription in
          // Info.plist. Otherwise Apple may reject your app submission.
          // See: https://github.com/react-community/react-native-maps/blob/master/docs/mapview.md
          showsUserLocation={true}
          showsMyLocationButton={false}
          userLocationAnnotationTitle={''}
          followsUserLocation // iOS only
          showsTraffic={false}
          zoomEnabled
          onLayout={() => this.props.onLayoutReady(true)}
          onRegionChange={_.debounce(this.onRegionChanged, 500, {
            leading: true,
          })}
          initialRegion={initialRegion}
        >
          {isMapReady && storeMarkers}
        </MapView>
        {storeSelected}
        {errorCard}
      </View>
    );
  }
}

export default GoogleMapView;
