/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Text, View } from 'react-native';
import {
  Button,
  ButtonGroup,
  ListItem,
  List,
  Icon,
  Avatar,
} from 'react-native-elements';
import type { HelloApiResults } from '@vodafone/core-redux';
import basicStyles from '../styles/basicComponents';
import margins from '../styles/margins';
import containers from '../styles/containers';
import typography from '../styles/typography';

interface Props {
  apiResult: HelloApiResults;
  getHelloApiResults: () => any;
  clearResults: () => any;
}

const HelloApi = (props: Props) => {
  const { apiResult } = props;
  const avatar = <Avatar small rounded icon={{ name: 'person' }} />;
  const records = apiResult.records
    ? apiResult.records.map((todo, index) => (
        <ListItem
          roundAvatar
          key={index}
          title={todo.name}
          subtitle={todo.dateOfVisit}
          avatar={avatar}
        />
      ))
    : null;

  const selectedIndex = index => {
    switch (index) {
      case 0:
        props.getHelloApiResults();
        break;
      case 1:
        props.clearResults();
        break;
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <ButtonGroup
        onPress={selectedIndex}
        selectedIndex={2}
        buttons={['Invoke API', 'Clear']}
        containerStyle={containers.buttonGroup}
        textStyle={typography.buttonText}
        buttonStyle={basicStyles.button}
        selectedTextStyle={basicStyles.button}
      />
      <Text>{apiResult.errorMsg ? 'Error: ' + apiResult.errorMsg : null}</Text>
      <Text>
        {apiResult.records ? apiResult.records.length + ' results:' : null}
      </Text>
      {records ? <List>{records}</List> : null}
    </View>
  );
};

export default HelloApi;
