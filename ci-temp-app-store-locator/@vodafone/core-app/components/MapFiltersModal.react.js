/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import {
  View,
  Modal,
  Text,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import { translate } from 'react-i18next';
import { Header, CheckBox, Slider, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import SwitchButton from './SwitchButton.react.js';
import basicComponents from '../styles/basicComponents';
import containers from '../styles/containers';
import colors from '../styles/colors';
import typography from '../styles/typography';

interface Props {
  t: (text: string) => string;
  closeAction: () => any;
}

interface State {
  servicesCollapsed: boolean;
  openingTimesCollapsed: boolean;
  distanceCollapsed: boolean;
  servicesSelected: {
    broadband: boolean,
    business_advisor: boolean,
    franchise: boolean,
    recharge_point: boolean,
    tech_team: boolean,
    trade_in: boolean,
    top_up: boolean,
  };
  openStores: boolean;
  distance: number;
}

const servicesList = {
  broadband: { isAvailable: true, label: 'Broadband' },
  bizAdvisor: { isAvailable: false, label: 'Business Advisor' },
  franchise: { isAvailable: false, label: 'Franchise' },
  rechargePoint: { isAvailable: true, label: 'Recharge Point' },
  techTeam: { isAvailable: true, label: 'Tech Team' },
  tradeIn: { isAvailable: true, label: 'Trade In' },
  topUp: { isAvailable: true, label: 'Top Up' },
};

class MapFiltersModal extends React.Component<Props, State> {
  scroll: ?ScrollView;

  state = {
    servicesCollapsed: true,
    openingTimesCollapsed: true,
    distanceCollapsed: true,
    servicesSelected: {
      broadband: false,
      business_advisor: false,
      franchise: false,
      recharge_point: false,
      tech_team: false,
      trade_in: false,
      top_up: false,
    },
    openStores: false,
    distance: 0,
  };

  showResults = () => {
    console.log('show results clicked !');
    this.props.closeAction();
  };

  render() {
    const { t, closeAction } = this.props;
    const servicesFilters = Object.keys(servicesList).map((service, index) => {
      return (
        <SwitchButton
          key={index}
          text={t(`store:${service}`)}
          toggle={() => console.log(service + 'toggled !')}
          width="33%"
        />
      );
    });

    return (
      <View style={containers.overlay90}>
        <Header
          outerContainerStyles={{ paddingTop: 0 }}
          backgroundColor={colors.white.default}
        >
          <TouchableHighlight
            onPress={() => {
              closeAction();
            }}
          >
            <Text style={{ color: colors.red.default }}>
              {t('store:close')}
            </Text>
          </TouchableHighlight>
          <Text>{t('map:filter')}</Text>
          <TouchableHighlight
            onPress={() => {
              console.log('reset filters');
            }}
          >
            <Text style={{ color: colors.red.default, marginLeft: 10 }}>
              {t('store:reset')}
            </Text>
          </TouchableHighlight>
        </Header>
        <ScrollView
          ref={scroll => (this.scroll = scroll)}
          onContentSizeChange={() =>
            this.scroll ? this.scroll.scrollToEnd({ animated: true }) : null
          }
        >
          <Collapse
            isCollapsed={!this.state.servicesCollapsed}
            onToggle={isCollapsed =>
              this.setState({ servicesCollapsed: !isCollapsed })
            }
          >
            <CollapseHeader style={containers.accordionHeader}>
              <View style={containers.itemsRow}>
                <Text style={typography.accordionHeaderTitle}>
                  {t('store:services').toUpperCase()}
                </Text>
                <Icon
                  name={
                    this.state.servicesCollapsed
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
            <CollapseBody style={containers.filterServicesContainer}>
              <SwitchButton
                text={t('store:all')}
                width="33%"
                toggle={() => console.log('All !')}
              />
              {servicesFilters}
            </CollapseBody>
          </Collapse>
          <Collapse
            isCollapsed={!this.state.openingTimesCollapsed}
            onToggle={isCollapsed =>
              this.setState({ openingTimesCollapsed: !isCollapsed })
            }
          >
            <CollapseHeader style={containers.accordionHeader}>
              <View style={containers.itemsRow}>
                <Text style={typography.accordionHeaderTitle}>
                  {t('store:opening_times').toUpperCase()}
                </Text>
                <Icon
                  name={
                    this.state.openingTimesCollapsed
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
            <CollapseBody style={{ height: 100 }}>
              <CheckBox
                title={t('store:show_open_stores')}
                iconType="material"
                checkedIcon="check-box"
                uncheckedIcon="check-box-outline-blank"
                checked={this.state.openStores}
                onPress={() =>
                  this.setState({ openStores: !this.state.openStores })
                }
              />
            </CollapseBody>
          </Collapse>
          <Collapse
            isCollapsed={!this.state.distanceCollapsed}
            onToggle={isCollapsed =>
              this.setState({ distanceCollapsed: !isCollapsed })
            }
          >
            <CollapseHeader style={containers.accordionHeader}>
              <View style={containers.itemsRow}>
                <Text style={typography.accordionHeaderTitle}>
                  {t('store:distance').toUpperCase()}
                </Text>
                <Icon
                  name={
                    this.state.distanceCollapsed
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
            <CollapseBody>
              <View
                style={{
                  flex: 1,
                  alignItems: 'stretch',
                  justifyContent: 'center',
                  padding: 30,
                }}
              >
                <Slider
                  minimumValue={0}
                  maximumValue={50}
                  step={1}
                  value={this.state.distance}
                  thumbTintColor={colors.red.default}
                  minimumTrackTintColor={colors.red.default}
                  onValueChange={value => this.setState({ distance: value })}
                />
                <Text>
                  {t('store:distance')}: {this.state.distance}
                </Text>
              </View>
            </CollapseBody>
          </Collapse>
          <View>
            <Button
              title={t('store:show_results')}
              textStyle={typography.buttonText}
              buttonStyle={[basicComponents.button, { marginTop: 50 }]}
              containerStyle={containers.button}
              onPress={this.showResults}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default translate(['store', 'map'], { wait: true })(MapFiltersModal);
