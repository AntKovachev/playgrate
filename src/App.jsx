import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TopNavbar from './components/TopNavbar'; // Import the navbar
import { AuthProvider } from './components/Auth/AuthContext'; // Import the AuthProvider
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
    return (
        <AuthProvider>
            <Router>
                <TopNavbar /> {/* Navbar will dynamically update based on login state */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;