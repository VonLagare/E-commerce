import {
  ORDER_COMPLETE_REQUEST,
  ORDER_COMPLETE_SUCCESS,
  ORDER_COMPLETE_ERROR,
} from "../../constants/orderConstants";

import Axios from "axios";
import Cookie from "js-cookie";

const completeOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_COMPLETE_REQUEST });
    //Call the order route from backend to change order status from ongoing to completed
    const data = await Axios.post("/api/orders/completengoingorder", {
      orderId: orderId,
    });

    dispatch({ type: ORDER_COMPLETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_COMPLETE_ERROR, payload: error.msg });
  }
};

export default completeOrder;
