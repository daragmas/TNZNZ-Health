import './App.css';
import { Routes, Route } from "react-router-dom";
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

    for (const elem of inputContainers) {

      let input = elem.children[1]
      console.log(input)
      if (input) {
        data[input.name] = input.value
      }
    }
    console.log('data', data)
    const req = await fetch("http://127.0.0.1:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
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
  const [selectedHospital, setSelectedHospital] = useState()



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
            <Form
              title="Login"
              inputs={[
                { type: "text", name: 'username', label: "Username" },
                { type: "password", name: 'password', label: "Password" },
              ]}
              handleSubmit={handleLoginSubmit}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Form
              title="Register"
              inputs={[
                { type: "email", name: 'email', label: "Email" },
                { type: "text", name: 'username', label: "Username" },
                { type: "password", name: 'password', label: "Password" },
                { type: "password", name: 'password_confirmation', label: "Password Confirmation" },
              ]}
            />
          }
        />
        <Route
          path="/results"
          element={<Results
            searchedProcedure={searchedProcedure}
            selectedHospital={selectedHospital}
          />}
        />
        <Route index element={<Home />} />
        <Route path="/search" element={
          <Search
            searchedProcedure={searchedProcedure}
            setSelectedHospital={setSelectedHospital}
            setSearchedProcedure={setSearchedProcedure} />} />
      </Routes >
    </div >
  );
}

export default App;
