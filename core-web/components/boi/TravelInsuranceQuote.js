/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import {
  QuoteRequest,
  InsuranceQuoteActions,
  QuoteTypes,
} from '@vodafone/core-redux/actions/boi/InsuranceQuoteActions';
import AccordionCard from '../AccordionCard';
import { AuthenticationStatus } from '@vodafone/core-redux/constants/boi/AuthenticationImmutables';
import { QuoteResults } from '@vodafone/core-redux/constants/boi/InsuranceQuoteImmutables';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { DestinationOptions, CoverOptions } from '../../mocks/travelQuote';
import {
  UserPreferencesQueryRequest,
  UserPreferencesActions,
} from '@vodafone/core-redux/actions/boi/UserPreferencesActions';
import {
  UserPreferences,
  PersonalDetails,
} from '@vodafone/core-redux/constants/boi/UserPreferencesImmutables';
import PersonalDetailsAccordion from './PersonalDetailsAccordion';

const { getUserDetails, updateUserDetails } = UserPreferencesActions;
const { requestQuote } = InsuranceQuoteActions;

interface State {
  personalDetails: PersonalDetails;
  destination: string;
  departureDate: string;
  travelers: number;
  adults: number;
  children: number;
  cover: string;
  winter: boolean;
  water: boolean;
  golf: boolean;
  business: boolean;
}

interface StateProps {
  authenticationStatus: AuthenticationStatus;
  userPreferences: UserPreferences;
  quoteResults: QuoteResults;
  history: any;
}
interface DispatchProps {
  requestQuote: (params: QuoteRequest) => any;
  getUserDetails: (params: UserPreferencesQueryRequest) => any;
  updateUserDetails: (accountId: string, params: PersonalDetails) => any;
}
export interface Props extends StateProps, DispatchProps {}

const mapStateToProps = (
  state: any,
  ownProps: any,
): {
  authenticationStatus: AuthenticationStatus,
  quoteResults: QuoteResults,
  userPreferences: UserPreferences,
} => {
  return {
    authenticationStatus: state.AuthenticationReducer,
    quoteResults: state.InsuranceQuoteReducer,
    userPreferences: state.UserPreferencesReducer,
  };
};

const mapDispatchToProps = {
  requestQuote,
  getUserDetails,
  updateUserDetails,
};

class TravelInsuranceQuote extends React.Component<Props, State> {
  state = {
    personalDetails: new PersonalDetails(),
    destination: '',
    departureDate: '',
    travelers: 0,
    adults: 0,
    children: 0,
    cover: '',
    winter: false,
    water: false,
    golf: false,
    business: false,
  };

  componentDidMount = () => {
    this.initializePersonalDetails();
  };

  initializePersonalDetails = () => {
    const { personalDetails } = this.props.userPreferences;
    this.setState({ personalDetails: personalDetails });
  };

  handleChange = (key: any, value: any) => {
    const propName: any = key;
    this.setState({ [propName]: value });
  };

  onPersonalDetailChange = (key: any, value: any) => {
    const { personalDetails } = this.state;
    const newPersonalDetails = { ...personalDetails, [key]: value };
    this.setState({ personalDetails: newPersonalDetails });
  };

  handleSubmit = () => {
    const { personalDetails } = this.state;
    this.props.updateUserDetails(
      this.props.authenticationStatus.user.accountId,
      personalDetails,
    );
    this.props.history.push('/wallet/travel-insurance/quote-results');
  };

  render() {
    const { authenticationStatus, quoteResults } = this.props;
    const {
      personalDetails,
      destination,
      departureDate,
      travelers,
      adults,
      children,
      cover,
      winter,
      water,
      golf,
      business,
    } = this.state;

    const success = quoteResults.quoteReturned ? true : false;
    const error = quoteResults.errorMsg ? true : false;

    if (quoteResults.quoteReturned) {
      return <Redirect to="./quote-results" />;
    }

    const aboutYouCompleted =
      personalDetails.firstName &&
      personalDetails.lastName &&
      personalDetails.eircode &&
      personalDetails.mobileNumber &&
      personalDetails.emailAddress &&
      personalDetails.dateOfBirth
        ? true
        : false;
    const aboutYourTripCompleted =
      destination && departureDate && travelers ? true : false;
    const aboutYourTripAccordion = [
      {
        dataType: 'selectBox',
        label: 'Destination',
        options: DestinationOptions,
        value: this.state.destination,
        name: 'destination',
      },
      {
        dataType: 'date',
        label: 'Departure date',
        value: this.state.departureDate,
        name: 'departureDate',
      },
      {
        dataType: 'number',
        label: 'Number of people traveling',
        value: this.state.travelers,
        name: 'travelers',
        min: 1,
        max: 10,
      },
    ];
    const aboutYourCoverCompleted = cover ? true : false;
    const aboutYourCoverAccordion = [
      {
        dataType: 'selectBox',
        label: 'Type of cover',
        options: CoverOptions,
        value: this.state.cover,
        name: 'cover',
      },
      {
        dataType: 'toggle',
        label: 'Winter',
        checked: this.state.winter,
        name: 'winter',
      },
      {
        dataType: 'toggle',
        label: 'Water',
        checked: this.state.water,
        name: 'water',
      },
      {
        dataType: 'toggle',
        label: 'Golf',
        checked: this.state.golf,
        name: 'golf',
      },
      {
        dataType: 'toggle',
        label: 'Business',
        checked: this.state.business,
        name: 'business',
      },
    ];

    return (
      <Container textAlign="center" className="SP-PageContent quoteContainer">
        <Header as="h5" className="quoteTitle detailsPage">
          Please submit your details for a quote
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <PersonalDetailsAccordion
            completed={aboutYouCompleted}
            onPersonalDetailChange={(name, value) =>
              this.onPersonalDetailChange(name, value)
            }
            personalDetails={personalDetails}
            quoteType="travel"
          />
          <AccordionCard
            cardSubtitle="Please answer these remaining questions"
            title="Your Trip"
            active={true}
            completed={aboutYourTripCompleted}
            fields={aboutYourTripAccordion}
            handleChange={(name, value) => this.handleChange(name, value)}
          />
          <AccordionCard
            cardSubtitle="Please answer these remaining questions"
            title="Your Cover"
            active={true}
            completed={aboutYourCoverCompleted}
            fields={aboutYourCoverAccordion}
            handleChange={(name, value) => this.handleChange(name, value)}
          />
          <Form.Button
            primary
            fluid
            size="huge"
            content="Get covered"
            className="defaultButton blueBackground"
            disabled={
              !aboutYouCompleted ||
              !aboutYourTripCompleted ||
              !aboutYourCoverCompleted
            }
          />
        </Form>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(TravelInsuranceQuote));
