import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const fonts = [
  { name: "Dancing Script", style: { fontFamily: "'Dancing Script', cursive" } },
  { name: "Pacifico", style: { fontFamily: "'Pacifico', cursive" } },
];

const SignaturePreview = () => {
  const [selected, setSelected] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { fileName } = location.state || {};

  if (!fileName) {
    return <p>❌ No file uploaded. Please upload a PDF first.</p>;
  }

  const uploadedPdfPath = `http://localhost:5000/uploads/${fileName}`;

  const handleContinue = () => {
    if (!selected) return alert("Please select a signature style first.");
    if (!userName.trim()) return alert("Please enter your name for the signature.");

    navigate("/place-signature", {
      state: {
        selectedFont: selected,
        pdfPath: uploadedPdfPath,
        fileName,
        userName, // ✅ new field passed
      },
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Choose a Signature Style</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{ margin: "1rem 0", padding: "0.5rem", fontSize: "1rem", width: "300px" }}
      />

      <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
        {fonts.map((font, index) => (
          <div
            key={index}
            onClick={() => setSelected(font.name)}
            style={{
              border: selected === font.name ? "2px solid blue" : "1px solid gray",
              padding: "1rem",
              cursor: "pointer",
              ...font.style,
              fontSize: "2rem",
              transition: "0.2s",
            }}
          >
            {userName || "Your Name"}
          </div>
        ))}
      </div>

      {selected && userName && (
        <div style={{ marginTop: "1.5rem" }}>
          ✅ You selected: <strong>{selected}</strong>
          <br />
          <button onClick={handleContinue} style={{ marginTop: "1rem" }}>
            Continue to Place Signature →
          </button>
        </div>
      )}
    </div>
  );
};

export default SignaturePreview;
