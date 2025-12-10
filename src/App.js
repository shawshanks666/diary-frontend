import './App.css';
import NavBar from './components/Navbar';
import Login from './components/Login'
import Signin from './components/Signin';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/Home';
import Landing from './components/Landing'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Components for different pages
function Log() {
  return <>
  <Login></Login>

  </>
}
function LandingPage() {
  return <Landing></Landing>
}
function Entry() {
  return (
    <>
      <NavBar></NavBar>
      <Home></Home>
  </>
  )
}
function Sign() {
  return (
    <>
      <Signin></Signin>
    </>

  )
}

function Dash() {
  return (<>
    <NavBar></NavBar>
    <Dashboard></Dashboard>;
  </>)
}

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Log />} />
        <Route path="/signin" element={<Sign />} />
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/dash" element={<Dash />} /> 
        <Route path="/entry" element={<Entry />} />
      </Routes>
    </Router>
  );
}

export default App;
