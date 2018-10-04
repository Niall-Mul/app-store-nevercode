/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import {
  Container,
  Card,
  Image,
  Grid,
  Button,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import InputContainer from './InputContainer';
import SelectBox from './../boi/SelectBox';

import {
  AccountOptions,
  CardOptions,
} from '../../mocks/paymentDetails';

interface Props {
  className: string;
  history: any;
  location: any;
}

interface State {
  account: string;
  card: string;
  directDebit: string;
  paymentOption: string;
  saveCard: boolean;
}

class QuotePayment extends React.Component<Props, State> {
  state = {
    account: '',
    card: '',
    directDebit: '',
    paymentOption: '',
  };

  handleChange = (key: any, value: any) => {
    const propName: any = key;
    this.setState({ [propName]: value });
    this.setState({ paymentOption: key });
  };

  submitPayment = () => {
    this.props.history.push('./confirm');
  };

  render() {
    return (
      <div className={this.props.className}>
        <Container
          textAlign="center"
          className="paymentContainer"
          style={{ paddingTop: 0 }}
        >
          <Card className="quoteCard">
            <h1 className="header">
              <Image src={'/assets/secure boi.png'} className="paymentIcon" />
              <p className="paymentTitle">Make a payment</p>
            </h1>
            <Card.Content style={{ border: 'none' }} className="footer">
              <Grid fluid="true" textAlign="left" verticalAlign="middle">
              <Grid.Row>
                <SelectBox
                  label="Pay from account"
                  options={AccountOptions}
                  handleOptionChange={value =>
                    this.handleChange('account', value)
                  }
                  name='account'
                />
                </Grid.Row>  
                <Grid.Row centered>
                  <p>OR</p>
                </Grid.Row>           
                <Grid.Row>
                  <SelectBox
                      label="Pay from card"
                      options={CardOptions}
                      handleOptionChange={value =>
                        this.handleChange('card', value)
                      }
                      name='card'
                  />
                </Grid.Row>
                <Grid.Row centered>
                  <p>OR</p>
                </Grid.Row>
                <Grid.Row>
                <SelectBox
                      label="Direct Debit"
                      options={AccountOptions}
                      handleOptionChange={value =>
                        this.handleChange('directDebit', value)
                      }
                      name='directDebit'
                  />
                </Grid.Row>
                <Grid.Row>
                  <Button
                    className="cardButton blueBackground"
                    content={`Pay €${this.props.location.state.price}`}
                    onClick={this.submitPayment}
                  />
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
        </Container>
      </div>
    );
  }
}

export default withRouter(QuotePayment);

