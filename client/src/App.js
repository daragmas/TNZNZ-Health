import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css';
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => { setIsSidebarOpen(prev => !prev) }
  return (
    <div className="App">
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Navbar toggleSidebar={toggleSidebar} />
      <Routes>
        {/* Add routes here */}

      </Routes>
    </div>
  );
}

export default App;
