import React from "react";
import { useDispatch } from "react-redux";
import updateUser from "../../redux/actions/admin/updateUser";
import addUser from "../../redux/actions/admin/addUser";

function AddUserScreen(props) {
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (props.userDetails.id) {
      return dispatch(
        updateUser({
          id: props.userDetails.id,
          firstName: props.userDetails.firstName,
          middleName: props.userDetails.middleName,
          lastName: props.userDetails.lastName,
          email: props.userDetails.email,
          password: props.userDetails.password,
          role: props.userDetails.role,
          enterprise: props.userDetails.enterprise,
        })
      );
    } else {
      return dispatch(
        addUser({
          firstName: props.userDetails.firstName,
          middleName: props.userDetails.middleName,
          lastName: props.userDetails.lastName,
          email: props.userDetails.email,
          password: props.userDetails.password,
          role: props.userDetails.role,
          enterprise: props.userDetails.enterprise,
        })
      );
    }
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create Account</h2>
          </li>
          {/* <li>{loading && <div>Loading</div>}</li>
          <li>{error && <div>{error.msg}</div>}</li> */}
          <li>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={props.userDetails.firstName}
              onChange={(e) => props.userDetails.setFirstName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="middleName">Middle Name</label>
            <input
              type="text"
              name="middleName"
              id="middleName"
              value={props.userDetails.middleName}
              onChange={(e) => props.userDetails.setMiddleName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={props.userDetails.lastName}
              onChange={(e) => props.userDetails.setLastName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={props.userDetails.email}
              onChange={(e) => props.userDetails.setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={props.userDetails.password}
              onChange={(e) => props.userDetails.setPassword(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="confirmPassword">Re-Enter Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={props.userDetails.confirmPassword}
              onChange={(e) =>
                props.userDetails.setConfirmPassword(e.target.value)
              }
            />
          </li>
          <li>
            <label htmlFor="enterprise">Enterprise</label>
            <input
              type="text"
              name="enterprise"
              id="enterprise"
              value={props.userDetails.enterprise}
              onChange={(e) => props.userDetails.setEnterprise(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="role">Role</label>
            <select
              type="text"
              name="role"
              id="role"
              value={props.userDetails.role}
              onChange={(e) => props.userDetails.setRole(e.target.value)}
            >
              <option>User Role</option>
              <option value="owner">Owner</option>
              <option value="seller">Seller</option>
              <option value="customer">Customer</option>
            </select>
          </li>
          <li>
            <button type="submit" className="button primary">
              Register
            </button>
            <button
              type="submit"
              className="button secondary"
              onClick={() => props.userDetails.setModalVisible(false)}
            >
              Back
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default AddUserScreen;
