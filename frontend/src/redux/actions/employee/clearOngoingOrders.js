import { ONGOING_LIST_CLEAR } from "../../constants/orderConstants";

const clearOngoingOrders = () => async (dispatch) => {
  dispatch({ type: ONGOING_LIST_CLEAR });
};

export default clearOngoingOrders;
