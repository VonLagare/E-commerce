import {
  ORDER_ACCEPT_REQUEST,
  ORDER_ACCEPT_SUCCESS,
  ORDER_ACCEPT_ERROR,
} from "../../constants/orderConstants";

import Axios from "axios";
import Cookie from "js-cookie";

const userInfo = Cookie.getJSON("userInfo") || null;

const acceptOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_ACCEPT_REQUEST });
    //Call the order route from backend to change order status from pending to ongoing
    const data = await Axios.post("/api/orders/acceptpendingorder", {
      orderId: orderId,
    });

    dispatch({ type: ORDER_ACCEPT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_ACCEPT_ERROR, payload: error.msg });
  }
};

export default acceptOrder;
