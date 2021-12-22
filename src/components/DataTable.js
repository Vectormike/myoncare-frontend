import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DataTable.css';

const DataTable = ({ data, fetchData }) => {
  let navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [user, setUser] = useState({});

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (user) => {
    setUser(user);
    setEmail(user.email);
    setName(user.name);
    setShowEdit(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (user) => {
    setUser(user);
    setShowDelete(true);
  };

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // useEffect(() => {
  //   if (data.length === 0) {
  //     navigate('/register');
  //   }
  // }, [data]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Date Created</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0
          ? navigate('/register')
          : data.map((value) => (
              <tr>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{new Date(value.createdAt)}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default DataTable;
