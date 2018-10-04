import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Counter from '../components/Counter.react';
import { CounterRecord } from '@vodafone/core-redux';

describe('Counter Component', () => {
  let root;
  let props;
  let mountedBurgerMenu;

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const counterRecord = new CounterRecord({ value: 10 });
    const output = renderer
      .create(<Counter counter={counterRecord} />)
      .toJSON();
    expect(output).toMatchSnapshot();
    ReactDOM.unmountComponentAtNode(div);
  });
});
