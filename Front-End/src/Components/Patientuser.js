import React, { useEffect, useState } from 'react';

export default function PatientUser() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://localhost:7190/api/Doctor/ApprovedDoctors');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div>
      {doctors.length > 0 ? (
        <div>
          <h1>List of Doctors</h1>
          {doctors.map((doctor) => (
            <div key={doctor.doctorId}>
              <h2>Name: {doctor.name}</h2>
              <p>Specialization: {doctor.specialization}</p>
              <p>Location: {doctor.location}</p>
              {/* Display other relevant doctor details */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading doctor list...</p>
      )}
    </div>
  );
}
