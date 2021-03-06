/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { connect } from 'react-redux';
import { HelloApiActions, HelloApiResults } from '@vodafone/core-redux';

import HelloApi from '../components/HelloApi.react';

const { getHelloApiResults, clearResults } = HelloApiActions;

interface StateProps {
  apiResult: HelloApiResults;
}
interface DispatchProps {
  getHelloApiResults: () => any;
  clearResults: () => any;
}
export interface Props extends StateProps, DispatchProps {}

const mapStateToProps = (
  state: any,
  ownProps: any,
): {
  apiResult: HelloApiResults,
} => {
  return { apiResult: state.HelloApiReducer };
};

const mapDispatchToProps = {
  getHelloApiResults,
  clearResults,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HelloApi);
