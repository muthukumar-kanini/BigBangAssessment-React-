import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function DoctorUser() {
  const [patients, setPatients] = useState([]);
  const doctorEmail = localStorage.getItem('userEmail'); // Get the doctor's email from local storage

  useEffect(() => {
    const fetchDoctorId = async () => {
      try {
        const response = await fetch(`https://localhost:7190/api/Doctor/GetDoctorByEmail?doctorEmail=${encodeURIComponent(doctorEmail)}`);
        const data = await response.json();
        const doctorId = data.doctorId;
        fetchPatients(doctorId);
      } catch (error) {
        console.error('Error fetching doctor ID:', error);
      }
    };

    if (doctorEmail) {
      fetchDoctorId();
    }
  }, [doctorEmail]);

  const fetchPatients = async (doctorId) => {
    try {
      const response = await fetch(`https://localhost:7190/api/Doctor/${doctorId}`);
      const data = await response.json();
      setPatients(data.patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <center><h1>My Patients</h1></center>
        <br></br>
      <div className="card-container">
        
        {patients.length > 0 ? (
          patients.map((patient) => (
            <div key={patient.patientId} className="card">
              <div className="card-details">
            <b>  <p className="card-info">Patient Name: {patient.name}</p></b>
                <p className="card-info">Location: {patient.location}</p>
                <p className="card-info">Phone Number: {patient.phoneNumber}</p>
                {/* Display other relevant patient details */}
              </div>
            </div>
          ))
        ) : (
          <p>Loading patient details...</p>
        )}
      </div>
    </div>
  );
}
