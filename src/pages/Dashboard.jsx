// src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/docs");
      setDocuments(res.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch documents:", err);
      alert("Failed to load documents.");
    }
  };

  const handleSign = (doc) => {
    navigate("/select-signature", {
      state: {
        doc,
      },
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📄 Your Uploaded Documents</h2>

      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>File</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Status</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc._id}>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>
                  {doc.originalName}
                </td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>
                  {doc.signedFilePath ? "✅ Signed" : "⌛ Pending"}
                </td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>
                  <a
                    href={`http://localhost:5000/uploads/${doc.filename}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Original
                  </a>
                  {doc.signedFilePath ? (
                    <>
                      {" | "}
                      <a
                        href={`http://localhost:5000/uploads/${doc.signedFilePath.split("\\").pop()}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Signed
                      </a>
                    </>
                  ) : (
                    <>
                      {" | "}
                      <button onClick={() => handleSign(doc)}>Sign</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
