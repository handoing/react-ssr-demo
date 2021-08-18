import { INCREASE, DECREASE } from '../constants';

export function increase() {
  return {
    type: INCREASE,
    payload: '',
  };
}

export function decrease() {
  return {
    type: DECREASE,
    payload: '',
  };
}