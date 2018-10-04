/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { Form, Container, Header } from 'semantic-ui-react';
import {
  QuoteRequest,
  InsuranceQuoteActions,
} from '@vodafone/core-redux/actions/boi/InsuranceQuoteActions';
import AccordionCard from '../AccordionCard';
import { AuthenticationStatus } from '@vodafone/core-redux/constants/boi/AuthenticationImmutables';
import { QuoteResults } from '@vodafone/core-redux/constants/boi/InsuranceQuoteImmutables';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import {
  UserPreferencesQueryRequest,
  UserPreferencesActions,
} from '@vodafone/core-redux/actions/boi/UserPreferencesActions';
import {
  UserPreferences,
  PersonalDetails,
} from '@vodafone/core-redux/constants/boi/UserPreferencesImmutables';
import {
  CoverTypeOptions,
  AlarmTypeOptions,
  Occupations,
  HouseTypeOptions,
  ClaimsFreeOptions,
  EmploymentStatusOptions,
  NumberOfBedroomOptions,
} from '../../mocks/homeQuote';
import PersonalDetailsAccordion from './PersonalDetailsAccordion';

const { getUserDetails, updateUserDetails } = UserPreferencesActions;
const { requestQuote } = InsuranceQuoteActions;

interface State {
  personalDetails: PersonalDetails;
  yearBuilt?: any;
  coverType?: string;
  alarmType?: string;
  smokeAlarm: boolean;
  neighbourhood: boolean;
  claimsFree: string;
  houseType: string;
  bedrooms: number;
  jointlyOwned: boolean;
  coverStart: string;
  sumInsured: number;
  contentsInsured: number;
  isLoading: boolean;
  results: Object[];
  detailsComplete: boolean;
  homeComplete: boolean;
  coverComplete: boolean;
  optionsComplete: boolean;
  value: any;
  rebuildCost?: number;
  yearsClaimsFree?: string;
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

class HomeInsuranceQuote extends React.Component<Props, State> {
  state = {
    personalDetails: new PersonalDetails(),
    yearBuilt: '',
    coverType: '',
    alarmType: '',
    smokeAlarm: false,
    neighbourhood: false,
    claimsFree: '',
    houseType: '',
    bedrooms: 0,
    jointlyOwned: false,
    coverStart: '',
    sumInsured: 160000,
    contentsInsured: 25000,
    isLoading: false,
    results: [],
    detailsComplete: false,
    homeComplete: false,
    coverComplete: false,
    optionsComplete: false,
    value: '',
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
    const newValue = { ...personalDetails, [key]: value };
    this.setState({ personalDetails: newValue });
  };

  handleSubmit = () => {
    const { personalDetails } = this.state;
    this.props.updateUserDetails(
      this.props.authenticationStatus.user.accountId,
      personalDetails,
    );
    this.props.history.push('/wallet/home-insurance/quote-results');
  };

  render() {
    const { authenticationStatus, quoteResults, userPreferences } = this.props;
    const {
      personalDetails,
      yearBuilt,
      coverType,
      alarmType,
      smokeAlarm,
      neighbourhood,
      claimsFree,
      houseType,
      bedrooms,
      jointlyOwned,
      coverStart,
      sumInsured,
      contentsInsured,
      isLoading,
      results,
      value,
    } = this.state;
    const success = quoteResults.quoteReturned ? true : false;
    const error = quoteResults.errorMsg ? true : false;
    const {
      firstName,
      lastName,
      eircode,
      mobileNumber,
      emailAddress,
      dateOfBirth,
      employmentStatus,
      currentOccupation,
    } = personalDetails;
    const detailsComplete =
      firstName &&
      lastName &&
      eircode &&
      mobileNumber &&
      emailAddress &&
      dateOfBirth &&
      employmentStatus &&
      currentOccupation
        ? true
        : false;
    const homeComplete =
      yearBuilt && coverType && alarmType && claimsFree && houseType
        ? true
        : false;
    const coverComplete =
      coverStart && sumInsured && contentsInsured ? true : false;

    if (quoteResults.quoteReturned) {
      return <Redirect to="./quote-results" />;
    }

    const homeAccordion = [
      {
        dataType: 'number',
        label: 'Year built',
        value: this.state.yearBuilt,
        name: 'yearBuilt',
        max: '2018',
        min: '1920',
      },
      {
        dataType: 'selectBox',
        label: 'Type of cover',
        options: CoverTypeOptions,
        value: this.state.coverType,
        name: 'coverType',
      },
      {
        dataType: 'selectBox',
        label: 'Home security alarm type',
        options: AlarmTypeOptions,
        value: this.state.alarmType,
        name: 'alarmType',
      },
      {
        dataType: 'toggle',
        label: 'Is there a smoke alarm fitted in the house?',
        checked: this.state.smokeAlarm,
        name: 'smokeAlarm',
      },
      {
        dataType: 'toggle',
        label: 'Is the premise in a neighbourhood watch/community alert area?',
        checked: this.state.neighbourhood,
        name: 'neighbourhood',
      },
      {
        dataType: 'selectBox',
        label: 'Your Home Claims History?',
        options: ClaimsFreeOptions,
        value: this.state.claimsFree,
        name: 'claimsFree',
      },
      {
        dataType: 'selectBox',
        label: 'Type of Home',
        options: HouseTypeOptions,
        value: this.state.houseType,
        name: 'houseType',
      },
      {
        dataType: 'selectBox',
        label: 'Number of bedrooms',
        options: NumberOfBedroomOptions,
        value: this.state.bedrooms,
        name: 'bedrooms',
      },
      {
        dataType: 'toggle',
        label: 'Is the property jointly owned?',
        checked: this.state.jointlyOwned,
        name: 'jointlyOwned',
      },
    ];

    const coverAccordion = [
      {
        dataType: 'date',
        label: 'When would you like cover to start',
        value: this.state.coverStart,
        name: 'coverStart',
      },
      {
        dataType: 'number',
        label: 'Buildings SUM insured €',
        value: this.state.sumInsured,
        name: 'sumInsured',
        max: '1000000',
        min: '160000',
      },
      {
        dataType: 'number',
        label: 'Contents SUM insured €',
        value: this.state.contentsInsured,
        name: 'contentsInsured',
        max: '200000',
        min: '25000',
      },
    ];

    return (
      <Container textAlign="center" className="SP-PageDialog quoteContainer">
        <Header as="h5" className="quoteTitle detailsPage">
          Please submit your details for a quote
        </Header>
        <Form
          onSubmit={this.handleSubmit}
          name="homeInsuranceQuoteForm"
          style={{ marginTop: 20 }}
        >
          <PersonalDetailsAccordion
            completed={detailsComplete}
            onPersonalDetailChange={(name, value) =>
              this.onPersonalDetailChange(name, value)
            }
            personalDetails={personalDetails}
            quoteType="home"
          />
          <AccordionCard
            cardSubtitle="Please answer these remaining questions"
            title="Your home"
            active={true}
            completed={homeComplete}
            fields={homeAccordion}
            handleChange={(name, value) => this.handleChange(name, value)}
          />
          <AccordionCard
            cardSubtitle="Please answer these remaining questions"
            title="Your cover"
            active={true}
            completed={coverComplete}
            fields={coverAccordion}
            handleChange={(name, value) => this.handleChange(name, value)}
          />
          <Form.Button
            primary
            fluid
            size="huge"
            content="Get covered"
            className="defaultButton blueBackground"
            disabled={!detailsComplete || !homeComplete || !coverComplete}
          />
        </Form>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(HomeInsuranceQuote));
