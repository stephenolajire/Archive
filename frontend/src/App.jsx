import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import Journal from "./Pages/Journal";
import Login from "./User/Login";
import Signup from "./User/Signup";
import { GlobalProvider } from "./GlobalContext/GlobalContext";
import CustomModal from "./components/CustomModal"; // Adjust the path as needed

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
        <CustomModal />
      </Router>
    </GlobalProvider>
  );
};

export default App;
