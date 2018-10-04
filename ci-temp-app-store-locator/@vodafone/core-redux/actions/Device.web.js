/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

const isPortraitDevice = () => {
  return window.innerHeight >= window.innerWidth;
};

const isLandscapeDevice = () => {
  return !isPortraitDevice();
};

const isDesktopDevice = () => {
  return !isTabletDevice() && !isPhoneDevice();
};

const isTabletDevice = () => {
  return navigator.userAgent.match(/iPad/i) !== null;
};

const isPhoneDevice = () => {
  return (
    navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i,
    ) !== null
  );
};

export {
  isPortraitDevice,
  isLandscapeDevice,
  isDesktopDevice,
  isTabletDevice,
  isPhoneDevice,
};
