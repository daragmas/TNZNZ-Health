import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css';
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Home from './components/Home'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => { setIsSidebarOpen(prev => !prev) }
  return (
    <div className="App">

      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Navbar toggleSidebar={toggleSidebar} />
      <Routes>
        {/* Add routes here */}
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
