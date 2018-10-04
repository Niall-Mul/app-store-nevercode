/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Marker } from 'react-google-maps';

import { StoreRecord } from '@vodafone/core-redux/maps';

const MarkerSelected = require('../../core-web-css/src/themes/vodafone/assets/marker-blue-60p.png');
const MarkerDefault = require('../../core-web-css/src/themes/vodafone/assets/marker-blue-30p.png');

interface Props {
  id?: number;
  store: StoreRecord;
  selected?: boolean;
  displayTitle?: boolean;
  onPress: (store: StoreRecord) => any;
}

class GoogleMapMarker extends React.Component<Props> {
  onPress = (event: Event) => {
    console.info('GoogleMapMarker onPress: ', event);
    this.props.onPress(this.props.store);
  };

  render() {
    const { id, store, selected } = this.props;
    const markerIconURI = selected ? MarkerSelected : MarkerDefault;
    return (
      <Marker
        key={id ? id : store.id}
        position={{
          lat: store.geometry.coordinates[1],
          lng: store.geometry.coordinates[0],
        }}
        onClick={this.onPress}
        icon={{
          url: markerIconURI,
        }}
      />
    );
  }
}

export default GoogleMapMarker;
