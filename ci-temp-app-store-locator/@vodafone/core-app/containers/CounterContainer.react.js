/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { connect } from 'react-redux';

import { CounterActions } from '@vodafone/core-redux';
import { CounterRecord } from '@vodafone/core-redux';

import Counter from '../components/Counter.react';

const { increaseCounter } = CounterActions;

interface StateProps {
  counter: CounterRecord;
}
interface DispatchProps {
  increaseCounter: () => any;
}
export interface Props extends StateProps, DispatchProps {}

const mapStateToProps = (
  state: any,
  ownProps: any,
): {
  counter: CounterRecord,
} => {
  return { counter: state.CounterReducer };
};

const mapDispatchToProps = {
  increaseCounter,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);
