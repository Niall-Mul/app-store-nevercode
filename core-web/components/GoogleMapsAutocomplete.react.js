/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import _ from 'underscore';
import React from 'react';
import { Button, Search, Container, Icon } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import LocaleDetector from '../i18n/i18nLocaleDetector';
import {
  RegionRecord,
  AutocompleteSuggestionsRecord,
  AutoCompleteQuery,
  SuggestionDetailsQuery,
  AutocompleteSuggestionRecord,
} from '@vodafone/core-redux/maps';

const MarkerDefault = require('../../core-web-css/src/themes/vodafone/assets/marker-blue-30p.png');

interface Props {
  t: (text: string) => string;
  i18n: any;
  region: RegionRecord;
  suggestions: AutocompleteSuggestionsRecord[];
  isLoading: boolean;
  query: string;
  moveRight?: boolean;
  getSuggestions: (query: AutoCompleteQuery) => any;
  onSelectSuggestion: (query: SuggestionDetailsQuery) => any;
}

interface State {
  modalVisible: boolean;
}

class GoogleMapsAutocomplete extends React.Component<Props, State> {
  state = {
    modalVisible: false,
  };

  onChangeText = (e, query) => {
    const { region } = this.props;
    this.props.getSuggestions({
      query: query.value,
      region,
      locale: LocaleDetector.detect(),
      includeStores: true,
    });
  };

  resetQuery = () => {
    const { region } = this.props;
    this.props.getSuggestions({
      query: '',
      region,
      locale: LocaleDetector.detect(),
      includeStores: true,
    });
  };

  onPressSuggestion = (e, suggestion) => {
    this.props.onSelectSuggestion({
      suggestion: suggestion.result.suggestion,
      locale: LocaleDetector.detect(),
    });
  };

  toggleModal = (visible: boolean) => {
    this.setState({ modalVisible: visible });
  };

  onPressFilter = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  resultRenderer = (props: {
    title: string,
    place_id: string,
    suggestion: AutocompleteSuggestionRecord,
  }) => {
    const { title, suggestion } = props;
    const storeIcon =
      suggestion.types && suggestion.types[0] === 'vodafone-store' ? (
        <span>
          <Icon size="large" color="red" name="map marker alternate" />{' '}
        </span>
      ) : null;
    return (
      <div>
        {storeIcon}
        {title}
      </div>
    );
  };

  render() {
    const { t, suggestions, isLoading, query } = this.props;
    const suggestionRecords = suggestions
      ? suggestions.map((suggestion, index) => {
          const picture = null;
          return {
            title: suggestion.description,
            place_id: suggestion.place_id || suggestion.id,
            suggestion,
          };
        })
      : [];

    return (
      <Container>
        <div
          className={
            'googleMapsAutoComplete' +
            (this.props.moveRight ? ' googleMapsAutoCompleteRightPosition' : '')
          }
        >
          <Button className="filter-button" onClick={this.onPressFilter}>
            {t('map:filter')}
          </Button>
          <Icon name="search" className="search-icon" />
          <Search
            loading={isLoading}
            placeholder={t('map:find_a_store')}
            onSearchChange={_.debounce(this.onChangeText, 500, {
              leading: true,
            })}
            resultRenderer={this.resultRenderer}
            onResultSelect={this.onPressSuggestion}
            value={query}
            results={suggestionRecords}
            showNoResults={false}
            icon={null}
          />
          <Button icon className="clear-button" onClick={this.resetQuery}>
            <Icon name="close" />
          </Button>
        </div>
      </Container>
    );
  }
}

export default translate(['map', 'common'], { wait: true })(
  GoogleMapsAutocomplete,
);
