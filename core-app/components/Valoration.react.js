/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import basicStyles from '../styles/basicComponents';
import containers from '../styles/containers';
import typography from '../styles/typography';

interface Props {
  value: number | null;
}

const getStars = value => {
  const [n1, n2] = value.toString().split('.');
  let stars = [];
  for (let idx = 1; idx <= parseInt(n1); idx++) {
    stars.push('star');
  }
  for (let idx = parseInt(n1) + 1; idx < 5; idx++) {
    stars.push('star-border');
  }
  return stars;
};

const Valoration = (props: Props) => {
  const { value } = props;
  if (!value) {
    return null;
  }

  const stars = getStars(value);
  const starsView = stars.map((star, index) => (
    <Icon key={index} name={star} />
  ));

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 40,
      }}
    >
      <Text style={{ fontSize: 18, marginRight: 5, lineHeight: 25 }}>
        {value}
      </Text>
      {starsView}
    </View>
  );
};

export default Valoration;
