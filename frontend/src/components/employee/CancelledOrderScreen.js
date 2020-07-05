import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SummaryOrder from "../componentParts/employee/SummaryOrder";
import getCancelledOrders from "../../redux/actions/employee/getCancelledOrders";
import OrderNavigation from "../componentParts/employee/OrderNavigation";
import clearCancelledOrders from "../../redux/actions/employee/clearCancelledOrders";

//Component for all orders that has been completed.
function CancelledOrderScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCancelledOrders());
    return () => {
      // action that clears the redux state of canceleld orders
      dispatch(clearCancelledOrders());
    };
  }, []);

  return (
    <div>
      <OrderNavigation cancelledOrders />
      {/* Component that contains the view of order summary */}
      <SummaryOrder />
    </div>
  );
}

export default CancelledOrderScreen;
