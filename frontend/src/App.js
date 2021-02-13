import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/header.component";
import Footer from "./components/Footer/footer.component";
import HomePage from "./pages/Home/home.component";
import ProductPage from "./pages/Product/product.component";
import CartPage from "./pages/Cart/cart.component";
import LoginPage from "./pages/Login/login.component";

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
        </main>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
