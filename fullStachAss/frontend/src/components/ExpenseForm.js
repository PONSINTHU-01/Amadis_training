import React, { useState } from "react";

const SubmitExpenseClaim = () => {
  const [amount, setAmount] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [description, setDescription] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");

  const validateForm = () => {
    let newErrors = {};
    if (!amount || isNaN(amount) || amount <= 0) newErrors.amount = "Enter a valid amount.";
    if (!expenseType) newErrors.expenseType = "Select expense type.";
    if (!description) newErrors.description = "Enter a description.";
    if (!receipt) newErrors.receipt = "Upload a receipt.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("expense_type", expenseType);
    formData.append("description", description);
    formData.append("receipt", receipt);

    try {
      const res = await fetch("http://localhost:5000/api/expenses/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Claim submitted successfully!");
        setAmount(""); setExpenseType(""); setDescription(""); setReceipt(null);
      } else {
        alert(data.message || "Error submitting claim");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Submit Expense Claim</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            type="number" 
            placeholder="Enter Amount" 
            value={amount} 
            onChange={e => setAmount(e.target.value)} 
            style={styles.input} 
          />
          {errors.amount && <p style={styles.error}>{errors.amount}</p>}

          <select 
            value={expenseType} 
            onChange={e => setExpenseType(e.target.value)} 
            style={styles.input}
          >
            <option value="">-- Select Expense Type --</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Other">Other</option>
          </select>
          {errors.expenseType && <p style={styles.error}>{errors.expenseType}</p>}

          <textarea 
            placeholder="Write a short description..." 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            style={{ ...styles.input, minHeight: "80px" }} 
          />
          {errors.description && <p style={styles.error}>{errors.description}</p>}

          <input 
            type="file" 
            onChange={e => setReceipt(e.target.files[0])} 
            style={styles.fileInput} 
          />
          {errors.receipt && <p style={styles.error}>{errors.receipt}</p>}

          <button type="submit" style={styles.button}>
            Submit Claim
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0f7fa, #e3f2fd)",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "450px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "1rem",
  },
  fileInput: {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#fafafa",
  },
  button: {
    padding: "12px",
    background: "linear-gradient(90deg, #007bff, #00c6ff)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "0.3s",
  },
  error: {
    color: "red",
    fontSize: "0.85rem",
    margin: "-8px 0 5px 0",
  },
};

export default SubmitExpenseClaim;
