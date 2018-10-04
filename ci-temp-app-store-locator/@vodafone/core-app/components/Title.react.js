/** @flow */
import * as React from 'react';
import {Text, StyleSheet} from 'react-native';

import { colors, margins } from '@vodafone/core-app/styles';


export interface TitleProps {
  type?: 'regular' | 'subtitle';
  children: string;
}

const Title = (props: TitleProps) => {
  let type = props.type || 'regular';
  let style = styles[type];
  return <Text style={style}>{props.children}</Text>;
};

export default Title;


const styles = StyleSheet.create({
  regular: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
    color: colors.font.title,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.font.title,
  }
});
