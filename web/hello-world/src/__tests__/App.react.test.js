import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import App from '../App.react';

describe('App Component', () => {
  let root;
  let props;
  let mountedBurgerMenu;

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const output = renderer.create(<App />).toJSON();
    expect(output).toMatchSnapshot();
    ReactDOM.unmountComponentAtNode(div);
  });
});
