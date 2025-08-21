import React, { useEffect, useState } from "react";

const ViewClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/expenses/mine", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch claims");
        }

        const data = await res.json();
        setClaims(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching claims");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  if (loading) return <p style={{ fontSize: "18px" }}>⏳ Loading your claims...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>📑 My Expense Claims</h2>
      {claims.length === 0 ? (
        <p style={{ fontSize: "16px", color: "#666" }}>No claims submitted yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Expense Type</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id} style={rowStyle}>
                  <td style={tdStyle}>₹{claim.amount}</td>
                  <td style={tdStyle}>{claim.expense_type}</td>
                  <td style={tdStyle}>{claim.description || "-"}</td>
                  <td style={tdStyle}>
                    <span style={getStatusBadge(claim.status)}>
                      {claim.status || "Pending"}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {claim.receipt ? (
                      <a
                        href={`http://localhost:5000/uploads/${claim.receipt}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={btnLink}
                      >
                        View Receipt
                      </a>
                    ) : (
                      <span style={{ color: "#999" }}>No receipt</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  padding: "30px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  margin: "20px",
};


const titleStyle = {
  fontSize: "24px",
  marginBottom: "20px",
  color: "#333",
  fontWeight: "bold",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  borderRadius: "8px",
  overflow: "hidden",
};

const thStyle = {
  padding: "12px",
  backgroundColor: "#007bff",
  color: "white",
  textAlign: "left",
  fontWeight: "600",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  fontSize: "15px",
};

const rowStyle = {
  transition: "background 0.3s",
};

const getStatusBadge = (status) => {
  let bgColor = "#6c757d"; 
  if (status === "Approved") bgColor = "#28a745"; 
  else if (status === "Pending") bgColor = "#ffc107"; 
  else if (status === "Rejected") bgColor = "#dc3545"; 

  return {
    backgroundColor: bgColor,
    color: "white",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
  };
};

const btnLink = {
  backgroundColor: "#17a2b8",
  color: "white",
  padding: "6px 12px",
  borderRadius: "6px",
  textDecoration: "none",
  fontSize: "14px",
};

export default ViewClaims;
