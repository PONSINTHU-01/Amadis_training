import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [claims, setClaims] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/expenses/mine", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setClaims(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Fetch claims error:", err));
  }, [token]);

  const totalClaims = claims.length;
  const approvedClaims = claims.filter((c) => c.status === "approved").length;
  const pendingClaims = claims.filter((c) => c.status === "pending").length;
  const rejectedClaims = claims.filter((c) => c.status === "rejected").length;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.container}>

      <header style={styles.header}>
        <h2>User Dashboard</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </header>
\
      <div style={styles.summaryContainer}>
        <div style={{ ...styles.card, backgroundColor: "#007bff", color: "#fff" }}>
          <h4>Total Claims</h4>
          <p>{totalClaims}</p>
        </div>
        <div style={{ ...styles.card, backgroundColor: "#28a745", color: "#fff" }}>
          <h4>Approved</h4>
          <p>{approvedClaims}</p>
        </div>
        <div style={{ ...styles.card, backgroundColor: "#ffc107", color: "#000" }}>
          <h4>Pending</h4>
          <p>{pendingClaims}</p>
        </div>
        <div style={{ ...styles.card, backgroundColor: "#dc3545", color: "#fff" }}>
          <h4>Rejected</h4>
          <p>{rejectedClaims}</p>
        </div>
      </div>
      
      <h3>Quick Actions</h3>
      <div style={styles.actionsContainer}>
        <div style={styles.actionCard} onClick={() => navigate("/submit")}>
          Submit Expense Claim
        </div>
        <div style={styles.actionCard} onClick={() => navigate("/claims")}>
          My Claims
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  summaryContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    flex: 1,
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  actionsContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  actionCard: {
    flex: 1,
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer",
    backgroundColor: "#f8f9fa",
    transition: "all 0.2s",
  },
};

export default UserDashboard;

