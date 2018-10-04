/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import idx from 'idx';
import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline,
} from 'react-google-maps';
import _ from 'underscore';

import Config from '@vodafone/core-redux/maps';
import { RegionRecord, PositionRecord } from '@vodafone/core-redux/maps';

import GoogleMapCustomControl from './GoogleMapCustomControl.react';
import GoogleMapMarker from './GoogleMapMarker.react';

const mapStyles = [
  {
    featureType: 'landscape',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }],
  },
];

interface Props {
  height: number;
  markers: GoogleMapMarker[] | null;
  customControls: GoogleMapCustomControl[] | null;
  defaultCenter: PositionRecord;
  panTo: PositionRecord;
  directions: any[];
  onMapPressed: (event: Event) => any;
  onRegionChanged: (region: RegionRecord) => any;
  clearViewpointChange: () => any;
}

const apiKey = idx(Config, _ => _.REACT_APP_GOOGLE_MAP_API_KEY) || '';

class GoogleMapRenderer extends React.Component<Props> {
  map: ?GoogleMap;

  onMapPressed = (event: Event) => {
    console.info('GoogleMapRenderer onMapPressed', event);
    this.props.onMapPressed(event);
  };

  onRegionChanged() {
    const center = this.map ? this.map.getCenter() : null;
    const bounds = this.map ? this.map.getBounds() : null;
    if (!center || !bounds) {
      return;
    }
    const region = new RegionRecord({
      latitude: center.lat(),
      longitude: center.lng(),
      latitudeDelta: Math.abs(bounds.b.b - bounds.b.f),
      longitudeDelta: Math.abs(bounds.f.b - bounds.f.f),
    });
    console.log('onRegionChanged', center, bounds, region);
    this.props.onRegionChanged(region);
  }

  shouldComponentUpdate = (nextProps: Props) => {
    const { panTo } = nextProps;
    if (panTo && this.map) {
      this.map.panTo({ lat: panTo.lat, lng: panTo.lng });
    }
    this.props.clearViewpointChange();
    return true;
  };

  render() {
    const { defaultCenter, markers, directions, customControls } = this.props;
    let directionsPath = directions
      ? directions.map((coordinates, index) => {
          return {
            lat: coordinates.latitude,
            lng: coordinates.longitude,
          };
        })
      : null;
    const directionsPolyLine = directionsPath ? (
      <Polyline
        path={directionsPath}
        options={{ strokeColor: 'red', strokeWeight: 2 }}
      />
    ) : null;

    return (
      <GoogleMap
        ref={ref => (this.map = ref)}
        defaultZoom={16}
        defaultCenter={defaultCenter}
        onDrag={_.debounce(this.onRegionChanged.bind(this), 500, {
          leading: true,
        })}
        onZoomChanged={_.debounce(this.onRegionChanged.bind(this), 500, {
          leading: true,
        })}
        onClick={this.onMapPressed.bind(this)}
        options={{
          styles: mapStyles,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: window.google.maps.ControlPosition.TOP_CENTER,
          },
          zoomControl: true,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.LEFT_BOTTOM,
          },
          scaleControl: true,
          streetViewControl: true,
          streetViewControlOptions: {
            position: window.google.maps.ControlPosition.LEFT_BOTTOM,
          },
          fullscreenControl: false,
        }}
      >
        {customControls}
        {markers}
        {directionsPolyLine}
      </GoogleMap>
    );
  }
}

const GoogeleMapHOC = compose(
  withProps((props: Props) => {
    return {
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `${props.height}px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    };
  }),
  withScriptjs,
  withGoogleMap,
)((props: Props) => <GoogleMapRenderer {...props} />);

export default GoogeleMapHOC;
