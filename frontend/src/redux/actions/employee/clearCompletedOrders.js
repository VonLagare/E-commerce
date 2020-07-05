import { COMPLETED_LIST_CLEAR } from "../../constants/orderConstants";

//Get all customer completed request
const clearCompletedOrders = () => async (dispatch) => {
  dispatch({ type: COMPLETED_LIST_CLEAR });
};

export default clearCompletedOrders;
