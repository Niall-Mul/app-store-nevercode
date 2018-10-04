/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Container, Header, Image } from 'semantic-ui-react';

import HomePage from './HomePage';
import SecureLoginPage from './SecureLoginPage';
import YourAccountPage from './YourAccountsPage';


interface Props {
  assetPath: string;
  basePath: string;
  logo: string;
  history: any;
}

class AppB365 extends React.Component<Props> {
  render() {
    let { basePath, logo } = this.props;

    return (
      <div className="appContainer">
        <Header attached="top" as="h1" className={'main b365-header'}>
          <Container textAlign="center">
            <Image src={logo} className="headerLogo" />
          </Container>
        </Header>

        <main>
          <Route exact path={basePath} render={() => <HomePage {...this.props} />} />
          <Route exact path={`${basePath}/secure-login`} render={() => <SecureLoginPage {...this.props} />} />
          <Route exact path={`${basePath}/your-accounts`} render={() => <YourAccountPage {...this.props} />} />
        </main>
      </div>
    );
  }
}


export default withRouter(AppB365);
