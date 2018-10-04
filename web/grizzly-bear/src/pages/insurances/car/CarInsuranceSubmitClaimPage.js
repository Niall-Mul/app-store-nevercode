/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Icon, List, Form } from 'semantic-ui-react';

import Page from '../../Page';
import * as config from '../../../config';

import Spacer from '@vodafone/core-web/components/Spacer.react';
import AttachPhotoButton, { AttachPhotoField } from '@vodafone/core-web/components/AttachPhotoButton.react';


export interface State {
  photo?: any;
}


export default class CarInsuranceSubmitClaimPage extends React.Component<{}, State> {
  state = {};

  attachPhotoFields: AttachPhotoField[] = [
    {name: 'sceneOfIncident', label: 'SCENE OF INCIDENT', value: ''},
    {name: 'otherCar', label: 'OTHER CAR', value: ''},
  ];

  onAttachPhotoFinished = (result: any) => {
    this.setState({ photo: result });
  }

  renderButtons() {
    return (
      <Page>
        <Button.Group vertical fluid>
          <Button
            as={'a'}
            fluid
            icon
            size="huge"
            href={`tel:${config.callUsPhoneNumber}`}
            className="defaultButton whiteBackground"
            labelPosition="right">
            CALL US
            <Icon name="phone" right />
          </Button>
        </Button.Group>

        <Spacer />
        or
        <Spacer size="small" />
        Call our 24 Hour Emergency Help Line
        <Spacer />

        <Button.Group vertical fluid>
          <Button
            as={'a'}
            fluid
            icon
            size="huge"
            href={`tel:${config.emergencyHelplinePhoneNumber}`}
            className="defaultButton whiteBackground"
            labelPosition="right">
            Emergency Helpline
            <Icon name="phone" right />
          </Button>
        </Button.Group>
      </Page>
    );
  }

  renderLists() {
    return (
      <Container textAlign="left">
        <Spacer />
        <div className="listTitle">Important things to do if involved in an accident:</div>

        <List as="ul">
          <List.Item as="li">Exchange insurance details with the other driver(s)</List.Item>
          <List.Item as="li">Exchange contact details with the other driver(s)</List.Item>
          <List.Item as="li">Report the incident to the local garda station</List.Item>
        </List>

        <Spacer />
        <div className="listTitle">If possible, take photos, including:</div>

        <List as="ul">
          <List.Item as="li">Your Car</List.Item>
          <List.Item as="li">Other Car(s)</List.Item>
          <List.Item as="li">Other Driver Car Insurance disc(s)</List.Item>
          <List.Item as="li">Scene of the accident</List.Item>
          <List.Item as="li">Location</List.Item>
        </List>
      </Container>
    );
  }

  renderAttachmentField() {
    let attachPhotoButton = <AttachPhotoButton fields={this.attachPhotoFields} onFinished={this.onAttachPhotoFinished} />;

    if (!this.state.photo) {
      return attachPhotoButton;
    }

    return (
      <div>
        {attachPhotoButton}
        <Spacer />
        <Button.Group vertical fluid>
          <Button
            fluid
            icon
            size="huge"
            className="defaultButton whiteBackground"
            labelPosition="right">
              File 1
              <Icon name="check square outline" size="big" right />
          </Button>
        </Button.Group>
      </div>
    );
  }

  render() {
    return (
      <Page textAlign="center" className="SP-InsurancePage quoteContainer">
        <Spacer size="huge" />
        {this.renderButtons()}
        {this.renderLists()}

        <Spacer />
        {this.renderAttachmentField()}
        <Spacer />
        <Button.Group vertical fluid>
          <Button
            as={Link}
            to="/wallet/car-insurance/manage/claims"
            fluid
            primary
            size="huge"
            className={`defaultButton blueBackground`}
            content="Submit Claim"
            disabled={!this.state.photo}
          />
        </Button.Group>
        <Spacer size="huge" />
      </Page>
    );
  }
}
