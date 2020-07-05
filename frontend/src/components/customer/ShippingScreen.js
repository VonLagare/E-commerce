import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import saveShipping from "../../redux/actions/customer/saveShipping";
import CheckoutSteps from "../componentParts/CheckoutSteps";

function ShippingScreen(props) {
  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [barangay, setBarangay] = useState("");
  const [municipality, setMunicipality] = useState("San Jose");
  const [province, setProvince] = useState("Occidental Mindoro");

  const userRegister = useSelector((state) => state.userRegisterReducer);
  const { loading, userInfo, error } = userRegister;

  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShipping({ street, district, barangay, municipality, province })
    );
    props.history.push("placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              <label htmlFor="street">Street</label>
              <input
                type="text"
                name="street"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="district">District (Purok)</label>
              <input
                type="text"
                name="district"
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="barangay">Barangay</label>
              <input
                type="text"
                name="barangay"
                id="barangay"
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="municipality">Municipality</label>
              <input
                type="text"
                name="municipality"
                id="municipality"
                readOnly
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="province">Province</label>
              <input
                type="text"
                name="province"
                id="province"
                readOnly
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </li>
            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default ShippingScreen;
