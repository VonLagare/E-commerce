import Axios from "axios";
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_ERROR,
} from "../../constants/userConstants";

const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const { data } = await Axios.get("/api/users");
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIST_ERROR, payload: error.message });
  }
};

export default listUsers;
