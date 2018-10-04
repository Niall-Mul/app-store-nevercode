/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';
import { I18nextProvider } from 'react-i18next';

import { GoogleMapContainer } from '@vodafone/core-web';
import reducers from './reducers/RootReducer';
import { i18n } from '@vodafone/core-web/i18n';

const stateTransformer = state => {
  if (Iterable.isIterable(state)) return state.toJS();
  else return state;
};
const reduxLogger = createLogger({
  collapsed: true,
  stateTransformer,
});

const middleware = [apiMiddleware, ReduxThunk, reduxLogger];
const store = createStore(reducers, applyMiddleware(...middleware));

interface Props {}

interface State {
  height: number;
}

class App extends React.Component<Props, State> {
  swimmingSpace: ?HTMLDivElement;

  state = {
    height: 800,
  };

  componentDidMount() {
    const height = this.swimmingSpace ? this.swimmingSpace.clientHeight : 0;
    this.setState({ height });
  }

  render() {
    return (
      <div
        ref={ref => (this.swimmingSpace = ref)}
        style={{
          height: '100%',
        }}
      >
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <GoogleMapContainer
              isMarkerShown={true}
              height={this.state.height}
            />
          </I18nextProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
