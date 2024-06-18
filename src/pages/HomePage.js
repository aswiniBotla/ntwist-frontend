import React, { useState, useEffect } from 'react';
import { Container, Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';

const HomePage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get('http://localhost:5000/api/employees');
    setEmployees(response.data);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditEmployee(null);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" mt={3}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Employee
        </Button>
      </Box>
      <EmployeeList
        employees={filteredEmployees}
        onEdit={setEditEmployee}
        onDelete={fetchEmployees}
      />
      <EmployeeForm
        open={open}
        onClose={handleClose}
        onRefresh={fetchEmployees}
        employee={editEmployee}
      />
    </Container>
  );
};

export default HomePage;
