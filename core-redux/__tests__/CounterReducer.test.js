import reducer from '../reducers/CounterReducer';
import { ActionTypes } from '../actions/CounterActions';
import { CounterRecord } from '../constants/CounterImmutables';
import expect from 'expect';

describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(new CounterRecord());
  });

  it('should handle INCREASE_REQUEST', () => {
    const startAction = {
      type: ActionTypes.INCREASE_REQUEST,
    };
    expect(reducer({ value: 0 }, startAction)).toEqual(
      new CounterRecord({
        value: 1,
      }),
    );
  });
});
