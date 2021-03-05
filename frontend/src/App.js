import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/header.component";
import Footer from "./components/Footer/footer.component";
import HomePage from "./pages/Home/home.component";
import ProductPage from "./pages/Product/product.component";
import CartPage from "./pages/Cart/cart.component";
import LoginPage from "./pages/Login/login.component";
import RegisterPage from "./pages/Register/register.component";
import ProfilePage from "./pages/Profile/profile.component";
import ShippingPage from "./pages/Shipping/shipping.component";
import PaymentPage from "./pages/Payment/payment.component";
import PlaceOrderPage from "./pages/PlaceOrder/placeOrder.component";
import OrderPage from "./pages/Order/order.component";
import UserList from "./pages/UserList/userList.component";
import UserEdit from "./pages/UserEdit/userEdit.component";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <main className="main-container">
          <Route path="/" component={HomePage} exact />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/admin/userList" component={UserList} />
          <Route path="/admin/user/:id/edit" component={UserEdit} />
        </main>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
