import {
  GET_BOARD,
  SHIFT_TASK,
  CREATE_LIST,
  CREATE_TASK
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_BOARD:
      return action.payload;

    case SHIFT_TASK:
      return {
        ...state,
        lists: [...action.payload]
      };

    case CREATE_LIST:
      return action.payload;
    case CREATE_TASK:
      return { ...state, lists: [...action.payload] };
    default:
      return state;
  }
};
