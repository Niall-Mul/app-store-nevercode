/** @flow */
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { margins } from '@vodafone/core-app/styles';


export interface SpacerProps {
  size?: 'tiny' | 'small' | 'normal' | 'large';
}

export default class Spacer extends React.PureComponent<SpacerProps> {
  static defaultProps = {size: 'normal'};

  render() {
    let style = styles[this.props.size];
    return <View style={style}></View>;
  }
}



const styles = StyleSheet.create({
  tiny: {
    marginTop: margins.topSmall.marginTop / 2,
  },
  small: {
    marginTop: margins.topSmall.marginTop
  },
  normal: {
    marginTop: margins.topMedium.marginTop,
  },
  large: {
    marginTop: margins.topLarge.marginTop,
  }
});
