/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Button, Loader, Feed } from 'semantic-ui-react';
import { HelloApiResults } from '@vodafone/core-redux';

interface Props {
  apiResult: HelloApiResults;
  getHelloApiResults: () => any;
}

const HelloApi = (props: Props) => {
  const { apiResult } = props;
  const records =
    apiResult && apiResult.records
      ? apiResult.records.map((todo, index) => (
          <Feed.Event>
            <Feed.Label icon="user circle" />
            <Feed.Content>
              <Feed.Date content={todo.dateOfVisit} />
              <Feed.Summary>{todo.name}</Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        ))
      : null;
  return (
    <div>
      <Button primary onClick={props.getHelloApiResults}>
        Invoke SpringBoot API
      </Button>
      <div className="App-margin-Large">
        {apiResult.records ? apiResult.records.length + ' results:' : null}
      </div>
      <div className="App-margin-Large">
        <Loader active={apiResult.loading} inline="centered" />
      </div>
      <div>{apiResult.errorMsg ? 'Error: ' + apiResult.errorMsg : null}</div>
      <Feed>{records}</Feed>
    </div>
  );
};

export default HelloApi;
