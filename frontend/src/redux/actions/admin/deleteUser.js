import Axios from "axios";
import {
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_ERROR,
} from "../../constants/userConstants";

const deleteUser = (userID) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST, payload: userID });
    const {
      userSigninReducer: { userInfo },
    } = getState();

    if (!userInfo) {
      return dispatch({
        type: USER_DELETE_ERROR,
        payload: { msg: "You need to login", islogged: false },
      });
    }

    const { data } = await Axios.delete(`/api/users/deleteuser/`, {
      data: { id: userID },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: USER_DELETE_ERROR, payload: error.message });
  }
};

export default deleteUser;
