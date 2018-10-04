/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import {
  Container,
  Button,
  Header,
  Form,
  Icon,
  Label,
  Image,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import InputContainer from './InputContainer';
import SelectBox from './SelectBox';
import { withRouter } from 'react-router-dom';
import {
  AuthenticationActions,
  LoginRequest,
} from '@vodafone/core-redux/actions/boi/AuthenticationActions';
import { AuthenticationStatus } from '@vodafone/core-redux/constants/boi/AuthenticationImmutables';
import { Redirect } from 'react-router';

const { attemptLogin, attemptRegister } = AuthenticationActions;
type InputDataChange = { [name: string]: { value: any } };

interface State {
  register: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

interface StateProps {
  authenticationStatus: AuthenticationStatus;
  basePath: string;
}

interface DispatchProps {
  attemptLogin: (params: LoginRequest) => any;
  attemptRegister: (params: LoginRequest) => any;
}
export interface Props extends StateProps, DispatchProps {
  className?: string;
  history: any;
}

const mapStateToProps = (
  state: any,
  ownProps: any,
): {
  authenticationStatus: AuthenticationStatus,
} => {
  return { authenticationStatus: state.AuthenticationReducer };
};
const mapDispatchToProps = {
  attemptLogin,
  attemptRegister,
};

class LoginPage extends React.Component<Props, State> {
  state = {
    register: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
  };

  handleSubmit = () => {
    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
      register,
    } = this.state;
    const { attemptLogin, attemptRegister, authenticationStatus } = this.props;
    let params, func;
    if (register) {
      params = {
        firstName: firstName,
        lastName: lastName,
        username: email,
        password: password,
        securityQuestion: 'XX',
        securityAnswer: 'YY',
      };
      func = attemptRegister;
    } else {
      params = { username: email, password: password };
      func = attemptLogin;
    }
    func(params).then(() => {
      if (authenticationStatus.authenticated) {
        this.props.history.push('./home');
      }
    });
  };

  render() {
    const {
      register,
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
    } = this.state;
    const { className, authenticationStatus, basePath } = this.props;

    if (authenticationStatus.authenticated) {
      return <Redirect to={basePath + '/home'} />;
    }

    return (
      <div className={className ? className + ' loginPage' : 'loginPage'}>
        <Container textAlign="center" className="quoteContainer">
          <Image
            src={'/assets/boi-blue-transparent.png'}
            className="boiLoginImage"
          />
          <Label className="loginTitle" size="large">
            {this.state.register ? 'Create a wallet' : 'Login'}
          </Label>
          <Form
            onSubmit={this.handleSubmit}
            loading={authenticationStatus.loading}
          >
            {register ? (
              <React.Fragment>
                <Form.Field className="field2Columns leftColumn">
                  <InputContainer label="FIRST NAME">
                    <input
                      type="text"
                      className="selectBoxDropdown"
                      placeholder="TYPE HERE"
                      required
                      value={firstName}
                      onChange={e =>
                        this.setState({ firstName: e.target.value })
                      }
                    />
                  </InputContainer>
                </Form.Field>
                <Form.Field className="field2Columns">
                  <InputContainer label="LAST NAME">
                    <input
                      type="text"
                      className="selectBoxDropdown"
                      placeholder="TYPE HERE"
                      required
                      value={lastName}
                      onChange={e =>
                        this.setState({ lastName: e.target.value })
                      }
                    />
                  </InputContainer>
                </Form.Field>
              </React.Fragment>
            ) : null}
            <Form.Field>
              <InputContainer label="EMAIL">
                <input
                  type="text"
                  className="selectBoxDropdown"
                  placeholder="TYPE HERE"
                  required
                  value={email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </InputContainer>
            </Form.Field>
            <Form.Field>
              <InputContainer label="PASSWORD">
                <input
                  type="password"
                  className="selectBoxDropdown"
                  placeholder="********"
                  required
                  value={password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </InputContainer>
            </Form.Field>
            {register ? (
              <Form.Field>
                <InputContainer label="DATE OF BIRTH">
                  <input
                    type="date"
                    className="selectBoxDropdown"
                    placeholder="DD/MM/YYYY"
                    required
                    value={dateOfBirth}
                    onChange={e =>
                      this.setState({ dateOfBirth: e.target.value })
                    }
                  />
                </InputContainer>
              </Form.Field>
            ) : null}

            <Form.Button
              primary
              fluid
              size="huge"
              className="createWalletButton"
            >
              {register ? 'Create' : 'Sign in'}
              <Icon
                name="arrow alternate circle right"
                className="createWalletIcon"
              />
            </Form.Button>
          </Form>
        </Container>
        <Container textAlign="center" className="buttonsBottom centerContent">
          <Label size="large" className="bottomLabel">
            {this.state.register
              ? 'Already have an account? '
              : 'Do you want to create a new account? '}
            <a
              className="blueLink"
              onClick={() => this.setState({ register: !this.state.register })}
            >
              {register ? 'Sign in' : 'Sign up'}
            </a>
          </Label>
        </Container>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(LoginPage));
