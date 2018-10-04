/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';

import { GoogleMapContainer } from '@vodafone/core-app/maps';
import { containers } from '@vodafone/core-app/styles';

interface Props {}

export class Home extends React.Component<Props> {
  render() {
    return (
      <ScrollView contentContainerStyle={containers.whiteContainer}>
        <GoogleMapContainer />
      </ScrollView>
    );
  }
}

export default Home;
