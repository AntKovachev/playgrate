import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TopNavbar from './components/TopNavbar';
import MyAccount from "./components/MyAccount";
import { AuthProvider } from './components/Auth/AuthContext';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
    return (
        <AuthProvider>
            <Router>
                <TopNavbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/my-account" element={<MyAccount/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;