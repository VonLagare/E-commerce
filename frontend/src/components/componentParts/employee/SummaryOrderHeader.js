import React from "react";

function SummaryOrderHeader(props) {
  return (
    <div>
      <li>
        <h2>{`${props.order.buyer.firstName} ${props.order.buyer.lastName}`}</h2>
      </li>
      <li>
        <h3>Store Address</h3>
        <div>Price</div>
      </li>
    </div>
  );
}

export default SummaryOrderHeader;
