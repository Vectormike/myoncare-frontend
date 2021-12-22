import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import DataTable from './components/DataTable';
import AppHeader from './components/AppHeader';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    let url = 'http://localhost:3001/user';
    let res = await axios.get(url);
    setUsers(res.data);
    return res.data;
  };
  return (
    <Row>
      <Col md="2">
        <Sidebar data={users} fetchData={fetchUsers} />
      </Col>
      <Col md="10">
        <AppHeader />
        <Container className="py-5">
          <DataTable data={users} fetchData={fetchUsers} />
        </Container>
      </Col>
    </Row>
  );
};

export default Dashboard;
