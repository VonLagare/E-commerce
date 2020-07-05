import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import enterpriseList from "../../redux/actions/admin/enterpriseList";
import AddEnterpriseScreen from "./AddEnterpriseScreen";
import deleteEnterprise from "../../redux/actions/admin/deleteEnterprise";

function EnterpriseListScreen() {
  const [id, setId] = useState("");
  const [enterpriseName, setEnterpriseName] = useState("");

  const listEnterprises = useSelector((state) => state.enterpriseListReducer);
  const { loading, enterprises, error } = listEnterprises;

  const dispatch = useDispatch();

  const enterpriserAdd = useSelector((state) => state.enterpriseAddReducer);
  const {
    loading: loadingAddUser,
    error: errorAddUser,
    success: successAddUser,
  } = enterpriserAdd;

  const enterpriseDelete = useSelector(
    (state) => state.enterpriseDeleteReducer
  );
  const {
    loading: loadingDeleteUser,
    error: errorDeletedUser,
    success: successDeleteUser,
  } = enterpriseDelete;

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (enterprise) => {
    setModalVisible(true);
    if (enterprise) {
      setId(enterprise._id);
      setEnterpriseName(enterprise.enterpriseName);
    } else {
      setEnterpriseName("");
    }
  };

  const deleteHandler = (enterprise) => {
    dispatch(deleteEnterprise(enterprise._id));
  };

  const enterpriseDetails = {
    id,
    setId,
    enterpriseName,
    setEnterpriseName,
    setModalVisible,
  };

  useEffect(() => {
    if (successAddUser) {
      setModalVisible(false);
    }
    dispatch(enterpriseList());
    return () => {
      // cleanup;
    };
  }, [successDeleteUser, successAddUser]);

  return (
    <div className="content content-margin">
      <div className="product-header">
        {loading && loading}
        <h3>Users</h3>
        <div>{loading && <h4>{"load"}</h4>}</div>
        <div>{error && <h4>{error.msg}</h4>}</div>
        {modalVisible ? null : (
          <button className="button primary" onClick={() => openModal()}>
            Add Enterprise
          </button>
        )}
      </div>

      {modalVisible && (
        <AddEnterpriseScreen enterpriseDetails={enterpriseDetails} />
      )}

      <div className="user-list">
        <table className="table content-margin">
          <thead className="content-margin">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>No. of Members</th>
              <th>No. of Productss</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enterprises.map((enterprise) => (
              <tr key={enterprise._id}>
                <td>{enterprise._id}</td>
                <td>{enterprise.enterpriseName}</td>
                <td>0</td>
                <td>0</td>
                <td>
                  <button onClick={() => openModal(enterprise)}>Edit</button>
                  <button onClick={() => deleteHandler(enterprise)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EnterpriseListScreen;
