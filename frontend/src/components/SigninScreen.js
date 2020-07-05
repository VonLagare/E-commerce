import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import signin from "../redux/actions/signin";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSigninReducer);
  const { loading, userInfo, error } = userSignin;

  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
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
            <h2>Sign-in</h2>
          </li>
          <li>{loading && <div>Loading</div>}</li>
          <li>{error && <div>Error in Signin</div>}</li>
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
            <button type="submit" className="button primary">
              Signin
            </button>
          </li>
          <li>
            New to Palenke?
            <label>
              <Link
                to={
                  redirect === "/"
                    ? "/register"
                    : "register?redirect=" + redirect
                }
                className="button"
              >
                Create your Account here
              </Link>
            </label>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SigninScreen;
