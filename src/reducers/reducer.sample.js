import { INIT_DATA_USERS } from "../components/actions/actionsTypes";

const initialState = {
  users: [],
};

export default function reducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case INIT_DATA_USERS:
      nextState = {
      ...state, 
      users: action.data
    }
    return nextState
  default:
    return state
  }
};
