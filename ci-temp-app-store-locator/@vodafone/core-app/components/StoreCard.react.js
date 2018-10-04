/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card, Divider, Button, Div } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { translate } from 'react-i18next';
import { isLandscape } from '../styles/utils/landscape';
import Icon from 'react-native-vector-icons/Ionicons';
import basicStyles from '../styles/basicComponents';
import containers from '../styles/containers';
import typography from '../styles/typography';
import imagesIcons from '../styles/imagesIcons';
import colors from '../styles/colors';

import {
  StoreRecord,
  RegionRecord,
  OriginDestinationRequest,
} from '@vodafone/core-redux/maps';
import Valoration from './Valoration.react';

interface Props {
  t: (text: string) => string;
  i18n: any;
  store: StoreRecord;
  currentLocation: RegionRecord;
  navigation: Object;
  cardList?: boolean;
}

const getOpeningTimes = store => {
  const today = new Date().getDay();
  const day = store.openingDetails[today];
  return day[Object.keys(day)[0]][0];
};

class StoreCard extends React.Component<Props> {
  getCardStyle = () => {
    if (this.props.cardList) {
      return containers.overlayGoogleMapStoreCardImageUp;
    } else {
      return isLandscape()
        ? containers.overlayGoogleMapStoreCardLandscape
        : containers.overlayGoogleMapStoreCard;
    }
  };

  render() {
    const { t, store, currentLocation } = this.props;
    const { navigate } = this.props.navigation;
    const { open, close } = getOpeningTimes(store);
    const hours = close ? close.slice(0, 2) : 0;
    const minutes = close ? close.slice(2, 4) : 0;
    const closes = `${t('store:closing')} ${hours}:${minutes}`;
    const distance = store.distance.value > 0 ? store.distance.text : null;
    const directionsButton = currentLocation ? (
      <Button
        title={t('store:directions')}
        textStyle={typography.buttonSmallText}
        buttonStyle={basicStyles.buttonSmall}
        containerStyle={containers.buttonSmall}
        onPress={() => navigate('Directions', { store: store })}
      />
    ) : null;

    return (
      <Card containerStyle={this.getCardStyle()}>
        {!this.props.cardList ? (
          <View style={containers.itemsRow}>
            <Text style={typography.storeCardOpen}>{t('store:open')}</Text>
            <View style={containers.storeCardDirections}>
              {directionsButton}
            </View>
          </View>
        ) : (
          <Image
            style={
              isLandscape()
                ? imagesIcons.storeCardImageLandscape
                : imagesIcons.storeCardImage
            }
            source={{ uri: store.contact.image }}
          />
        )}
        <View style={this.props.cardList ? { padding: 16 } : null}>
          <View style={containers.itemsRow}>
            <Text style={typography.storeCardTitle}>{store.contact.name}</Text>
            <View style={containers.storeCardDistance}>
              <Text style={typography.storeCardDistance}>{distance} </Text>
              <Text style={typography.storeCardDetailsButton}>
                <Icon
                  name="ios-arrow-forward"
                  size={28}
                  color={colors.grey.light}
                  style={imagesIcons.storeCardArrowIcon}
                  onPress={() => navigate('Details', { store: store })}
                />
              </Text>
            </View>
          </View>
          <View style={containers.itemsRow}>
            <View style={typography.storeCardInfoRow}>
              <Icon
                color={colors.grey.light}
                size={20}
                name="ios-pin-outline"
                style={
                  (imagesIcons.storeInfoIcons, imagesIcons.storeLocationIcon)
                }
              />
              <Text style={typography.storeInfo}>{store.contact.address}</Text>
            </View>
            {this.props.cardList ? (
              <Text style={typography.storeCardOpen}>{t('store:open')}</Text>
            ) : null}
          </View>
          <View style={typography.storeCardInfoRow}>
            <Icon
              color={colors.grey.light}
              size={20}
              name="ios-call-outline"
              style={(imagesIcons.storeInfoIcons, imagesIcons.storeCallIcon)}
            />
            <Text style={typography.storeInfo}>{store.contact.storePhone}</Text>
            <Text style={typography.storeCardCloses}>{closes}</Text>
          </View>
          <Divider style={containers.divider} />
          <View style={containers.itemsRow}>
            <View style={typography.storeCardRating}>
              <Valoration value={store.rating ? store.rating : null} />
            </View>
            <View style={containers.storeCardReviewsRow}>
              <Text style={typography.storeCardReviews}>
                {store.reviews ? `${store.reviews} ${t('store:reviews')}` : ''}
              </Text>
            </View>
          </View>
        </View>
        {!this.props.cardList ? (
          <Image
            style={
              isLandscape()
                ? imagesIcons.storeCardImageLandscape
                : imagesIcons.storeCardImage
            }
            source={{ uri: store.contact.image }}
          />
        ) : null}
      </Card>
    );
  }
}

export default translate(['store', 'common'], { wait: true })(
  withNavigation(StoreCard),
);
