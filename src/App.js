import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ParkingSelectionPage from "./pages/ParkingSelectionPage/ParkingSelectionPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/parking-selection" element={<ParkingSelectionPage />} />
    </Routes>
  );
};

export default App;
