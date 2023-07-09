import React, { useEffect, useState } from "react";
import "./ActiveDoctor.css";
import Navbar from "./Navbar";

import axios from "axios";

const ActiveDoctor = () => {
  const [pendingDoctorData, setPendingDoctorData] = useState([]);
  const [approvedDoctorData, setApprovedDoctorData] = useState([]);

  const fetchDoctorData = async () => {
    try {
      // Call the API to retrieve pending doctor data
      const pendingResponse = await fetch(
        "https://localhost:7190/api/Admins/DoctorRequests"
      );
      const pendingData = await pendingResponse.json();
      setPendingDoctorData(pendingData);

      // Call the API to retrieve approved doctor data
      const approvedResponse = await fetch(
        "https://localhost:7190/api/Doctor/ApprovedDoctors"
      );
      const approvedData = await approvedResponse.json();
      setApprovedDoctorData(approvedData);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const handleApproveDoctor = (doctorId) => {
    // const { doctor_Id } = doctor;

    // Call the API to update the status of the doctor to "Approved"
    axios
      .put(
        `https://localhost:7190/api/Admins/ApproveDoctorRequest/${doctorId}`
      )
      .then(() => {
        // Refresh the doctor data after successful approval
        fetchDoctorData();
      })
      .catch((error) => {
        console.error("Error approving doctor:", error);
      });
  };

  return (
    <div>
        
        <Navbar/>
      <div className="card-list">
        <div className="card pending-doctor-card">
          <div className="card-body">
            <h5 className="card-title">Pending Request Doctors</h5>
            {pendingDoctorData.map((doctor) => (
              <div key={doctor.doctor_Id} className="card-item">
                <h3>{doctor.doctorId}</h3>
                <h6>{doctor.doctor_Name}</h6>
                <p>Specialization: {doctor.specialization}</p>
                <p>Email: {doctor.doctor_Email}</p>
                <p>Phone: {doctor.doctor_PhNo}</p>
                <p>Status: {doctor.status}</p>
                <button
                  onClick={() => handleApproveDoctor(doctor.doctorId)}
                  className="approve-button"
                >
                  Approve
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card approved-doctor-card">
          <div className="card-body">
            <h5 className="card-title">Approved Doctors</h5>
            {approvedDoctorData.map((doctor) => (
              <div key={doctor.doctor_Id} className="card-item">
                <h6>{doctor.doctor_Name}</h6>
                <p>Specialization: {doctor.specialization}</p>
                <p>Email: {doctor.doctor_Email}</p>
                <p>Phone: {doctor.doctor_PhNo}</p>
                <p>Status: {doctor.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveDoctor;
