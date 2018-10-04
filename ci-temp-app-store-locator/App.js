/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import ReduxThunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';
import { I18nextProvider } from 'react-i18next';
import { translate } from 'react-i18next';
import { createStackNavigator } from 'react-navigation';
import transitionConfig from './transitionConfig';
import reducers from './reducers/RootReducer';
import { i18n } from '@vodafone/core-app/i18n';
import { containers } from '@vodafone/core-app/styles';
import routes from './routes.js';

const stateTransformer = state => {
  if (Iterable.isIterable(state)) return state.toJS();
  else return state;
};
const reduxLogger = createLogger({
  collapsed: true,
  stateTransformer,
});

const isDebuggingEnabled = typeof atob !== 'undefined';
const middleware = [
  apiMiddleware,
  ReduxThunk,
  isDebuggingEnabled && reduxLogger,
].filter(Boolean);
const store = createStore(reducers, applyMiddleware(...middleware));

const RootStack = createStackNavigator(routes, {
  initialRouteName: 'Home',
  headerMode: 'none',
  transitionConfig,
});

interface Props {}

class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <RootStack />
        </I18nextProvider>
      </Provider>
    );
  }
}

export default App;
