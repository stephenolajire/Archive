import React, { useContext } from "react"
import { Outlet } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import Footbar from "../navigation/Footbar";

const Layout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footbar />
    </div>
  );
};

export default Layout;
