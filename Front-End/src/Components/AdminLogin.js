import React, { useState } from 'react';
import axios from 'axios';
import './AdminLogin.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AdminForm = () => {
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState({
    admin_Name: '',
    admin_Password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://localhost:7190/api/Tokens/Admin', adminData)
      .then((response) => {
        console.log('Admin loggedin:', response.data);
        toast.success('Admin logged success'); // Display success toast message
        // Reset form fields after successful creation
        setAdminData({
          admin_Name: '',
          admin_Password: ''
        });
        // Navigate to the adminside route
        navigate('/admin');
      })
      .catch((error) => {
        console.error('Error creating admin:', error);
        toast.error('Error creating admin'); // Display error toast message
      });
  };

  return (
 
    <div className="container">
     
      <div className="form-container">
    
        <ToastContainer position="top-right" autoClose={3000} /> {/* ToastContainer component */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="admin_Name">Name:</label>
            <input
              type="text"
              id="admin_Name"
              name="admin_Name"
              value={adminData.admin_Name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="admin_Password">Password:</label>
            <input
              type="password"
              id="admin_Password"
              name="admin_Password"
              value={adminData.admin_Password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
