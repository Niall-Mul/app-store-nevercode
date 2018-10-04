/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import Colors from './colors';
const Typography = {
  heading1: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 32,
    color: Colors.black.default,
  },
  heading2: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 28,
    color: Colors.black.default,
  },
  heading3: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 25,
    color: Colors.black.default,
  },
  bodyText: {
    fontSize: 18,
    fontWeight: 'normal',
    lineHeight: 21,
    color: Colors.black.default,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white.default,
  },
  switchButtonTextActive: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.turquoise.singlepoint,
  },
  switchButtonTextGrey: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.black.default,
  },
  buttonSmallText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.white.default,
  },
  searchBarText: {
    fontSize: 18,
    color: Colors.grey.default,
    backgroundColor: Colors.white.default,
    fontWeight: 'normal',
  },
  searchBarSuggestionText: {
    fontSize: 18,
    color: Colors.grey.default,
    backgroundColor: 'transparent',
    fontWeight: 'normal',
    flex: 1,
  },
  searchBarClearIcon: {
    color: Colors.grey.default,
  },
  storeDetailTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 28,
    color: Colors.black.default,
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
  },
  storeCardOpen: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.turquoise.singlepoint,
    fontSize: 9,
    borderRadius: 3,
    padding: 5,
    color: Colors.turquoise.singlepoint,
  },
  storeCardTitle: {
    paddingLeft: 0,
    marginTop: 10,
    color: Colors.black.default,
    width: '75%',
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 10,
  },
  storeCardInfoRow: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 0,
    marginTop: 5,
    marginBottom: 5,
  },
  storeInfo: {
    paddingLeft: 5,
    fontSize: 16,
    color: Colors.grey.light,
  },
  storeCardCloses: {
    position: 'absolute',
    right: 0,
    fontSize: 16,
    color: Colors.grey.light,
  },
  storeCardRating: {
    width: '50%',
    marginTop: 20,
  },
  storeCardDistance: {
    color: Colors.black.default,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'normal',
    marginRight: 10,
  },
  storeCardDetailsButton: {
    marginTop: 5,
    bottom: -2,
    padding: 0,
    position: 'absolute',
    right: 0,
  },
  storeCardReviews: {
    position: 'absolute',
    right: 0,
    fontSize: 16,
    color: Colors.turquoise.singlepoint,
  },
  accordionHeaderTitle: {
    width: '85%',
    paddingLeft: 20,
    fontSize: 20,
    lineHeight: 40,
  },
  textColumnLeft: {
    width: '50%',
    textAlign: 'left',
    padding: 5,
    paddingLeft: 15,
  },
  textColumnRight: {
    width: '50%',
    textAlign: 'right',
    padding: 5,
    paddingRight: 15,
  },

  directionsInfoText: {
    fontSize: 20,
  },
  directionsInfoName: {
    width: '60%',
  },
  directionsInfoDistance: {
    position: 'absolute',
    right: 0,
    paddingRight: 30,
  },
  directionsInfoDetails: {
    fontSize: 14,
    color: Colors.grey.light,
  },
  directionsBox: {
    width: '80%',
    height: 40,
    borderRadius: 5,
    backgroundColor: Colors.white.default,
    paddingLeft: 10,
  },
};

export default Typography;
