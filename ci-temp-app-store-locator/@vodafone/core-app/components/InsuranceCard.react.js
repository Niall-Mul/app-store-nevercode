/** @flow */
import * as React from 'react';
import { Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import { colors } from '../styles';
import Title from './Title.react';
import Spacer from './Spacer.react';


export interface InsuranceCardData {
  name: string;
  image: any;
  onPress: () => void;
}

export interface InsuranceCardProps {
  data: InsuranceCardData;
}

const InsuranceCard = (props: InsuranceCardProps) => {
  let { data } = props;

  return (
    <TouchableOpacity style={styles.card}  onPress={data.onPress}>
      <Image style={styles.cardImage} source={data.image} resizeMode="contain" />
      <Spacer size="tiny" />
      <Title type="subtitle">{data.name}</Title>
    </TouchableOpacity>
  );
};

export default InsuranceCard;


const styles = StyleSheet.create({
  card: {
    shadowColor: colors.grey.default,
    shadowOpacity: 0.7,
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    elevation: 1,
    backgroundColor: colors.white.default,
    marginBottom: 6,
    borderRadius: 4,
    width: '100%',
    paddingTop: 14,
    paddingBottom: 14,
  },
  cardImage: {
    flex: 1,
    width: 36,
    height: 36,
    alignSelf: 'center',
    opacity: 0.4,
  },
  cardText: {
    textAlign: 'center'
  }
});
