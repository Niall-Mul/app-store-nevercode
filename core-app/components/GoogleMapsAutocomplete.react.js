/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  PixelRatio,
  Dimensions,
  StyleSheet,
  Modal,
} from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { translate } from 'react-i18next';
import LocaleDetector from '../i18n/i18nLocaleDetector';
import { isLandscape } from '../styles/utils/landscape';

import _ from 'underscore';

import { basicComponents, containers, typography, colors } from '../styles';

import {
  RegionRecord,
  AutocompleteSuggestionsRecord,
  AutocompleteSuggestionRecord,
  AutoCompleteQuery,
  SuggestionDetailsQuery,
} from '@vodafone/core-redux/maps';
import MapFiltersModal from './MapFiltersModal.react.js';

interface Props {
  t: (text: string) => string;
  i18n: any;
  region: RegionRecord;
  suggestions: AutocompleteSuggestionsRecord[];
  isLoading: boolean;
  query: string;
  getSuggestions: (query: AutoCompleteQuery) => any;
  onSelectSuggestion: (query: SuggestionDetailsQuery) => any;
}

interface State {
  modalVisible: boolean;
}

const WINDOW = Dimensions.get('window');

class GoogleMapsAutocomplete extends React.Component<Props, State> {
  state = {
    modalVisible: false,
  };

  onChangeText = (query: String) => {
    const { region } = this.props;
    this.props.getSuggestions({
      query,
      region,
      locale: LocaleDetector.detect(),
      includeStores: true,
    });
  };

  onPressSuggestion = (suggestion: AutocompleteSuggestionRecord) => {
    console.info('onPressSuggestion: %o', suggestion);
    this.props.onSelectSuggestion({
      suggestion,
      locale: LocaleDetector.detect(),
    });
  };

  toggleModal = (visible: boolean) => {
    this.setState({ modalVisible: visible });
  };

  onPressFilter = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  render() {
    const { t, i18n, region, suggestions, isLoading, query } = this.props;
    const suggestionOptions = suggestions
      ? suggestions.map((suggestion, index) => {
          const storeIcon =
            suggestion.types && suggestion.types[0] === 'vodafone-store' ? (
              <Text>
                <Icon color={colors.red.default} size={20} name="ios-pin" />{' '}
              </Text>
            ) : null;
          return (
            <TouchableHighlight
              key={index}
              style={{}}
              onPress={() => this.onPressSuggestion(suggestion)}
              underlayColor={'#c8c7cc'}
            >
              <View style={[containers.googleMapsAutoCompleteSuggestionRow]}>
                <Text
                  style={typography.searchBarSuggestionText}
                  numberOfLines={1}
                >
                  {storeIcon}
                  {suggestion.description}
                </Text>
              </View>
            </TouchableHighlight>
          );
        })
      : null;

    return (
      <View
        style={
          isLandscape()
            ? containers.overlayGoogleMapSearchBarLandscape
            : containers.overlayGoogleMapSearchBar
        }
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.toggleModal(!this.state.modalVisible)}
        >
          <View>
            <MapFiltersModal
              closeAction={() => this.toggleModal(!this.state.modalVisible)}
            />
          </View>
        </Modal>
        <View style={containers.GoogleMapSearchBar}>
          <Button
            title={t('map:filter')}
            textStyle={typography.buttonText}
            buttonStyle={basicComponents.googleMapsAutocompleteButton}
            containerStyle={containers.googleMapsAutoCompleteFilterButton}
            onPress={() => this.toggleModal(true)}
          />
          <View style={containers.googleMapsWhiteBox}>
            <SearchBar
              showLoadingIcon={isLoading}
              clearIcon={{
                name: 'clear',
                color: colors.grey.default,
                marginLeft: -30,
              }}
              searchIcon={{ name: 'search' }}
              placeholder={t('map:find_a_store')}
              onChangeText={_.debounce(this.onChangeText, 500, {
                leading: true,
              })}
              value={query}
              containerStyle={containers.googleMapsAutoComplete}
              inputStyle={typography.searchBarText}
              lightTheme
            />
          </View>
        </View>
        {suggestionOptions}
      </View>
    );
  }
}

export default translate(['map', 'common'], { wait: true })(
  GoogleMapsAutocomplete,
);
