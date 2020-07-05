import {
  CANCELLED_LIST_REQUEST,
  CANCELLED_LIST_SUCCESS,
  CANCELLED_LIST_ERROR,
} from "../../constants/orderConstants";

import Axios from "axios";
import Cookie from "js-cookie";

//Get all customer completed request
const getCancelledOrders = () => async (dispatch) => {
  const userInfo = Cookie.getJSON("userInfo") || null;
  const enterprise = userInfo.enterprise;
  try {
    dispatch({ type: CANCELLED_LIST_REQUEST });
    const { data } = await Axios.get(
      //Call API for all customers completed orders
      "/api/orders/customercancelledorders/" + enterprise
    );
    dispatch({ type: CANCELLED_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CANCELLED_LIST_ERROR, payload: error.msg });
  }
};

export default getCancelledOrders;
