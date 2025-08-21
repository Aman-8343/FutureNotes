import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CapsuleCard from '../components/CapsuleCard';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [capsules, setCapsules] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCapsules = async () => {
            try {
                const res = await api.get('/capsules');
                setCapsules(res.data);
            } catch (err) {
                console.error(err);
                // If token is invalid (e.g., expired), log out the user
                if (err.response.status === 401) {
                    handleLogout();
                }
            }
        };
        fetchCapsules();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <h2>Your Time Capsules</h2>
                <div>
                    <Link to="/create" className="btn-create">Create New Capsule</Link>
                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                </div>
            </nav>
            <div className="capsule-list">
                {capsules.length > 0 ? (
                    capsules.map(capsule => <CapsuleCard key={capsule._id} capsule={capsule} />)
                ) : (
                    <p>You haven't created any capsules yet. Why not create one for your future self?</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;