
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!localStorage.getItem("token") && !!user;
  const userRole = user?.role;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', background: '#eee' }}>
      {isLoggedIn && <Link to="/" style={{ marginRight: '10px' }}>Home</Link>}

      {isLoggedIn && userRole === 'employee' && (
        <>
          <Link to="/submit-claim" style={{ marginRight: '10px' }}>Submit Claim</Link>
          <Link to="/my-claims" style={{ marginRight: '10px' }}>My Claims</Link>
        </>
      )}

      {isLoggedIn && userRole === 'admin' && (
        <>
          <Link to="/pending-approvals" style={{ marginRight: '10px' }}>Pending Approvals</Link>
          <Link to="/all-claims" style={{ marginRight: '10px' }}>All Claims</Link>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
        </>
      )}

      {isLoggedIn && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
