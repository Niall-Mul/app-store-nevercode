/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import InputContainer from './InputContainer';

interface Props {
  label: string;
  checked: boolean;
  name: string;
  handleChange: (value: boolean) => any;
}

class ToggleInput extends React.Component<Props> {
  render() {
    const { label, checked, name, handleChange } = this.props;
    return (
      <InputContainer label={label} checkbox={true}>
        <Checkbox
          toggle
          onChange={() => handleChange(!checked)}
          checked={checked}
        />
      </InputContainer>
    );
  }
}

export default ToggleInput;
