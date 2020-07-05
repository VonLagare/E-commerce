import Axios from "axios";
import {
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
} from "../../constants/userConstants";

const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const { data } = Axios.put("/api/users/update", user);
    dispatch({ type: USER_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_UPDATE_ERROR });
  }
};

export default updateUser;
