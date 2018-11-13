import { GET_DATA_USER  } from "../actions/actionsTypes";

const initialState = null ;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_USER:
    return action.data;
  }
  return state
}