/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Image } from 'semantic-ui-react';
import { assetsUriPrefix } from '@vodafone/core-redux/constants/boi/Assets';
import ButtonGroupCard from './../ButtonGroupCard';

interface Props {
  quoteType: string;
  className?: string;
}

class InsurancePage extends React.Component<Props> {
  render() {
    const { className, quoteType } = this.props;
    const buttonLinks = [
      {content: 'Get Quotes', linkTo:`${quoteType}-insurance/quotes`, background:'blue'},
      {content: 'Upload Existing Policy', linkTo: '#', background:'white'},
      {content:'Manage My Insurance', linkTo: `${quoteType}-insurance/manage` , background:'white'},
    ];

    return (
      <ButtonGroupCard className={className} quoteType={quoteType} buttonLinks={buttonLinks} />
    );
  }
}

export default InsurancePage;
