/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Card, Image, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { assetsUriPrefix } from '@vodafone/core-redux/constants/boi/Assets';

interface Props {
  label: string;
  image: string;
  redirectTo: string;
  basePath: string;
  enabled: boolean;
}

const MenuCard = (props: Props) => {
  const { label, image, redirectTo, basePath, enabled } = props;
  const enabledClass = enabled ? "menuCard" : "menuCard disabled";
  return (
    <Card as={Link} to={basePath + redirectTo} className={ enabledClass }>
      <Popup
        trigger={
          <Image
            src={
              assetsUriPrefix + image + (enabled ? '-blue.png' : '-grey.png')
            }
            className="menuCardImage"
          />
        }
      >
        Get quotes for comprehensive {label.toLowerCase()} insurance, upload
        your existing policy or manage your insurance.
      </Popup>
      <Card.Content>
        <Card.Header>{label}</Card.Header>
      </Card.Content>
      { !enabled && 
        <Card.Content extra>
          Coming soon
        </Card.Content>
      }
    </Card>
  );
};

export default MenuCard;
