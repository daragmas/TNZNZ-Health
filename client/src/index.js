import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Search from './components/Search';
import Navbar from './components/Navbar'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/search" element={<Search/>}/>
    </Routes>
    <App/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
