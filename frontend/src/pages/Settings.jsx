import axios from 'axios';
import React, { useState } from 'react';

const Settings = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        notifications: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/admin-dashboard/send-settings', formData);
            console.log('Form submitted with data:', formData);
            alert('Settings sent to admin successfully!');
        } catch (error) {
            console.error('Error sending settings email:', error);
            alert('Failed to send settings to admin.');
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900'>
            <div className="max-w-md w-full mx-auto text-white p-6 rounded-lg shadow-lg bg-[#1e2938]">
                <h2 className="text-2xl font-semibold mb-4">Settings</h2>
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-gray-300" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#334155] text-white placeholder-gray-400"
                            placeholder="Enter your username"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-300" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#334155] text-white placeholder-gray-400"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Notifications */}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="notifications"
                            name="notifications"
                            checked={formData.notifications}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label className="text-gray-300" htmlFor="notifications">
                            Enable Notifications
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;