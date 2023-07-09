import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [doctorEmail, setDoctorEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const proceedLogin = async (e) => {
    e.preventDefault();

    try {
      const randomNumber = await sendEmail();
      if (validate()) {
        const admin = { doctor_Email: doctorEmail, password };

        const response = await fetch('https://localhost:7190/api/Tokens/Doctor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(admin),
        });

        if (response.ok) {
          const token = await response.text();
          console.log(token);
          sessionStorage.setItem('token', token);
          localStorage.setItem('userEmail', doctorEmail); // Store user email in local storage
          toast.success('Success');
          navigate('/doctoruser');
        } else {
          throw new Error('Invalid credentials');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
    }
  };

  const validate = () => {
    if (!doctorEmail) {
      toast.warning('Please enter Email');
      return false;
    }

    if (!password) {
      toast.warning('Please enter Password');
      return false;
    }

    return true;
  };

  const sendEmail = () => {
    return new Promise((resolve, reject) => {
      const randomNumber = Math.floor(Math.random() * 9000) + 1000;

      const templateParams = {
        to_name: 'kirutu',
        from_name: 'mk',
        message: 'The OTP is ' + randomNumber,
        to_email: doctorEmail
      };

      emailjs
        .send('service_uhy85zb', 'template_opbdaav', templateParams, 'hOuSWOX63Ph_TkrSi')
        .then((response) => {
          console.log('Email sent successfully:', response);
          const otp = prompt('Enter the OTP');
          if (otp === randomNumber.toString()) {
            console.log('Correct OTP');
            resolve(randomNumber);
          } else {
            console.log('Incorrect OTP');
            reject(new Error('Incorrect OTP'));
          }
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          reject(error);
        });
    });
  };

  return (
    <div className="row">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
        <form onSubmit={proceedLogin} className="containerabc">
          <div className="card">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>User Email <span className="errmsg">*</span></label>
                <input
                  value={doctorEmail}
                  onChange={(e) => setDoctorEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Password <span className="errmsg">*</span></label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Login</button>
              <Link className="btn btn-success" to="/register">Register</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}