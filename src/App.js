import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import SelectSignature from "./pages/SelectSignature";
import PlaceSignature from "./pages/PlaceSignature";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/select-signature" element={<SelectSignature />} />
        <Route path="/place-signature" element={<PlaceSignature />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
