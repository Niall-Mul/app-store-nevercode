/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { connect } from 'react-redux';
import {
  NearbyStoreActions,
  NearbyStoresRecord,
} from '@vodafone/core-redux/maps';
import NearbyStores from '../components/NearbyStores.react';

const { getNearbyStores } = NearbyStoreActions;

interface StateProps {
  apiResult: NearbyStoresRecord;
}
interface DispatchProps {
  getNearbyStores: () => any;
}
export interface Props extends StateProps, DispatchProps {}

const mapStateToProps = (
  state: any,
  ownProps: any,
): {
  apiResult: NearbyStoresRecord,
} => {
  return { apiResult: state.NearbyStoresReducer };
};

const mapDispatchToProps = {
  getNearbyStores,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NearbyStores);
