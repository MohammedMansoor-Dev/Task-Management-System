import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';  // To enable navigation between different routes
import { clearUser } from '../redux/user/userSlice';

const SidebarAdmin = () => {
    const navigate = useNavigate(); // useNavigate for redirecting after logout
    const dispatch = useDispatch(); // Redux dispatch

    const handleLogout = async () => {
        try {
          const response = await axios.get('http://localhost:8000/user/logout', { withCredentials: true });
    
          if (response.data.message === 'You have successfully logged out.') {
            console.log(response.data);
            dispatch(clearUser()); // Clear redux store
            navigate('/signin');  // Redirect to signin page after successful logout
          } else {
            console.log(response.data);
          }
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };

    return (
        <div className="w-[290px] h-[99vh] bg-[#111828] text-white p-5 box-border rounded-[20px] border border-[#293041] flex flex-col justify-between">
            <h2 className="text-center mb-8 text-2xl font-bold border-b pb-2">Admin Dashboard</h2>
            <ul className="list-none pl-0 ">
                <li className="my-4">
                    <Link to="/admin-dashboard" className="text-white text-lg block py-2 px-3 rounded-md transition-colors duration-300 hover:bg-[#333c47]">
                        Dashboard
                    </Link>
                </li>
                <li className="my-4">
                    <Link to="/admin-dashboard/task-management" className="text-white text-lg block py-2 px-3 rounded-md transition-colors duration-300 hover:bg-[#333c47]">
                        Task Management
                    </Link>
                </li>
                <li className="my-4">
                    <Link to="/admin-dashboard/user-management" className="text-white text-lg block py-2 px-3 rounded-md transition-colors duration-300 hover:bg-[#333c47]">
                        User Management
                    </Link>
                </li>
                <li className="my-4">
                    <Link to="/admin-dashboard/settings" className="text-white text-lg block py-2 px-3 rounded-md transition-colors duration-300 hover:bg-[#333c47]">
                        Settings
                    </Link>
                </li>
                <li className="my-4">
                    <Link to="/admin-dashboard/report-issue" className="text-white text-lg block py-2 px-3 rounded-md transition-colors duration-300 hover:bg-[#333c47]">
                        Reports
                    </Link>
                </li>

            </ul>

            <div className='flex flex-col items-start'>
                <button className="my-4 w-full rounded-lg bg-yellow-600">
                    <Link to="/" className="text-white text-lg block py-2 px-3 rounded-md transition-colors duration-300 hover:bg-yellow-400">
                        Swith as User
                    </Link>
                </button>
                <button className="my-4 w-full rounded-lg bg-red-500" onClick={handleLogout}>
                    <Link className="text-white text-lg block py-2 px-3 rounded-md transition-colors duration-300 hover:bg-red-700">
                        Logout
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default SidebarAdmin;