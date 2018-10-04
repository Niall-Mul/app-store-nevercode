/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { AuthenticationActions } from '@vodafone/core-redux/actions/boi/AuthenticationActions';
import { AuthenticationStatus } from '@vodafone/core-redux/constants/boi/AuthenticationImmutables';

const { logout } = AuthenticationActions;

interface StateProps {
  authenticationStatus: AuthenticationStatus;
}
interface DispatchProps {
  logout: () => any;
}
export interface Props extends StateProps, DispatchProps {}

const mapStateToProps = (
  state: any,
  ownProps: any,
): {
  authenticationStatus: AuthenticationStatus,
} => {
  return { authenticationStatus: state.AuthenticationReducer };
};

const mapDispatchToProps = {
  logout,
};

class Logout extends React.Component<Props> {
  handleLogout() {
    this.props.logout();
  }

  render() {
    const { authenticationStatus } = this.props;
    if (!authenticationStatus.authenticated) {
      return <Redirect to="/wallet" />;
    }
    return <div onClick={e => this.handleLogout()}>Logout</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);
