/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Rating } from 'semantic-ui-react';

interface Props {
  value: number | null;
}

const Valoration = (props: Props) => {
  const { value } = props;
  if (!value) {
    return null;
  }
  return (
    <div>
      <span>{value}</span>
      <Rating defaultRating={value} maxRating={5} disabled />
    </div>
  );
};

export default Valoration;
