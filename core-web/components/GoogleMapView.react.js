/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Marker } from 'react-google-maps';
import { translate } from 'react-i18next';
import {
  Button,
  Container,
  Transition,
  List,
  Icon,
  Input,
} from 'semantic-ui-react';

import { DeviceRecord } from '@vodafone/core-redux/device';
import {
  StoreRecord,
  NearbyStoresRecord,
  RegionRecord,
  AutoCompleteQuery,
  AutocompleteSuggestionsRecord,
  PositionRecord,
  GoogleMapRecord,
  DefaultRegion,
  SuggestionDetailsContainerRecord,
  GoogleMapDirectionsRecord,
  OriginDestinationRequest,
  SuggestionDetailsQuery,
} from '@vodafone/core-redux/maps';
import DirectionButtons from './DirectionButtons.react';
import GoogleMapHOC from './GoogleMapHOC.react';
import GoogleMapMarker from './GoogleMapMarker.react';
import StoreCard from './StoreCard.react';
import GoogleMapsAutocomplete from './GoogleMapsAutocomplete.react';
import { LocaleDetector } from '@vodafone/core-web/i18n';
import StoreDetails from './StoreDetails.react';

const transports = ['WALKING', 'DRIVING', 'TRANSIT', 'BICYCLING'];
const MarkerCurrentPosition = require('../../core-web-css/src/themes/vodafone/assets/current-location-30p.png');
const MyLocationIcon = require('../../core-web-css/src/themes/vodafone/assets/mylocation.png');

interface Props {
  t: (text: string) => string;
  isPortrait: boolean;
  device: DeviceRecord;
  isMarkerShown: boolean;
  height: number;
  googleMap: GoogleMapRecord;
  nearbyStores: NearbyStoresRecord;
  autoCompleteQuery: AutoCompleteQuery;
  autocompleteSuggestions: AutocompleteSuggestionsRecord[];
  suggestionsDetails: SuggestionDetailsContainerRecord[];
  directionsRecord: GoogleMapDirectionsRecord;
  changeToViewpoint: RegionRecord | null;
  getDeviceCharacteristics: () => any;
  onLayoutReady: (isMapReady: boolean) => any;
  getCurrentUserPosition: () => any;
  getDirections: (originDestination: OriginDestinationRequest) => any;
  regionChange: (region: RegionRecord, locale?: string) => any;
  getNearbyStores: (region: RegionRecord) => any;
  getAutocompleteSuggestions: (autocompleteQuery: AutoCompleteQuery) => any;
  getSuggestionDetails: (query: SuggestionDetailsQuery) => any;
  viewpointChange: (region: RegionRecord) => any;
  clearViewpointChange: () => any;
}

interface State {
  selectedStore?: StoreRecord;
  storeInfoVisible: boolean;
  storeDetailsVisible: boolean;
  selectedTransportMode: number;
  listVisible: boolean;
  directionsVisible: boolean;
  newOrigin: RegionRecord;
  address: string;
}

let timeout = null;

class GoogleMapView extends React.Component<Props, State> {
  state = {
    selectedStore: null,
    storeInfoVisible: false,
    storeDetailsVisible: false,
    selectedTransportMode: 0,
    listVisible: false,
    directionsVisible: false,
    newOrigin: null,
    address: this.props.t('store:my_location'),
  };

  constructor(props: Props) {
    super(props);
    this.props.getDeviceCharacteristics();
    this.props.getCurrentUserPosition();
  }

  componentDidMount() {
    const initialRegion = this.getDefaultRegion();
    this.props.getNearbyStores(initialRegion);
  }

  handleVisibility = () =>
    this.setState({
      listVisible: !this.state.listVisible,
      storeInfoVisible: false,
    });

  getDefaultRegion(): RegionRecord {
    return DefaultRegion.hasOwnProperty(LocaleDetector.detect())
      ? DefaultRegion[LocaleDetector.detect()]
      : DefaultRegion['en'];
  }

  onMapPressed = (event: Event) => {
    console.info('onMapPressed', event);
    this.setState({ storeInfoVisible: !this.state.storeInfoVisible });
  };

  onStorePressed = (store: StoreRecord) => {
    this.setState({
      selectedStore: store,
      storeInfoVisible: true,
      storeDetailsVisible: false,
      listVisible: false,
    });
  };

  openStoreDetails = (store: StoreRecord) => {
    this.setState({ storeInfoVisible: false, storeDetailsVisible: false });
    setTimeout(() => {
      this.setState({
        storeInfoVisible: true,
        storeDetailsVisible: true,
        selectedStore: store,
      });
    }, 200);
  };

  closeStoreDetails = () => {
    this.setState({ storeInfoVisible: true, storeDetailsVisible: false });
  };

  onRegionChanged = (region: RegionRecord) => {
    this.props.regionChange(region, LocaleDetector.detect());
  };

  onGetDirections = (selectedTransportMode?: number, store?: StoreRecord) => {
    this.setState({
      directionsVisible: false,
      selectedStore: store ? store : this.state.selectedStore,
    });
    const { userPosition } = this.props.googleMap;
    const { selectedStore } = this.state;
    const directionsStore = store ? store : selectedStore;
    const origin = this.state.newOrigin
      ? {
          latitude: this.state.newOrigin.lat,
          longitude: this.state.newOrigin.lng,
        }
      : userPosition;
    const selectedTransport =
      selectedTransportMode && typeof selectedTransportMode === 'number'
        ? selectedTransportMode
        : this.state.selectedTransportMode;
    if (this.props.getDirections && directionsStore) {
      this.props.getDirections({
        origin: {
          description: 'current position',
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
        destination: {
          description: directionsStore.contact.name,
          latitude: directionsStore.geometry.coordinates[1],
          longitude: directionsStore.geometry.coordinates[0],
        },
        destinationStore: directionsStore,
        mode: transports[selectedTransport],
      });
      this.setState({ directionsVisible: true });
    }
  };

  updateTransportMode = (selectedTransportMode: number) => {
    this.setState({ selectedTransportMode });
    this.onGetDirections(selectedTransportMode);
  };

  onChangeText = (_, data: Object) => {
    const { googleMap, getAutocompleteSuggestions } = this.props;
    const newText = data.value;
    if (timeout) {
      clearTimeout(timeout);
    }
    this.setState({ address: newText });
    timeout = setTimeout(() => {
      if (newText.length >= 3) {
        getAutocompleteSuggestions({
          query: this.state.address,
          region: googleMap.region,
          locale: LocaleDetector.detect(),
        });
      }
    }, 2000);
  };

  clearAddress = () => {
    this.setState({ address: '' });
  };

  onSuggestionSelected = (
    suggestion: SuggestionDetailsQuery,
    store: StoreRecord,
  ) => {
    const parameters = {
      suggestion,
      locale: LocaleDetector.detect(),
    };
    this.props
      .getSuggestionDetails(parameters)
      .then(result => {
        this.setState({
          newOrigin: result.payload.result.geometry.location,
          address: suggestion.description,
        });
      })
      .finally(() => {
        this.onGetDirections();
      });
  };

  resetDirections = () => {
    this.setState({ directionsVisible: false });
  };

  resetLocation = () => {
    const { googleMap, t, viewpointChange } = this.props;
    let promise = new Promise((resolve, reject) => {
      this.setState({
        address: t('store:my_location'),
        newOrigin: null,
      });
      viewpointChange(googleMap.userPosition);
      resolve();
    });
    return promise;
  };

  render() {
    const {
      t,
      autoCompleteQuery,
      autocompleteSuggestions,
      googleMap,
      nearbyStores,
      directionsRecord,
      viewpointChange,
      changeToViewpoint,
      height,
    } = this.props;
    const { region } = googleMap;
    const {
      selectedStore,
      storeInfoVisible,
      storeDetailsVisible,
      selectedTransportMode,
    } = this.state;

    const storeSelected =
      storeInfoVisible && selectedStore ? (
        !storeDetailsVisible ? (
          <StoreCard
            store={selectedStore}
            currentLocation={googleMap.userPosition}
            onGetDirections={() => this.onGetDirections(0, selectedStore)}
            openStoreDetails={() => this.openStoreDetails(selectedStore)}
          />
        ) : (
          <StoreDetails
            store={selectedStore}
            currentLocation={googleMap.userPosition}
            onGetDirections={() => this.onGetDirections(0, selectedStore)}
            closeStoreDetails={this.closeStoreDetails}
          />
        )
      ) : null;

    const suggestionsList = autocompleteSuggestions.filter((container, i) => {
      return container.query === autoCompleteQuery.query;
    });
    const suggestionsContainer = suggestionsList ? suggestionsList[0] : null;
    const suggestionOptions =
      suggestionsContainer && suggestionsContainer.suggestions ? (
        <div id="suggestions" className="suggestionsContainer">
          {suggestionsContainer.suggestions.map((suggestion, index) => {
            return (
              <div
                key={index}
                className="suggestionItem"
                onClick={() =>
                  this.onSuggestionSelected(suggestion, selectedStore)
                }
              >
                <div>
                  <div className="suggestionDescription">
                    {suggestion.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null;

    const selectedStoreID = selectedStore ? selectedStore.id : null;
    let storeMarkers = nearbyStores.stores
      ? nearbyStores.stores.map((store, index) => {
          return (
            <GoogleMapMarker
              key={index}
              store={store}
              onPress={this.onStorePressed}
              displayTitle={false}
              selected={store.id === selectedStoreID}
              onMapPressed={this.onMapPressed}
            />
          );
        })
      : [];
    let storeCards = nearbyStores.stores
      ? nearbyStores.stores.map((store, index) => {
          return (
            <StoreCard
              key={index}
              store={store}
              currentLocation={googleMap.userPosition}
              onGetDirections={() => {
                this.resetLocation().then(() => {
                  this.onGetDirections(0, store);
                  this.handleVisibility();
                });
              }}
              openStoreDetails={() => {
                this.openStoreDetails(store);
                this.handleVisibility();
              }}
              list={true}
            />
          );
        })
      : [];
    const initialRegion = this.getDefaultRegion();
    const mapCenter = {
      lat: initialRegion.latitude,
      lng: initialRegion.longitude,
    };

    const panTo = changeToViewpoint
      ? new PositionRecord({
          lat: changeToViewpoint.latitude,
          lng: changeToViewpoint.longitude,
        })
      : null;

    let myLocationButton = null;
    if (googleMap && googleMap.isUserPositionObtained) {
      storeMarkers.push(
        <Marker
          key={'currentPos'}
          position={{
            lat: googleMap.userPosition.latitude,
            lng: googleMap.userPosition.longitude,
          }}
          icon={{
            url: MarkerCurrentPosition,
          }}
        />,
      );
      myLocationButton = (
        <Button
          className="mylocation-button icon-button"
          onClick={() => viewpointChange(googleMap.userPosition)}
          as="image"
        >
          <img src={MyLocationIcon} alt="" />
        </Button>
      );
    }

    const directionTransportModeButtons = (
      <DirectionButtons
        directionsRecord={directionsRecord}
        selectedTransportMode={selectedTransportMode}
        updateTransportMode={this.updateTransportMode}
      />
    );

    let directionDetails =
      directionsRecord.coordinates && directionsRecord.destinationStore ? (
        <Container
          className={
            'directionsDetails' +
            (this.state.listVisible ? ' directionDetailsLeft' : '')
          }
        >
          <div className="directionsBlock">
            <h5 className="ui header" style={{ margin: 0, fontSize: '1rem' }}>
              <i aria-hidden="true" className="location arrow icon" />
              <div className="content" style={{ position: 'relative' }}>
                {suggestionOptions}
                <Input
                  value={this.state.address}
                  onChange={(event, data) => this.onChangeText(event, data)}
                />
                <Button
                  icon
                  onClick={() => this.clearAddress()}
                  className="clearAddressButton"
                >
                  <Icon name="close" />
                </Button>
                <div className="sub header" />
              </div>
            </h5>
            <h5 className="ui header" style={{ margin: 0, fontSize: '1rem' }}>
              <i aria-hidden="true" className="map marker alternate icon" />
              <div className="content">
                {directionsRecord.destinationStore.contact.name}
                <div className="sub header">
                  {directionsRecord.destinationStore.distance.text} -
                  {directionsRecord.duration && directionsRecord.duration.text}
                </div>
              </div>
            </h5>
          </div>
          <Button
            icon
            onClick={() => this.resetDirections()}
            className="resetDirectionsButton"
          >
            <Icon
              bordered
              inverted
              color="black"
              name="close"
              style={{ height: '100%' }}
            />
          </Button>
        </Container>
      ) : null;

    return (
      <div style={{ position: 'relative' }}>
        <Transition.Group animation="fly right" duration={1000}>
          {this.state.listVisible && (
            <List className="storeList">
              <Button
                className="close-list-button"
                onClick={this.handleVisibility}
              >
                <Icon name="close" />
              </Button>
              {storeCards}
            </List>
          )}
        </Transition.Group>
        <GoogleMapHOC
          googleMap={googleMap}
          markers={storeMarkers}
          customControls={myLocationButton}
          height={height}
          defaultCenter={mapCenter}
          panTo={panTo}
          onMapPressed={this.onMapPressed}
          onRegionChanged={this.onRegionChanged}
          clearViewpointChange={this.props.clearViewpointChange}
          directions={directionsRecord.coordinates}
        />
        <div
          style={{ position: 'absolute', top: 10, left: 10, display: 'flex' }}
        >
          {!this.state.listVisible && (
            <Button
              className={'storesListButton'}
              onClick={this.handleVisibility}
            >
              {t('store:show_stores_list')}
            </Button>
          )}
          {!this.state.directionsVisible ? (
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
              moveRight={this.state.listVisible}
            />
          ) : null}
        </div>
        {directionTransportModeButtons}
        {this.state.directionsVisible && directionDetails}
        {storeSelected}
      </div>
    );
  }
}

export default translate(['store', 'common'], { wait: true })(GoogleMapView);
