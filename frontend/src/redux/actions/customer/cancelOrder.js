import {
  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_SUCCESS,
  ORDER_CANCEL_ERROR,
} from "../../constants/orderConstants";

import Axios from "axios";

const cancelOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CANCEL_REQUEST });
    const { data } = await Axios.delete(
      "/api/orders/cancelpendingorder/" + orderId
    );

    dispatch({ type: ORDER_CANCEL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_CANCEL_ERROR, payload: error.msg });
  }
};

export default cancelOrder;
