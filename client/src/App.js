import './App.css';
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Form from "./components/Form";
import Home from './components/Home'
import Search from './components/Search';
import Results from './components/Results';


function App() {
  //Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => { setIsSidebarOpen(prev => !prev) }
  
  //User Creation
  const handleLoginSubmit = async (e, form) => {
    e.preventDefault();
    const data = {}
    const inputContainers = document.body.getElementsByTagName('form')[0].getElementsByTagName("div");
=======
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { login } from "./redux/user";

import './App.css';
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

import Search from "./components/Search";

import Home from './components/Home'
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';


function App() {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {setIsSidebarOpen(prev => !prev)}
  
  
>>>>>>> e74400426efff7e96e7c3c50102ad536c26ca541

  useEffect(()=>{
    fetch("http://127.0.0.1:3000/me", {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
<<<<<<< HEAD
      body: JSON.stringify(data),
    });

    if (req.ok) {
      const res = await req.json();
      console.log('fetched')
      console.log(res)
    } else {
      console.log('Error')
    }
  }
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
  }

  const [searchedProcedure, setSearchedProcedure] = useState({})
  const [nearbyHospitals, setNearbyHospitals] = useState([])
  const [selectedHospital, setSelectedHospital] = useState()
=======
    })
      .then((r) => r.json())
      .then((data) => dispatch(login({id: data.id,email: data.email, username: data.username})));
  },[])
>>>>>>> e74400426efff7e96e7c3c50102ad536c26ca541

  console.log('nearby', nearbyHospitals)



  //Returned Component
  return (
    <div className="App">

      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Navbar toggleSidebar={toggleSidebar} />
      <Routes>
        {/* Add routes here */}
        <Route path="/search" element={<Search />} />
        <Route
          path="/login"
          element={
            <LoginForm />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterForm />
          }
          
        />
        <Route
          path="/results"
          element={<Results />}
        />
        <Route index element={<Home />} />
        <Route path="/search" element={
          <Search 
            searchedProcedure={searchedProcedure} 
            setSelectedHospital={setSelectedHospital} 
            setSearchedProcedure={setSearchedProcedure}
            setNearbyHospitals={setNearbyHospitals}
            nearbyHospitals={nearbyHospitals}/>}/>
      </Routes >
    </div >
  );
}

export default App;
