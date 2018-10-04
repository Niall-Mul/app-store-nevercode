/** @flow */
import * as React from 'react';

import TextField from './TextField.react';


export default class NumberField extends TextField {
  onChangeValue(value: string) {
    this.setState({pristine: false});
    value = value.replace(/[^\d]/g, '');
    this.props.onChange(value);
  }

  renderInput() {
    let el = super.renderInput();
    return React.cloneElement(el, {keyboardType: 'numeric'});
  }
}
