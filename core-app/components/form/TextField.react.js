/** @flow */
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import { colors } from '@vodafone/core-app/styles';
import Field, { FieldProps } from './Field.react';


export interface TextFieldProps extends FieldProps {}


export default class TextField extends Field<TextFieldProps> {
  getPlaceholder() {
    return this.props.placeholder || `Please, type your ${this.props.label.toLowerCase()}`;
  }

  renderInput() {
    return <FormInput value={this.props.value} placeholder={this.getPlaceholder()} onChangeText={value => this.onChangeValue(value)} />;
  }
}
