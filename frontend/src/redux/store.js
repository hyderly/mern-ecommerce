import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import logger from "redux-logger";
import thunk from "redux-thunk";

import { productReducer } from "./product/product.reducer";
import { productDetailReducer } from "./productDetail/productDetail.reducer";
import { cartReducer } from "./cart/cart.reducer";

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const rootReducer = combineReducers({
  productList: productReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
});

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
