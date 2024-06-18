import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import axios from 'axios';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/employees/${id}`);
    onDelete();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Date of Hire</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.salary}</TableCell>
              <TableCell>{new Date(employee.dateOfHire).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => onEdit(employee)}>Edit</Button>
                <Button color="secondary" onClick={() => handleDelete(employee.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeList;
