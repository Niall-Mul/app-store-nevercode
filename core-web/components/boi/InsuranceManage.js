/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Link } from 'react-router-dom';
import ButtonGroupCard from './../ButtonGroupCard';
import { ManagePolicy } from '../../config/buttonLinksConfig';

interface Props {
    quoteType: string;
    className?: string;
}

class InsuranceManage extends React.Component<Props> {
  render() {
  const { className, quoteType } = this.props;

  return (
    <ButtonGroupCard className={className} quoteType={quoteType} buttonLinks={ManagePolicy[this.props.quoteType]} />
  );
  }
}

export default InsuranceManage;
