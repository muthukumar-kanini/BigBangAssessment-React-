import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Variables } from "./Variable";

const PatientPost = () => {
  const [patientId, setPatientId] = useState(0);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disease, setDisease] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchPatients = () => {
    axios
      .get("https://localhost:7190/api/Patients")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  };

  const fetchDoctors = () => {
    axios
      .get("API_URL/Doctor")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") setName(value);
    else if (name === "location") setLocation(value);
    else if (name === "phoneNumber") setPhoneNumber(value);
    else if (name === "patientEmail") setPatientEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "disease") setDisease(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name: name,
      location: location,
      phoneNumber: phoneNumber,
      patientEmail: patientEmail,
      password: password,
      disease: disease,
    };

    if (selectedPatient) {
      axios
        .put(`API_URL/Patients/${selectedPatient.patientId}`, formData)
        .then((response) => {
          console.log("Patient updated:", response.data);
          // Perform any necessary actions after successful update
          fetchPatients(); // Fetch updated list of patients
          resetForm(); // Reset the form
        })
        .catch((error) => {
          console.error("Error", error);
          // Handle the error appropriately
        });
    } else {
      axios
        .post("https://localhost:7190/api/Patients", formData)
        .then((response) => {
          console.log("Patient created:", response.data);
          // Perform any necessary actions after successful creation
          fetchPatients(); // Fetch updated list of patients
          resetForm(); // Reset the form
        })
        .catch((error) => {
          console.error("Error", error);
          // Handle the error appropriately
        });
    }
  };

  const handleUpdate = (patient) => {
    setSelectedPatient(patient);
    setPatientId(patient.patientId);
    setName(patient.name);
    setLocation(patient.location);
    setPhoneNumber(patient.phoneNumber);
    setPatientEmail(patient.patientEmail);
    setPassword(patient.password);
    setDisease(patient.disease);
  };

  const resetForm = () => {
    setSelectedPatient(null);
    setPatientId(0);
    setName("");
    setLocation("");
    setPhoneNumber("");
    setPatientEmail("");
    setPassword("");
    setDisease("");
  };

  const handleDelete = (patientId) => {
    axios
      .delete(`https://localhost:7190/api/Patients/${patientId}`)
      .then((response) => {
        console.log("Patient deleted:", response.data);
        fetchPatients();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container-fluid">
        <Navbar/>
      <br />
      <button className="btn btn-primary" onClick={toggleForm}>
        Add Patient
      </button>

      {showForm && (
        <form onSubmit={(event) => { handleSubmit(event); toggleForm(); }}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              value={phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="patientEmail"
              className="form-control"
              value={patientEmail}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Disease</label>
            <input
              type="text"
              name="disease"
              className="form-control"
              value={disease}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              {selectedPatient ? "Update" : "Create"}
            </button>
          </div>
        </form>
      )}

      <h2>Patient List</h2>
      <div className="row">
        {appointments.map((patient) => (
          <div className="col-md-4" key={patient.patientId}>
            <div className="card mb-4 h-100">
              <div className="card-body">
                <h5 className="card-title">{patient.name}</h5>
                <p className="card-text">
                  Location: {patient.location}<br />
                  Phone: {patient.phoneNumber}<br />
                  Email: {patient.patientEmail}<br />
                  Disease: {patient.disease}<br />
                </p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => { handleUpdate(patient); toggleForm(); }}>Update</button> &nbsp;
                <button className="btn btn-danger" onClick={() => handleDelete(patient.patientId)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPost;
