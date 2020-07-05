import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddUserScreen from "./AddUserScreen";
import listUsers from "../../redux/actions/admin/listUsers";
import deleteUser from "../../redux/actions/admin/deleteUser";

function UserListScreen() {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [enterprise, setEnterprise] = useState("");

  const userList = useSelector((state) => state.userListReducer);
  const { loading, users, error } = userList;

  const dispatch = useDispatch();

  const userAdd = useSelector((state) => state.userAddReducer);
  const {
    loading: loadingAddUser,
    error: errorAddUser,
    success: successAddUser,
  } = userAdd;

  const userDelete = useSelector((state) => state.userDeleteReducer);
  const {
    loading: loadingDeleteUser,
    error: errorDeletedUser,
    success: successDeleteUser,
  } = userDelete;

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (user) => {
    setModalVisible(true);
    if (user) {
      setId(user._id);
      setFirstName(user.firstName);
      setMiddleName(user.middleName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPassword(user.password);
      setRole(user.role);
      setEnterprise(user.enterprise);
    } else {
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setRole("");
      setEnterprise("");
    }
  };

  const deleteHandler = (user) => {
    dispatch(deleteUser(user._id));
  };

  const userDetails = {
    id,
    setId,
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    role,
    setRole,
    enterprise,
    setEnterprise,
    modalVisible,
    setModalVisible,
  };

  useEffect(() => {
    if (successAddUser) {
      setModalVisible(false);
    }
    dispatch(listUsers());
    return () => {
      // cleanup;
    };
  }, [successAddUser, successDeleteUser]);

  return (
    <div className="content content-margin">
      <div className="product-header">
        {loading && loading}
        <h3>Users</h3>
        <div>{loading && <h4>{"load"}</h4>}</div>
        <div>{error && <h4>{error.msg}</h4>}</div>
        {modalVisible ? null : (
          <button className="button primary" onClick={() => openModal()}>
            Add User
          </button>
        )}
      </div>
      {modalVisible && <AddUserScreen userDetails={userDetails} />}

      <div className="user-list">
        <table className="table content-margin">
          <thead className="content-margin">
            <tr>
              <th>ID</th>
              <th>name</th>
              <th>email</th>
              <th>role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => openModal(user)}>Edit</button>
                  <button onClick={() => deleteHandler(user)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserListScreen;
