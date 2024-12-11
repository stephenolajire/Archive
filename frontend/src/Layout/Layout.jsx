import React, { useContext } from "react"
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Navigation from "../navigation/Navigation";

const Layout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
