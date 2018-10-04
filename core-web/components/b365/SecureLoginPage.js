/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Icon, Input, Grid } from 'semantic-ui-react';


interface SecureLoginPageProps {
  basePath: string;
}

export default class SecureLoginPage extends React.Component<SecureLoginPageProps> {
  render() {
    let { basePath } = this.props;

    return (
      <div className="b365-loginpage">
        <Container>
          <div className="b365-toptext b365-toptext--gray">Secure Login</div>

          <div>
            <strong>Please enter the 1st, 4th and 6th digits of your PIN</strong>
          </div>

          <div className="b365-pinfields">
            <div className="b365-pinfield">
              <div className="b365-pinfield-title">1<sup>st</sup></div>
              <input type="text" maxlength="1" className="b365-pinfield-input" />
            </div>

            <div className="b365-pinfield">
              <div className="b365-pinfield-title">2<sup>nd</sup></div>
              <div className="b365-pinfield-star">*</div>
            </div>

            <div className="b365-pinfield">
              <div className="b365-pinfield-title">3<sup>rd</sup></div>
              <div className="b365-pinfield-star">*</div>
            </div>

            <div className="b365-pinfield">
              <div className="b365-pinfield-title">4<sup>th</sup></div>
              <input type="text" maxlength="1" className="b365-pinfield-input" />
            </div>

            <div className="b365-pinfield">
              <div className="b365-pinfield-title">5<sup>th</sup></div>
              <div className="b365-pinfield-star">*</div>
            </div>

            <div className="b365-pinfield">
              <div className="b365-pinfield-title">6<sup>th</sup></div>
              <input type="text" maxlength="1" className="b365-pinfield-input" />
            </div>
          </div>
        </Container>

        <Container textAlign="right">
          <Link to={basePath + "/your-accounts"} className="b365-button">Continue</Link>
        </Container>

        <div className="b365-pageBottom">
          <div className="b365-pageBottom-msg b365-pageBottom-msg--gray">
            Bank of Ireland is regulared by the Central Bank of Ireland.
          </div>

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
