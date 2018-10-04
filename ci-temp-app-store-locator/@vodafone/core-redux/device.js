/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

// $FlowFixMe
import Config from './config';

import { DeviceActions } from './actions/DeviceActions';
import { DeviceRecord } from './constants/DeviceImmutables';
import DeviceReducer from './reducers/DeviceReducer';

export { DeviceActions, DeviceRecord, DeviceReducer };

export default Config;
