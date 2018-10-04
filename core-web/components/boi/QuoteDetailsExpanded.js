/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Grid, Divider, Checkbox, Icon, Label, Card } from 'semantic-ui-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import TermsAndConditions from './TermsAndConditions';
import SliderHandler from './SliderHandler';
import { QuoteInformation } from '../../mocks/quoteDetails';
import { ToggleField } from '../../types/ToggleField';

interface Props {
  termsAndConditions: boolean;
  quoteType: string;
  additionalPremium: number;
  slider: Object[];
  toggleFields?: ToggleField[];
  toggleTermsAndConditions: () => any;
  handleSlider: (excess: number) => any;
  handleToggle: (checked: boolean, value: number) => any;
}

interface State {
  expanded: boolean;
  excess: number;
}

class QuoteDetailsExpanded extends React.Component<Props, State> {
  static defaultProps = { slider: [], toggleFields: [] };

  state = {
    expanded: false,
    excess: 0,
  };
  render() {
    const infoRows = QuoteInformation[this.props.quoteType].map((item, idx) => (
      <Grid.Row key={idx}>
        <Grid.Column width={10} textAlign="left">
          {item.name}
        </Grid.Column>
        <Grid.Column width={6} textAlign="right" style={{ color: '#0486b0' }}>
          {item.value}
        </Grid.Column>
      </Grid.Row>
    ));
    const toggleRows = this.props.toggleFields
      ? this.props.toggleFields.map((item, idx) => {
          return (
            <React.Fragment key={'toggle-' + idx}>
              <Grid style={{ padding: '0 20px' }}>
                <Grid.Row>
                  <Grid.Column width={12} textAlign="left">
                    {item.name}
                  </Grid.Column>
                  <Grid.Column
                    width={4}
                    textAlign="right"
                    style={{ color: '#0486b0' }}
                  >
                    <Checkbox
                      toggle
                      onChange={(e, data) =>
                        this.props.handleToggle(data.checked, item.value)
                      }
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Divider />
            </React.Fragment>
          );
        })
      : null;
    return (
      <div>
        <Card.Content
          extra
          className="cardPlan readMore"
          onClick={() => this.setState({ expanded: !this.state.expanded })}
        >
          {this.state.expanded ? 'Read less  ' : 'Read more  '}
          <Icon name={this.state.expanded ? 'chevron up' : 'chevron down'} />
        </Card.Content>
        <Divider style={{ marginTop: 20 }} />
        {this.state.expanded ? (
          <React.Fragment>
            <Card.Content extra className="infoRows">
              <Grid fluid="true" textAlign="left" verticalAlign="middle">
                {infoRows}
              </Grid>
            </Card.Content>
            <Divider />
          </React.Fragment>
        ) : null}
        {this.props.slider.length > 0 ? (
          <React.Fragment>
            <Card.Content extra textAlign="left" style={{}}>
              <Label className="quoteCardLabel">Excess</Label>
              <Slider
                min={0}
                max={this.props.slider[this.props.slider.length - 1].excess}
                step={this.props.slider[0].excess}
                handle={SliderHandler}
                onChange={this.props.handleSlider}
              />
            </Card.Content>
            <Divider />
          </React.Fragment>
        ) : null}
        {this.props.toggleFields ? toggleRows : null}
        <Card.Content extra className="infoRows">
          <TermsAndConditions
            termsAndConditions={this.props.termsAndConditions}
            handleClick={this.props.toggleTermsAndConditions}
          />
        </Card.Content>
        <Divider />
      </div>
    );
  }
}

export default QuoteDetailsExpanded;
