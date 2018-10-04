/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 */

import idx from 'idx';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ReduxThunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';
import * as serviceWorker from './serviceWorker';

// import registerServiceWorker from './registerServiceWorker';

import AppB365 from '@vodafone/core-web/components/b365/App';

import App from './App';
import { CounterComp } from '@vodafone/core-web/boi';
import { logger } from '@vodafone/core-redux/lib/ConnxLogger';
import reducers from './reducers/RootReducer';

// import './semantic/build/singlepoint.min.css';
import './semantic/build/boi.min.css';
// import './index.css';

const stateTransformer = state => {
  if (Iterable.isIterable(state)) return state.toJS();
  else return state;
};
const reduxLogger = createLogger({
  collapsed: true,
  stateTransformer,
});

// const history = createHistory();
const middleware = [apiMiddleware, ReduxThunk, reduxLogger];
const store = createStore(reducers, applyMiddleware(...middleware));

const urlPrefix = idx(process.env, _ => _.REACT_APP_ASSETS_URL_PREFIX) || '';
const theme = idx(process.env, _ => _.REACT_APP_THEME) || '';
const prefix = urlPrefix + theme + '/';

// declare global {
//   interface Window {
//     RenderInsuranceWallet: (id: string, basePath: string) => void;
//     RenderCounter: (id: string) => void;
//   }
// }

function RenderInsuranceWallet(id: string, basePath: string): void {
  logger.debug('RenderInsuranceWallet ' + id + ' ' + basePath);
  if (!document.getElementById(id)) {
    console.warn('Element ' + id + ' not found');
    return;
  }
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App logo={prefix + 'assets/logo.png'} basePath={basePath} />
      </BrowserRouter>
    </Provider>,
    document.getElementById(id),
  );
}
window.RenderInsuranceWallet = RenderInsuranceWallet || {};


function RenderB365(id: string, basePath: string): void {
  logger.debug('Rendering B365');

  var assetPath = prefix + 'assets';

  ReactDOM.render(
    <BrowserRouter>
      <AppB365 logo={assetPath + '/logo.png'} assetPath={assetPath} basePath={basePath}/>
    </BrowserRouter>,
  document.getElementById(id));
}

window.RenderB365 = RenderB365 || {};

function RenderCounter(id: string): void {
  logger.debug('RenderCounter ' + id);
  if (!document.getElementById(id)) {
    console.warn('Element ' + id + ' not found');
    return;
  }
  ReactDOM.render(
    <Provider store={store}>
      <CounterComp />
    </Provider>,
    document.getElementById(id),
  );
}
window.RenderCounter = RenderCounter || {};


var isB356 = window.location.pathname.indexOf('/b365') == 0;

if (isB356) {
  RenderB365('root', '/b365');
} else {
  const scripts = document.getElementsByTagName('script');
  logger.debug('Parsing script tags');
  for (var i = 0; i < scripts.length; i++) {
    logger.debug('Parsing script: ' + scripts[i].src);
    if (
      scripts[i].src.indexOf('/bundle.js') > -1 ||
      scripts[i].src.indexOf('/main.') > -1
    ) {
      logger.debug('Parsing bundle script: ' + scripts[i].src);
      if (scripts[i].src.indexOf('drupal') <= -1) {
        logger.debug('Rendering in headless React');
        RenderInsuranceWallet('root', '/wallet');
      }
      break;
    }
  }
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
