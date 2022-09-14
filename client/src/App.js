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


function App() {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {setIsSidebarOpen(prev => !prev)}
  
  

  useEffect(()=>{
    fetch("http://127.0.0.1:3000/me", {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    })
      .then((r) => r.json())
      .then((data) => dispatch(login({id: data.id,email: data.email, username: data.username})));
  },[])

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
        <Route index element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes >
    </div >
  );
}

export default App;
