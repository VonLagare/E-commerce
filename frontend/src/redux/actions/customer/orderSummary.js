import {
  ORDERSUMMARY_LIST_REQUEST,
  ORDERSUMMARY_LIST_SUCCESS,
  ORDERSUMMARY_LIST_ERROR,
} from "../../constants/orderConstants";

import Axios from "axios";
import Cookie from "js-cookie";

const orderSummary = (items, qty) => async (dispatch) => {
  const userInfo = Cookie.getJSON("userInfo") || null;
  const id = userInfo._id;
  try {
    dispatch({ type: ORDERSUMMARY_LIST_REQUEST });
    const { data } = await Axios.get(
      "/api/orders/getpendingorders/" + userInfo._id
    );

    dispatch({ type: ORDERSUMMARY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDERSUMMARY_LIST_ERROR, payload: error.msg });
  }
};

export default orderSummary;
