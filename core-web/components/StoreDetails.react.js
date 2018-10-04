/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { Button, Icon, Card, Header, Accordion } from 'semantic-ui-react';
import GoogleMapHOC from './GoogleMapHOC.react';
import GoogleMapMarker from './GoogleMapMarker.react.js';
import Valoration from './Valoration.react.js';
import { StoreRecord } from '@vodafone/core-redux/maps';

interface Props {
  t: (text: string) => string;
  i18n: any;
  store: StoreRecord;
  closeStoreDetails: () => any;
  onGetDirections: () => any;
}

interface State {
  activeIndex: number;
}

export class StoreDetails extends React.Component<Props, State> {
  state = {
    activeIndex: 1,
  };

  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  formatTime = (time: string) => {
    const hours = time ? time.slice(0, 2) : 0;
    const minutes = time ? time.slice(2, 4) : 0;
    return `${hours}:${minutes}`;
  };

  render() {
    const { t, store, closeStoreDetails, onGetDirections } = this.props;
    const { activeIndex } = this.state;
    const openingTimes = store.openingDetails.map((day, index) => {
      const { open, close } = day[Object.keys(day)[0]][0];
      const opening = this.formatTime(open);
      const closing = this.formatTime(close);
      return (
        <div key={index}>
          <span>{t('common:' + Object.keys(day)[0])}:</span>
          <span>
            {opening} - {closing}
          </span>
        </div>
      );
    });

    const services = Object.keys(store.properties).map((prop, index) => {
      if (typeof store.properties[prop] === 'boolean') {
        return <span key={index}>{t('store:' + prop)}</span>;
      } else {
        return null;
      }
    });

    const storeMarker = (
      <GoogleMapMarker
        key={store.id}
        store={store}
        onPress={() => console.log('marker pressed')}
        displayTitle={false}
        selected={true}
        onMapPressed={null}
      />
    );

    // const PhoneButton = withRouter(({ history }) => (
    //   <Button onClick={() => history.push('tel:' + store.contact.storePhone)}>
    //     {t('store:call')}
    //   </Button>
    // ));

    const mapCenter = {
      lat: store.geometry.coordinates[1],
      lng: store.geometry.coordinates[0],
    };

    return (
      <Card className="storeLocator storeDetailsCardContainer">
        <Header as="h5">
          <Button icon className="storeDeatilsArrowIcon">
            <Icon
              onClick={closeStoreDetails}
              name="angle left"
              size={'large'}
            />
          </Button>
          <span>{t('store:store_detail')}</span>
        </Header>
        <div>
          <div className="storeDetailsInfoRow">
            <div>
              <Valoration value={store.rating ? store.rating : null} />
            </div>
          </div>
          <span className="storeDetailsInfoRow storeDetailsName">
            {store.contact.name}
          </span>
          <div className="contentContainer">
            <div className="storeDetailsMap">
              <GoogleMapHOC
                markers={[storeMarker]}
                height={250}
                defaultCenter={mapCenter}
                panTo={null}
                onMapPressed={() => console.log('Pressed marker')}
                onRegionChanged={() => console.log('Region changed')}
                clearViewpointChange={() => console.log('ClearViewpointChange')}
              />
            </div>
            <div className="storeDetailsInfoRow">
              <Icon size="large" color="black" name="map marker alternate" />
              <span>{store.contact.address}</span>
            </div>
            <div className="storeDetailsInfoRow">
              <Icon size="large" color="black" name="phone" />
              <span>{store.contact.storePhone}</span>
            </div>
            <div className="storeDetailsButtonRow">
              <Button onClick={() => console.log('Ring Ring')}>
                {t('store:call')}
              </Button>
              <Button onClick={onGetDirections}>{t('store:directions')}</Button>
            </div>
            <Accordion>
              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                {t('store:opening_times')}
              </Accordion.Title>
              <Accordion.Content
                active={activeIndex === 1}
                className="storeDetailsAccordion"
              >
                {openingTimes}
              </Accordion.Content>
              <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                {t('store:services')}
              </Accordion.Title>
              <Accordion.Content
                active={activeIndex === 2}
                className="storeDetailsAccordion"
              >
                {services}
              </Accordion.Content>
            </Accordion>
          </div>
        </div>
      </Card>
    );
  }
}

export default translate(['store', 'common'], { wait: true })(StoreDetails);
