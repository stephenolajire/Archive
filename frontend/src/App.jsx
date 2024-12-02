import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import Journal from "./Pages/Journal";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index="home" element={<Home />} />
          <Route path="journals" element={<Journal />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
