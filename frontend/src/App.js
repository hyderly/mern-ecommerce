import React from "react";
import Header from "./components/Header/header.component";
import Footer from "./components/Footer/footer.component";
import HomePage from "./pages/Home/home.component";

const App = () => {
  return (
    <>
      <Header />
      <main className="main-container">
        <HomePage />
      </main>
      <Footer />
    </>
  );
};

export default App;
