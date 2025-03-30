import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { IoClose } from "react-icons/io5";

const InputData = ({ inputForm, setInputForm, refetch, task }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');

    // Use useEffect to pre-fill form when the task prop changes
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setTaskDate(task.taskDate);
        }
    }, [task]);

    const handleTaskSubmission = async (e) => {
        e.preventDefault();
        try {
            const url = task == undefined ? 'http://localhost:8000/tasks/create-task' : `http://localhost:8000/tasks/edit-task/${task._id}`;
            const method = task == undefined ? 'post' : 'put'
            
            const response = await axios[method](url, { title, description, taskDate }, { withCredentials: true });
            if (response.data) {
                alert(response.data.message);  // Show the success message
                setInputForm('hidden');  // Close the form after successful submission
                refetch();
            }
        } catch (error) {
            console.error('Error creating or updating task:', error);
            alert('Failed to save task. Please try again.');
        }
    };

    return (
        <div>
            {/* Background overlay */}
            <div className={`${inputForm} top-0 left-0 bg-gray-500 opacity-90 h-screen w-full`}></div>

            {/* Modal */}
            <div className={`${inputForm} top-0 left-0 h-screen w-full flex flex-col justify-center transition-all duration-300`}>
                {/* Close Button */}
                <div className='flex fixed top-8 right-10'>
                    <button>
                        <IoClose onClick={() => setInputForm('hidden')} className='text-4xl cursor-pointer' />
                    </button>
                </div>

                {/* Form */}
                <div className='flex items-center justify-center'>
                    <div className='w-2/6 bg-gray-900 p-4 rounded'>
                        <form onSubmit={handleTaskSubmission}>
                            <input
                                type="text"
                                placeholder='Title'
                                name='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='mt-3 p-3 rounded py-2 w-full border bg-gray-700 border-gray-700'
                                required
                            />

                            <textarea
                                rows={10}
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='p-3 rounded py-2 w-full border border-gray-700 mt-3 bg-gray-700'
                                placeholder='Description'
                                required
                            />

                            <input
                                type="datetime-local"
                                className='p-3 rounded py-2 w-full border border-gray-700 bg-gray-700 my-3'
                                name="taskDate"
                                value={taskDate}
                                onChange={(e) => setTaskDate(e.target.value)}
                                required
                            />

                            <button
                                type="submit"
                                className='px-3 py-2 bg-blue-400 rounded text-black font-semibold w-full cursor-pointer'
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputData;