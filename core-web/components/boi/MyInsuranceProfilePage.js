/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, List } from 'semantic-ui-react';

import PieChart, { PieChartProps } from '@vodafone/core-web/components/graphs/PieChart.react';


export interface Props {
  className?: string;
  basePath?: string;
}

interface ListItem {
  name: string;
  linkTo: string;
  description: string;
  date: string;
  value: number;
}


const data: ListItem[] = [
  { name: 'Car', linkTo: '/wallet/car-insurance', description: 'Bank of Ireland', date: '28th Nov 2018', value: 600 },
  { name: 'Home', linkTo: '#', description: 'Bank of Ireland', date: '15th Mar 2019', value: 200 },
  { name: 'Health', linkTo: '#', description: 'Bank of Ireland', date: '9th Abr 2018', value: 500 },
  { name: 'Life', linkTo: '#', description: 'Bank of Ireland', date: '1st May 2019', value: 400 },
  { name: 'Travel', linkTo: '/wallet/travel-insurance', description: 'Bank of Ireland', date: '28th Nov 2019', value: 100 },
];

class MyInsuranceProfilePage extends React.Component<Props> {

  getListData() {
    return data;
  }

  getChartData(): Array<{ label: string; value: number }> {
    return this.getListData().map(item => {
      return { label: item.name, value: item.value };
    });
  }

  renderListItem(item: ListItem, i: number) {
    return (
      <List.Item key={i} as={Link} to={item.linkTo}>
        <List.Header>{item.name}</List.Header>
        <List.Content className="highlight" floated="right">{item.date}</List.Content>
        <List.Description>{item.description}</List.Description>
      </List.Item>
    );
  }

  render() {
    let { className } = this.props;

    return (
      <div className={className}>
        <Container>
          <div style={{ textAlign: 'center' }}>Renewal dates</div>

          <List celled>
            {this.getListData().map((item, i) => this.renderListItem(item, i))}
          </List>

          <br />

          <div style={{ textAlign: 'center' }}>Insurance expenditure</div>

          <PieChart label="Piechart" data={this.getChartData()} />
        </Container>
      </div>
    );

  }
}


export default MyInsuranceProfilePage;
