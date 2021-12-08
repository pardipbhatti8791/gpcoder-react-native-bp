import { combineReducers } from "redux";
import auth from "@root/store/auth/reducer";

const reducers = combineReducers({
  auth,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
