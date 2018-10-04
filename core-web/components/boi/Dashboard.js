/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import idx from 'idx';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  Header,
  Image,
  Grid,
  Responsive,
  Label,
} from 'semantic-ui-react';
import { AuthenticationStatus } from '@vodafone/core-redux/constants/boi/AuthenticationImmutables';
import { UserPreferences } from '@vodafone/core-redux/constants/boi/UserPreferencesImmutables';
import {
  UserPreferencesQueryRequest,
  UserPreferencesActions,
} from '@vodafone/core-redux/actions/boi/UserPreferencesActions';
import { logger } from '@vodafone/core-redux/lib/ConnxLogger';
import MenuCard from '../MenuCard.react';

interface StateProps {
  authenticationStatus: AuthenticationStatus;
  userDetails: UserPreferences;
  className?: string;
  basePath: string;
}
interface DispatchProps {}
export interface Props extends StateProps, DispatchProps {}

const mapStateToProps = (
  state: any,
  ownProps: any,
): {
  authenticationStatus: AuthenticationStatus,
  userDetails: UserPreferences,
} => {
  return {
    authenticationStatus: state.AuthenticationReducer,
    userDetails: state.UserPreferencesReducer,
  };
};
const mapDispatchToProps = {};

const cardItems = [
  {
    label: 'Car',
    image: 'assets/car',
    redirectTo: '/car-insurance',
    enabled: true,
  },
  {
    label: 'Travel',
    image: 'assets/travel',
    redirectTo: '/travel-insurance',
    enabled: true,
  },
  {
    label: 'Home',
    image: 'assets/home',
    redirectTo: '/home-insurance',
    enabled: true,
  },
  {
    label: 'Pet',
    image: 'assets/pet',
    redirectTo: '/pet-insurance',
    enabled: true,
  },
  {
    label: 'Health',
    image: 'assets/health',
    redirectTo: '/health-insurance',
    enabled: false,
  },
  {
    label: 'Life',
    image: 'assets/life',
    redirectTo: '/life-insurance',
    enabled: true,
  },
  {
    label: 'Van',
    image: 'assets/van',
    redirectTo: '/van-insurance',
    enabled: true,
  },
  {
    label: 'Business',
    image: 'assets/business',
    redirectTo: '/business-insurance',
    enabled: true,
  },
  {
    label: 'Pensions',
    image: 'assets/pensions',
    redirectTo: '/pensions',
    enabled: false,
  },    
  {
    label: 'Savings & Investments',
    image: 'assets/savings',
    redirectTo: '/savings',
  },   
];

class Dashboard extends React.Component<Props> {
  render() {
    const urlPrefix =
      idx(process.env, _ => _.REACT_APP_ASSETS_URL_PREFIX) || '';
    const theme = idx(process.env, _ => _.REACT_APP_THEME) || '';
    const prefix = urlPrefix + theme + '/';
    const {
      authenticationStatus,
      className,
      basePath,
      userDetails,
    } = this.props;

    return (
      <div className={className}>
        <Container textAlign="left">
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Header as="h1" style={{ color: '#0486b0', fontSize: 24 }}>
              My Insurance Wallet
            </Header>
            {authenticationStatus.authenticated &&
            userDetails.personalDetails ? (
              <p>Welcome {userDetails.personalDetails.firstName}</p>
            ) : (
              ''
            )}
          </Responsive>
          <Responsive maxWidth={Responsive.onlyTablet.minWidth}>
            <Label
              size="large"
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                textAlign: 'center',
                padding: 0,
                fontWeight: 300,
              }}
            >
              {authenticationStatus.authenticated && userDetails.personalDetails
                ? `Welcome ${userDetails.personalDetails.firstName}`
                : 'Welcome !'}
            </Label>
            <Label
              size="medium"
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                textAlign: 'center',
                padding: 0,
                fontWeight: 300,
              }}
            >
              Tap an icon to begin populating your wallet.
            </Label>
          </Responsive>
          <Grid style={{ marginTop: 0 }}>
            {cardItems.map((item, index) => {
              return (
                <Grid.Column
                  key={index}
                  mobile={8}
                  tablet={4}
                  computer={3}
                  className="dashboardColumn"
                >
                  <MenuCard
                    label={item.label}
                    image={item.image}
                    redirectTo={item.redirectTo}
                    basePath={basePath}
                    enabled={item.enabled}
                  />
                </Grid.Column>
              );
            })}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
