
import { combineReducers } from 'redux';
import reducerSample from './reducer.sample';
import reducerActiveUser from './reducer.activeUser';


const state= combineReducers({
  users: reducerSample,
  user: reducerActiveUser
});

export default state;
