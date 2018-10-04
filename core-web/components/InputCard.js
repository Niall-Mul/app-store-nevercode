/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 *
 */

import React from 'react';
import _ from 'lodash';
import { Search, Form, Label } from 'semantic-ui-react';
import InputContainer from './boi/InputContainer';
import SearchInput from './boi/SearchInput';
import SelectBox from './boi/SelectBox';
import ToggleInput from './boi/ToggleInput';
import { Link } from 'react-router-dom';

interface Props {
  fields: any;
  handleChange: (name: string, newValue: any) => any;
}

interface State {}

class InputCard extends React.Component<Props, State> {
  render() {
    return this.props.fields.map((item, idx) => {
      if (
        item.dataType === 'text' ||
        item.dataType === 'date' ||
        item.dataType === 'number'
      ) {
        let props =
          item.dataType === 'number'
            ? {
                min: item.min ? item.min : null,
                max: item.max ? item.max : null,
              }
            : {};
        return (
          <Form.Field key={idx}>
            <InputContainer label={item.label}>
              <input
                type={item.dataType}
                className="selectBoxDropdown"
                placeholder="TYPE HERE"
                required
                value={item.value || ''}
                onChange={e =>
                  this.props.handleChange(item.name, e.target.value)
                }
                {...props}
              />
            </InputContainer>
          </Form.Field>
        );
      } else if (item.dataType === 'selectBox') {
        return (
          <Form.Field key={idx}>
            <SelectBox
              label={item.label}
              options={item.options}
              handleOptionChange={value =>
                this.props.handleChange(item.name, value)
              }
              selected={item.value}
              required
            />
          </Form.Field>
        );
      } else if (item.dataType === 'search') {
        return (
          <Form.Field key={idx}>
            <SearchInput
              searchOptions={item.options}
              placeholder="TYPE HERE"
              label={item.label}
              handleResultSelected={value =>
                this.props.handleChange(item.name, value)
              }
              selected={item.value}
            />
          </Form.Field>
        );
      } else if (item.dataType === 'toggle') {
        return (
          <Form.Field key={idx}>
            <ToggleInput
              label={item.label}
              checked={item.checked}
              name={item.name}
              handleChange={value => this.props.handleChange(item.name, value)}
            />
          </Form.Field>
        );
      }
    });
  }
}

export default InputCard;
