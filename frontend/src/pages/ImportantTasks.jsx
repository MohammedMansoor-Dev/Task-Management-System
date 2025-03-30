import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';

const ImportantTasks = () => {

  const [tasks, setTasks] = useState([]);
   // Fetch tasks function (moved outside useEffect so it can be reused)
   const fetchTasks = async () => {
    try {
        const response = await axios.get('http://localhost:8000/tasks/important-tasks', { withCredentials: true });
        setTasks(response.data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

// Fetch tasks once on mount
useEffect(() => {
    fetchTasks();
}, []);
  return (
    <div>
      <Cards home={'false'} data={tasks} refetch={fetchTasks} />
    </div>
  )
}

export default ImportantTasks
