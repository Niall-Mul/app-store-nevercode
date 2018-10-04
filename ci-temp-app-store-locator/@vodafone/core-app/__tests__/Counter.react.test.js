import React from 'react';
import Counter from '../components/Counter.react';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer
    .create(<Counter counter={{ value: 10 }} />)
    .toJSON();
  expect(rendered).toBeTruthy();
});
