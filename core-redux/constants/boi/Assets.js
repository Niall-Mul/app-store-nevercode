/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import idx from 'idx';

const urlPrefix = idx(process.env, _ => _.REACT_APP_ASSETS_URL_PREFIX) || '';
const theme = idx(process.env, _ => _.REACT_APP_THEME) || '';
const assetsUriPrefix = urlPrefix + theme + '/';

export { assetsUriPrefix };
