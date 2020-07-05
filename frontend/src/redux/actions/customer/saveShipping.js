import {
  CART_SAVE_SHIPPING,
  CART_REQUEST_SHIPPING,
  CART_FAILED_SHIPPING,
} from "../../constants/cartConstants";
import Axios from "axios";

const saveShipping = (products) => (dispatch) => {
  try {
    dispatch({ type: CART_REQUEST_SHIPPING });
    dispatch({ type: CART_SAVE_SHIPPING, payload: products });
  } catch (error) {
    dispatch({ type: CART_FAILED_SHIPPING, payload: error.msg });
  }
};

export default saveShipping;
