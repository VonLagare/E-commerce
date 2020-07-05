import {
  COMPLETED_LIST_REQUEST,
  COMPLETED_LIST_SUCCESS,
  COMPLETED_LIST_ERROR,
} from "../../constants/orderConstants";

import Axios from "axios";
import Cookie from "js-cookie";

//Get all customer completed request
const getCompletedOrders = () => async (dispatch) => {
  const userInfo = Cookie.getJSON("userInfo") || null;
  const enterprise = userInfo.enterprise;
  try {
    dispatch({ type: COMPLETED_LIST_REQUEST });
    const { data } = await Axios.get(
      //Call API for all customers completed orders
      "/api/orders/customercompletedorders/" + enterprise
    );
    dispatch({ type: COMPLETED_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: COMPLETED_LIST_ERROR, payload: error.msg });
  }
};

export default getCompletedOrders;
