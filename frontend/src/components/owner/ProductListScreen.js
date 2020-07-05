import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/actions/owner/productActions";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";

import AddProductScreen from "./AddProductScreen";
import listProducts from "../../redux/actions/customer/product/listProducts";

function ProductListScreen() {
  const productList = useSelector((state) => state.productListReducer);
  const { loading, products, error } = productList;
  const userInfo = Cookie.getJSON("userInfo") || null;

  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [enterprise, setEnterprise] = useState(userInfo.enterprise);

  const productSave = useSelector((state) => state.productAddReducer);
  const {
    loading: loadingSave,
    success: successSave,
    product: productSaveMsg,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDeleteReducer);
  const {
    loading: loadingDelete,
    success: successDelete,
    product: productDeleteMsg,
    error: errorDelete,
  } = productDelete;

  const productUpdate = useSelector((state) => state.productUpdateReducer);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    product: productUpdateMsg,
    error: errorUpdate,
  } = productUpdate;

  const idState = {
    id,
    setId,
  };

  const nameState = {
    name,
    setName,
  };
  const priceState = {
    price,
    setPrice,
  };
  const imageState = {
    image,
    setImage,
  };
  const brandState = {
    brand,
    setBrand,
  };

  const categoryState = {
    category,
    setCategory,
  };
  const countInStockState = {
    countInStock,
    setCountInStock,
  };
  const descriptionState = {
    description,
    setDescription,
  };

  const enterpriseState = {
    enterprise,
    setEnterprise,
  };

  const [modalVisible, setModalVisible] = useState(false);

  const modalVisibleState = {
    modalVisible,
    setModalVisible,
  };

  const openModal = (product) => {
    setModalVisible(true);
    if (product) {
      setId(product._id);
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  };

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      // cleanup;
    };
  }, [successSave, successDelete, successUpdate]);

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };

  return (
    <div className="content content-margin">
      {userInfo === null && <Redirect to="/signin"></Redirect>}
      <div className="product-header">
        <h3>Products</h3>
        <div>{productSave && <h4>{"load"}</h4>}</div>
        <button className="button primary" onClick={() => openModal()}>
          Create Product
        </button>
      </div>
      {modalVisible && (
        <AddProductScreen
          idState={idState}
          nameState={nameState}
          priceState={priceState}
          categoryState={categoryState}
          brandState={brandState}
          imageState={imageState}
          countInStockState={countInStockState}
          descriptionState={descriptionState}
          modalVisibleState={modalVisibleState}
          productSave={productSave}
          enterpriseState={enterpriseState}
        />
      )}

      <div className="product-list">
        <table className="table content-margin">
          <thead className="content-margin">
            <tr>
              <th>name</th>
              <th>price</th>
              <th>category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button onClick={() => openModal(product)}>Edit</button>
                  <button onClick={() => deleteHandler(product)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductListScreen;
