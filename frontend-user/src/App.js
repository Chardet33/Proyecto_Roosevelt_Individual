import "./App.scss";
import "./../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "./../node_modules/bootstrap/dist/js/bootstrap.esm.js";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AppRouter from "./pages/Router/AppRouter";
import ScrollToTop from "./pages/Router/ScrollToTop";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";

function App() {  
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <NavBar />
          <AppRouter />
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
