import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import logger from "redux-logger";
import thunk from "redux-thunk";

import { productReducer } from "./product/product.reducer";
import {productDetailReducer} from './productDetail/productDetail.reducer'

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const initialState = {};

const rootReducer = combineReducers({
  productList: productReducer,
  productDetail: productDetailReducer
});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
