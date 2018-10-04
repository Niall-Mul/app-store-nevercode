/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Grid, Icon, Label, Image } from 'semantic-ui-react';
import { assetsUriPrefix } from '@vodafone/core-redux/constants/boi/Assets';

interface Props {
  termsAndConditions: boolean;
  handleClick: () => any;
}

const TermsAndConditions = (props: Props) => {
  const { termsAndConditions, handleClick } = props;
  return (
    <Grid>
      <Grid.Row style={{ paddingBottom: 0 }}>
        <Grid.Column textAlign="left">
          <a className="listLink" style={{ color: '#0486b0' }}>
            Read Terms and Conditions
            <Image
              src={assetsUriPrefix + 'assets/external-link-hover.png'}
              className="externalLinkIcon"
            />
          </a>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={14} textAlign="left">
          <Label
            style={{
              background: 'transparent',
              paddingLeft: 0,
            }}
          >
            I agree to the Terms and Conditions
          </Label>
        </Grid.Column>
        <Grid.Column
          width={2}
          textAlign="right"
          style={{ color: '#0486b0', marginTop: 5 }}
        >
          <Icon
            name={'circle outline' + (termsAndConditions ? ' check' : '')}
            onClick={handleClick}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TermsAndConditions;
