/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Button, Loader, Feed } from 'semantic-ui-react';
import { NearbyStoresRecord, RegionRecord } from '@vodafone/core-redux/maps';

interface Props {
  apiResult: NearbyStoresRecord;
  getNearbyStores: (region: RegionRecord) => any;
}

class NearbyStores extends React.Component<Props> {
  getNearbyStores = () => {
    this.props.getNearbyStores({
      latitude: 51.497542,
      longitude: -0.192353,
      radius: 10,
      locale: 'en',
    });
  };

  render() {
    const { apiResult } = this.props;
    const stores = apiResult.stores
      ? apiResult.stores.map((store, index) => (
          <Feed.Event key={index}>
            <Feed.Label icon="user circle" />
            <Feed.Content>
              <Feed.Summary>{store.contact.name}</Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        ))
      : null;

    return (
      <div>
        <Button primary onClick={this.getNearbyStores}>
          Get stores
        </Button>
        <div className="App-margin-Large">
          {apiResult.stores ? apiResult.stores.length + ' results:' : null}
        </div>
        <div className="App-margin-Large">
          <Loader active={apiResult.loading} inline="centered" />
        </div>
        <div>{apiResult.errorMsg ? 'Error: ' + apiResult.errorMsg : null}</div>
        <Feed>{stores}</Feed>
      </div>
    );
  }
}

export default NearbyStores;
