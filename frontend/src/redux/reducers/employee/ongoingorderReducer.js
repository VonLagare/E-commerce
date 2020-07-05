import {
  ONGOING_LIST_REQUEST,
  ONGOING_LIST_SUCCESS,
  ONGOING_LIST_ERROR,
  ONGOING_LIST_CLEAR,
} from "../../constants/orderConstants";

function ongoingorderReducer(state = { orders: null }, action) {
  switch (action.type) {
    case ONGOING_LIST_REQUEST:
      return { loading: true };
    case ONGOING_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ONGOING_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case ONGOING_LIST_CLEAR:
      return {
        orders: null,
      };
    default:
      return state;
  }
}

export default ongoingorderReducer;
