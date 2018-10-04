/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Record } from 'immutable';
import { StoreRecord } from './NearbyStoreImmutables';

type transportModes = 'DRIVING' | 'WALKING' | 'BICYCLING' | 'TRANSIT';
type maneuverTypes =
  | 'turn-left'
  | 'turn-right'
  | 'turn-sharp-left'
  | 'uturn-right'
  | 'turn-slight-right'
  | 'merge'
  | 'roundabout-left'
  | 'roundabout-right'
  | 'uturn-left'
  | 'turn-slight-left'
  | 'turn-left'
  | 'ramp-right'
  | 'turn-right'
  | 'fork-right'
  | 'straight'
  | 'fork-left'
  | 'ferry-train'
  | 'turn-sharp-right'
  | 'ramp-left'
  | 'ferry';

const TextValuePair = Record(
  ({
    text: '',
    value: 0,
  }: {
    text: string,
    value: number,
  }),
);

const PositionRecord = Record(
  ({
    description: '',
    latitude: 0,
    longitude: 0,
  }: {
    description: string,
    latitude: number,
    longitude: number,
  }),
);

const OriginDestinationRequest = Record(
  ({
    origin: new PositionRecord(),
    destination: new PositionRecord(),
    destinationStore: null,
    mode: 'WALKING',
    units: 'metric',
  }: {
    origin: PositionRecord,
    destination: PositionRecord,
    destinationStore: StoreRecord | null,
    mode: transportModes,
    units: 'metric' | 'imperial',
  }),
);

const OriginDestinationBatchRequest = Record(
  ({
    origins: [],
    destinations: [],
    mode: 'WALKING',
    units: 'metric',
  }: {
    origins: PositionRecord[],
    destinations: PositionRecord[],
    mode: transportModes,
    units: 'metric' | 'imperial',
  }),
);

const LegStepRecord = Record(
  ({
    distance: new TextValuePair(),
    duration: new TextValuePair(),
    html_instructions: '',
    maneuver: 'turn-left',
    travel_mode: 'WALKING',
  }: {
    distance: TextValuePair,
    duration: TextValuePair,
    html_instructions: string,
    maneuver: maneuverTypes,
    travel_mode: string,
  }),
);

const LegRecord = Record(
  ({
    distance: new TextValuePair(),
    duration: new TextValuePair(),
    steps: [],
  }: {
    distance: TextValuePair,
    duration: TextValuePair,
    steps: LegStepRecord[],
  }),
);

const GoogleMapDirectionsRecord = Record(
  ({
    loading: false,
    errorMsg: null,
    coordinates: null,
    steps: null,
    destinationStore: null,
    distance: null,
    duration: null,
  }: {
    loading: boolean,
    errorMsg: string | null,
    coordinates: [] | null,
    steps: LegStepRecord[] | null,
    destinationStore: StoreRecord | null,
    distance: { text: string, value: number } | null,
    duration: { text: string, value: number } | null,
  }),
);

export {
  OriginDestinationRequest,
  OriginDestinationBatchRequest,
  GoogleMapDirectionsRecord,
  PositionRecord,
  TextValuePair,
  LegRecord,
};
