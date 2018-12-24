import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootRuducer from "./reducers/index";

const InitialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootRuducer,
  InitialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
