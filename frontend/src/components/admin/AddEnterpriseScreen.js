import React from "react";
import { useDispatch } from "react-redux";
import addEnterprise from "../../redux/actions/admin/addEnterprise";
import updateEnterprise from "../../redux/actions/admin/updateEnterprise";

function AddEnterpriseScreen(props) {
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (props.enterpriseDetails.id) {
      return dispatch(
        updateEnterprise({
          id: props.enterpriseDetails.id,
          enterpriseName: props.enterpriseDetails.enterpriseName,
        })
      );
    } else {
      return dispatch(
        addEnterprise({
          enterpriseName: props.enterpriseDetails.enterpriseName,
        })
      );
    }
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create Enterprise</h2>
          </li>
          {/* <li>{loading && <div>Loading</div>}</li>
          <li>{error && <div>{error.msg}</div>}</li> */}
          <li>
            <label htmlFor="enterpriseName">Enterprise Name</label>
            <input
              type="text"
              name="enterpriseName"
              id="enterpriseName"
              value={props.enterpriseDetails.enterpriseName}
              onChange={(e) =>
                props.enterpriseDetails.setEnterpriseName(e.target.value)
              }
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Register
            </button>
            <button
              type="submit"
              className="button secondary"
              onClick={() => props.enterpriseDetails.setModalVisible(false)}
            >
              Back
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default AddEnterpriseScreen;
