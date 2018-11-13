import { INIT_DATA_USERS  } from "../actions/actionsTypes";

const initialState = [] ;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_DATA_USERS:
    return action.data;
  }
  return state
}
