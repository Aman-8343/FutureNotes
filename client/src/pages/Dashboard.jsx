import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CapsuleCard from '../components/CapsuleCard';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [capsules, setCapsules] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCapsules = async () => {
            try {
                const res = await api.get('/capsules');
                setCapsules(res.data);
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    handleLogout();
                }
            } finally {
                setLoading(false);
            }
        };
        fetchCapsules();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Your Time Capsules</h1>
                    <div>
                        <Link
                            to="/create"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
                        >
                            Create Capsule
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {loading ? (
                    <p className="text-center text-gray-500">Loading your memories...</p>
                ) : capsules.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {capsules.map(capsule => <CapsuleCard key={capsule._id} capsule={capsule} />)}
                    </div>
                ) : (
                    <div className="text-center bg-white p-12 rounded-lg shadow-md">
                        <h3 className="text-xl font-medium text-gray-900">No Capsules Found</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            You haven't created any time capsules yet.
                        </p>
                        <div className="mt-6">
                            <Link
                                to="/create"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Create Your First Capsule
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;