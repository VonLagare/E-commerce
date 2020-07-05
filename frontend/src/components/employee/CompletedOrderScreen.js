import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SummaryOrder from "../componentParts/employee/SummaryOrder";
import getCompletedOrders from "../../redux/actions/employee/getCompletedOrders";
import OrderNavigation from "../componentParts/employee/OrderNavigation";
import clearCompletedOrders from "../../redux/actions/employee/clearCompletedOrders";

//Component for all orders that has been completed.
function CompletedOrderScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompletedOrders());
    return () => {
      dispatch(clearCompletedOrders());
    };
  }, []);

  return (
    <div>
      <OrderNavigation completedOrders />
      {/* Component that contains the view of order summary */}
      <SummaryOrder />
    </div>
  );
}

export default CompletedOrderScreen;
