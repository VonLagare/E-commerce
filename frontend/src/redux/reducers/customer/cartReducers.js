import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
} from "../../constants/cartConstants";

const initialState = { cartItems: [], shipping: {} };

function cartReducers(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);

      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
      };

    default:
      return state;
  }
}

export default cartReducers;
