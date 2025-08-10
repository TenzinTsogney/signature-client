import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Upload PDF</Link>
      <Link to="/select-signature" style={{ marginRight: "1rem" }}>Select Signature</Link>
      <Link to="/place-signature" style={{ marginRight: "1rem" }}>Place Signature</Link>
      <Link to="/dashboard" style={{ marginRight: "1rem" }}>Dashboard</Link>
    </nav>
  );
};

export default Navbar;
