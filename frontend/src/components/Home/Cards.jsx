import React, { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import axios from 'axios';
import InputData from './InputData';

const Cards = ({ home, data, refetch, setInputFormAllTask }) => {
    const [inputForm, setInputForm] = useState('hidden');
    const [selectedTask, setSelectedTask] = useState(null); // For storing the task being edited

    const handleTaskLike = async (taskId) => {
        try {
            const response = await axios.patch(
                `http://localhost:8000/tasks/toggle-taskLike/${taskId}`,
                {},
                { withCredentials: true }
            );
            if (response.data) {
                refetch();
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error liking task:', error);
        }
    }

    const handleTaskStatus = async (taskId) => {
        try {
            const response = await axios.patch(
                `http://localhost:8000/tasks/toggle-taskStatus/${taskId}`,
                {},
                { withCredentials: true }
            );
            if (response.data) {
                refetch();
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error liking task:', error);
        }
    }

    const handleEdit = (task) => {
        setSelectedTask(task);  // Set the task to be edited
        setInputForm('fixed');  // Open the form
    }

    console.log(selectedTask)

    const handleDelete = async (taskId) => {
        try {
            const confirm = window.confirm('Are you sure, Do you want to Delete The Task?')
            if (confirm) {
                const response = await axios.get(`http://localhost:8000/tasks/delete-task/${taskId}`, { withCredentials: true })
                if (response.data) {
                    refetch();
                    alert(response.data.message);
                }
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    return (
        <div className='grid grid-cols-3 gap-4 p-4'>
            {data.map((task) => (
                <div className='bg-gray-700 rounded p-4 flex flex-col justify-between' key={task._id}>
                    <div className=''>
                        <h3 className='text-xl font-semibold'>{task.title}</h3>
                        <p className='text-gray-300 my-2'>{task.description}</p>
                        <p className={`${task.taskStatus === 'Incomplete' ? 'text-red-400' : 'text-green-700'}`} >{task.taskDate.replace('T', ' ')}</p>
                    </div>
                    <div className='mt-4 w-full flex items-center'>
                        <button onClick={() => handleTaskStatus(task._id)} className={`${task.taskStatus === 'Incomplete' ? 'bg-red-400' : 'bg-green-700'} p-2 rounded w-3/6 cursor-pointer`}>
                            {task.taskStatus}
                        </button>
                        <div className='p-2 w-3/6 text-white text-2xl font-semibold flex justify-around'>
                            <button className={`${task.taskLike === false ? 'cursor-pointer hover:text-red-400' : 'cursor-pointer hover:text-red-400 text-red-400'}`} onClick={() => handleTaskLike(task._id)}>
                                <FaHeart />
                            </button>
                            <button className='cursor-pointer hover:text-orange-400' onClick={() => handleEdit(task)}>
                                <FaRegEdit />
                            </button>
                            <button className='cursor-pointer hover:text-red-600' onClick={() => handleDelete(task._id)}>
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {
                home === 'true' && <div onClick={() => setInputFormAllTask('fixed')} className='bg-gray-700 rounded p-4 flex flex-col justify-center items-center text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300'>
                    <FaPlusCircle className='text-5xl' />
                    <h2 className='text-2xl mt-4'>Add Task</h2>
                </div>
            }

            {/* Pass selectedTask to the InputData component */}
            {selectedTask && (
                <InputData
                    inputForm={inputForm}
                    setInputForm={setInputForm}
                    refetch={refetch}
                    task={selectedTask}  // Pass selected task data
                />
            )}
        </div>
    )
}

export default Cards;