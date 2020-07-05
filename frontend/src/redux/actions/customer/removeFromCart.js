import Cookie from "js-cookie";

import { CART_REMOVE_ITEM } from "../../constants/cartConstants";

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const {
    cartReducers: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

export default removeFromCart;
