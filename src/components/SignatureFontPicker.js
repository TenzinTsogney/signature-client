import React from "react";

const fonts = [
  { name: "Dancing Script", style: { fontFamily: "Dancing Script, cursive" } },
  { name: "Pacifico", style: { fontFamily: "Pacifico, cursive" } },
  { name: "Cursive", style: { fontFamily: "cursive" } },
  { name: "Monospace", style: { fontFamily: "monospace" } }
];

const SignatureFontPicker = ({ selectedFont, setSelectedFont, signerName }) => {
  return (
    <div>
      <h3>Choose Signature Font:</h3>
      {fonts.map((font, index) => (
        <div
          key={index}
          onClick={() => setSelectedFont(font)}
          style={{
            cursor: "pointer",
            padding: "10px",
            border: selectedFont?.name === font.name ? "2px solid #000" : "1px solid #ccc",
            marginBottom: "10px",
            ...font.style
          }}
        >
          {signerName || "Your Signature"}
        </div>
      ))}
    </div>
  );
};

export default SignatureFontPicker;
