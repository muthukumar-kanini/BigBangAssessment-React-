import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [hospitalId, setHospital] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
        name,
      location,
      specialization,
      doctor_Email: doctorEmail,
      phoneNumber,
      password,
      status: 'inactive',
      image: selectedImage,
      hospital: {
        hospitalId
      }
    }

    console.log(formData);

    axios.post("https://localhost:7190/api/Doctor", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('New item added:', response.data);
        navigate('/Login');
      })
      .catch(error => {
        console.error('Error adding new item:', error);
      });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
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
                    <label>Email<span className="errmsg">*</span></label>
                    <input
                      value={doctorEmail}
                      onChange={e => setDoctorEmail(e.target.value)}
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
                    <label>Specialization<span className="errmsg">*</span></label>
                    <input
                      value={specialization}
                      onChange={e => setSpecialization(e.target.value)}
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

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Profile Image</label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Hospital</label>
                    <input
                      value={hospitalId}
                      onChange={e => setHospital(e.target.value)}
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
