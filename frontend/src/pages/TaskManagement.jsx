import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputData from '../components/Home/InputData';

const TaskManagement = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [inputForm, setInputForm] = useState('hidden');
  const [selectedTask, setSelectedTask] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin-dashboard/', { withCredentials: true });
      setAllTasks(response.data.allTasks);  // Update state with the fetched tasks
      setAllUsers(response.data.allUsers);  // Update state with the fetched users
    } catch (error) {
      console.error('Error fetching tasks:', error);  // Handle any errors
    }
  };

  useEffect(() => {
    fetchData();  // Call the async function
  }, []);

  // Delete task handler
  const deleteTask = async (taskId) => {
    // setAllTasks(allTasks.filter(task => task._id !== taskId));  // Remove task from state
    try {
      const confirm = window.confirm('Are you sure, Do you want to Delete The Task?')
      if (confirm) {
        const response = await axios.get(`http://localhost:8000/tasks/delete-task/${taskId}`, { withCredentials: true })
        if (response.data) {
          fetchData();
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Edit task handler (mock implementation)
  const editTask = (taskId) => {
    const taskToEdit = allTasks.find(task => task._id === taskId);
    setSelectedTask(taskToEdit)
    setInputForm('fixed')
  };

  return (
    <div className="p-4">
      {/* Page Title */}
      <div className="text-center mb-4">
        <h1 className="text-4xl font-semibold text-blue-600">Task Management</h1>
        <p className="text-lg text-gray-400 mt-2">Manage all users and tasks in a simple table format</p>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto bg-[#1e2938] p-6 rounded-lg shadow-lg">
        <table className="min-w-full table-auto text-white">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left font-semibold text-blue-500 text-xl">S.No</th>
              <th className="py-3 px-6 text-left font-semibold text-blue-500 text-xl">Username</th>
              <th className="py-3 px-6 text-left font-semibold text-blue-500 text-xl">Task</th>
              <th className="py-3 px-6 text-left font-semibold text-blue-500 text-xl">Status</th>
              <th className="py-3 px-6 text-left font-semibold text-blue-500 text-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allTasks.map((task, index) => {
              // Find the corresponding user from allUsers by matching the user ID
              const user = allUsers.find(user => user._id === task.user);

              // If user exists, display their username; otherwise, show "Unknown User"
              const userName = user ? user.username : 'Unknown User';

              return (
                <tr key={task._id} className="border-b border-gray-600">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{userName}</td>
                  <td className="py-3 px-6">{task.title}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${task.taskStatus === 'Completed'
                          ? 'bg-green-500'
                          : task.taskStatus === 'Incomplete'
                            ? 'bg-red-500'
                            : 'bg-yellow-500'
                        }`}
                    >
                      {task.taskStatus}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => editTask(task._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {inputForm === 'fixed' && <InputData inputForm={inputForm} setInputForm={setInputForm} refetch={fetchData} task={selectedTask} />}
    </div>
  );
};

export default TaskManagement;