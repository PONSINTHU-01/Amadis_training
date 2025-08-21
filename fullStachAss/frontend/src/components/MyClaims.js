import React, { useEffect, useState } from "react";

const MyClaims = () => {
  const [claims, setClaims] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/expenses/mine", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setClaims(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Claims</h2>
      {claims.length === 0 ? (
        <p style={styles.noClaims}>No claims submitted yet.</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim, index) => (
                <tr
                  key={claim.id}
                  style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
                >
                  <td style={styles.td}>{claim.amount}</td>
                  <td style={styles.td}>{claim.expense_type}</td>
                  <td style={styles.td}>{claim.description}</td>
                  <td
                    style={{
                      ...styles.td,
                      color:
                        claim.status === "approved"
                          ? "green"
                          : claim.status === "rejected"
                          ? "red"
                          : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {claim.status || "Pending"}
                  </td>
                  <td style={styles.td}>
                    {claim.receipt ? (
                      <a
                        href={`http://localhost:5000/uploads/${claim.receipt}`}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.link}
                      >
                        View
                      </a>
                    ) : (
                      "No receipt"
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

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  noClaims: {
    fontSize: "16px",
    color: "#777",
  },
  tableWrapper: {
    overflowX: "auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "10px",
    overflow: "hidden",
  },
  th: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },
  rowEven: {
    backgroundColor: "#f9f9f9",
  },
  rowOdd: {
    backgroundColor: "#fff",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default MyClaims;
