import React, { useState, useEffect } from "react";
import { Variables } from "./Variable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./Doctor.css";

const DoctorPost = () => {
  const [doctorId, setDoctorId] = useState(0);
  const [name, setDoctorName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doctor_Email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [doctor, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    axios
      .get(Variables.API_URL + "Doctor")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") setDoctorName(value);
    else if (name === "location") setLocation(value);
    else if (name === "phoneNumber") setPhoneNumber(value);
    else if (name === "doctor_Email") setEmail(value);
    else if (name === "status") setStatus(value);
    else if (name === "password") setPassword(value);
    else if (name === "specialization") setSpecialization(value);
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("imageFile", imageFile);
    formData.append("location", location);
    formData.append("phoneNumber", phoneNumber);
    formData.append("doctor_Email", doctor_Email);
    formData.append("status", status);
    formData.append("password", password);
    formData.append("specialization", specialization);

    if (selectedDoctor) {
      axios
        .put(Variables.API_URL + `Doctor/${selectedDoctor.doctorId}`, formData)
        .then((response) => {
          console.log("Doctor updated:", response.data);
          fetchDoctors();
          resetForm();
        })
        .catch((error) => {
          console.error("Error", error);
        });
    } else {
      axios
        .post(Variables.API_URL + "Doctor", formData)
        .then((response) => {
          console.log("Doctor created:", response.data);
          fetchDoctors();
          resetForm();
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  };

  const handleUpdate = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorId(doctor.doctorId);
    setDoctorName(doctor.name);
    setImageFile(null);
    setPassword(doctor.password);
    setPhoneNumber(doctor.phoneNumber);
    setEmail(doctor.doctor_Email);
    setStatus(doctor.status);
    setLocation(doctor.location);
    setSpecialization(doctor.specialization);
  };

  const resetForm = () => {
    setSelectedDoctor(null);
    setDoctorId(0);
    setDoctorName("");
    setImageFile(null);
    setPassword("");
    setPhoneNumber("");
    setEmail("");
    setStatus("");
    setLocation("");
    setSpecialization("");
  };

  const handleDelete = (doctorId) => {
    axios
      .delete(Variables.API_URL + `Doctor/${doctorId}`)
      .then((response) => {
        console.log("Doctor deleted:", response.data);
        fetchDoctors();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };







  const labelStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
  };
  
  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };
  
  const buttonStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };
  
  







  return (
    <div>
      <Navbar />
      <br />

      <button className="btn btn-primaryabc" onClick={toggleForm}>
        Add Doctor
      </button>

      {showForm && (
        <form
          onSubmit={(event) => {
            handleSubmit(event);
            toggleForm();
          }}
        >
          <div className="form-group">
  <label style={labelStyle}>Doctor Name</label>
  <input
    type="text"
    name="name"
    className="form-controlabc"
    value={name}
    onChange={handleInputChange}
    required
    style={inputStyle}
  />
</div>
<div className="form-group">
  <label style={labelStyle}>Password</label>
  <input
    type="text"
    name="password"
    className="form-controlabc"
    value={password}
    onChange={handleInputChange}
    required
    style={inputStyle}
  />
</div>
<div className="form-group">
  <label style={labelStyle}>Phone</label>
  <input
    type="text"
    name="phoneNumber"
    className="form-controlabc"
    value={phoneNumber}
    onChange={handleInputChange}
    required
    style={inputStyle}
  />
</div>
<div className="form-group">
  <label style={labelStyle}>Email</label>
  <input
    type="email"
    name="doctor_Email"
    className="form-controlabc"
    value={doctor_Email}
    onChange={handleInputChange}
    required
    style={inputStyle}
  />
</div>
<div className="form-group">
  <label style={labelStyle}>Location</label>
  <input
    type="text"
    name="location"
    className="form-controlabc"
    value={location}
    onChange={handleInputChange}
    required
    style={inputStyle}
  />
</div>
<div className="form-group">
  <label style={labelStyle}>Status</label>
  <input
    type="text"
    name="status"
    className="form-controlabc"
    value={status}
    onChange={handleInputChange}
    required
    style={inputStyle}
  />
</div>
<div className="form-group">
  <label style={labelStyle}>Specialization</label>
  <input
    type="text"
    name="specialization"
    className="form-controlabc"
    value={specialization}
    onChange={handleInputChange}
    required
    style={inputStyle}
  />
</div>
<br />
<div className="form-group">
  <label style={labelStyle}>Image</label>
  <input
    type="file"
    name="imageFile"
    className="form-control-file"
    onChange={handleImageChange}
    required
    style={inputStyle}
  />
</div>
<br />
<div className="form-group">
  <button type="submit" className="btn btn-primaryabc" style={buttonStyle}>
    {selectedDoctor ? 'Update' : 'Create'}
  </button>
</div>
</form>

      )}
<div className="marginclass">
      <h2>Doctor List</h2>
      
        {doctor.map((doctor) => (
          <div className="cardabc" key={doctor.doctorId}>
            <img
              src={`https://localhost:7190/uploads/doctor/${doctor.docImagePath}`}
              alt="Doctor"
              className="card-img-topabc"
              style={{ height: "200px" }}
            />
            <div className="card-bodyabc">
              <h5 className="card-titleabc">{doctor.name}</h5>
              <p className="card-textabc">
                DoctorEmail: {doctor.doctor_Email}
                <br />
                Phone: {doctor.phoneNumber}
                <br />
                Specialization: {doctor.specialization}
                <br />
                Location: {doctor.location}
              </p>
            </div>
            <div className="card-footerabc">
              <button
                className="updateicon"
                onClick={() => {
                  handleUpdate(doctor);
                  toggleForm();
                }}
              >
                Update
              </button>{" "}
              &nbsp;
              <button
                className="deleteicon"
                onClick={() => handleDelete(doctor.doctorId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}






      </div>
    </div>
  );
};

export default DoctorPost;