import { combineReducers } from "redux";

import { authenticationReducer } from "../store/ducks/authentication";

export const reducers = combineReducers({
  authentication: authenticationReducer
});
