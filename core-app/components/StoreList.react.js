/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { containers, colors } from '../styles';
import { StoreCard } from '@vodafone/core-app/maps';
import { isLandscape } from '../styles/utils/landscape';
import {
  StoreRecord,
  NearbyStoresRecord,
  RegionRecord,
  GoogleMapRecord,
} from '@vodafone/core-redux/maps';

interface Props {
  navigation: Object;
  googleMap: GoogleMapRecord;
  nearbyStores: NearbyStoresRecord;
  getNearbyStores: (region: RegionRecord) => any;
}

class StoreList extends React.Component<Props> {
  render() {
    const { googleMap, nearbyStores } = this.props;
    const { userPosition } = googleMap;

    const stores = nearbyStores
      ? nearbyStores.stores.map((store, index) => {
          return (
            <StoreCard
              key={index}
              store={store}
              currentLocation={userPosition}
              cardList={true}
            />
          );
        })
      : null;
    return (
      <View
        style={[
          containers.container,
          { backgroundColor: colors.white.default },
        ]}
      >
        <ScrollView
          style={
            isLandscape()
              ? containers.storeListContainerLandscape
              : containers.storeListContainer
          }
        >
          {stores}
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(StoreList);
