/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 *
 */

import React from 'react';
import _ from 'lodash';
import { Card, Accordion, Icon, Search, Form, Label } from 'semantic-ui-react';
import InputCard from './InputCard';
import InputContainer from './boi/InputContainer';
import SearchInput from './boi/SearchInput';
import SelectBox from './boi/SelectBox';
import ToggleInput from './boi/ToggleInput';
import { Link } from 'react-router-dom';

interface Props {
  fields: any;
  title: string;
  cardSubtitle?: string;
  active: boolean;
  completed: boolean;
  children?: any;
  handleChange: (name: string, newValue: any) => any;
}

interface State {
  open: boolean;
}

class AccordionCard extends React.Component<Props, State> {
  state = {
    open: false,
  };

  toggleAccordion = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    const { title, active, completed, cardSubtitle } = this.props;

    return (
      <Accordion fluid styled>
        <Accordion.Title active={true} onClick={this.toggleAccordion}>
          {title}
          <Icon name={this.state.open ? 'chevron up' : 'chevron down'} />
          {completed ? (
            <Icon name="check circle" className="icon-complete" />
          ) : (
            <Icon
              name="circle"
              className="icon-complete"
              style={{ color: '#FDA228' }}
            />
          )}
        </Accordion.Title>
        <Accordion.Content active={this.state.open}>
          {cardSubtitle ? (
            <Label className="accordionLabel">{cardSubtitle}</Label>
          ) : null}
          {this.props.children ? (
            this.props.children
          ) : (
            <InputCard
              fields={this.props.fields}
              handleChange={this.props.handleChange}
            />
          )}
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default AccordionCard;
