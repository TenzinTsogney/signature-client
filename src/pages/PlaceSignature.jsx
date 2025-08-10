import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const fontMap = {
  "Dancing Script": StandardFonts.Helvetica,
  Pacifico: StandardFonts.Courier,
  Cursive: StandardFonts.TimesRoman,
  Monospace: StandardFonts.CourierBold,
};

const PlaceSignature = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const doc = location.state?.doc;
  const userName = location.state?.userName || "Your Signature";
  const selectedFont = location.state?.selectedFont?.name || "Dancing Script";

  const fileName = doc?.originalName || "document.pdf";
  const pdfPath = doc?.filename
    ? `http://localhost:5000/uploads/${doc.filename}`
    : null;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!doc || !doc.filename) {
      alert("❌ Document data is missing");
      navigate("/dashboard");
    }
  }, [doc, navigate]);

  const handleSign = async () => {
    if (!pdfPath) {
      alert("❌ Invalid file path");
      return;
    }

    setLoading(true);
    try {
      const existingPdfBytes = await fetch(pdfPath).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const lastPage = pages[pages.length - 1];

      const selectedPdfFont = fontMap[selectedFont] || StandardFonts.Helvetica;
      const font = await pdfDoc.embedFont(selectedPdfFont);
      const fontSize = 24;
      const { width } = lastPage.getSize();

      const textWidth = font.widthOfTextAtSize(userName, fontSize);
      const x = (width - textWidth) / 2;
      const y = 50;

      lastPage.drawText(userName, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });

      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `signed_${fileName}`;
      link.click();
      URL.revokeObjectURL(link.href);

      alert("✅ Signature placed and file downloaded.");
    } catch (err) {
      console.error("❌ Error placing signature:", err);
      alert("Failed to sign PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🖋️ Sign Document</h2>
      <p>
        Adding signature with <strong>{selectedFont}</strong> font at the
        bottom of the last page.
      </p>
      <button onClick={handleSign} disabled={loading}>
        {loading ? "Signing..." : "Place Signature & Download"}
      </button>
    </div>
  );
};

export default PlaceSignature;
