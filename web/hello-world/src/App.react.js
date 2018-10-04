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
import { Responsive, Header, Container, Card } from 'semantic-ui-react';

import {
  CounterContainer,
  HelloApiContainer,
  NearbyStoresContainer,
} from '@vodafone/core-web';
import reducers from './reducers/RootReducer';

import reactLogo from './logo.svg';
import reduxLogo from './redux.svg';

import './App.css';

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

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Header attached="top" as="h1" className="App-header-bar">
          <Responsive maxWidth={Responsive.onlyComputer.minWidth}>
            <img
              src={'/themes/vodafone/assets/Vodafone.png'}
              className="App-logo"
              alt="Vodafone"
            />
            {'Hello World'}
            <img
              src={'/themes/vodafone/assets/logos.png'}
              className="App-logos"
              alt="Vodafone"
            />
          </Responsive>
          <Responsive minWidth={Responsive.onlyComputer.minWidth}>
            <img
              src={'/themes/vodafone/assets/Vodafone.png'}
              className="App-logo"
              alt="Vodafone"
            />
            {'Hello World'}
            <div style={{ float: 'right' }}>
              <img src={reactLogo} className="App-react-logo" alt="React" />
              <img src={reduxLogo} className="App-redux-logo" alt="Redux" />
              <img
                src={'/themes/vodafone/assets/nodejs.png'}
                className="App-nodejs-logo"
                alt="Redux"
              />
            </div>
          </Responsive>
        </Header>
        <Container textAlign="left" className="App-content">
          <Card.Group>
            <Card>
              <Card.Content>
                <Card.Header content="Counter" />
                <Card.Meta content="Redux Counter" />
                <Card.Description>
                  <CounterContainer />
                </Card.Description>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Card.Header content="API" />
                <Card.Meta content="Spring Boot API" />
                <Card.Description>
                  <HelloApiContainer />
                </Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
        </Container>
      </div>
    </Provider>
  );
};

export default App;
