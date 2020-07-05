import Axios from "axios";
import Cookie from "js-cookie";

import { CART_ADD_ITEM } from "../../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  const userInfo = Cookie.getJSON("userInfo") || null;
  const userId = userInfo._id;
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    const { cartItem } = await Axios.post("/api/cart/addtocart/" + userId, {
      qty: qty,
      product: data,
    });
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        category: data.category,
        description: data.description,
        brand: data.brand,
        price: data.price,
        enterprise: data.enterprise,
        countInStock: data.countInStock,
        qty: Number(qty),
      },
    });
    const {
      cartReducers: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    dispatch({ type: CART_ADD_ITEM, payload: { msg: error } });
  }
};
export default addToCart;
