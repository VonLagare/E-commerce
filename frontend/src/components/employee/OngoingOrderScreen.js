import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SummaryOrder from "../componentParts/employee/SummaryOrder";
import getOngoingOrders from "../../redux/actions/employee/getOngoingOrders";
import completeOrder from "../../redux/actions/employee/completeOrder";
import OrderNavigation from "../componentParts/employee/OrderNavigation";
import clearOngoingOrders from "../../redux/actions/employee/clearOngoingOrders";

function OngoingOrderScreen(props) {
  const completeOrderReducer = useSelector(
    (state) => state.completeOrderReducer
  );
  const { loading, completed } = completeOrderReducer;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOngoingOrders());
    return () => {
      dispatch(clearOngoingOrders());
    };
  }, [completed]);

  // Acccepts the order from pending to ongoing status
  const completeOrderHandler = (orderId) => {
    dispatch(completeOrder(orderId));
  };

  return (
    <div>
      <OrderNavigation ongoingOrders />
      {/* Component that contains the view of order summary */}
      <SummaryOrder completeOrderHandler={completeOrderHandler} />
    </div>
  );
}

export default OngoingOrderScreen;
