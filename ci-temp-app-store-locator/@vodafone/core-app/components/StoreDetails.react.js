/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Header, Button } from 'react-native-elements';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import MapView from 'react-native-maps';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import { translate } from 'react-i18next';
import { isLandscape } from '../styles/utils/landscape';

import GoogleMapMarker from './GoogleMapMarker.react.js';
import Valoration from './Valoration.react.js';
import typography from '../styles/typography';
import colors from '../styles/colors';
import containers from '../styles/containers';
import basicComponents from '../styles/basicComponents';
import imagesIcons from '../styles/imagesIcons';

interface Props {
  t: (text: string) => string;
  i18n: any;
  navigation: any;
}

interface State {
  timesCollapsed: boolean;
  propsCollapsed: boolean;
}

export class StoreDetails extends React.Component<Props, State> {
  scroll: ?ScrollView;

  static navigationOptions = {
    title: 'screen',
  };

  state = {
    timesCollapsed: false,
    propsCollapsed: false,
  };

  formatTime = (time: string) => {
    const hours = time ? time.slice(0, 2) : 0;
    const minutes = time ? time.slice(2, 4) : 0;
    return `${hours}:${minutes}`;
  };

  render() {
    const { navigation, t } = this.props;
    const store = navigation.getParam('store', {});
    const storeRegion = {
      latitude: store.geometry.coordinates[1],
      longitude: store.geometry.coordinates[0],
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    const openingTimes = store.openingDetails.map((day, index) => {
      const { open, close } = day[Object.keys(day)[0]][0];
      const opening = this.formatTime(open);
      const closing = this.formatTime(close);

      return (
        <View key={index} style={containers.itemsRow}>
          <Text style={typography.textColumnLeft}>
            {t('common:' + Object.keys(day)[0])}:
          </Text>
          <Text style={typography.textColumnRight}>
            {opening} - {closing}
          </Text>
        </View>
      );
    });

    const services = Object.keys(store.properties).map((prop, index) => {
      if (typeof store.properties[prop] === 'boolean') {
        return (
          <Text
            key={index}
            style={
              store.properties[prop]
                ? basicComponents.redTextBox
                : basicComponents.greyTextBox
            }
          >
            {t('store:' + prop)}
          </Text>
        );
      } else {
        return null;
      }
    });

    return (
      <View style={containers.storeDetailPage}>
        <Header
          backgroundColor={colors.white.default}
          leftComponent={
            <Icon
              name="ios-arrow-back"
              size={36}
              iconStyle={{ lineHeight: 24 }}
              onPress={() => navigation.goBack()}
            />
          }
          centerComponent={
            <Text style={{ fontSize: 20 }}>{t('store:store_detail')}</Text>
          }
        />
        <ScrollView
          ref={scroll => (this.scroll = scroll)}
          onContentSizeChange={() =>
            this.scroll ? this.scroll.scrollToEnd({ animated: true }) : null
          }
        >
          <View style={containers.itemsRow}>
            <View style={containers.storeDetailRating}>
              <Valoration value={store.rating ? store.rating : null} />
            </View>
            <View style={containers.storeDetailShare}>
              <Icon name="md-share" size={20} color={colors.black.default} />
            </View>
          </View>
          <Text style={typography.storeDetailTitle}>{store.contact.name}</Text>
          <View style={containers.smalMapContainer}>
            <MapView
              style={
                isLandscape()
                  ? containers.smallMapLandscape
                  : containers.smallMap
              }
              region={storeRegion}
            >
              <GoogleMapMarker
                store={store}
                onPress={() => console.log('Pressed marker')}
              />
            </MapView>
          </View>
          <View style={containers.inlineIconText}>
            <Icon
              size={20}
              color={colors.black.default}
              name="ios-pin-outline"
              style={
                (imagesIcons.storeInfoIcons, imagesIcons.storeLocationIcon)
              }
            />
            <Text style={typography.storeInfo}>{store.contact.address}</Text>
          </View>
          <View style={containers.inlineIconText}>
            <Icon
              size={20}
              color={colors.black.default}
              name="ios-call-outline"
              style={(imagesIcons.storeInfoIcons, imagesIcons.storeCallIcon)}
            />
            <Text style={typography.storeInfo}>{store.contact.storePhone}</Text>
          </View>
          <View style={containers.storeActionButtonsContainer}>
            <Button
              buttonStyle={basicComponents.redButton}
              textStyle={{ fontSize: 16 }}
              title={t('store:call')}
              onPress={() =>
                Communications.phonecall(store.contact.storePhone, true)
              }
            />
            <Button
              buttonStyle={basicComponents.redButton}
              textStyle={{ fontSize: 16 }}
              title={t('store:directions')}
              onPress={() =>
                navigation.navigate('Directions', { store: store })
              }
            />
          </View>
          <Collapse
            isCollapsed={this.state.timesCollapsed}
            onToggle={isCollapsed =>
              this.setState({ timesCollapsed: isCollapsed })
            }
          >
            <CollapseHeader style={containers.accordionHeader}>
              <View style={containers.itemsRow}>
                <Text style={typography.accordionHeaderTitle}>
                  {t('store:opening_times')}
                </Text>
                <Icon
                  name={
                    this.state.timesCollapsed
                      ? 'ios-arrow-up'
                      : 'ios-arrow-down'
                  }
                  size={32}
                  iconStyle={{
                    lineHeight: 40,
                  }}
                />
              </View>
            </CollapseHeader>
            <CollapseBody>{openingTimes}</CollapseBody>
          </Collapse>
          <Collapse
            isCollapsed={this.state.propsCollapsed}
            onToggle={isCollapsed =>
              this.setState({ propsCollapsed: isCollapsed })
            }
          >
            <CollapseHeader style={containers.accordionHeader}>
              <View style={containers.itemsRow}>
                <Text style={typography.accordionHeaderTitle}>
                  {t('store:services')}
                </Text>
                <Icon
                  name={
                    this.state.propsCollapsed
                      ? 'ios-arrow-up'
                      : 'ios-arrow-down'
                  }
                  size={32}
                  iconStyle={{
                    lineHeight: 40,
                  }}
                />
              </View>
            </CollapseHeader>
            <CollapseBody style={containers.storeServicesContainer}>
              {services}
            </CollapseBody>
          </Collapse>
        </ScrollView>
      </View>
    );
  }
}

export default translate(['store', 'common'], { wait: true })(StoreDetails);
