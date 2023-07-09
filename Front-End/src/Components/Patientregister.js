import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PRegister() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disease, setDisease] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const regObj = {
      name: name,
      location: location,
      phoneNumber: phoneNumber,
      patientEmail: patientEmail,
      password: password,
      disease: disease,
      appointments: null,
      doctor: null
    };

    fetch("https://localhost:7190/api/Patients", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(regObj)
    })
      .then(response => response.json())
      .then(data => {
        console.log('New item added:', data);
        toast.success('Registration successful'); 
        navigate('/Login');
      })
      .catch(error => {
        console.error('Error adding new item:', error);
        toast.error('Registration failed');
      });
  };

  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
      <ToastContainer position="top-right" autoClose={3000} /> 
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Full Name<span className="errmsg">*</span></label>
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Location<span className="errmsg">*</span></label>
                    <input
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Phone Number<span className="errmsg">*</span></label>
                    <input
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Email<span className="errmsg">*</span></label>
                    <input
                      value={patientEmail}
                      onChange={e => setPatientEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Password<span className="errmsg">*</span></label>
                    <input
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Disease<span className="errmsg">*</span></label>
                    <input
                      value={disease}
                      onChange={e => setDisease(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Register</button> |
              <NavLink to={'/login'} className="btn btn-danger">Close</NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
