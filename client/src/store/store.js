import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";


const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

//const state = store.getState();

export default store;
