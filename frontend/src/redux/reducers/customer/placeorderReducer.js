import {
  PLACEORDER_SAVE_REQUEST,
  PLACEORDER_SAVE_SUCCESS,
  PLACEORDER_SAVE_ERROR,
} from "../../constants/orderConstants";

function placeorderReducer(state = { orders: {} }, action) {
  switch (action.type) {
    case PLACEORDER_SAVE_REQUEST:
      return { loading: true };
    case PLACEORDER_SAVE_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case PLACEORDER_SAVE_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default placeorderReducer;
