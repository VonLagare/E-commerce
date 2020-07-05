import {
  ONGOING_LIST_REQUEST,
  ONGOING_LIST_SUCCESS,
  ONGOING_LIST_ERROR,
} from "../../constants/orderConstants";

import Axios from "axios";
import Cookie from "js-cookie";

const getOngoingOrders = () => async (dispatch) => {
  const userInfo = Cookie.getJSON("userInfo") || null;
  const enterprise = userInfo.enterprise;
  try {
    dispatch({ type: ONGOING_LIST_REQUEST });
    const { data } = await Axios.get(
      "/api/orders/customerongoingorders/" + enterprise
    );
    dispatch({ type: ONGOING_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ONGOING_LIST_ERROR, payload: error.msg });
  }
};

export default getOngoingOrders;
