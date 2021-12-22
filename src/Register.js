import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import './Login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  let navigate = useNavigate();
  const register = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let url = 'http://localhost:3001/user/register';
      let res = await axios.post(url, { name, email, password });
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
          <h2 className="text-white text-center">Register</h2>
          <Form>
            <Form.Group className="pb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="pb-3" controlId="exampleForm.ControlTextarea2">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            {error ? <span>{error}</span> : ''}

            <div className="d-flex justify-content-center mt-3">
              <button onClick={register} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Register;
