/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Redirect } from 'react-router';
import { Route, withRouter } from 'react-router-dom';

import CarInsuranceSubmitClaimPage from './pages/insurances/car/CarInsuranceSubmitClaimPage';

import {
  Dashboard,
  MyInsuranceProfilePage,
  PlaceholderSFC,
  LoginPage,
  Logout,
  InsurancePage,
  InsuranceAmend,
  InsuranceRenewal,
  InsuranceRenew,
  InsuranceClaims,
  InsuranceMakeAClaim,
  CarInsuranceQuote,
  CarInsuranceAddDriver,
  CarInsuranceDriverDetails,
  InsuranceManage,
  HomeInsuranceQuote,
  TravelInsuranceQuote,
  QuoteDetailsPage,
  MenuNavLink,
  QuotePayment,
  PaymentConfirmation,
  PaymentDocumentsPage,
  QuoteDetailsExpandedPage,
} from '@vodafone/core-web/boi';

import {
  Header,
  Image,
  Container,
  Menu,
  Icon,
  Sidebar,
  Segment,
  Responsive,
  Button,
} from 'semantic-ui-react';

import './App.css';

interface Props {
  logo?: string;
  className?: string;
  basePath: string;
  history: any;
}

interface State {
  visible: boolean;
}

const menuItems = [
  {
    link: '/home',
    text: 'Home',
    icon: 'home',
  },
  {
    link: '#',
    text: 'My Account',
  },
  {
    link: '#',
    text: 'Manage my Policy',
  },
  {
    link: '/my-insurance',
    text: 'My insurance profile',
  },
  {
    link: '/logout',
    text: 'Logout',
  },
  {
    link: '#',
    text: 'Help',
  },
];

class App extends React.Component<Props, State> {
  state = {
    visible: false,
  };

  handleToggle = () => {
    this.setState({ visible: !this.state.visible });
  };

  handleSidebarHide = () => {
    this.setState({ visible: false });
  };

  handleGoBack = () => {
    this.props.history.goBack();
  };

  render() {
    const menuOptions = menuItems.map((item, index) => (
      <Menu.Item
        key={index}
        as={MenuNavLink}
        to={item.link != '#' ? (this.props.basePath + item.link) : '#'}
        onClick={this.handleSidebarHide}
        className="menuItem"
      >
        {item.icon ? (
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Icon name={item.icon} color="grey" />
          </Responsive>
        ) : null}
        {item.text}
      </Menu.Item>
    ));

    const isHomePage = /^\/wallet\/home\/?$/.test(this.props.history.location.pathname);

    return (
      <div
        className={
          'appContainer' +
          (this.props.className ? ' ' + this.props.className : '')
        }
      >
        <Sidebar.Pushable
          as={Segment}
          style={this.state.visible ? { overflowY: 'hidden' } : {}}
        >
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            onHide={this.handleSidebarHide}
            vertical
            visible={this.state.visible}
            width="wide"
            direction="right"
          >
            <Menu.Item className="menuItem menuTitle">Menu</Menu.Item>
            {menuOptions}
            {/* <Menu.Item className="menuItem menuImage">
              <Image src={'/assets/bank_of_ireland-logo.png'} />
            </Menu.Item> */}
          </Sidebar>

          <Sidebar.Pusher dimmed={this.state.visible}>
            {this.props.history.location.pathname !== '/wallet' &&
              this.props.history.location.pathname !== '/wallet/' ? (
                <Header
                  attached="top"
                  as="h1"
                  className={
                    this.props.history.location.pathname !== '/wallet/'
                      ? 'main'
                      : 'main small'
                  }
                >
                  <Container>
                    {isHomePage ? null : (
                      <Responsive
                        as={Segment}
                        {...Responsive.onlyMobile}
                        className="headerBackButton"
                      >
                        <a href="#" onClick={this.handleGoBack}>
                          <Icon name="arrow left" size="large"></Icon>
                        </a>
                      </Responsive>
                    )}
                    <Image src={this.props.logo} className="headerLogo" />
                    <span className="text">Insurance Wallet</span>
                    <Responsive
                      as={Segment}
                      {...Responsive.onlyMobile}
                      className="collapseMenu"
                    >
                      <Button
                        onClick={this.handleToggle}
                        className="collapseMenuButton"
                      >
                        <Icon name="bars" className="collapseMenuIcon" />
                      </Button>
                    </Responsive>
                  </Container>
                  {this.props.history.location.pathname !== '/wallet/' ? (
                    <Responsive
                      as={Segment}
                      minWidth={Responsive.onlyTablet.minWidth}
                      style={{
                        padding: 0,
                        margin: 0,
                        border: 0,
                      }}
                    >
                      <Menu borderless className="mainMenu">
                        <Container>{menuOptions}</Container>
                      </Menu>
                    </Responsive>
                  ) : null}
                </Header>
              ) : null}

            <main>
              <Route
                exact
                path="/"
                render={() => <Redirect to={this.props.basePath} />}
              />
              <Route
                exact
                path={this.props.basePath}
                render={() => (
                  <LoginPage
                    className="SP-LoginPage"
                    basePath={this.props.basePath}
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/logout'}
                render={() => <Logout />}
              />
              <Route
                exact
                path={this.props.basePath + '/home'}
                render={() => (
                  <Dashboard
                    className="SP-PageContent"
                    basePath={this.props.basePath}
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/my-insurance'}
                render={() => (
                  <MyInsuranceProfilePage
                    label="My insurance profile"
                    className="SP-PageContent"
                    basePath={this.props.basePath}
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/help'}
                render={() => (
                  <PlaceholderSFC
                    label="Contact Us"
                    className="SP-PageContent"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/settings'}
                render={() => (
                  <PlaceholderSFC label="Settings" className="SP-PageContent" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance'}
                render={() => (
                  <InsurancePage className="SP-InsurancePage" quoteType="car" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/renewal'}
                render={() => (
                  <InsuranceRenewal className="SP-InsurancePage" quoteType="car" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/amend'}
                render={() => (
                  <InsuranceAmend className="SP-InsurancePage" quoteType="car" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/manage'}
                render={() => (
                  <InsuranceManage className="SP-InsurancePage" quoteType="car" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/manage/renew'}
                render={() => (
                  <InsuranceRenew className="SP-InsurancePage" quoteType="car" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/amend/driver-details'}
                render={() => (
                  <CarInsuranceDriverDetails className="SP-InsurancePage" quoteType="car" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/amend/driver-details/add-driver'}
                render={() => (
                  <CarInsuranceAddDriver className="SP-InsurancePage" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/quotes'}
                render={() => (
                  <CarInsuranceQuote className="SP-InsurancePage" quoteType="car" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/manage/claims'}
                render={() => (
                  <InsuranceClaims className="SP-InsurancePage" quoteType="car" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/make-a-claim'}
                render={() => (
                  <InsuranceMakeAClaim className="SP-InsurancePage" quoteType="car" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/submit-claim'}
                render={() => <CarInsuranceSubmitClaimPage />}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/quote-results'}
                render={() => (
                  <QuoteDetailsPage
                    label="Quote Results"
                    className="SP-PageContent"
                    quoteType="car"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/expanded'}
                render={() => (
                  <QuoteDetailsExpandedPage
                    className="SP-PageContent"
                    quoteType="car"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/renewal/quote-results'}
                render={() => (
                  <QuoteDetailsPage
                    label="Quote Results"
                    className="SP-PageContent"
                    quoteType="carRenewal"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/renewal/expanded'}
                render={() => (
                  <QuoteDetailsExpandedPage
                    className="SP-PageContent"
                    quoteType="carRenewal"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/renewal/payment'}
                render={() => <QuotePayment className="SP-PageContent" />}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/renewal/confirm'}
                render={() => (
                  <PaymentConfirmation className="SP-PageContent" quoteType="carRenewal" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/payment'}
                render={() => <QuotePayment className="SP-PageContent" />}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/confirm'}
                render={() => (
                  <PaymentConfirmation className="SP-PageContent" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/car-insurance/documents'}
                render={() => (
                  <PaymentDocumentsPage
                    className="SP-PageContent"
                    quoteType="car"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/travel-insurance'}
                render={() => (
                  <InsurancePage
                    className="SP-InsurancePage"
                    quoteType="travel"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/travel-insurance/quotes'}
                render={() => (
                  <TravelInsuranceQuote className="SP-InsurancePage" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/travel-insurance/manage'}
                render={() => (
                  <InsuranceManage className="SP-InsurancePage" quoteType="travel" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/travel-insurance/quote-results'}
                render={() => (
                  <QuoteDetailsPage
                    label="Quote Results"
                    className="SP-PageContent"
                    quoteType="travel"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/travel-insurance/expanded'}
                render={() => (
                  <QuoteDetailsExpandedPage
                    className="SP-PageContent"
                    quoteType="travel"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/travel-insurance/payment'}
                render={() => <QuotePayment className="SP-PageContent" />}
              />
              <Route
                exact
                path={this.props.basePath + '/travel-insurance/confirm'}
                render={() => (
                  <PaymentConfirmation className="SP-PageContent" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/travel-insurance/documents'}
                render={() => (
                  <PaymentDocumentsPage
                    className="SP-PageContent"
                    quoteType="travel"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/pet-insurance'}
                render={() => (
                  <PlaceholderSFC
                    label="Pet Insurance"
                    className="SP-PageContent"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/home-insurance'}
                render={() => (
                  <InsurancePage
                    className="SP-InsurancePage"
                    quoteType="home"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/home-insurance/quotes'}
                render={() => (
                  <HomeInsuranceQuote className="SP-InsurancePage" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/home-insurance/quote-results'}
                render={() => (
                  <QuoteDetailsPage
                    label="Quote Results"
                    className="SP-PageContent"
                    quoteType="home"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/home-insurance/expanded'}
                render={() => (
                  <QuoteDetailsExpandedPage
                    className="SP-PageContent"
                    quoteType="home"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/home-insurance/payment'}
                render={() => <QuotePayment className="SP-PageContent" />}
              />
              <Route
                exact
                path={this.props.basePath + '/home-insurance/confirm'}
                render={() => (
                  <PaymentConfirmation className="SP-PageContent" />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/home-insurance/documents'}
                render={() => (
                  <PaymentDocumentsPage
                    className="SP-PageContent"
                    quoteType="home"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/health-insurance'}
                render={() => (
                  <PlaceholderSFC
                    label="Health Insurance"
                    className="SP-PageContent"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/life-insurance'}
                render={() => (
                  <PlaceholderSFC
                    label="Life Insurance"
                    className="SP-PageContent"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/van-insurance'}
                render={() => (
                  <PlaceholderSFC
                    label="Van Insurance"
                    className="SP-PageContent"
                  />
                )}
              />
              <Route
                exact
                path={this.props.basePath + '/business-insurance'}
                render={() => (
                  <PlaceholderSFC
                    label="Business Insurance"
                    className="SP-PageContent"
                  />
                )}
              />
            </main>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default withRouter(App);
