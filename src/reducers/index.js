
import { combineReducers } from 'redux';
import reducerUsers from './reducer.users';
import reducerActiveUser from './reducer.activeUser';


const state= combineReducers({
  users: reducerUsers,
  user: reducerActiveUser
});

export default state;
