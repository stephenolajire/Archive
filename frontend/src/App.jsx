import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import Journal from "./Pages/Journal";
import Login from "./User/Login";
import Signup from "./User/Signup";
import { GlobalProvider } from "./GlobalContext/GlobalContext";
import UploadModal from "./modal/UploadModal";
import EditModal from "./modal/EditModal";

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index="home" element={<Home />} />
            <Route path="journals" element={<Journal />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
        {/* Include CustomModal outside of Routes to make sure it is available globally */}
        <UploadModal/>
        <EditModal/>
      </Router>
    </GlobalProvider>
  );
};

export default App;
