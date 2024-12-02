import React from "react";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

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
