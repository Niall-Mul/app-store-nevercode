/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import keyMirror from 'key-mirror';
import { DeviceRecord } from '../constants/DeviceImmutables';
import {
  isPortraitDevice,
  isLandscapeDevice,
  isDesktopDevice,
  isTabletDevice,
  isPhoneDevice,
  // $FlowFixMe
} from './Device';

const ActionTypes = keyMirror({
  DEVICE_CHARACTERISTICS: null,
  CHANGE_ORIENTATION: null,
});

const DeviceActions = {
  ActionTypes,
  getDeviceCharacteristics(): Function {
    return (dispatch: Function): void => {
      const isPortrait = isPortraitDevice();
      const isLandscape = isLandscapeDevice();
      const isDesktop = isDesktopDevice();
      const isTablet = isTabletDevice();
      const isPhone = isPhoneDevice();
      dispatch({
        type: ActionTypes.DEVICE_CHARACTERISTICS,
        payload: new DeviceRecord({
          isPortrait,
          isLandscape,
          isDesktop,
          isTablet,
          isPhone,
        }),
      });
    };
  },
  changeOrientation(): Function {
    return (dispatch: Function): void => {
      const isPortrait = isPortraitDevice();
      const isLandscape = isLandscapeDevice();
      const isDesktop = isDesktopDevice();
      const isTablet = isTabletDevice();
      const isPhone = isPhoneDevice();
      dispatch({
        type: ActionTypes.CHANGE_ORIENTATION,
        payload: new DeviceRecord({
          isPortrait,
          isLandscape,
          isDesktop,
          isTablet,
          isPhone,
        }),
      });
    };
  },
};

export { DeviceActions, ActionTypes };
