import {
  PENDINGORDER_LIST_REQUEST,
  PENDINGORDER_LIST_SUCCESS,
  PENDINGORDER_LIST_ERROR,
} from "../../constants/orderConstants";

import Axios from "axios";
import Cookie from "js-cookie";

const getPendingOrders = () => async (dispatch) => {
  const userInfo = Cookie.getJSON("userInfo") || null;
  const enterprise = userInfo.enterprise;
  try {
    dispatch({ type: PENDINGORDER_LIST_REQUEST });
    const { data } = await Axios.get(
      "/api/orders/customerpendingorders/" + enterprise
    );

    dispatch({ type: PENDINGORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PENDINGORDER_LIST_ERROR, payload: error.msg });
  }
};

export default getPendingOrders;
