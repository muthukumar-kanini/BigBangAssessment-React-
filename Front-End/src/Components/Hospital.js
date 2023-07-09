import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Hospital.css';
import Navbar from './Navbar';

export default function Hospital() {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('https://localhost:7190/api/Hospitals');
      setHospitals(response.data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  const updateHospital = async (updatedHospital) => {
    try {
      await axios.put(
        `https://localhost:7190/api/Hospitals/${updatedHospital.hospitalId}`,
        updatedHospital
      );
      setSelectedHospital(null);
      setEditMode(false);
      fetchHospitals();
    } catch (error) {
      console.error('Error updating hospital:', error);
    }
  };

  const deleteHospital = async (id) => {
    try {
      await axios.delete(`https://localhost:7190/api/Hospitals/${id}`);
      fetchHospitals();
    } catch (error) {
      console.error('Error deleting hospital:', error);
    }
  };

  const selectHospital = (hospital) => {
    setSelectedHospital(hospital);
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setSelectedHospital({ ...selectedHospital, [e.target.name]: e.target.value });
  };

  return (
    <div >
         <Navbar/>
      <h2>Hospitals</h2>
      <div className='containerabc'>
        <h3>Hospitals List</h3>
        {hospitals.map((hospital) => (
          <div
            key={hospital.hospitalId}
            
          >
            {selectedHospital && selectedHospital.hospitalId === hospital.hospitalId ? (
              <>
                {/* Editable fields for the selected hospital */}
                <p>
                  Name: <input type="text" name="name" value={selectedHospital.name} onChange={handleInputChange} />
                </p>
                <p>
                  Location: <input type="text" name="location" value={selectedHospital.location} onChange={handleInputChange} />
                </p>
                <p>
                  Capacity: <input type="text" name="capacity" value={selectedHospital.phoneNumber} onChange={handleInputChange} />
                </p>
                <button onClick={() => updateHospital(selectedHospital)}>Save</button>
              </>
            ) : (
              <div className='card'>
                {/* Non-editable fields for the hospital */}
                <p className="field"><span className="field-label">Name:</span> {hospital.name}</p>
                <p className="field"><span className="field-label">Location: </span>{hospital.location}</p>
                <p className="field"><span className="field-label">phone number: </span>{hospital.phoneNumber}</p>
              </div>
            )}
            {editMode ? null : (
              <>
                <button className="edit-button" onClick={() => selectHospital(hospital)}>Edit</button>
                <button className="delete-button"onClick={() => deleteHospital(hospital.hospitalId)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

