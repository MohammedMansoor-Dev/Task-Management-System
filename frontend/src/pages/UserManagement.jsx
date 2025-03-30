import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserManagement = () => {
  const [allUsers, setAllUsers] = useState([])
  const [allTasks, setAllTasks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin-dashboard/', { withCredentials: true });
        setAllUsers(response.data.allUsers);
        setAllTasks(response.data.allTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allUsers.length > 0 && allTasks.length > 0) {
      calculateTasks();
    }
  }, [allUsers, allTasks]);

  const calculateTasks = () => {
    const updatedUsers = allUsers.map(user => {
      const taskCount = allTasks.filter(task => task.user === user._id).length;
      return { ...user, tasks: taskCount };
    });

    // Check if the updated list is different from the current state to avoid unnecessary updates
    if (JSON.stringify(updatedUsers) !== JSON.stringify(allUsers)) {
      setAllUsers(updatedUsers);
    }
  };

  // Delete user handler
  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm('Are you sure, Do you want to Delete User?, Onces the user is deleted it can\'t be recover!!!')
      if (confirm) {
        const response = await axios.delete(`http://localhost:8000/admin-dashboard/delete-user/${userId}`, { withCredentials: true });
        console.log(response.data);
        setAllUsers(allUsers.filter(user => user._id !== userId));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-4">
      {/* Page Title */}
      <div className="text-center mb-4">
        <h1 className="text-4xl font-semibold text-blue-600">User Management</h1>
        <p className="text-lg text-gray-400 mt-2">Manage users and the number of tasks assigned to them</p>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-[#1e2938] p-6 rounded-lg shadow-lg">
        <table className="min-w-full table-auto text-white">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left font-semibold text-blue-500 text-xl">S.No</th>
              <th className="py-3 px-6 text-left font-semibold text-blue-500 text-xl">Username</th>
              <th className="py-3 px-6 text-left font-semibold text-blue-500 text-xl">Number of Tasks</th>
              <th className="py-3 px-6 text-left font-semibold text-blue-500 text-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user._id} className="border-b border-gray-600">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{user.username}</td>
                <td className="py-3 px-22 ">{user.tasks}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;