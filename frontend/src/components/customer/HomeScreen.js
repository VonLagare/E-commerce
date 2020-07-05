import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import listProducts from "../../redux/actions/customer/product/listProducts";
import { useState } from "react";

function HomeScreen(props) {
  // State for search bar
  const [searchKeyword, setSearchKeyword] = useState("");
  // State for sorting products
  const [sortOrder, setSortOrder] = useState("");
  // State for choosing product category
  const category = props.match.params.id ? props.match.params.id : "";

  // get the list of products from the reducer
  const productList = useSelector((state) => state.productListReducer);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  // get the list of products in initial mount of this component
  // mount the component each time the categoty change
  useEffect(() => {
    dispatch(listProducts(category));
    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {category && <h2>{category}</h2>}
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{" "}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <ul className="products">
            {products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <Link to={`//products/${product._id}`}>
                    <img
                      className="product-image"
                      src={product.image}
                      alt="product"
                    />
                  </Link>
                  <div className="product-name">
                    <Link to={"/product/" + product._id}>{product.name}</Link>
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">${product.price}</div>
                  <div className="product-rating">
                    {product.rating} Stars ({product.numReviews})
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default HomeScreen;
