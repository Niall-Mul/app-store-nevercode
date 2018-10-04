/** @flow */
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { margins } from '@vodafone/core-app/styles';

export interface ContainerProps {
  style?: any;
  children?: any;
}

const Container = (props: ContainerProps) => {
  let s = [styles.container, props.style]
  return <View style={s}>{props.children}</View>;
};


export default Container;


const styles = StyleSheet.create({
  container: {
    padding: margins.topSmall.marginTop,
  },
});
