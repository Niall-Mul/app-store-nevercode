/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Container, Grid, Header } from 'semantic-ui-react';
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
import {
  UserPreferencesQueryRequest,
  UserPreferencesActions,
} from '@vodafone/core-redux/actions/boi/UserPreferencesActions';
import {
  UserPreferences,
  PersonalDetails,
} from '@vodafone/core-redux/constants/boi/UserPreferencesImmutables';
import AttachPhotoButton from '@vodafone/core-web/components/AttachPhotoButton.react';

import {
  YesNoOptions,
  CoverTypeOptions,
  CarSecurityOptions,
  EircodeOptions,
  CarRegistrationOptions,
  Occupations,
  DriversLicenceOptions,
  ClaimsFreeOptions,
  EmploymentStatusOptions,
  NoClaimsOptions,
  PenaltyPointsOptions,
  VehicleValueOptions,
  AnnualMileageOptions,
} from '../../mocks/carQuote';
import PersonalDetailsAccordion from './PersonalDetailsAccordion';

const { getUserDetails, updateUserDetails } = UserPreferencesActions;
const { requestQuote } = InsuranceQuoteActions;

interface State {
  personalDetails: PersonalDetails;
  registration: string;
  model: string;
  purchaseDate: string;
  carSecurity: string;
  vehicleValue: string;
  carForWork: boolean;
  annualMileage: string;
  vehicleModifications: boolean;
  noClaims: string;
  coverStart: string;
  coverType: string;
  penaltyPoints: string;
  claims: boolean;
  isLoading: boolean;
  results: Object[];
  detailsComplete: false;
  carComplete: false;
  coverComplete: false;
  value: any;
  renewalDocument: string;
  noClaimsDiscont: string;
  driversLicense: string;
}

interface StateProps {
  authenticationStatus: AuthenticationStatus;
  quoteResults: QuoteResults;
  history: any;
  userPreferences: UserPreferences;
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

class CarInsuranceQuote extends React.Component<Props, State> {
  state = {
    personalDetails: new PersonalDetails(),
    registration: '',
    model: '',
    purchaseDate: '',
    carSecurity: '',
    vehicleValue: '',
    carForWork: false,
    annualMileage: '',
    vehicleModifications: false,
    noClaims: '',
    coverStart: '',
    coverType: '',
    penaltyPoints: '',
    claims: false,
    isLoading: false,
    results: [],
    detailsComplete: false,
    carComplete: false,
    coverComplete: false,
    value: '',
    renewalDocument: '',
    noClaimsDiscont: '',
    driversLicense: '',
  };

  componentDidMount = () => {
    this.initializePersonalDetails();
  };

  initializePersonalDetails = () => {
    const { personalDetails } = this.props.userPreferences;
    this.setState({ personalDetails: personalDetails });
  };

  handleChange = (key: any, value: any) => {
    if (key === 'eircode') {
      let eircodeOption = EircodeOptions.find(opt => opt.title === value);

      if (eircodeOption) {
        this.setState({
          address: eircodeOption.address,
          eircode: value,
        });
      }
    } else if (key === 'registration') {
      let registrationOption = CarRegistrationOptions.find(
        opt => opt.title === value,
      );

      if (registrationOption) {
        this.setState({
          model: registrationOption.model,
          registration: value,
        });
      }
    } else {
      const propName: any = key;
      this.setState({ [propName]: value });
    }
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
    this.props.history.push('/wallet/car-insurance/quote-results');
  };

  onRenewalDocumentAttached = (result: string) => {
    this.setState({ renewalDocument: result });
  };

  onNoClaimsDiscountAttached = (result: string) => {
    this.setState({ noClaimsDiscont: result });
  };

  onDriversLicenseAttached = (result: string) => {
    this.setState({ driversLicense: result });
  };

  render() {
    const { authenticationStatus, quoteResults } = this.props;
    const {
      personalDetails,
      registration,
      model,
      purchaseDate,
      carSecurity,
      vehicleValue,
      carForWork,
      annualMileage,
      vehicleModifications,
      noClaims,
      coverStart,
      coverType,
      penaltyPoints,
      claims,
      isLoading,
      results,
      value,
      renewalDocument,
      noClaimsDiscont,
      driversLicense,
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
      driversLicence,
      driversLicenceNumber,
    } = personalDetails;
    const aboutYouCompleted =
      firstName &&
      lastName &&
      eircode &&
      mobileNumber &&
      emailAddress &&
      dateOfBirth &&
      employmentStatus &&
      currentOccupation &&
      driversLicence &&
      driversLicenceNumber
        ? true
        : false;
    const carComplete =
      registration &&
      model &&
      purchaseDate &&
      carSecurity &&
      vehicleValue &&
      annualMileage &&
      noClaims
        ? true
        : false;

    const coverComplete =
      coverStart && coverType && penaltyPoints ? true : false;

    const documentsComplete =
      renewalDocument && noClaimsDiscont && driversLicense ? true : false;

    if (quoteResults.quoteReturned) {
      return <Redirect to="./quote-results" />;
    }

    const carAccordion = [
      {
        dataType: 'search',
        label: 'Your car registration',
        value: this.state.registration,
        options: CarRegistrationOptions,
        name: 'registration',
      },
      {
        dataType: 'text',
        label: 'Your car model',
        value: this.state.model,
        name: 'model',
      },
      {
        dataType: 'date',
        label: 'What date was the car purchased?',
        value: this.state.purchaseDate,
        name: 'purchaseDate',
      },
      {
        dataType: 'selectBox',
        label: 'Additional car security',
        options: CarSecurityOptions,
        value: this.state.carSecurity,
        name: 'carSecurity',
      },
      {
        dataType: 'selectBox',
        label: 'Vehicle value',
        options: VehicleValueOptions,
        value: this.state.vehicleValue,
        name: 'vehicleValue',
      },
      {
        dataType: 'toggle',
        label: 'Do you use your car for work?',
        checked: this.state.carForWork,
        name: 'carForWork',
      },
      {
        dataType: 'selectBox',
        label: 'Annual Mileage',
        options: AnnualMileageOptions,
        value: this.state.annualMileage,
        name: 'annualMileage',
      },
      {
        dataType: 'toggle',
        label: 'Has your vehicle had any modifications?',
        checked: this.state.vehicleModifications,
        name: 'vehicleModifications',
      },
      {
        dataType: 'selectBox',
        label: 'No of years no claims bonus earned in your own name?',
        options: NoClaimsOptions,
        value: this.state.noClaims,
        name: 'noClaims',
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
        dataType: 'selectBox',
        label: 'Cover type',
        options: CoverTypeOptions,
        value: this.state.coverType,
        name: 'coverType',
      },
      {
        dataType: 'selectBox',
        label: 'Penalty points',
        options: PenaltyPointsOptions,
        value: this.state.penaltyPoints,
        name: 'penaltyPoints',
      },
      {
        dataType: 'toggle',
        label:
          'Within past 5 years, have you or any other drivers on your policy, had any accidents or claims, excluding windscreen, which resulted in a payment?',
        checked: this.state.claims,
        name: 'claims',
      },
    ];

    return (
      <Container textAlign="center" className="SP-PageContent quoteContainer">
        <Header as="h5" className="quoteTitle detailsPage">
          Please submit your details for a quote
        </Header>
        <Form onSubmit={this.handleSubmit} name="carInsuranceQuoteForm">
          <PersonalDetailsAccordion
            completed={aboutYouCompleted}
            onPersonalDetailChange={(name, value) =>
              this.onPersonalDetailChange(name, value)
            }
            personalDetails={personalDetails}
            quoteType="car"
          />
          <AccordionCard
            cardSubtitle="Please answer these remaining questions"
            title="Your car"
            active={true}
            completed={carComplete}
            fields={carAccordion}
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
          <AccordionCard title="Your Documents" active={true} completed={true}>
            <div className="SP-InsurancePage">
              <AttachPhotoButton
                label={
                  renewalDocument ? 'Renewal Document' : 'Add Renewal Document'
                }
                onFinished={this.onRenewalDocumentAttached}
                iconName={renewalDocument ? 'check circle' : undefined}
                iconSize="large"
                labelStyle={{ textTransform: 'initial' }}
              />
              <AttachPhotoButton
                label={
                  noClaimsDiscont
                    ? 'No Claims Discount'
                    : 'Add No Claims Discount'
                }
                onFinished={this.onNoClaimsDiscountAttached}
                iconName={noClaimsDiscont ? 'check circle' : undefined}
                iconSize="large"
                labelStyle={{ textTransform: 'initial' }}
              />
              <AttachPhotoButton
                label={
                  driversLicense ? 'Drivers License' : 'Add Drivers License'
                }
                onFinished={this.onDriversLicenseAttached}
                iconName={driversLicense ? 'check circle' : undefined}
                iconSize="large"
                labelStyle={{ textTransform: 'initial' }}
              />
            </div>
          </AccordionCard>
          <Form.Button
            primary
            fluid
            size="huge"
            content="Get covered"
            className="defaultButton blueBackground"
            disabled={!aboutYouCompleted || !carComplete || !coverComplete}
          />
        </Form>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CarInsuranceQuote));
