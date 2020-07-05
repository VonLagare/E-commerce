import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../../redux/actions/owner/productActions";
import addToCart from "../../redux/actions/customer/addToCart";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetailsReducer);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  const productId = props.match.params.id;

  useEffect(() => {
    dispatch(detailsProduct(productId));
    return () => {
      // cleanup;
    };
  }, []);

  //call action to add the product to inCart in Orders Coollection
  const handleAddToCart = (productId, qty) => {
    dispatch(addToCart(productId, qty));
    // props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img src={product.image} alt="product"></img>
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                {product.rating} stars ({product.numReviews})
              </li>
              <li>
                Price: $<b>{product.price}</b>
              </li>
              <li>
                Description:
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>price: {product.price}</li>
              <li>
                Status: {product.countInStock > 0 ? "In stock" : "Out of Stock"}
              </li>
              <li>
                Qty:{" "}
                <select
                  value={qty}
                  onChange={(event) => setQty(event.target.value)}
                >
                  {[...Array(product.countInStock).keys()].map((count) => (
                    <option key={count + 1} value={count + 1}>
                      {count + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                <button onClick={() => handleAddToCart(product._id)}>
                  Add to cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
