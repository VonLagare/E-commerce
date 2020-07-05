import Axios from "axios";
import {
  ENTERPRISE_LIST_ERROR,
  ENTERPRISE_LIST_SUCCESS,
  ENTERPRISE_LIST_REQUEST,
} from "../../constants/enterpriseConstants";

const enterpriseList = () => async (dispatch) => {
  try {
    dispatch({ type: ENTERPRISE_LIST_REQUEST });
    const { data } = await Axios.get("/api/enterprises");
    dispatch({ type: ENTERPRISE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ENTERPRISE_LIST_ERROR, payload: error.message });
  }
};

export default enterpriseList;
