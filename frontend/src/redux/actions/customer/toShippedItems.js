import Cookie from "js-cookie";
import {
  SHIPPING_REQUEST_ITEMS,
  SHIPPING_SAVE_ITEMS,
  SHIPPING_FAILED_ITEMS,
} from "../constants/shippingConstants";
import Axios from "axios";

const toShippedItems = () => async (dispatch) => {
  try {
    dispatch({ type: SHIPPING_REQUEST_ITEMS });
    const userInfo = Cookie.getJSON("userInfo") || null;
    const { _id: userId } = userInfo;
    const { data } = await Axios.get("/api/shipping");
    dispatch({ type: SHIPPING_SAVE_ITEMS, payload: data });
  } catch (error) {
    dispatch({ type: SHIPPING_FAILED_ITEMS, payload: error.msg });
  }
};

export default toShippedItems;
