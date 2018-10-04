/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import type { CounterRecord } from '@vodafone/core-redux';

import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import basicStyles from '../styles/basicComponents';
import containers from '../styles/containers';
import typography from '../styles/typography';

interface Props {
  counter: CounterRecord;
  increaseCounter: () => any;
}

const Counter = (props: Props) => (
  <View style={containers.counter}>
    <Text>{props.counter.value}</Text>
    <Button
      title="React Redux Counter"
      textStyle={typography.buttonText}
      buttonStyle={basicStyles.button}
      containerStyle={containers.button}
      onPress={props.increaseCounter}
    />
  </View>
);

export default Counter;
