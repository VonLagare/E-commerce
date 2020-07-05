import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import registerAction from "../../redux/actions/customer/registerAction";

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegisterReducer);
  const { loading, userInfo, error } = userRegister;

  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerAction(name, email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //   cleanup;
    };
  }, [userInfo]);

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create Account</h2>
          </li>
          <li>{loading && <div>Loading</div>}</li>
          <li>{error && <div>{error.msg}</div>}</li>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Re-Enter Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Register
            </button>
          </li>
          <li>
            Already have an account?
            <label>
              <Link
                to={
                  redirect === "/" ? "/signin" : "signin?redirect=" + redirect
                }
                className="button"
              >
                Signin
              </Link>
            </label>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default RegisterScreen;
