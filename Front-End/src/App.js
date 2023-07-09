
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import PRegister from './Components/Patientregister';
import 'bootstrap/dist/css/bootstrap.min.css';
import Patient from './Components/Patient';
import Hospital from './Components/Hospital';

import Admin from './Components/ActiveDoctor';
import AdminForm from './Components/AdminLogin';
import Doctoruser from './Components/Doctoruser';
import Editdoctoruser from './Components/Editdoctoruser';

import DoctorCard from './Components/Doctor';


import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

import ActiveDoctor from './Components/ActiveDoctor';
import Adminside from './Components/Adminside';
import PatientUser from './Components/Patientuser';
import plogin from './Components/Patientlogin';


function App() {
 return(
  <div>
    <BrowserRouter>
   

 <Routes>
   <Route path='/login' Component={Login}></Route>
    <Route path='/patientregister' Component={PRegister}></Route>
    <Route path='/register' Component={Register}></Route>
    <Route path='/doctor' Component={DoctorCard}></Route>
    <Route path='/Patient' Component={Patient}></Route>
    <Route path='/hospital' Component={Hospital}></Route>
    <Route path='/admin' Component={ActiveDoctor}></Route>
    <Route path='/adminlogin' Component={AdminForm}></Route>
    <Route path='/adminside' Component={Adminside}></Route>
    <Route path='/home' Component={Home}></Route>
    <Route path='/doctoruser' Component={Doctoruser}></Route>
    <Route path='/doctoredit' Component={Editdoctoruser}></Route>
    <Route path='/patientuser' Component={PatientUser}></Route>
  
    
    
    

    </Routes>
    </BrowserRouter>
  </div>
 ) 
}

export default App