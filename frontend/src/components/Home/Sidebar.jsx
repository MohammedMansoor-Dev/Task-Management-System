import React from 'react';
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom'; // useNavigate instead of redirect
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearUser } from '../../redux/user/userSlice';

const Sidebar = () => {
  const navigate = useNavigate(); // useNavigate for redirecting after logout
  const dispatch = useDispatch(); // Redux dispatch
  const { username, email, role } = useSelector((state) => state.user);

  const data = [
    { title: "All Tasks", icon: <CgNotes />, link: '/' },
    { title: "Important Tasks", icon: <MdLabelImportant />, link: '/importantTasks' },
    { title: "Completed Tasks", icon: <FaCheckDouble />, link: '/completedTasks' },
    { title: "Incomplete Tasks", icon: <TbNotebookOff />, link: '/incompleteTasks' }
  ];

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
    <>
      <div>
        <h2 className='text-xl font-semibold text-center'>{username || 'Guest'}</h2>
        <h4 className='mb-1 text-gray-400'>{email || 'No Email Provided'}</h4>
        <hr />
      </div>
      <div>
        {data.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className='my-2 flex items-center gap-2 hover:bg-gray-600 p-2 rounded transition-all duration-300'
          >
            {item.icon} {item.title}
          </Link>
        ))}
      </div>
      <div className='flex flex-col items-start'>
       {role === 'admin' && <button className="my-4 w-full rounded-lg bg-yellow-600">
          <Link to="/admin-dashboard/" className="text-white text-lg block py-2 px-3 rounded-md transition-colors duration-300 hover:bg-yellow-400">
            Swith as Admin
          </Link>
        </button>}
        <button
          className="bg-red-500 w-full p-2 rounded cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
