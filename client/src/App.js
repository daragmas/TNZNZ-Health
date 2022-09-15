import './App.css';
import { Routes, Route } from "react-router-dom";
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
import Results from './components/Results';

import Estimate from './components/Estimate';
import Profile from './components/Profile';

function App() {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => { setIsSidebarOpen(prev => !prev) }
  const [pricingForEstimate, setPricingForEstimate] = useState({})

  //User Creation
  // const handleLoginSubmit = async (e, form) => {
  //   e.preventDefault();
  //   const data = {}
  //   const inputContainers = document.body.getElementsByTagName('form')[0].getElementsByTagName("div");



  useEffect(() => {
    const getUser = async () => {
      const req= await fetch("http://127.0.0.1:3000/me", {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      if (req.ok) {
        const data = await req.json()
        dispatch(login({id: data.id,  username: data.username, email: data.email, zip_code: data.zip_code }))
      } 

    }
    getUser()
      
  }, [])

  const [searchedProcedure, setSearchedProcedure] = useState({})
  const [nearbyHospitals, setNearbyHospitals] = useState([])
  const [selectedHospital, setSelectedHospital] = useState()
  // console.log('nearby', nearbyHospitals)

  // console.log("Searched Procedure: ", searchedProcedure.id)

  //Returned Component
  return (
    <div className="App">
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Navbar toggleSidebar={toggleSidebar} />
      <Routes>
        {/* Add routes here */}
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
          element={<Results
            searchedProcedure={searchedProcedure}
            selectedHospital={selectedHospital}
            nearbyHospitals={nearbyHospitals}
            setPricingForEstimate={setPricingForEstimate}
          />}
        />
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={

          <Search
            searchedProcedure={searchedProcedure}
            setSelectedHospital={setSelectedHospital}
            setSearchedProcedure={setSearchedProcedure}
            setNearbyHospitals={setNearbyHospitals}
            nearbyHospitals={nearbyHospitals} />} />
        <Route
          path="/estimate"
          element={<Estimate
            pricingForEstimate={pricingForEstimate}
          />}
        />
      </Routes >
    </div >
  );
}

export default App;
