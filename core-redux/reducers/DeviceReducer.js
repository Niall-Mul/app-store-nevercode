/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Action } from 'redux';
import { ActionTypes } from '../actions/DeviceActions';
import { DeviceRecord } from '../constants/DeviceImmutables';

interface DeviceAction extends Action {
  type:
    | typeof ActionTypes.DEVICE_CHARACTERISTICS
    | typeof ActionTypes.CHANGE_ORIENTATION;
  payload: DeviceRecord;
}

const DeviceReducer = (
  state: DeviceRecord = new DeviceRecord(),
  action: Action,
): DeviceRecord => {
  const { type } = action;
  switch (type) {
    case ActionTypes.DEVICE_CHARACTERISTICS: {
      const actionObj: DeviceAction = action;
      return actionObj.payload;
    }
    case ActionTypes.CHANGE_ORIENTATION: {
      const actionObj: DeviceAction = action;
      return actionObj.payload;
    }
    default:
      return state;
  }
};

export default DeviceReducer;
