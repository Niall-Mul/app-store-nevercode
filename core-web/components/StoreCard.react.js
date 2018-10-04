/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Button, Image, Icon, Card } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import { StoreRecord, RegionRecord } from '@vodafone/core-redux/maps';
import Valoration from './Valoration.react';

interface Props {
  t: (span: string) => string;
  i18n: any;
  store: StoreRecord;
  currentLocation: RegionRecord;
  list?: boolean;
  openStoreDetails: () => any;
  onGetDirections: () => any;
}

const getOpeningTimes = store => {
  const today = new Date().getDay();
  const day = store.openingDetails[today];
  return day[Object.keys(day)[0]][0];
};

class StoreCard extends React.Component<Props> {
  render() {
    const {
      t,
      store,
      currentLocation,
      openStoreDetails,
      onGetDirections,
    } = this.props;
    const { close } = getOpeningTimes(store);
    const hours = close ? close.slice(0, 2) : 0;
    const minutes = close ? close.slice(2, 4) : 0;
    const closes = `${t('store:closing')} ${hours}:${minutes}`;
    const distance = store.distance.value > 0 ? store.distance.text : null;
    const directionsButton = currentLocation ? (
      <Button className="directions-button" onClick={onGetDirections}>
        {t('store:directions')}
      </Button>
    ) : null;

    return (
      <Card
        className={
          'storeLocator storeCardContainer' +
          (this.props.list ? ' storeCardContainerList' : '')
        }
      >
        <div className="card-top-row">
          <span className="open-span">{t('store:open')}</span>
          <div className="directions-button-container">{directionsButton}</div>
        </div>
        <div className="title-row">
          <span>{store.contact.name}</span>
          <span className="title-row-mileage">
            <span>{distance} </span>
            <span className="title-arrow-container">
              <Button icon className="arrow-icon">
                <Icon
                  onClick={openStoreDetails}
                  name="angle right"
                  size={'large'}
                />
              </Button>
            </span>
          </span>
        </div>
        <div className="info-row">
          <Icon
            size="large"
            name="map marker alternate"
            className="info-icon"
          />
          <span>{store.contact.address}</span>
        </div>
        <div className="info-row">
          <Icon size="large" name="phone" className="info-icon phone-icon" />
          <span className="info-phone-number">{store.contact.storePhone}</span>
          <span className="closing">{closes}</span>
        </div>
        <div className="rating-reviews-container">
          <div className="rating">
            <Valoration value={store.rating ? store.rating : null} />
          </div>
          <div className="reviews">
            {store.reviews ? `${store.reviews} ${t('store:reviews')}` : ''}
          </div>
        </div>
        <Image
          className={'card-image' + (this.props.list ? ' card-image-list' : '')}
          src={store.contact.image}
        />
      </Card>
    );
  }
}

export default translate(['store', 'common'], { wait: true })(StoreCard);
