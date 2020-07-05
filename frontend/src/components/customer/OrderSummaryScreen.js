import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import orderSummary from "../../redux/actions/customer/orderSummary";
import CheckoutSteps from "../componentParts/CheckoutSteps";
import cancelOrder from "../../redux/actions/customer/cancelOrder";

function OrderSummaryScreen(props) {
  const ordersList = useSelector((state) => state.orderSummaryReducer);
  const { loading, orders } = ordersList;

  const dispatch = useDispatch();

  let enterprises = [];
  let totalPrice = 0;

  if (orders) {
    enterprises = [
      ...new Set(orders.products.map((product) => product.enterprise)),
    ];

    totalPrice = orders.products.reduce(
      (prev, curr) => prev + curr.price * curr.qty,
      0
    );
  }

  useEffect(() => {
    dispatch(orderSummary());
    return () => {
      // cleanup?
    };
  }, []);

  const cancelOrderHandler = (orderId) => dispatch(cancelOrder(orderId));

  const summaryOrder = enterprises.map((enterprise) => {
    return orders.products.map((product, index, arr) =>
      enterprise === product.enterprise ? (
        <div key={product._id}>
          {index === 0 && (
            <div>
              <li>
                <h2>{enterprise}</h2>
              </li>
              <li>
                <h3>Store Address</h3>
                <div>Price</div>
              </li>
            </div>
          )}
          <li>
            <div className="order-image">
              <img src={product.image} alt="product"></img>
            </div>
            <div className="corder-name">
              <Link to={`/api/product/${product.product}`}>{product.name}</Link>
              <div>Qty: {product.qty}</div>
            </div>
            <div className="order-price">PHP{product.price}</div>
          </li>
          {index === arr.length - 1 && (
            <li>
              <h2>Total</h2>
              <h2>PHP {totalPrice}</h2>
            </li>
          )}
          <li>
            <h3>{orders && orders.status}</h3>
          </li>
          {index === arr.length - 1 && (
            <li>
              <button
                className="button primary"
                onClick={() => cancelOrderHandler(orders._id)}
              >
                Cancel Order
              </button>
            </li>
          )}
        </div>
      ) : null
    );
  });

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="summaryorder">
        <div className="summaryorder-info">
          <div>
            <ul className="order-list-container">{summaryOrder}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryScreen;
