import React, { useEffect, useState } from "react";

const Approvals = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/all-claims", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClaims(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (claimId, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/claim/${claimId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setClaims((prev) =>
          prev.map((c) => (c.id === claimId ? { ...c, status } : c))
        );
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (loading) return <p style={{ fontSize: "18px" }}>⏳ Loading claims...</p>;

  return (
    <div style={container}>
      <h2 style={title}> Approve or Reject Expense Claims</h2>
      {claims.length === 0 ? (
        <p style={{ fontSize: "16px", color: "#666" }}>No claims found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>User</th>
                <th style={th}>Amount</th>
                <th style={th}>Description</th>
                <th style={th}>Receipt</th>
                <th style={th}>Status</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id} style={row}>
                  <td style={td}>{claim.User?.username || "Unknown"}</td>
                  <td style={td}>₹{claim.amount}</td>
                  <td style={td}>{claim.description}</td>
                  <td style={td}>
                    {claim.receipt ? (
                      <a
                        href={`http://localhost:5000/uploads/${claim.receipt}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={linkBtn}
                      >
                        View Receipt
                      </a>
                    ) : (
                      <span style={{ color: "#999" }}>No receipt</span>
                    )}
                  </td>
                  <td style={td}>
                    <span style={statusBadge(claim.status)}>
                      {claim.status || "Pending"}
                    </span>
                  </td>
                  <td style={td}>
                    {claim.status === "pending" ? (
                      <>
                        <button
                          onClick={() => updateStatus(claim.id, "approved")}
                          style={{ ...btn, backgroundColor: "#28a745" }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(claim.id, "rejected")}
                          style={{ ...btn, backgroundColor: "#dc3545" }}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <em style={{ color: "#555" }}>Action taken</em>
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

const container = {
  padding: "30px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  margin: "20px",
};

const title = {
  fontSize: "22px",
  marginBottom: "20px",
  fontWeight: "bold",
  color: "#333",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  borderRadius: "8px",
  overflow: "hidden",
};

const th = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "12px",
  textAlign: "left",
  fontWeight: "600",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  fontSize: "15px",
};

const row = {
  transition: "background 0.2s",
};
row[":hover"] = { backgroundColor: "#f9f9f9" };

const btn = {
  border: "none",
  color: "white",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  marginRight: "8px",
};

const linkBtn = {
  backgroundColor: "#17a2b8",
  color: "white",
  padding: "6px 12px",
  borderRadius: "6px",
  textDecoration: "none",
  fontSize: "14px",
};

const statusBadge = (status) => {
  let color = "#6c757d"; // gray
  if (status === "approved") color = "#28a745"; // green
  else if (status === "pending") color = "#ffc107"; // yellow
  else if (status === "rejected") color = "#dc3545"; // red

  return {
    backgroundColor: color,
    color: "white",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
    textTransform: "capitalize",
  };
};

export default Approvals;
