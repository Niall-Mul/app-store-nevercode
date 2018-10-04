/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Dimensions, PixelRatio, Platform } from 'react-native';

const msp = (dim, limit) => {
  return dim.scale * dim.width >= limit || dim.scale * dim.height >= limit;
};

const isPortraitDevice = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

const isLandscapeDevice = () => {
  return !isPortraitDevice();
};

const isTabletDevice = () => {
  const windowSize = Dimensions.get('window');
  const pixelDensity = PixelRatio.get();
  const width = windowSize.width;
  const height = windowSize.height;
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;
  if (
    PixelRatio.get() < 2 &&
    (adjustedWidth >= 1000 || adjustedHeight >= 1000)
  ) {
    return true;
  } else if (
    pixelDensity === 2 &&
    (adjustedWidth >= 1920 || adjustedHeight >= 1920)
  ) {
    return true;
  } else {
    return false;
  }
};

const isDesktopDevice = () => {
  return false;
};

const isPhoneDevice = () => {
  return !isTabletDevice();
};

export {
  isPortraitDevice,
  isLandscapeDevice,
  isDesktopDevice,
  isTabletDevice,
  isPhoneDevice,
};
