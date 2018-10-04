/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';

import { StoreRecord } from '@vodafone/core-redux/maps';

const markerSelected = require('../styles/assets/marker-blue-60p.png');
const markerDefault = require('../styles/assets/marker-blue-30p.png');

interface Props {
  id?: number;
  store: StoreRecord;
  selected?: boolean;
  displayTitle?: boolean;
  onPress: (store: StoreRecord) => any;
}

class GoogleMapMarker extends React.Component<Props> {
  onPress = () => {
    // console.info('GoogleMapMarker onPress: ', event);
    this.props.onPress(this.props.store);
  };

  render() {
    const { id, store, selected, displayTitle } = this.props;
    return (
      <MapView.Marker
        key={id ? id : 'noid'}
        identifier={store.id}
        title={displayTitle ? store.contact.name : null}
        coordinate={{
          latitude: store.geometry.coordinates[1],
          longitude: store.geometry.coordinates[0],
        }}
        onPress={this.onPress}
        image={selected === true ? markerSelected : markerDefault}
      />
    );
  }
}

export default GoogleMapMarker;
