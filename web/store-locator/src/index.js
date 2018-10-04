/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.react';
import * as serviceWorker from './serviceWorker';
// eslint-disable-next-line
import { vodafoneCoreTheme } from '@vodafone/core-web-css';

function RenderVodafoneStoreLocator(id: string): void {
  console.log('RenderVodafoneStoreLocator in ' + id);
  const div = document.getElementById(id);
  if (div) {
    ReactDOM.render(<App />, div);
  } else {
    console.error('Div with ID ""' + id + '"" was not found');
  }
}
window.RenderVodafoneStoreLocator = RenderVodafoneStoreLocator || {};

const scripts = document.getElementsByTagName('script');
console.log('Parsing script tags');
let cms = true;
for (var i = 0; i < scripts.length; i++) {
  console.log('Parsing script: ' + scripts[i].src);
  if (
    scripts[i].src.indexOf('/bundle.js') > -1 ||
    scripts[i].src.indexOf('/main.') > -1
  ) {
    console.log('Parsing bundle script: ' + scripts[i].src);
    if (scripts[i].src.indexOf('cms') <= -1) {
      console.log('Rendering in headless React');
      cms = false;
      RenderVodafoneStoreLocator('root');
    }
    break;
  }
}
if (cms === true) {
  console.log('Rendering in CMS');
  RenderVodafoneStoreLocator('vodafone-root');
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
