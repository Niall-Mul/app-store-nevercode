/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Link } from 'react-router-dom';
import ButtonGroupCard from './../ButtonGroupCard';
import { DriverDetails } from '../../config/buttonLinksConfig';

interface Props {
    quoteType: string;
    className?: string;
}

class CarInsuranceDriverDetails extends React.Component<Props> {
  render() {
  const { className, quoteType } = this.props;

  return (
    <ButtonGroupCard className={className} quoteType={quoteType} buttonLinks={DriverDetails} />
  );
  }
}

export default CarInsuranceDriverDetails;
