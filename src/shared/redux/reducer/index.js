import { combineReducers } from 'redux';
import home from './home';

const createRootReducer = () => combineReducers({
  home,
});

export default createRootReducer;
