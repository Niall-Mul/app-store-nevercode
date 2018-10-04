/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import {
  Card,
  Image,
  Grid,
  List,
  Header,
  Button,
  Divider,
  Icon,
  Segment,
} from 'semantic-ui-react';
import { assetsUriPrefix } from '@vodafone/core-redux/constants/boi/Assets';
import QuoteDetailsExpanded from './boi/QuoteDetailsExpanded';
import { ToggleField } from '../types/ToggleField';

interface Props {
  logo: any;
  plan?: string;
  pros: string[];
  price: number;
  expanded?: boolean;
  quoteType: string;
  slider: Object[];
  toggleFields?: ToggleField[];
  moreInfo: () => any;
  buyNow: () => any;
  handleSlider: (excess: number) => any;
  handleToggle: (checked: boolean, value: number) => any;
}

interface State {
  heart: boolean;
  termsAndConditions: boolean;
  additionalPremium: number;
}

class QuoteCard extends React.Component<Props, State> {
  static defaultProps = { slider: [], toggleFields: [] };

  state = {
    heart: false,
    termsAndConditions: false,
    additionalPremium: 0,
  };

  render() {
    const listCovers = this.props.pros.map((item, idx) => {
      return (
        <List.Item key={idx} className="coversItem">
          <Image
            src={assetsUriPrefix + 'assets/tick-blue.png'}
            className="tickBlue"
          />
          <List.Content>{item}</List.Content>
        </List.Item>
      );
    });
    return (
      <Card className={"quoteCard" + (this.props.currentInsurer ? ' currentInsurer' : '')}>
        <Card.Header>
          <Image
            floated="left"
            src={this.props.logo}
            className="quoteHeaderImage"
          />
          <Icon
            floated="right"
            name={'heart' + (this.state.heart ? '' : ' outline')}
            className="quoteHeartIcon"
            onClick={() => this.setState({ heart: !this.state.heart })}
          />
        </Card.Header>
        {this.props.plan ? (
          <Card.Content extra className="cardPlan">
            {this.props.plan}
          </Card.Content>
        ) : null}
        <Card.Content>
          <List>{listCovers}</List>
        </Card.Content>
        {this.props.expanded ? (
          <QuoteDetailsExpanded
            termsAndConditions={this.state.termsAndConditions}
            toggleTermsAndConditions={() =>
              this.setState({
                termsAndConditions: !this.state.termsAndConditions,
              })
            }
            quoteType={this.props.quoteType}
            slider={this.props.slider}
            handleSlider={this.props.handleSlider}
            toggleFields={this.props.toggleFields}
            additionalPremium={this.state.additionalPremium}
            handleToggle={this.props.handleToggle}
          />
        ) : null}
        <Card.Content
          extra
          className={this.props.expanded ? 'footerExpanded' : 'footer'}
        >
          <Grid>
            <Grid.Column className="quoteGridColumnLeft" floated="left">
              <Grid.Row>Your quote is</Grid.Row>
              <Grid.Row className="blueText">
                <span className="euroSymbol">€</span>
                <span className="quotePriceTotal">
                  {this.props.price.toLocaleString(navigator.language, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column className="quoteGridColumnRight" floated="right">
              <Button
                className="moreInfoButton"
                content={this.props.expanded ? 'Buy now' : 'More info'}
                disabled={this.props.expanded && !this.state.termsAndConditions}
                onClick={() => {
                  this.props.expanded
                    ? this.props.buyNow()
                    : this.props.moreInfo();
                }}
              />
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}

export default QuoteCard;
