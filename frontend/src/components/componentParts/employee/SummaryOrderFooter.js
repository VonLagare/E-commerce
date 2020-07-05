import React from "react";
import { Link } from "react-router-dom";

function SummaryOrderFooter(props) {
  //props.property == props.order

  return (
    <div>
      <li>
        <h2> Total : PHP{props.property.totalPrice}</h2>
      </li>

      {(props.property.status !== "completed" || "cancelled") && (
        <li>
          <button
            className="button primary full-width"
            onClick={() =>
              //pass the id and the status of the order of the order
              props.property.orderHandler(
                props.property.order._id,
                props.property.order.status
              )
            }
          >
            {/* checks if the status of the order is pending or ongoing
          and print a corresponding button */}
            {props.property.order.status === "pending" ? (
              <div>Accept Order</div>
            ) : props.property.order.status === "ongoing" ? (
              <div>Complete Order</div>
            ) : null}
          </button>
        </li>
      )}
    </div>
  );
}

export default SummaryOrderFooter;
