/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Dimensions } from 'react-native';

export const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};
