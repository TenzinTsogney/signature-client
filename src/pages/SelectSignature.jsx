import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignatureFontPicker from "../components/SignatureFontPicker";

const SelectSignature = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doc = location.state?.doc;

  const [selectedFont, setSelectedFont] = useState(null);
  const [signerName, setSignerName] = useState("");

  const handleContinue = () => {
    if (!doc) {
      alert("❌ Document data is missing");
      return;
    }
    if (!signerName) {
      alert("Please enter your name");
      return;
    }
    if (!selectedFont) {
      alert("Please select a signature font");
      return;
    }

    navigate("/place-signature", {
      state: {
        doc,
        userName: signerName,
        selectedFont,
      },
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>✍️ Select Signature</h2>

      <label>Your Name:</label>
      <input
        type="text"
        value={signerName}
        onChange={(e) => setSignerName(e.target.value)}
        placeholder="Enter your name"
        style={{ display: "block", marginBottom: "1rem", padding: "0.5rem" }}
      />

      <SignatureFontPicker
        selectedFont={selectedFont}
        setSelectedFont={setSelectedFont}
        signerName={signerName}
      />

      <button onClick={handleContinue} style={{ marginTop: "1rem" }}>
        Continue to Sign
      </button>
    </div>
  );
};

export default SelectSignature;
