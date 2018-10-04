/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Linking,
  Platform,
  Keyboard,
} from 'react-native';
import { Header, Button, ButtonGroup, SearchBar } from 'react-native-elements';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { translate } from 'react-i18next';
import { isLandscape } from '../styles/utils/landscape';
import LocaleDetector from '../i18n/i18nLocaleDetector';
import GoogleMapMarker from './GoogleMapMarker.react.js';
import {
  GoogleMapRecord,
  NearbyStoresRecord,
  AutoCompleteQuery,
  AutocompleteSuggestionsRecord,
  SuggestionDetailsContainerRecord,
  GoogleMapDirectionsRecord,
  RegionRecord,
  StoreRecord,
  OriginDestinationRequest,
  AutocompleteSuggestionRecord,
  SuggestionDetailsQuery,
} from '@vodafone/core-redux/maps';
import {
  typography,
  colors,
  containers,
  basicComponents,
  imagesIcons,
} from '../styles';

interface Props {
  t: (text: string) => string;
  i18n: any;
  navigation: any;
  googleMap: GoogleMapRecord;
  nearbyStores: NearbyStoresRecord;
  directionsRecord: GoogleMapDirectionsRecord;
  changeToViewpoint: RegionRecord | null;
  autoCompleteQuery: AutoCompleteQuery;
  autocompleteSuggestions: AutocompleteSuggestionsRecord[];
  suggestionsDetails: SuggestionDetailsContainerRecord[];
  onLayoutReady: () => any;
  regionChange: () => any;
  getNearbyStores: () => any;
  getCurrentUserPosition: () => any;
  getDirections: (originDestination: OriginDestinationRequest) => any;
  getAutocompleteSuggestions: (autocompleteQuery: AutoCompleteQuery) => any;
  getSuggestionDetails: (query: SuggestionDetailsQuery) => any;
  clearViewpointChange: () => any;
}

interface State {
  selectedIndex: number;
  duration: Object;
  distance: Object;
  address: string;
  newOrigin: RegionRecord;
}

let timeout = null;
const transports = ['walking', 'driving', 'transit', 'bicycling'];

export class Directions extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'screen',
  };
  map: MapView;

  state = {
    selectedIndex: 0,
    duration: {},
    distance: {},
    address: this.props.t('store:my_location'),
    newOrigin: null,
  };

  componentDidMount() {
    this.map = this.refs['map'];
    this.props.getCurrentUserPosition();
  }

  onGetDirections = async (store: StoreRecord, selectedIndex: number) => {
    const { userPosition } = this.props.googleMap;
    const origin = this.state.newOrigin
      ? {
          latitude: this.state.newOrigin.lat,
          longitude: this.state.newOrigin.lng,
        }
      : userPosition;
    if (this.props.getDirections) {
      this.props.getDirections({
        origin: {
          description: 'current position',
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
        destination: {
          description: store.contact.name,
          latitude: store.geometry.coordinates[1],
          longitude: store.geometry.coordinates[0],
        },
        destinationStore: store,
        mode: transports[selectedIndex],
      });
    }
  };

  updateIndex = (selectedIndex: number, store: StoreRecord) => {
    this.setState({ selectedIndex });
    this.onGetDirections(store, selectedIndex);
  };

  openMapsUrl = (store: StoreRecord) => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${store.geometry.coordinates[1]},${
      store.geometry.coordinates[0]
    }`;
    const label = store.contact.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  onChangeText = (newText: string) => {
    const { googleMap, getAutocompleteSuggestions } = this.props;
    timeout ? clearTimeout(timeout) : null;
    this.setState({ address: newText });
    timeout = setTimeout(() => {
      if (newText.length >= 3) {
        getAutocompleteSuggestions({
          query: this.state.address,
          region: googleMap.region,
          locale: LocaleDetector.detect(),
        });
      }
    }, 3000);
  };

  onSuggestionSelected = (
    suggestion: SuggestionDetailsQuery,
    store: StoreRecord,
  ) => {
    Keyboard.dismiss();
    const parameters = {
      suggestion,
      locale: LocaleDetector.detect(),
    };

    this.props.getSuggestionDetails(suggestion).then(result => {
      this.setState({
        newOrigin: result.payload.result.geometry.location,
        address: suggestion.description,
      });
      this.onGetDirections(store, this.state.selectedIndex);
    });
  };

  clearInput = () => {
    this.setState({ address: '' });
  };

  render() {
    const {
      navigation,
      t,
      directionsRecord,
      googleMap,
      autoCompleteQuery,
      autocompleteSuggestions,
    } = this.props;
    const { isMapReady, userPosition } = googleMap;
    const store = navigation.getParam('store', {});

    const suggestionsList = autocompleteSuggestions.filter((container, i) => {
      return container.query === autoCompleteQuery.query;
    });
    const suggestionsContainer = suggestionsList ? suggestionsList[0] : null;
    const suggestionOptions =
      suggestionsContainer && suggestionsContainer.suggestions ? (
        <View
          style={{
            position: 'absolute',
            top: 120,
            zIndex: 99,
            left: 0,
            width: '100%',
          }}
        >
          {suggestionsContainer.suggestions.map((suggestion, index) => {
            return (
              <TouchableHighlight
                key={index}
                style={{}}
                onPress={() => this.onSuggestionSelected(suggestion, store)}
                underlayColor={'#c8c7cc'}
              >
                <View style={[containers.googleMapsAutoCompleteSuggestionRow]}>
                  <Text
                    style={typography.searchBarSuggestionText}
                    numberOfLines={1}
                  >
                    {suggestion.description}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      ) : null;

    const buttons = [
      t('store:walk'),
      t('store:car'),
      t('store:train'),
      t('store:cycle'),
    ];
    const { selectedIndex } = this.state;
    const storeRegion = {
      latitude: userPosition.latitude,
      longitude: userPosition.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    const directions = directionsRecord.coordinates ? (
      <MapView.Polyline
        coordinates={directionsRecord.coordinates}
        strokeWidth={2}
        strokeColor={colors.turquoise.singlepoint}
      />
    ) : null;

    return (
      <View style={containers.container}>
        <Header
          outerContainerStyles={{
            backgroundColor: colors.grey.default,
            zIndex: 1,
            borderBottomWidth: 0,
          }}
          leftComponent={
            <Icon
              name="md-arrow-back"
              size={36}
              color={colors.white.default}
              onPress={() => navigation.goBack()}
            />
          }
          centerComponent={
            <Text style={{ fontSize: 20, color: colors.white.default }}>
              {t('store:directions')}
            </Text>
          }
        />
        <View style={isLandscape() ? containers.itemsRow : {}}>
          <View
            style={[
              containers.itemsRow,
              containers.directionsRow,
              isLandscape()
                ? containers.directionsRowLandscape
                : containers.directionsRowPortrait,
            ]}
          >
            <View style={containers.directionsIconContainer}>
              <Icon name="md-locate" size={28} color={colors.white.default} />
            </View>
            <SearchBar
              clearIcon={{
                name: 'clear',
                color: colors.black.default,
                paddingBottom: 10,
              }}
              onClear={this.clearInput}
              onChangeText={this.onChangeText}
              value={this.state.address}
              containerStyle={typography.directionsBox}
              noIcon
              inputStyle={{
                margin: 0,
                backgroundColor: colors.white.default,
                color: colors.black.default,
              }}
              lightTheme
            />
          </View>
          <View
            style={[
              containers.itemsRow,
              containers.directionsRow,
              isLandscape()
                ? containers.directionsRowLandscape2
                : containers.directionsRowPortrait,
              {
                top: isLandscape() ? 0 : 50,
              },
            ]}
          >
            <View style={containers.directionsIconContainer}>
              <Icon name="md-pin" size={28} color={colors.white.default} />
            </View>
            <TextInput
              style={typography.directionsBox}
              value={store.contact.address}
              editable={false}
            />
          </View>
        </View>
        {suggestionOptions}
        <MapView
          ref={ref => (this.map = ref)}
          style={
            isLandscape()
              ? containers.directionsMapLandscape
              : containers.directionsMap
          }
          region={storeRegion}
          showsUserLocation={true}
          onMapReady={() =>
            this.onGetDirections(store, this.state.selectedIndex)
          }
        >
          <GoogleMapMarker
            store={store}
            onPress={() => console.log('Pressed marker')}
          />
          {isMapReady && directions}
        </MapView>
        <View
          style={
            isLandscape()
              ? containers.directionsButtonGroupContainerLandscape
              : containers.directionsButtonGroupContainer
          }
        >
          <ButtonGroup
            containerStyle={containers.directionsButtonGroup}
            innerBorderStyle={{ color: colors.white.default }}
            onPress={selectedIndex => this.setState({ selectedIndex })}
            selectedIndex={selectedIndex}
            buttons={buttons}
            selectedTextStyle={{ color: colors.black.default }}
            textStyle={{ color: colors.grey.default, fontSize: 14 }}
            selectedButtonStyle={{
              borderColor: colors.turquoise.singlepoint,
              borderBottomWidth: 3,
            }}
            buttonStyle={{
              backgroundColor: colors.white.default,
            }}
            onPress={selectedIndex => this.updateIndex(selectedIndex, store)}
          />
        </View>
        <View
          style={[
            isLandscape()
              ? containers.directionsInfoLandscape
              : containers.directionsInfo,
            containers.itemsRow,
            { alignItems: 'center', justifyContent: 'center' },
          ]}
        >
          <Button
            title={t('store:show_steps')}
            buttonStyle={[basicComponents.buttonGrey, { width: 150 }]}
            onPress={() => console.log('show steps button pressed')}
          />
          <Button
            title={t('store:start_navigation')}
            buttonStyle={[basicComponents.button, { width: 150 }]}
            onPress={() => this.openMapsUrl(store)}
          />
        </View>
      </View>
    );
  }
}

export default translate(['store', 'common'], { wait: true })(Directions);
