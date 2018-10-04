/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Container, Card, Image, Grid, Button, List } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { assetsUriPrefix } from '@vodafone/core-redux/constants/boi/Assets';
import {
  QuoteDocumentLinks,
} from '../../mocks/quoteDocuments';

interface Props {
  className: string;
  history: any;
  quoteType: string;
}

interface State {
  // value: string;
}

class PaymentDocumentsPage extends React.Component<Props, State> {
  render() {
    const items = QuoteDocumentLinks[this.props.quoteType].map((item, idx) => {
      return (
        <List.Item key={idx} className="linksListItem">
          <a className="listLink">
            {item.text}
            {item.externalLink ? (
              <Image
                src={assetsUriPrefix + 'assets/external-link-hover.png'}
                className="externalLinkIcon"
              />
            ) : null}
          </a>
        </List.Item>
      );
    });

    return (
      <div className={this.props.className}>
        <Container textAlign="center" className="paymentContainer">
          <h1>
            <Image
              src={assetsUriPrefix + `assets/${this.props.quoteType}-blue.png`}
              className="paymentIcon"
            />
          </h1>
          <Grid>
            <Grid.Row>
              <List className="linksList">{items}</List>
            </Grid.Row>
            <div className="buttonsBottom">
              <Grid.Row>
                <Button
                  className="cardButton blueBackground"
                  content="Home"
                  onClick={() => this.props.history.push('/wallet/home')}
                />
              </Grid.Row>
            </div>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withRouter(PaymentDocumentsPage);
