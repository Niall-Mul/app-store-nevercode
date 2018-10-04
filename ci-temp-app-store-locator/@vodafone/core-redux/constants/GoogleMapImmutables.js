/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Record } from 'immutable';

const PositionRecord = Record(
  ({
    lat: 53.3488375,
    lng: -6.2536449,
  }: {
    lat: number,
    lng: number,
  }),
);

const RegionRecord = Record(
  ({
    latitude: 53.3488375,
    longitude: -6.2536449,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }: {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
  }),
);

const DefaultRegion = {
  // London, Vodafone Paddington
  en: new RegionRecord({
    latitude: 51.517855,
    longitude: -0.179014,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }),
  // Athens
  el: new RegionRecord({
    longitude: 23.741074136602606,
    latitude: 37.9871739020693,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  }),
  // Dublin
  ie: new RegionRecord({
    latitude: 53.3514884,
    longitude: -6.2585494,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }),
};

const GoogleMapRecord = Record(
  ({
    region: new RegionRecord(),
    userPosition: null,
    isMapReady: false,
    isUserPositionAccessible: true,
    isUserPositionObtained: false,
  }: {
    region: RegionRecord,
    userPosition: RegionRecord | null,
    isMapReady: boolean,
    isUserPositionAccessible: boolean,
    isUserPositionObtained: boolean,
  }),
);

export { RegionRecord, DefaultRegion, GoogleMapRecord, PositionRecord };
