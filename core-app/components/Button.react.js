/** @flow */
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '@vodafone/core-app/styles';

export interface ButtonProps {
  type?: 'primary' | 'secondary';
  label: string;
  size?: 'normal' | 'big';
  block?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

const Button = (props: ButtonProps) => {
  let type = props.type || 'primary';
  let size = props.size || 'normal';
  let disabled = typeof props.disabled !== 'undefined' ? props.disabled : false;
  let width = props.block ? '100%' : undefined;

  let styleType = StyleTypes[type];
  let styleSize = StyleSizes[size];

  let wrapperStyle = [styleType.button, styleSize.button, {width}];
  if (disabled) {
    wrapperStyle.push(DisabledStyleTypes[type].button);
  }

  return (
    <TouchableOpacity style={wrapperStyle} onPress={props.onPress} disabled={disabled}>
      <Text style={styleType.text}>{props.label.toUpperCase()}</Text>
    </TouchableOpacity>);
};

export default Button;


const StyleTypes = {
  primary: StyleSheet.create({
    button: {
      backgroundColor: colors.blue.default,
      shadowColor: '#ccc',
      shadowOpacity: 0.7,
      shadowOffset: { width: 1, height: 1 },
      elevation: 1,
    },
    text: {
      color: colors.white.default,
      textAlign: 'center',
    }
  }),
  secondary: StyleSheet.create({
    button: {
      backgroundColor: colors.white.default,
      shadowColor: '#ccc',
      shadowOpacity: 0.7,
      shadowOffset: { width: 1, height: 1 },
      elevation: 1,
    },
    text: {
      color: colors.font.default,
      textAlign: 'center',
    }
  }),
};

const DisabledStyleTypes = {
  primary: StyleSheet.create({
    button: {
      backgroundColor: '#dbdbdb',
    },
  }),
  secondary: StyleSheet.create({
    button: {
      backgroundColor: '#dbdbdb',
    },
  }),
};


const StyleSizes = {
  normal: StyleSheet.create({
    button: {
      padding: 12,
      marginTop: 6,
      borderRadius: 4,
    }
  }),
  big: StyleSheet.create({
    button: {
      padding: 20,
    }
  }),
}
