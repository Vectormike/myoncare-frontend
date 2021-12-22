import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = ({ data, fetchData }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [user, setUser] = useState({});

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => {
    setEmail(user.email);
    setName(user.name);
    setShowEdit(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }, []);

  const editUser = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let url = `http://localhost:3001/user/update/${user.id}`;
      let res = await axios.patch(
        url,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      handleCloseEdit();
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      fetchData();
      return;
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let url = `http://localhost:3001/user/delete/${user.id}`;
      let res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      handleCloseDelete();
      setUser(user);
      fetchData();
      return;
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside>
      <ul className="py-4">
        <li className="py-2">{user.name}</li>
        <li className="py-2" onClick={handleShowEdit}>
          Edit
        </li>
        <li className="py-2" onClick={handleShowDelete}>
          Delete
        </li>
      </ul>
      <Modal show={showEdit} handleClose={handleCloseEdit} title="Edit User">
        <Form className="editForm">
          <Form.Group className="pb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="pb-3" controlId="exampleForm.ControlTextarea2">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          {error ? <span>{error}</span> : ''}

          <div className="d-flex justify-content-end mt-3">
            <button onClick={editUser} disabled={loading} className="px-4">
              {loading ? 'Editing...' : 'Edit'}
            </button>
          </div>
        </Form>
      </Modal>
      <Modal show={showDelete} handleClose={handleCloseDelete} title="Delete User">
        <p>Are you sure you want to delete {user.name}?</p>
        <div className="d-flex justify-content-end mt-3">
          <Button variant="danger" onClick={deleteUser} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </Modal>
    </aside>
  );
};

export default Sidebar;
