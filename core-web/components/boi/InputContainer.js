/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Container, Label } from 'semantic-ui-react';

interface Props {
  label: string;
  children: any;
  bordered?: boolean;
  checkbox?: boolean;
}

interface State {
  focused: boolean;
}

class InputContainer extends React.Component<Props, State> {
  state = {
    focused: false,
  };

  render() {
    const { label, children } = this.props;
    return (
      <Container
        textAlign="left"
        className={
          'selectInputContainer' +
          (this.state.focused ? ' inputFocused' : '') +
          (this.props.bordered ? ' inputBordered' : '')
        }
        style={
          this.props.checkbox ? { display: 'flex', padding: '10px 20px' } : {}
        }
        onBlur={() => this.setState({ focused: false })}
        onFocus={() => this.setState({ focused: true })}
      >
        <Label
          className={
            'inputContainerLabel' +
            (this.props.checkbox ? ' inputCheckbox' : '')
          }
        >
          {label}
        </Label>
        {children}
      </Container>
    );
  }
}

export default InputContainer;
