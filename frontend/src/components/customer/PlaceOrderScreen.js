import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import placeOrder from "../../redux/actions/customer/placeOrder";
import CheckoutSteps from "../componentParts/CheckoutSteps";

function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cartReducers);
  const { cartItems, shipping } = cart;
  if (!shipping.barangay) {
    props.history.push("shipping");
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    props.history.push("/ordersummary?redirect=placeorder");
    dispatch(placeOrder(cartItems));
  };

  useEffect(() => {
    return () => {
      // cleanup?
    };
  }, []);

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div>
              {shipping.street}, {shipping.district},{shipping.barangay},{" "}
              {shipping.municipality},{shipping.province}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method: Cash</div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div>No items on cart</div>
              ) : (
                cartItems.map((item) => (
                  <li key={item.product}>
                    <div className="cart-image">
                      <img src={item.image} alt="product"></img>
                    </div>
                    <div className="cart-name">
                      <Link to={`/api/product/${item.product}`}>
                        {item.name}
                      </Link>
                      <div>Qty: {item.qty}</div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button primary full-width"
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </li>

            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>
                <div>Php{itemsPrice}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
