import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import productListReducer from "./owner/productListReducer";
import userListReducer from "./admin/userListReducer";
import productDetailsReducer from "./customer/productDetailsReducer";
import userSigninReducer from "./userSigninReducer";
import userRegisterReducer from "./customer/userRegisterReducer";
import productAddReducer from "./owner/productAddReducer";
import productDeleteReducer from "./owner/productDeleteReducer";
import productUpdateReducer from "./owner/productUpdateReducer";
import userAddReducer from "./admin/userAddReducer";
import userDeleteReducer from "./admin/userDeleteReducer";
import enterpriseListReducer from "./admin/enterpriseListReducer";
import enterpriseAddReducer from "./admin/enterpriseAddReducer";
import enterpriseUpdateReducer from "./admin/enterpriseUpdateReducer";
import enterpriseDeleteReducer from "./admin/enterpriseDeleteReducer";
import cartReducers from "./customer/cartReducers";
import placeorderReducer from "./customer/placeorderReducer";
import orderSummaryReducer from "./customer/orderSummaryReducer";
import pendingorderReducer from "./employee/pedingorderReducer";
import acceptOrderReducer from "./employee/acceptOrderReducer";
import ongoingorderReducer from "./employee/ongoingorderReducer";
import completeOrderReducer from "./employee/completeOrderReducer";
import completedOrderReducer from "./employee/completedOrderReducer";
import cancelledOrderReducer from "./employee/cancelledOrderReducer";
import cartListReducer from "./customer/cartListReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["productListReducer", "cartReducers", "userSigninReducer"],
};

// get all reducers and combine to use in store
const rootReducer = combineReducers({
  productListReducer,
  productDetailsReducer,
  cartReducers,
  userSigninReducer,
  userRegisterReducer,
  productAddReducer,
  productDeleteReducer,
  productUpdateReducer,
  userListReducer,
  userAddReducer,
  userDeleteReducer,
  enterpriseListReducer,
  enterpriseAddReducer,
  enterpriseUpdateReducer,
  enterpriseDeleteReducer,
  placeorderReducer,
  orderSummaryReducer,
  pendingorderReducer,
  acceptOrderReducer,
  ongoingorderReducer,
  completeOrderReducer,
  completedOrderReducer,
  cancelledOrderReducer,
  cartListReducer,
});

export default persistReducer(persistConfig, rootReducer);
