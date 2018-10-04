/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import CounterComp from './CounterComp';

interface Props {
  label: string;
  className?: string;
}

const PlaceholderSFC = ((props: Props) => {
  return (
    <Container textAlign="left" className={props.className || ''}>
      <Header as="h1">{props.label}</Header>
      <CounterComp/>
    </Container>
  );
});

export default PlaceholderSFC;
