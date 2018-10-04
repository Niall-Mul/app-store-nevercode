/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import { Button, Statistic } from 'semantic-ui-react';
import { CounterActions } from '@vodafone/core-redux/actions/boi/CounterActions';
import { Counter } from '@vodafone/core-redux/constants/boi/CounterImmutables';

const { increaseCounter, persistCounter } = CounterActions;

interface StateProps {
  counter: Counter;
}
interface DispatchProps {
  increaseCounter: () => any;
  persistCounter: () => any;
}
export interface Props extends StateProps, DispatchProps {}

const mapStateToProps = (
  state: any,
  ownProps: any,
): {
  counter: Counter,
} => {
  return { counter: state.CounterReducer };
};

const mapDispatchToProps = {
  increaseCounter,
  persistCounter,
};

class CounterComp extends React.Component<Props> {
  render() {
    const { counter } = this.props;
    return (
      <div>
        <div>
          <Statistic>
            <Statistic.Value>{counter.value}</Statistic.Value>
            <Statistic.Label>Clicks</Statistic.Label>
          </Statistic>
        </div>
        <Button primary size="small" onClick={this.props.increaseCounter}>
          Increase
        </Button>
        <Button
          secondary
          toggle
          active={counter.persisted}
          onClick={this.props.persistCounter}
        >
          {counter.persisted ? 'Persisted' : 'Not Persisted'}
        </Button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CounterComp);
