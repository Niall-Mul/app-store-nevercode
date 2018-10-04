/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Record } from 'immutable';

const DeviceRecord = Record(
  ({
    isPortrait: true,
    isLandscape: false,
    isDesktop: true,
    isTablet: false,
    isPhone: false,
  }: {
    isPortrait: boolean,
    isLandscape: boolean,
    isDesktop: boolean,
    isTablet: boolean,
    isPhone: boolean,
  }),
);

export { DeviceRecord };
