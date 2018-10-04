/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Header, Button, Card } from 'semantic-ui-react';
import QuoteCard from '../QuoteCard.react';
import { assetsUriPrefix } from '@vodafone/core-redux/constants/boi/Assets';

import {
  Quotes,
} from '../../mocks/quoteDetails';

interface Props {
  label: string;
  className?: string;
  history: any;
  quoteType: string;
}

interface State {
  selected: number;
  expanded: boolean;
}

class QuoteDetailsPage extends React.Component<Props, State> {
  state = {
    selected: -1,
    expanded: false,
  };

  selectQuote = (idx: number) => {
    this.setState({ selected: idx, expanded: true });
  };

  redirectTo = (pathname, params) => {
    this.props.history.push({ pathname: pathname, state: params });
  };

  render() {

    const cards = Quotes[this.props.quoteType].map((item, idx) => {
      return !this.state.expanded || this.state.selected === idx ? (
        <QuoteCard
          key={idx}
          logo={item.logo}
          plan={item.plan}
          pros={item.pros}
          price={item.price}
          currentInsurer={item.currentInsurer}
          quoteType={this.props.quoteType}
          expanded={this.state.expanded}
          moreInfo={() => this.redirectTo('./expanded', { quote: item })}
          buyNow={() => this.redirectTo('./payment', { price: item.price })}
        />
      ) : null;
    });

    return (
      <div className={this.props.className}>
        <Container textAlign="center" className="quoteContainer">
          <Header as="h5" className="quoteTitle">
            Your top 3 quotes
          </Header>
          <Card.Group centered>{cards}</Card.Group>
          {!this.state.expanded ? (
            <p>
              <Button
                as={Link}
                to="./quotes"
                primary
                fluid
                size="huge"
                content="Get More Quotes"
                className="defaultButton blueBackground moreInfoButton"
                style={{ maxWidth: '100%', marginTop: 30 }}
              />
            </p>
          ) : null}
        </Container>
      </div>
    );
  }
}

export default withRouter(QuoteDetailsPage);
