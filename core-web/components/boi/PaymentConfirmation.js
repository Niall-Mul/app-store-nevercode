/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Container, Card, Grid, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import {
  UserPreferencesQueryRequest,
  UserPreferencesActions,
} from '@vodafone/core-redux/actions/boi/UserPreferencesActions';
import { UserPreferences } from '@vodafone/core-redux/constants/boi/UserPreferencesImmutables';
import { connect } from 'react-redux';

const { getUserDetails } = UserPreferencesActions;

interface Props extends StateProps, DispatchProps {
  className: string;
  quoteType: string;
  history: any;
}

interface StateProps {
  userPreferences: UserPreferences;
}

interface DispatchProps {
  getUserDetails: (params: UserPreferencesQueryRequest) => any;
}

const mapStateToProps = (
  state: any,
  ownProps: any,
): {
  userPreferences: UserPreferences,
} => {
  return {
    userPreferences: state.UserPreferencesReducer,
  };
};

const mapDispatchToProps = {
  getUserDetails,
};

class PaymentConfirmation extends React.Component<Props> {
  render() {
    const { userPreferences } = this.props;
    return (
      <div className={this.props.className}>
        <Container textAlign="center" className="paymentContainer">
          <Grid>
            <Grid.Row centered>
              <p>
                Thanks, {userPreferences.personalDetails.firstName}
                <br />
                You're covered.
              </p>
            </Grid.Row>
            {this.props.quoteType === 'carRenewal' && (
              <Grid.Row centered>
                <p>
                  We have sent you a
                  <br />
                  confirmation email and you will
                  <br />
                  receive your disc in the post in 7
                  <br />
                  working days.
                </p>
              </Grid.Row>
            )}
            <Grid.Row centered>
              <p>
                You can view your new policy
                <br />
                in My Documents.
              </p>
            </Grid.Row>
            <div className="buttonsBottom">
              <Grid.Row>
                <Button
                  className="cardButton blueBackground"
                  content="View policy"
                  onClick={() => this.props.history.push('./documents')}
                />
              </Grid.Row>
              <Grid.Row>
                <Button
                  className="cardButton whiteBackground"
                  content="Home"
                  onClick={() => this.props.history.push('/wallet/home')}
                />
              </Grid.Row>
            </div>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(PaymentConfirmation));
