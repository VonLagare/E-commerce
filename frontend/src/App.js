import React from "react";
import "./App.css";

import { BrowserRouter, Route, Link } from "react-router-dom";

import ProductScreen from "./components/customer/ProductScreen";
import HomeScreen from "./components/customer/HomeScreen";
import CartScreen from "./components/customer/CartScreen";
import SigninScreen from "./components/SigninScreen";
import { useSelector } from "react-redux";
import RegisterScreen from "./components/customer/RegisterScreen";
import ProductListScreen from "./components/owner/ProductListScreen";
import ShippingScreen from "./components/customer/ShippingScreen";
import PlaceOrderScreen from "./components/customer/PlaceOrderScreen";
import UserListScreen from "./components/admin/UserListScreen";
import AsideScreen from "./components/AsideScreen";
import EnterpriseListScreen from "./components/admin/EnterpriseListScreen";
import OrderSummaryScreen from "./components/customer/OrderSummaryScreen";
import PendingOrderScreen from "./components/employee/PendingOrderScreen";
import OngoingOrderScreen from "./components/employee/OngoingOrderScreen";
import CompletedOrderScreen from "./components/employee/CompletedOrderScreen";
import CancelledOrderScreen from "./components/employee/CancelledOrderScreen";

function App() {
  const userSignin = useSelector((state) => state.userSigninReducer);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Palengke</Link>
          </div>
          <div className="header-links">
            <Link to="/cart/">Cart</Link>
            {userInfo ? (
              <Link to="/profile">{userInfo.lastName}</Link>
            ) : (
              <Link to="/signin/">Signin</Link>
            )}
          </div>
        </header>
        <AsideScreen closeMenu={closeMenu} />
        <main className="main">
          <div className="content">
            <Route path="/register/" component={RegisterScreen} />
            <Route path="/signin/" component={SigninScreen} />
            <Route path="/" component={HomeScreen} exact={true} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/myproducts/" component={ProductListScreen} />
            <Route path="/cart/" component={CartScreen} />
            <Route path="/shipping/" component={ShippingScreen} />
            <Route path="/placeorder/" component={PlaceOrderScreen} />
            <Route path="/allusers/" component={UserListScreen} />
            <Route path="/allenterprises/" component={EnterpriseListScreen} />
            <Route path="/ordersummary/" component={OrderSummaryScreen} />
            <Route path="/pendingorders/" component={PendingOrderScreen} />
            <Route path="/ongoingorders/" component={OngoingOrderScreen} />
            <Route path="/completedorders/" component={CompletedOrderScreen} />
            <Route path="/cancelledorders/" component={CancelledOrderScreen} />
          </div>
        </main>
        <footer className="footer">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
