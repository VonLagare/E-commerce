import React from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  updateProduct,
} from "../../redux/actions/owner/productActions";

function AddProductScreen(props) {
  const { id } = props.idState;
  const { name, setName } = props.nameState;
  const { price, setPrice } = props.priceState;
  const { category, setCategory } = props.categoryState;
  const { brand, setBrand } = props.brandState;
  const { description, setDescription } = props.descriptionState;
  const { countInStock, setCountInStock } = props.countInStockState;
  const { image, setImage } = props.imageState;
  const { modalVisible, setModalVisible } = props.modalVisibleState;
  const { enterprise, setEnterprise } = props.enterpriseState;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (id) {
      return dispatch(
        updateProduct({
          _id: id,
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          description,
          enterprise,
        })
      );
    } else {
      return dispatch(
        addProduct({
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          description,
          enterprise,
        })
      );
    }
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Add New Product</h2>
          </li>
          <li>{props.loadingUpdate && <div>Loading</div>}</li>
          <li>{props.productUpdate && <div>{props.productUpdate.msg}</div>}</li>
          <li>{props.errorUpdate && <div>{props.UpdateSave.msg}</div>}</li>
          <li>
            <label htmlFor="name">Enterprise</label>
            <input
              readOnly
              type="text"
              name="enterprise"
              id="enterprise"
              value={enterprise}
            />
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              name="brand"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="countInStock">Count In Stock</label>
            <input
              type="text"
              name="countInStock"
              id="countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="description">Descriptionl</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="image">Image</label>
            <input
              type="text"
              name="image"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              {id ? "Update" : "Add"}
            </button>
            <button
              type="submit"
              className="button secondary"
              onClick={() => setModalVisible(false)}
            >
              Back
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default AddProductScreen;
