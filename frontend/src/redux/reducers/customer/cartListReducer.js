import {
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_ERROR,
} from "../../constants/cartConstants";

function cartListReducer(state = { cartItems: {} }, action) {
  switch (action.type) {
    case CART_LIST_REQUEST:
      return { loading: true };
    case CART_LIST_SUCCESS:
      return {
        loading: false,
        cartItems: action.payload,
      };
    case CART_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default cartListReducer;
