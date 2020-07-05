import {
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from "../../constants/productConstants";

function productDeleteReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default productDeleteReducer;
