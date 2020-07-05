import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AsideScreen(props) {
  const user = useSelector((state) => state.userSigninReducer);
  const { userInfo } = user;

  // needs  cleaning
  return (
    <aside className="sidebar">
      <h3>Shopping Categories</h3>
      <button className="sidebar-close-button" onClick={props.closeMenu}>
        x
      </button>
      {userInfo ? (
        userInfo.role === "admin" ? (
          <ul>
            <li>
              <Link to="allusers">Users</Link>
            </li>
            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        ) : userInfo.role === "owner" ? (
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        ) : userInfo.role === "customer" ? (
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        ) : userInfo.role === "seller" ? (
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        )
      ) : (
        <ul>
          <li>
            <a href="index.html">Pants</a>
          </li>
          <li>
            <a href="index.html">Shirts</a>
          </li>
        </ul>
      )}
    </aside>
  );
}

export default AsideScreen;
