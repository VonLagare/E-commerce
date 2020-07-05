import {
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from "../../constants/productConstants";

function productUpdateReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default productUpdateReducer;
