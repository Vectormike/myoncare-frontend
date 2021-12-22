import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  let navigate = useNavigate();
  const login = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let url = 'http://localhost:3001/user/login';
      let res = await axios.post(url, { email, password });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
      return;
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-vh-100 login">
      <Container>
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
          <h2 className="text-white text-center">Login</h2>
          <Form>
            <Form.Group className="pb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            {error ? <span>Incorrect email or password</span> : ''}
            <div className="d-flex justify-content-center mt-3">
              <button onClick={login} disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
