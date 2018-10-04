/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import _ from 'lodash';
import React from 'react';
import { Search } from 'semantic-ui-react';
import InputContainer from './InputContainer';

interface Props {
  searchOptions: Object[];
  label: string;
  selected: string;
  handleResultSelected: (value: string) => any;
}

interface State {
  isLoading: boolean;
  value: any;
  results: Object[];
}

class SearchInput extends React.Component<Props, State> {
  state = {
    isLoading: false,
    value: '',
    results: [],
  };

  componentWillReceiveProps(nextProps: any) {
    this.setState({ value: nextProps.selected });
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (event: Event, { result }: Object) => {
    this.setState({ value: result.title });
    this.props.handleResultSelected(result.title);
  };
  handleSearchChange = (event: Event, { value }: Object) => {
    this.setState({ isLoading: true, value: value });

    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.searchOptions, isMatch),
      });
    }, 300);
  };

  render() {
    const { label } = this.props;
    const { isLoading, results, value } = this.state;

    return (
      <InputContainer label={label}>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true,
          })}
          results={results}
          name="search"
          value={value}
        />
      </InputContainer>
    );
  }
}

export default SearchInput;
