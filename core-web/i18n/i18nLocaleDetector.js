/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 */

function getQueryVariable(queryString: string, param: string) {
  let queryParams = {};
  let pairs = (queryString[0] === '?'
    ? queryString.substr(1)
    : queryString
  ).split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    queryParams[decodeURIComponent(pair[0])] = decodeURIComponent(
      pair[1] || '',
    );
  }
  return queryParams[param] ? queryParams[param] : null;
}

function locale() {
  let langRegionLocale = 'en_UK'; // el_GR
  let cmsLanguageObtained = false;
  const scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
    const locale = getQueryVariable(scripts[i].src, 'locale');
    if (locale) {
      langRegionLocale = locale;
      cmsLanguageObtained = true;
      break;
    }
  }
  if (cmsLanguageObtained !== true) {
    langRegionLocale =
      window.navigator.userLanguage || window.navigator.language || 'en_IE';
  }
  let languageLocale = langRegionLocale.toString().replace(/_/, '-');
  languageLocale = languageLocale === 'gr' ? 'el-GR' : languageLocale;
  return languageLocale;
}

export default {
  init: Function.prototype,
  type: 'languageDetector',
  detect: () => locale(),
  cacheUserLanguage: Function.prototype,
};
