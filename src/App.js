import './App.css';
import NavBar from './components/Navbar';
import Login from './components/Login'
import Signin from './components/Signin';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/Home';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Components for different pages
function Log() {
  return <>
  <Login></Login>

  </>
}
function Homepage() {
  return (
    <>
  <Home></Home>
  </>
  )
}
function Sign() {
  return (
    <Signin></Signin>

  )
}

function Dash() {
  return <Dashboard></Dashboard>;
}

// Main App Component
function App() {
  return (
    <Router>
  <NavBar></NavBar>
      <Routes>
        <Route path="/login" element={<Log />} />
        <Route path="/signin" element={<Sign />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dash" element={<Dash />} /> 
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
