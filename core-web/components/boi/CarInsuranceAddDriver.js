/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 *
 */
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Container, Grid, Header } from 'semantic-ui-react';
import InputCard from '../InputCard';
import SelectBox from './SelectBox';
import { AuthenticationStatus } from '@vodafone/core-redux/constants/boi/AuthenticationImmutables';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import InputContainer from './InputContainer';
import SearchInput from './SearchInput';

import {
  DriversLicenceOptions,
  DurationOptions,
} from '../../mocks/carQuote';

type InputDataChange = { [name: string]: { value: any } };

interface State {
  firstname: string;
  lastname: string;
  eircode: string;
  dateOfBirth: string;
  driversLicence: string;
  isLoading: boolean;
  results: Object[];
  detailsComplete: false;
  value: any;
  price: number;
}

interface StateProps {
  authenticationStatus: AuthenticationStatus;
  location: any;
  history: any;
}

export interface Props extends StateProps {}

const mapStateToProps = (
  state: any,
  ownProps: any,
): {
  authenticationStatus: AuthenticationStatus,
} => {
  return {
    authenticationStatus: state.AuthenticationReducer,
  };
};

class CarInsuranceAddDriver extends React.Component<Props, State> {
  state = {
    firstname: '',
    lastname: '',
    eircode: '',
    dateOfBirth: '',
    driversLicence: '',
    duration: '',
    isLoading: false,
    results: [],
    detailsComplete: false,
    value: '',
    price: 50,
  };

  redirectTo = (pathname, params) => {
    this.props.history.push({ pathname: pathname, state: params });
  };

  handleChange = (key: any, value: any) => {
    const propName: any = key;
    this.setState({ [propName]: value });
  };

  handleSubmit = () => {
    this.redirectTo('/wallet/car-insurance/payment', { price: this.state.price })
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
  };

  render() {
    const { authenticationStatus } = this.props;
    const {
      firstname,
      lastname,
      eircode,
      dateOfBirth,
      driversLicence,
      duration,
      isLoading,
      results,
      value,
    } = this.state;

    const detailsComplete =
      firstname &&
      lastname &&
      eircode &&
      dateOfBirth &&
      driversLicence &&
      duration;

    const detailsAccordion = [
      {
        dataType: 'text',
        label: 'First Name',
        value: this.state.firstname,
        name: 'firstname',
      },
      {
        dataType: 'text',
        label: 'Last Name',
        value: this.state.lastname,
        name: 'lastname',
      },
      {
        dataType: 'text',
        label: 'Eircode',
        value: this.state.eircode,
        name: 'eircode',
      },
      {
        dataType: 'date',
        label: 'Date of Birth',
        value: this.state.dateOfBirth,
        name: 'dateOfBirth',
      },
      {
        dataType: 'selectBox',
        label: 'Drivers Licence Type',
        options: DriversLicenceOptions,
        value: this.state.driversLicence,
        name: 'driversLicence',
      },
      {
        dataType: 'selectBox',
        label: 'Duration',
        options: DurationOptions,
        value: this.state.duration,
        name: 'duration',
      },      
    ];

    return (
      <Container textAlign="center" className="SP-PageDialog quoteContainer">
        <Header as="h5" className="quoteTitle detailsPage">
          New driver details
        </Header>
        <Form
          onSubmit={this.handleSubmit}
          name="carInsuranceQuoteForm"
          style={{ marginTop: 20 }}
        >
          <InputCard
            fields={detailsAccordion}
            handleChange={(name, value) => this.handleChange(name, value)}
          />
          <Form.Button
            primary
            fluid
            size="huge"
            content="Confirm"
            className="defaultButton blueBackground"
            disabled={!detailsComplete}
          />
        </Form>
      </Container>
    );
  }
}

export default withRouter(CarInsuranceAddDriver);

