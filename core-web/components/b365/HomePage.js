/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */
import React from 'react';
import { Link } from  'react-router-dom';
import { Button, Container, Icon, Input, Grid } from 'semantic-ui-react';


interface HomePageProps {
  basePath: string;
  assetPath: string;
  history: any;
}

export default class HomePage extends React.Component<HomePageProps> {

  onSubmit = (ev: any) => {
    ev.preventDefault();
    this.props.history.push('/b365/secure-login');
  };

  render() {
    var { basePath, assetPath } = this.props;

    return (
      <div className="b365-homepage">
        <Container>
          <div className="b365-toptext">Secure Login</div>

          <form style={{ whiteSpace: 'nowrap' }} action={basePath + "/secure-login"} onSubmit={this.onSubmit} method="get">
            <Button type="submit" icon="arrow right" color='orange' floated="right" required />
            <Input label="Contact Number" placeholder="Enter last 4 digits" fluid />
          </form>

          <div className="b365-homepage-otheraccountlink">
            <a href="#">Other account login</a>
          </div>

          <div className="b365-homeButton-group">
            <div className="b365-homeButton">
              <Icon name="sync" size="large" />
              <div className="b365-homeButton-label">IBAN</div>
            </div>

            <div className="b365-homeButton">
              <Icon name="question circle" size="large" />
              <div className="b365-homeButton-label">How to...</div>
            </div>

            <div className="b365-homeButton">
              <Icon name="wechat" size="large" />
              <div className="b365-homeButton-label is-small">Social Media</div>
            </div>
          </div>
        </Container>

        <div className="b365-pageBottom">
          <div className="b365-homeSlider">
            <div className="b365-homeSlider-media">
              <Icon name="database" style={{ color: "#1c5372", fontSize: '2.4rem' }} />
            </div>
            <div className="b365-homeSlider-content">
              <strong>Online transfer limit increased</strong><br />
              <small>Payees set up now have a transfer limit of up to €10,000 daily</small>
            </div>

          </div>

          <div className="b365-pageBottom-msg">Bank of Ireland is regulared by the Central Bank of Ireland.</div>

          <div className="b365-tabs">
            <div className="b365-tab">
              <Icon name="lock" size="large" style={{ color: '#5dbed9' }} />
              <small>Secure login</small>
            </div>

            <div className="b365-tab">
              <Icon name="phone" size="large" />
              <small>Contact Us</small>
            </div>

            <div className="b365-tab">
              <Icon name="map marker alternate" size="large" />
              <small>ATM/Branch</small>
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
