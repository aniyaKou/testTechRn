import { INIT_DATA_USERS } from './actionsTypes'
import fetchUsers from '../api';

export const initDataUsers = () => {
  return (dispatch) => {
    fetchUsers().then(results => {
        dispatch({
            type: INIT_DATA_USERS,
            data: results
        })
    })
  }
};

export const getDataUser = (uuid) => {
  return (dispatch) => {
    fetchUsers(uuid).then(results => {
        dispatch({
            type: GET_DATA_USER,
            data: results
        })
    })
  }
};