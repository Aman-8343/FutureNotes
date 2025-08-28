import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateCapsule from './pages/CreateCapsule';
import './App.css';


const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;  
};

function App() {
    return (
        <div className="App">

            
            <Routes>
                
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                
                <Route
                    path="/dashboard"
                    element={<PrivateRoute><Dashboard /></PrivateRoute>}
                />
                <Route
                    path="/create"
                    element={<PrivateRoute><CreateCapsule /></PrivateRoute>}
                />

               
                <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
        </div>
    );
}

export default App;