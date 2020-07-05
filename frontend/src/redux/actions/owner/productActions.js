import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
} from "../../constants/productConstants";
import Axios from "axios";

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await Axios.get("/api/products/" + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const addProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ADD_REQUEST, payload: product });
    const {
      userSigninReducer: { userInfo },
    } = getState();
    if (!userInfo) {
      return dispatch({
        type: PRODUCT_ADD_FAIL,
        payload: { msg: "You need to login", islogged: false },
      });
    }
    const { data } = await Axios.post("/api/products/addproduct", product, {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch({
      type: PRODUCT_ADD_SUCCESS,
      payload: { msg: "Product added", data },
    });
  } catch (error) {
    dispatch({ type: PRODUCT_ADD_FAIL, payload: error.message });
  }
};

const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
    const {
      userSigninReducer: { userInfo },
    } = getState();
    if (!userInfo) {
      return dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: { msg: "You need to login", islogged: false },
      });
    }
    const { data } = await Axios.put(
      `/api/products/updateproduct/${product._id}`,
      product,
      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: error.message });
  }
};

const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const {
      userSigninReducer: { userInfo },
    } = getState();
    if (!userInfo) {
      return dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: { msg: "You need to login", islogged: false },
      });
    }
    const { data } = await Axios.delete(
      `/api/products/deleteproduct/${productId}`,
      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

export { detailsProduct, addProduct, updateProduct, deleteProduct };
