import Axios from "axios";
import {
  ENTERPRISE_UPDATE_REQUEST,
  ENTERPRISE_UPDATE_SUCCESS,
  ENTERPRISE_UPDATE_ERROR,
} from "../../constants/enterpriseConstants";

const updateEnterprise = (enterprise) => async (dispatch) => {
  try {
    dispatch({ type: ENTERPRISE_UPDATE_REQUEST });
    const { data } = Axios.put(
      "/api/enterprises/updateenterprise/" + enterprise.id,
      enterprise
    );
    dispatch({ type: ENTERPRISE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ENTERPRISE_UPDATE_ERROR });
  }
};

export default updateEnterprise;
