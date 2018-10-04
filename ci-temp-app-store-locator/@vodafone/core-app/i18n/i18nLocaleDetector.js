/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import idx from 'idx';
import { NativeModules } from 'react-native';
import { Platform } from 'react-native';

function locale() {
  let langRegionLocale = 'en_UK'; // el_GR
  if (Platform.OS === 'android') {
    const androidLocale = idx(
      NativeModules,
      _ => _.I18nManager.localeIdentifier,
    );
    langRegionLocale = androidLocale ? androidLocale : langRegionLocale;
  } else if (Platform.OS === 'ios') {
    const iosLocale = idx(
      NativeModules,
      _ => _.SettingsManager.settings.AppleLocale,
    );
    langRegionLocale = iosLocale ? iosLocale : langRegionLocale;
  }
  let languageLocale = langRegionLocale.toString().replace(/_/, '-');
  return languageLocale;
}

export default {
  init: Function.prototype,
  type: 'languageDetector',
  detect: () => locale(),
  cacheUserLanguage: Function.prototype,
};
