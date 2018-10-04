/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import colors from './colors';
import { StyleSheet } from 'react-native';

const basicComponents = StyleSheet.create({
  button: {
    backgroundColor: colors.turquoise.singlepoint,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
  buttonGrey: {
    backgroundColor: colors.grey.default,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
  errorButton: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  iconButton: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    padding: 3,
    lineHeight: 28,
  },
  switchButtonGrey: {
    backgroundColor: colors.grey.lighter,
    borderColor: colors.grey.default,
    borderWidth: 1,
    borderRadius: 5,
    height: 75,
    padding: 0,
  },
  switchButtonActive: {
    backgroundColor: 'transparent',
    borderColor: colors.turquoise.singlepoint,
    borderWidth: 1,
    borderRadius: 5,
    height: 75,
    padding: 0,
  },
  buttonSmall: {
    backgroundColor: colors.turquoise.singlepoint,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 3,
    padding: 5,
  },
  googleMapsAutocompleteButton: {
    backgroundColor: colors.turquoise.singlepoint,
    borderColor: 'transparent',
    borderWidth: 0,
  },
  redButton: {
    backgroundColor: colors.turquoise.singlepoint,
    borderRadius: 5,
    height: 60,
    width: 160,
  },
  redTextBox: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.turquoise.singlepoint,
    color: colors.turquoise.singlepoint,
    fontSize: 14,
    margin: 5,
    textAlign: 'center',
    width: '30%',
    height: 30,
    lineHeight: 30,
  },
  greyTextBox: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.grey.default,
    color: colors.grey.default,
    fontSize: 14,
    margin: 5,
    textAlign: 'center',
    width: '30%',
    height: 30,
    lineHeight: 30,
  },
  redTextBoxBig: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.turquoise.singlepoint,
    color: colors.turquoise.singlepoint,
    fontSize: 14,
    margin: 5,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 6,
    paddingLeft: 12,
    textAlign: 'center',
    width: '25%',
    height: 50,
    lineHeight: 15,
  },
  greyTextBoxBig: {
    backgroundColor: colors.grey.light,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.black.default,
    color: colors.black.default,
    fontSize: 14,
    margin: 5,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 6,
    paddingLeft: 12,
    textAlign: 'center',
    width: '25%',
    height: 50,
    lineHeight: 15,
  },
});

export default basicComponents;
