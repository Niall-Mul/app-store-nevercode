/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Action } from 'redux';
import { RequestErrorFSA } from 'redux-api-middleware';
import type { ApiActionTypes } from '../constants/ApiActionTypes';
import { ActionTypes } from '../actions/NearbyStoreActions';
import {
  StoreRecord,
  NearbyStoresRecord,
} from '../constants/NearbyStoreImmutables';

interface GetNearbyStoresAction extends Action {
  type: typeof ActionTypes.NEARBY_STORES_SUCCESS;
  payload: StoreRecord[];
}

const NearbyStoresReducer = (
  state: NearbyStoresRecord = new NearbyStoresRecord(),
  action: GetNearbyStoresAction | ApiActionTypes | Action,
): NearbyStoresRecord => {
  const { type } = action;
  switch (type) {
    case ActionTypes.NEARBY_STORES_REQUEST: {
      const actionObj: RequestErrorFSA = action;
      if (actionObj.error !== true)
        return new NearbyStoresRecord({
          loading: true,
          stores: state.stores,
        });
      return new NearbyStoresRecord({
        errorMsg: actionObj.payload.message.toString(),
        stores: state.stores,
      });
    }
    case ActionTypes.NEARBY_STORES_SUCCESS: {
      const actionObj: GetNearbyStoresAction = action;
      return new NearbyStoresRecord({
        stores: [...actionObj.payload],
      });
    }
    case ActionTypes.NEARBY_STORES_FAILURE: {
      const actionObj: RequestErrorFSA = action;
      return new NearbyStoresRecord({
        errorMsg: actionObj.payload.message.toString(),
        stores: state.stores,
      });
    }
    default:
      return state;
  }
};

export default NearbyStoresReducer;
