import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import axios from 'axios';

const EmployeeForm = ({ open, onClose, onRefresh, employee }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    salary: '',
    dateOfHire: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    position: false,
    department: false,
    salary: false,
    dateOfHire: false,
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        position: employee.position,
        department: employee.department,
        salary: employee.salary,
        dateOfHire: employee.dateOfHire.split('T')[0],
      });
    } else {
      setFormData({
        name: '',
        position: '',
        department: '',
        salary: '',
        dateOfHire: '',
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    setFormErrors({ ...formErrors, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    let errors = false;
    const newErrors = { ...formErrors };

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = true;
        errors = true;
      }
    });

    if (errors) {
      setFormErrors(newErrors);
      return;
    }

    try {
      if (employee) {
        await axios.put(`http://localhost:5000/api/employees/${employee.id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/employees', formData);
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error, show alert or retry logic
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{employee ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
            helperText={formErrors.name ? 'Name is required' : ''}
            required
          />
          <TextField
            margin="dense"
            name="position"
            label="Position"
            type="text"
            fullWidth
            value={formData.position}
            onChange={handleChange}
            error={formErrors.position}
            helperText={formErrors.position ? 'Position is required' : ''}
            required
          />
          <TextField
            margin="dense"
            name="department"
            label="Department"
            type="text"
            fullWidth
            value={formData.department}
            onChange={handleChange}
            error={formErrors.department}
            helperText={formErrors.department ? 'Department is required' : ''}
            required
          />
          <TextField
            margin="dense"
            name="salary"
            label="Salary"
            type="number"
            fullWidth
            value={formData.salary}
            onChange={handleChange}
            error={formErrors.salary}
            helperText={formErrors.salary ? 'Salary is required' : ''}
            required
          />
          <TextField
            margin="dense"
            name="dateOfHire"
            label="Date of Hire"
            type="date"
            fullWidth
            value={formData.dateOfHire}
            onChange={handleChange}
            error={formErrors.dateOfHire}
            helperText={formErrors.dateOfHire ? 'Date of Hire is required' : ''}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {employee ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmployeeForm;
