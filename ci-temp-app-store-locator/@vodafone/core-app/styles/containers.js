/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Platform, StyleSheet, Dimensions } from 'react-native';
import colors from './colors';
import { isLandscape } from './utils/landscape';

const width = isLandscape()
  ? Dimensions.get('window').height
  : Dimensions.get('window').width;
const height = isLandscape()
  ? Dimensions.get('window').width
  : Dimensions.get('window').height;

const containers = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerPortrait: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: colors.turquoise.singlepoint,
  },
  containerLandscape: {
    flex: 1,
    height: width,
    width: height,
    backgroundColor: '#0f0',
  },
  whiteContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    height: height,
    width: width,
  },
  mapLandscape: {
    flex: 1,
    height: width,
    width: height,
  },
  overlay90: {
    height: height * 0.9,
    width: width * 0.95,
    marginLeft: width * 0.025,
    marginTop: height * 0.025,
    backgroundColor: colors.white.default,
    borderRadius: 10,
  },
  smallMap: {
    flex: 1,
    height: 180,
    width: width,
  },
  directionsMap: {
    flex: 1,
    height: height - 250,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 170,
  },
  directionsMapLandscape: {
    flex: 1,
    height: width - 160,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 120,
  },
  directionsInfo: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
    height: 80,
    backgroundColor: colors.white.default,
    zIndex: 1,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  directionsInfoLandscape: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: colors.white.default,
    zIndex: 1,
  },
  directionsInput: {
    width: '100%',
    height: 50,
    position: 'absolute',
    top: 70,
    zIndex: 1,
    left: 0,
    backgroundColor: colors.grey.default,
  },
  smallMapLandscape: {
    flex: 1,
    height: 150,
    width: height,
  },
  smalMapContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  button: {
    marginTop: 20,
    width: 120,
    height: 50,
  },
  buttonSmall: {
    height: 5,
    padding: 2,
  },
  buttonGroup: {
    height: 50,
    width: 220,
  },
  storeListContainer: {
    width: width,
    height: height * 0.75,
    marginTop: height * 0.25,
  },
  storeListContainerLandscape: {
    width: width,
    height: height * 0.8,
    marginTop: height * 0.2,
  },
  overlayGoogleMapStoreCardImageUp: {
    margin: 0,
    padding: 0,
  },
  overlayGoogleMapStoreCard: {
    position: 'absolute',
    bottom: 20,
    left: '5%',
    right: 10,
    width: '90%',
    margin: 0,
    zIndex: 10,
  },
  overlayGoogleMapStoreCardLandscape: {
    position: 'absolute',
    top: 29,
    left: '43.5%',
    right: 10,
    width: '55%',
    margin: 0,
    zIndex: 10,
  },
  overlayGoogleMapSearchBar: {
    position: 'absolute',
    top: 75,
    left: '5%',
    flex: 1,
    padding: 0,
    overflow: 'hidden',
    width: '90%',
    zIndex: 10,
  },
  overlayGoogleMapSearchBarLandscape: {
    position: 'absolute',
    top: 30,
    left: '1.5%',
    flex: 1,
    padding: 0,
    overflow: 'hidden',
    width: '40%',
    zIndex: 10,
  },
  GoogleMapSearchBar: {
    flexDirection: 'row',
    borderColor: colors.turquoise.singlepoint,
    borderWidth: 1,
    borderRadius: 5,
    padding: 0,
    overflow: 'hidden',
    height: 50,
    padding: 0,
    margin: 0,
    backgroundColor: colors.turquoise.singlepoint,
  },
  GoogleMapsMyLocationButton: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    zIndex: 5,
    borderColor: colors.grey.light,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.white.default,
  },
  googleMapsWhiteBox: {
    backgroundColor: colors.white.default,
    width: '75%',
    borderWidth: 0,
    marginTop: Platform.OS === 'ios' ? 0 : -5,
  },
  googleMapsAutoComplete: {
    backgroundColor: colors.white.default,
    width: Platform.OS === 'ios' ? '90%' : '90%',
    borderWidth: 0,
    marginTop: 0,
  },
  googleMapsAutoCompleteDirections: {
    width: '100%',
  },
  googleMapsAutoCompleteFilterButton: {
    marginTop: 20,
    width: 120,
    height: 50,
    width: Platform.OS === 'ios' ? '28%' : '25%',
  },
  googleMapsAutoCompleteSuggestionRow: {
    padding: 10,
    height: 40,
    flexDirection: 'row',
    backgroundColor: colors.white.default,
    zIndex: 999,
  },
  itemsRow: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  counter: {
    backgroundColor: colors.white.default,
    alignItems: 'center',
    marginBottom: 10,
  },
  inlineIconText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingLeft: 20,
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  accordionHeader: {
    height: 40,
    borderTopWidth: 1,
    borderColor: colors.grey.lighterBorder,
    backgroundColor: colors.grey.lighter,
  },
  storeActionButtonsContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 20,
  },
  storeServicesContainer: {
    marginTop: 15,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterServicesContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  divider: {
    marginTop: 10,
    backgroundColor: colors.grey.light,
  },
  storeCardReviewsRow: {
    marginTop: 20,
    paddingRight: 20,
    width: '50%',
    alignItems: 'flex-end',
    height: 40,
  },
  storeCardDirections: {
    position: 'absolute',
    right: -15,
  },
  storeCardDistance: {
    position: 'absolute',
    right: 0,
  },
  storeDetailPage: {
    backgroundColor: colors.white.default,
    height: '100%',
    width: '100%',
    paddingTop: 10,
  },
  storeDetailRating: {
    paddingLeft: 20,
    width: '50%',
    marginTop: 20,
  },
  storeDetailShare: {
    marginTop: 20,
    paddingRight: 20,
    width: '50%',
    alignItems: 'flex-end',
    height: 40,
  },
  directionsButtonGroupContainer: {
    position: 'absolute',
    top: 170,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: 60,
  },
  directionsButtonGroupContainerLandscape: {
    position: 'absolute',
    top: 120,
    left: 0,
    zIndex: 99,
    width: '100%',
    height: 60,
  },
  directionsButtonGroup: {
    borderBottomWidth: 0,
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  switchViewsButtonGroupContainer: {
    width: '40%',
    height: 60,
    position: 'absolute',
    top: 20,
    left: '30%',
    flex: 1,
    padding: 0,
    zIndex: 9,
  },
  switchViewsButtonGroupContainerLandscape: {
    height: 60,
    position: 'absolute',
    top: 30,
    left: '55%',
    flex: 1,
    padding: 0,
    zIndex: 9,
  },
  switchViewsButtonGroup: {
    borderWidth: 1,
    borderColor: colors.turquoise.singlepoint,
    borderRadius: 25,
    width: '90%',
    marginLeft: '5%',
  },
  directionsInfoRow: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  directionsRow: {
    height: 50,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: colors.grey.default,
  },
  directionsRowPortrait: {
    width: '100%',
    left: 0,
  },
  directionsRowLandscape: {
    width: '50%',
    left: 0,
  },
  directionsRowLandscape2: {
    width: '50%',
    left: '50%',
  },
  directionsIconContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default containers;
