import React from "react";
import { Link } from "react-router-dom";

function OrderNavigation(props) {
  return (
    <div className="checkout-steps">
      <div className={props.pendingOrders ? "active" : ""}>
        <Link to="/pendingorders?reload=true">Pending</Link>
      </div>
      <div className={props.ongoingOrders ? "active" : ""}>
        <Link to="/ongoingorders?reload=true">Ongoing</Link>
      </div>
      <div className={props.completedOrders ? "active" : ""}>
        <Link to="/completedorders?reload=true">Completed</Link>
      </div>
      <div className={props.cancelledOrders ? "active" : ""}>
        <Link to="/cancelledorders?reload=true">Cancelled</Link>
      </div>
    </div>
  );
}

export default OrderNavigation;
