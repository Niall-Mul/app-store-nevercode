/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Record } from 'immutable';

const Geometry = Record(
  ({ type: '', coordinates: [] }: {
    type: string,
    coordinates: number[],
  }),
);

const Properties = Record(
  ({
    broadband: false,
    bizAdvisor: false,
    franchise: false,
    storeCode: '',
    rechargePoint: false,
    techTeam: false,
    tradeIn: false,
    topUp: false,
  }: {
    broadband: boolean,
    bizAdvisor: boolean,
    franchise: boolean,
    storeCode: string,
    rechargePoint: boolean,
    techTeam: boolean,
    tradeIn: boolean,
    topUp: boolean,
  }),
);

const Contact = Record(
  ({
    address: '',
    email: '',
    county: '',
    town: '',
    image: '',
    name: '',
    storePhone: '',
    postcode: '',
    countryCode: '',
  }: {
    address: string,
    email: string,
    county: string,
    town: string,
    image: string,
    name: string,
    storePhone: string,
    postcode: string,
    countryCode: string,
  }),
);

const OpeningDetails = Record(
  ({ close: '0000', open: '0000', storeIsOpen: false }: {
    close: string,
    open: string,
    storeIsOpen: boolean,
  }),
);

const StoreRecord = Record(
  ({
    id: '',
    distance: {
      text: '',
      value: 0,
    },
    type: '',
    geometry: new Geometry(),
    properties: new Properties(),
    contact: new Contact(),
    openingDetails: new OpeningDetails(),
    rating: null,
    reviews: null,
  }: {
    id: string,
    distance: {
      text: string,
      value: number,
    },
    type: string,
    geometry: Geometry,
    properties: Properties,
    contact: Contact,
    openingDetails: OpeningDetails,
    rating: number | null,
    reviews: number | null,
  }),
);

const NearbyStoresRecord = Record(
  ({
    loading: false,
    errorMsg: null,
    stores: [],
  }: {
    loading: boolean,
    errorMsg: string | null,
    stores: StoreRecord[] | null,
  }),
);

export { StoreRecord, NearbyStoresRecord };
