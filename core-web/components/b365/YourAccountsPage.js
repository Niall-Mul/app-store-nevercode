/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Icon, List } from 'semantic-ui-react';


interface YourAccountPageProps {
  basePath: string;
  assetPath: string;
}


export default class YourAccountPage extends React.Component<YourAccountPageProps> {
  render() {
    return (
      <div className="b365-youraccountspage">
        <Container>
          <div className="b365-toptext b365-toptext--gray">Your Accounts</div>
          <p>User ID: 675456</p>

          <List celled size="big" className="b365-accountList">
            <List.Item>
              <Icon name="angle right" />
              <List.Content>
                <List.Header>My Current Account</List.Header>
                ~ 0616
              </List.Content>
            </List.Item>

            <List.Item>
              <Icon name="angle right" />
              <List.Content>
                <List.Header>My Savings</List.Header>
                ~ 2843
              </List.Content>
            </List.Item>

            <List.Item>
              <Icon name="angle right" />
              <List.Content>
                <List.Header>Me &amp; Shell's Accounts</List.Header>
                ~ 1981
              </List.Content>
            </List.Item>

            <List.Item >
              <Icon name="angle right" />
              <List.Content>
                <List.Header>Credit Card</List.Header>
                ~ 5392
                <List.Description>Credit Card</List.Description>
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Content>
                <List.Header>Mortgage</List.Header>
                ~ 4795
                <List.Description>MORTGAGE-BOIMB</List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Container>

        <div className="b365-pageBottom">
          <Container>
            <a href="/wallet" className="b365-calltoaction">Your Insurance Wallet</a>
          </Container>

          <div className="b365-tabs">
            <div className="b365-tab">
              <Icon name="list layout" size="large" style={{ color: '#5dbed9' }} />
              <small>Accounts</small>
            </div>

            <div className="b365-tab">
              <Icon name="exchange" size="large" />
              <small>Transfer</small>
            </div>

            <div className="b365-tab">
              <Icon name="edit" size="large" />
              <small>Apply</small>
            </div>

            <div className="b365-tab">
              <Icon name="wrench" size="large" />
              <small>Services</small>
            </div>

            <div className="b365-tab">
              <Icon name="ellipsis horizontal" size="large" />
              <small>More</small>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
