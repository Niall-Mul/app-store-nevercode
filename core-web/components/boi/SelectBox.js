/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Form } from 'semantic-ui-react';
import InputContainer from './InputContainer';

interface Props {
  label: string;
  options: Object[];
  placeholder?: string;
  required: boolean;
  selected: string;
  handleOptionChange: (value: any) => any;
}

interface State {
  value: string;
}

class SelectBox extends React.Component<Props, State> {
  state = {
    value: '',
  };

  componentWillReceiveProps(nextProps: any) {
    this.setState({ value: nextProps.selected });
  }

  render() {
    const { label, options, placeholder, handleOptionChange } = this.props;
    const { value } = this.state;
    return (
      <InputContainer label={label}>
        <Form.Select
          className="selectBoxDropdown"
          options={options}
          placeholder={placeholder ? placeholder : 'SELECT ONE...'}
          onChange={(e, { value }) => handleOptionChange(value)}
          required={this.props.required}
          value={value}
        />
      </InputContainer>
    );
  }
}

export default SelectBox;
