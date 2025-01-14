import { combineReducers } from "redux";
import authReducer from "./authReducer";
import listDataReducer from "./ListDataReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
  auth: authReducer,
  listData: listDataReducer,
  userList: UserReducer,
});
