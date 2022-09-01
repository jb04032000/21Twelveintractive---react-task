import { combineReducers } from "redux";
import homePageReducer from "./homePageReducer";
import photosPageReducer from "./photosPageReducer";

const rootReducer = combineReducers({ homePageReducer, photosPageReducer });

export default rootReducer;
