import {
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_ERROR,
} from "../../../constants/cartConstants";

import Axios from "axios";
import Cookie from "js-cookie";

const getCartItems = () => async (dispatch) => {
  const userInfo = Cookie.getJSON("userInfo") || null;
  const userId = userInfo._id;
  try {
    dispatch({ type: CART_LIST_REQUEST });
    const { data } = await Axios.get("/api/cart/getcartitems/" + userId);
    dispatch({ type: CART_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CART_LIST_ERROR, payload: error.msg });
  }
};

export default getCartItems;
