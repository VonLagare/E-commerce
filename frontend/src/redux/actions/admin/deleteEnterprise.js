import Axios from "axios";
import {
  ENTERPRISE_DELETE_REQUEST,
  ENTERPRISE_DELETE_SUCCESS,
  ENTERPRISE_DELETE_ERROR,
} from "../../constants/enterpriseConstants";

const deleteEnterprise = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ENTERPRISE_DELETE_REQUEST, payload: id });
    const {
      userSigninReducer: { userInfo },
    } = getState();

    if (!userInfo) {
      return dispatch({
        type: ENTERPRISE_DELETE_ERROR,
        payload: { msg: "You need to login", islogged: false },
      });
    }

    const { data } = await Axios.delete(
      `/api/enterprises/deleteenterprise/` + id
    );
    dispatch({ type: ENTERPRISE_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: ENTERPRISE_DELETE_ERROR, payload: error.message });
  }
};

export default deleteEnterprise;
