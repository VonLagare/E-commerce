import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPendingOrders from "../../redux/actions/employee/getPendingOrders";
import acceptOrder from "../../redux/actions/employee/acceptOrder";
import SummaryOrder from "../componentParts/employee/SummaryOrder";
import OrderNavigation from "../componentParts/employee/OrderNavigation";
import { useState } from "react";
import clearPendingOrders from "../../redux/actions/employee/clearPendingOrders";

function PendingOrderScreen(props) {
  const acceptOrderReducer = useSelector((state) => state.acceptOrderReducer);
  const { loadingAccept, accepted } = acceptOrderReducer;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPendingOrders());

    return () => {
      dispatch(clearPendingOrders());
    };
  }, [accepted]);

  // Acccepts the order from pending to ongoing status
  const acceptOrderHandler = (orderId) => {
    dispatch(acceptOrder(orderId));
  };

  return (
    <div>
      <OrderNavigation pendingOrders />
      {/* Component that contains the view of order summary */}
      <SummaryOrder acceptOrderHandler={acceptOrderHandler} />
    </div>
  );
}

export default PendingOrderScreen;
