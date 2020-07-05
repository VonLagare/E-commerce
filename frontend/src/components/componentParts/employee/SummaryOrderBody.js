import React from "react";
import { Link } from "react-router-dom";

function SummaryOrderBody(props) {
  return (
    <div>
      <li>
        <div className="order-image">
          <img src={props.product.image} alt="product"></img>
        </div>
        <div className="order-name">
          <Link to={`/api/product/${props.product.product}`}>
            {props.product.name}
          </Link>
          <div>Qty: {props.product.qty}</div>
        </div>
        <div className="order-price">PHP{props.product.price}</div>
      </li>
    </div>
  );
}

export default SummaryOrderBody;
