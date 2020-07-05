import Axios from "axios";
import {
  USER_ADD_REQUEST,
  USER_ADD_SUCCESS,
  USER_ADD_ERROR,
} from "../../constants/userConstants";

const addUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ADD_REQUEST, payload: user });
    const {
      userSigninReducer: { userInfo },
    } = getState();
    if (!userInfo) {
      return dispatch({
        type: USER_ADD_ERROR,
        payload: { msg: "You need to login", islogged: false },
      });
    }
    const { data } = await Axios.post("/api/users/adduser", user);
    dispatch({
      type: USER_ADD_SUCCESS,
      payload: { msg: "User added", data },
    });
  } catch (error) {
    dispatch({ type: USER_ADD_ERROR, payload: error.message });
  }
};

export default addUser;
