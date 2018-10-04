/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import i18n from 'i18next';
import i18nLocaleDetector from './i18nLocaleDetector';
import i18nLocales from '@vodafone/core-redux/i18nLocales';

i18n.use(i18nLocaleDetector).init(i18nLocales);

export default i18n;
