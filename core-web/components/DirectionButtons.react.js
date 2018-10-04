/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';
import { GoogleMapDirectionsRecord } from '@vodafone/core-redux/maps';

interface Props {
  t: (text: string) => string;
  directionsRecord: GoogleMapDirectionsRecord;
  selectedTransportMode: number;
  updateTransportMode: (transportIndex: number) => any;
}

const DirectionButtons = (props: Props) => {
  const { t, directionsRecord, selectedTransportMode } = props;
  return directionsRecord.coordinates || directionsRecord.loading ? (
    <Button.Group className="transportModeButtons">
      <Button
        active={selectedTransportMode === 0}
        loading={directionsRecord.loading}
        onClick={() => props.updateTransportMode(0)}
      >
        {t('store:walk')}
      </Button>
      <Button
        active={selectedTransportMode === 1}
        loading={directionsRecord.loading}
        onClick={() => props.updateTransportMode(1)}
      >
        {t('store:car')}
      </Button>
      <Button
        active={selectedTransportMode === 2}
        loading={directionsRecord.loading}
        onClick={() => props.updateTransportMode(2)}
      >
        {t('store:train')}
      </Button>
      <Button
        active={selectedTransportMode === 3}
        loading={directionsRecord.loading}
        onClick={() => props.updateTransportMode(3)}
      >
        {t('store:cycle')}
      </Button>
    </Button.Group>
  ) : null;
};

export default translate(['store', 'common'], { wait: true })(DirectionButtons);
