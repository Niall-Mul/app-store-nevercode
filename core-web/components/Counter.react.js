/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Button, Header, Icon } from 'semantic-ui-react';
import { CounterRecord } from '@vodafone/core-redux';

interface Props {
  counter: CounterRecord;
  increaseCounter: () => any;
}

const Counter = (props: Props) => (
  <div style={{ paddingTop: 20 + 'px' }}>
    <Header as="h2">
      <Icon name="stopwatch" /> {props.counter ? props.counter.value : 0}
    </Header>
    <Button primary onClick={props.increaseCounter}>
      Increase
    </Button>
  </div>
);

export default Counter;
