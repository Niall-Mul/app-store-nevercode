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
import { slider, toggleFields } from '../../mocks/quoteDetailsExpanded';
interface Props {
  label: string;
  className?: string;
  history: any;
  location: any;
  quoteType: string;
}

interface State {
  selected: number;
  expanded: boolean;
  price: number;
  sliderValue: number;
}

class QuoteDetailsExpandedPage extends React.Component<Props, State> {
  state = {
    selected: -1,
    expanded: false,
    price: this.props.location.state.quote.price,
    sliderValue: 0,
  };

  handleSlider = (excess: number) => {
    const { price, sliderValue } = this.state;
    const currentSlider = slider[this.props.quoteType].filter((item, idx) => {
      return item.excess === excess;
    })[0];
    const currentPriceAdded = currentSlider ? currentSlider.value : 0;
    this.setState({
      price: price + (currentPriceAdded - sliderValue),
      sliderValue: currentPriceAdded,
    });
  };

  handleToggle = (e: boolean, value: number) => {
    let price = this.state.price;
    if (e) {
      this.setState({ price: price + value });
    } else {
      this.setState({ price: price - value });
    }
  };

  selectQuote = (idx: number) => {
    this.setState({ selected: idx, expanded: true });
  };

  redirectTo = (pathname, params) => {
    this.props.history.push({ pathname: pathname, state: params });
  };

  render() {
    const { quote } = this.props.location.state;
    return (
      <div className={this.props.className}>
        <Container textAlign="center" className="quoteContainer">
          <Card.Group centered>
            <QuoteCard
              logo={quote.logo}
              pros={quote.pros}
              price={this.state.price}
              plan={quote.plan}
              expanded={true}
              quoteType={this.props.quoteType}
              moreInfo={() => this.redirectTo('./expanded', {})}
              buyNow={() =>
                this.redirectTo('./payment', { price: this.state.price })
              }
              slider={slider[this.props.quoteType]}
              handleSlider={this.handleSlider}
              toggleFields={toggleFields[this.props.quoteType]}
              handleToggle={this.handleToggle}
            />
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default withRouter(QuoteDetailsExpandedPage);
