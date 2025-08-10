import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Always get from env for deployment; set in Netlify Dashboard
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/docs/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success && res.data.document) {
        alert("✅ Upload successful! Redirecting to dashboard...");
        // Save document info if needed
        localStorage.setItem("uploadedDoc", JSON.stringify(res.data.document));
        navigate("/dashboard");
      } else {
        throw new Error("Unexpected upload response");
      }
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h2>📤 Upload PDF</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ marginBottom: "1rem" }}
        />
        <br />
        <button type="submit" disabled={!file || loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem", color: "red" }}>{message}</p>}
    </div>
  );
};

export default UploadPage;
