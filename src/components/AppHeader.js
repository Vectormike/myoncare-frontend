import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();

  const logOutUser = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <header className="d-flex justify-content-between py-3 border-bottom mb-5">
      <h4>List of Users</h4>
      <button className="btn">
        <Link to="/login">
          <button onClick={logOutUser}>Logout</button>
        </Link>
      </button>
    </header>
  );
};

export default AppHeader;
