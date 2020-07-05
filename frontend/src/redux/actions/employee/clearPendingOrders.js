import { PENDINGORDER_LIST_CLEAR } from "../../constants/orderConstants";

const clearPendingOrders = () => async (dispatch) => {
  // reset the reducer of pending orders
  dispatch({ type: PENDINGORDER_LIST_CLEAR });
};

export default clearPendingOrders;
