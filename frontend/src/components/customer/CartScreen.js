import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import addToCart from "../../redux/actions/customer/addToCart";
import { Link } from "react-router-dom";
import removeFromCart from "../../redux/actions/customer/removeFromCart";
import getCartItems from "../../redux/actions/customer/cart/getCartItems";

function CartScreen(props) {
  const cart = useSelector((state) => state.cartListReducer);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  useEffect(() => {
    dispatch(getCartItems());
    return () => {
      // cleanup?
    };
  }, []);

  // Assign value of the products array from cartItems to items
  // To use in looping the cart items
  let items = null;
  if (cartItems) {
    items = cartItems.products;
  }

  return (
    <div className="cart">
      {items ? (
        <div>
          <div className="cart-list">
            <ul className="cart-list-container">
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {items.length === 0 ? (
                <div>No items on cart</div>
              ) : (
                items.map((item) => (
                  <li key={item._id}>
                    <div className="cart-image">
                      <img src={item.image} alt="product"></img>
                    </div>
                    <div className="cart-name">
                      <Link to={`/api/product/${item.product}`}>
                        {item.name}
                      </Link>
                      <div>
                        Qty:
                        <select
                          value={item.qty}
                          onChange={(event) =>
                            dispatch(
                              addToCart(item.product, event.target.value)
                            )
                          }
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                        <button
                          type="button"
                          className="button"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="cart-action">
            <h3>
              Subtotal ( {items.reduce((a, c) => a + c.qty, 0)} item/s ): $
              {items.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            <button
              className="button primary full-width"
              disabled={items.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>No Items in Cart</h1>
        </div>
      )}
    </div>
  );
}

export default CartScreen;
