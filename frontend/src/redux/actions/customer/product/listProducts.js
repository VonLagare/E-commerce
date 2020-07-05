import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../../../constants/productConstants";

import Axios from "axios";

const listProducts = (
  category = "",
  searchKeyword = "",
  sortOrder = ""
) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await Axios.get(
      "/api/products?category=" +
        category +
        "&searchKeyword=" +
        searchKeyword +
        "&sortOrder=" +
        sortOrder
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export default listProducts;
