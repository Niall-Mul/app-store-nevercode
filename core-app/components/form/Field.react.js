/** @flow */
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import { colors } from '@vodafone/core-app/styles';


export interface FieldProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
}

export interface FieldState {
  pristine: boolean;
  isOpen: boolean;
}


export default class Field<Props: FieldProps> extends React.Component<Props, FieldState> {
  static defaultProps = {
    required: false,
  };

  state = {
    pristine: true,
    isOpen: false,
  };

  onChangeValue(value: string) {
    this.setState({pristine: false});
    this.props.onChange(value);
  }

  getPlaceholder() {
    return this.props.placeholder || `Please, type your ${this.props.label.toLowerCase()}`;
  }

  getErrorMessage() {
    if (this.props.required && this.props.value === '') {
      return "Field required";
    }

    return null;
  }

  renderValidationMessage() {
    if (this.state.pristine) return null;

    let error = this.getErrorMessage();

    if (error) {
      return <FormValidationMessage>{error}</FormValidationMessage>;
    }

    return null;
  }

  renderLabel() {
    return <FormLabel>{this.props.label}</FormLabel>;
  }

  renderInput() {
    return <FormInput value={this.props.value} placeholder={this.getPlaceholder()} onChangeText={value => this.onChangeValue(value)} />
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {this.renderLabel()}
        {this.renderInput()}
        {this.renderValidationMessage()}
      </View>
    );
  }
}


export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white.default,
    borderRadius: 6,
    paddingBottom: 12,
    marginBottom: 12,
  },
});
