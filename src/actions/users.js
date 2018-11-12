import { INIT_DATA_USERS } from './actionsTypes'
import fetchUsers from '../../api';

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