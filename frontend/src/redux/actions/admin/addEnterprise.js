import Axios from "axios";
import {
  ENTERPRISE_ADD_REQUEST,
  ENTERPRISE_ADD_SUCCESS,
  ENTERPRISE_ADD_ERROR,
} from "../../constants/enterpriseConstants";

const addEnterprise = (enterprise) => async (dispatch, getState) => {
  try {
    dispatch({ type: ENTERPRISE_ADD_REQUEST, payload: enterprise });

    const {
      userSigninReducer: { userInfo },
    } = getState();

    if (!userInfo) {
      return dispatch({
        type: ENTERPRISE_ADD_ERROR,
        payload: { msg: "You need to login", islogged: false },
      });
    }
    const { data } = await Axios.post(
      "/api/enterprises/addenterprise",
      enterprise
    );
    dispatch({
      type: ENTERPRISE_ADD_SUCCESS,
      payload: { msg: "Enterprise added", data },
    });
  } catch (error) {
    dispatch({ type: ENTERPRISE_ADD_ERROR, payload: error.message });
  }
};

export default addEnterprise;
