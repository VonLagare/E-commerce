import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SummaryOrderHeader from "../../componentParts/employee/SummaryOrderHeader";
import SummaryOrderBody from "./SummaryOrderBody";
import SummaryOrderFooter from "./SummaryOrderFooter";

function SummaryOrder(props) {
  //gets all the pending order request from the reducer
  const ordersListPending = useSelector((state) => state.pendingorderReducer);
  const { loading: loadingPending, orders: pendingOrders } = ordersListPending;

  //gets all ongoing order from the reducer
  const ordersListOngoing = useSelector((state) => state.ongoingorderReducer);
  const { loading: loadingOngoing, orders: ongoingOrders } = ordersListOngoing;

  //gets all completed order from the reducer
  const ordersListCompleted = useSelector(
    (state) => state.completedOrderReducer
  );
  const {
    loading: loadingCompleted,
    orders: CompletedOrders,
  } = ordersListCompleted;

  //gets all cancelled order from the reducer
  const ordersListCancelled = useSelector(
    (state) => state.cancelledOrderReducer
  );
  const {
    loading: loadingCancelled,
    orders: CancelledOrders,
  } = ordersListCancelled;

  useEffect(() => {}, [
    pendingOrders,
    ongoingOrders,
    CompletedOrders,
    CancelledOrders,
  ]);

  let summaryOrder = null;
  let totalPrice = 0;

  const orderHandler = (orderId, orderStatus) => {
    if (orderStatus === "pending") {
      return props.acceptOrderHandler(orderId);
    } else {
      return props.completeOrderHandler(orderId);
    }
  };

  //this is a constant of the current order depending on the status weather ongoing pending completd or failed
  //  Javacript uses short-circuit evaluation for logical operators || and &&
  const currentOrder =
    pendingOrders || ongoingOrders || CompletedOrders || CancelledOrders;

  if (currentOrder) {
    totalPrice = currentOrder.map((order) => {
      return order.products.reduce(
        (prev, curr) => prev + curr.price * curr.qty,
        0
      );
    });

    summaryOrder = currentOrder.map((order) => {
      return order.products.map((product, index, arr) => (
        <ul className="order-list-container" key={product._id}>
          {/* contains the name of the buyer 
            This only shows at the beginning of eacher order or at index 0*/}
          {index === 0 && <SummaryOrderHeader order={order} />}

          {/*contains the description off orders  */}
          <SummaryOrderBody product={product} />

          {/* this shows only at the end of each order ot at index -1 */}
          {index === arr.length - 1 && (
            //contains the button for the order and the price
            <SummaryOrderFooter
              property={{
                order: order,
                totalPrice: totalPrice,
                orderHandler: orderHandler,
              }}
            />
          )}
        </ul>
      ));
    });
  }

  return (
    <div>
      {/* <CheckoutSteps step1 step2 step3 step4 /> */}
      <div className="summaryorder">
        <div className="summaryorder-info">
          <div>
            {/* check if there if current order has a value if true check if the current order
            length is greter that zero if true show the 
            summary of orders else show no data found */}
            {currentOrder &&
              (currentOrder.length > 0 ? (
                summaryOrder
              ) : (
                <div>
                  <h1>No data found</h1>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryOrder;
