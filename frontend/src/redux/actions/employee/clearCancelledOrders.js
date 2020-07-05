import { CANCELLED_LIST_CLEAR } from "../../constants/orderConstants";

//clear all customer completed request in redux state
const clearCancelledOrders = () => async (dispatch) => {
  dispatch({ type: CANCELLED_LIST_CLEAR });
};

export default clearCancelledOrders;
