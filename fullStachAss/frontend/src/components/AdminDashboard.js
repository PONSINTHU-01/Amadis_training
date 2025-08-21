import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [claims, setClaims] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:5000/api/admin/all-claims", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setClaims(data))
      .catch((err) => console.error(err));
  }, []);

  // Filtering & Sorting
  const filteredClaims = claims
    .filter((claim) => statusFilter === "All" || claim.status === statusFilter)
    .sort((a, b) =>
      sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
    );

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <header style={styles.topBar}>
        <h2 style={styles.pageTitle}>Admin Dashboard</h2>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Users Table */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>All Users</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} style={styles.tr}>
                  <td style={styles.td}>{user.id}</td>
                  <td style={styles.td}>{user.username}</td>
                  <td style={styles.td}>{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={styles.empty}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Claims Table */}
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <h3 style={styles.sectionTitle}>Expense Claims</h3>
          <Link to="/approvals">
            <button style={styles.primaryButton}>Approve / Reject</button>
          </Link>
        </div>

        {/* Filters */}
        <div style={styles.filterContainer}>
          <label>
            Status:{" "}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={styles.select}
            >
              <option value="All">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </label>

          <label>
            Amount:{" "}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={styles.select}
            >
              <option value="asc">Low → High</option>
              <option value="desc">High → Low</option>
            </select>
          </label>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredClaims.length > 0 ? (
              filteredClaims.map((claim) => (
                <tr key={claim.id} style={styles.tr}>
                  <td style={styles.td}>{claim.id}</td>
                  <td style={styles.td}>{claim.User?.username}</td>
                  <td style={styles.td}>₹{claim.amount}</td>
                  <td style={styles.td}>{claim.description}</td>
                  <td style={styles.td}>
                    <span style={styles.statusBadge(claim.status)}>
                      {claim.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={styles.empty}>
                  No claims found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    background: "linear-gradient(to right, #f8fafc, #eef2f7)",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#222",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "15px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    transition: "transform 0.2s",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "8px",
    overflow: "hidden",
  },
  th: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px",
    textAlign: "left",
    fontSize: "15px",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    fontSize: "15px",
    color: "#333",
    backgroundColor: "#fff",
  },
  tr: {
    transition: "background 0.2s",
  },
  empty: {
    textAlign: "center",
    padding: "12px",
    fontStyle: "italic",
    color: "#777",
    backgroundColor: "#fafafa",
  },
  filterContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "15px",
    padding: "10px",
    background: "#f8f9fa",
    borderRadius: "8px",
  },
  select: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginLeft: "6px",
    fontSize: "14px",
  },
  primaryButton: {
    padding: "10px 18px",
    height: "45px",
    width: "140px",
    backgroundColor: "#6c2bd9",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    transition: "background 0.2s",
  },
  statusBadge: (status) => {
    let color = "#6c757d";
    if (status === "approved") color = "#28a745";
    else if (status === "pending") color = "#ffc107";
    else if (status === "rejected") color = "#dc3545";

    return {
      backgroundColor: color,
      color: "white",
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "bold",
      textTransform: "capitalize",
    };
  },
};

export default AdminDashboard;
