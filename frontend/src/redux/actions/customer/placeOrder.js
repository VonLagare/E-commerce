import {
  PLACEORDER_SAVE_REQUEST,
  PLACEORDER_SAVE_SUCCESS,
  PLACEORDER_SAVE_ERROR,
} from "../../constants/orderConstants";

import Axios from "axios";
import Cookie from "js-cookie";

const placeOrder = (cartItems) => async (dispatch) => {
  const userInfo = Cookie.getJSON("userInfo") || null;
  try {
    dispatch({ type: PLACEORDER_SAVE_REQUEST });
    const data = await Axios.post("/api/orders/placeorder", {
      cartItems: cartItems,
      userId: userInfo._id,
    });

    dispatch({ type: PLACEORDER_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PLACEORDER_SAVE_ERROR, payload: error.msg });
  }
};

export default placeOrder;
