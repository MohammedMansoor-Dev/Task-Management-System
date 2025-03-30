import React, { useState, useEffect } from 'react';
import Cards from '../components/Home/Cards';
import { FaPlusCircle } from 'react-icons/fa';
import InputData from '../components/Home/InputData';
import { format } from 'date-fns';
import axios from 'axios';

const AllTasks = () => {
    const [inputForm, setInputForm] = useState('hidden');
    const [tasks, setTasks] = useState([]);

    // Fetch tasks function (moved outside useEffect so it can be reused)
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/tasks/all-tasks', { withCredentials: true });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Fetch tasks once on mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const formattedDate = format(new Date(), 'MMMM dd, yyyy');
    const dayOfWeek = new Date().getDay();
    
    const getDayName = (dayOfWeek) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dayOfWeek] || '';
    };

    return (
        <>
            <div>
                <div className='w-full flex justify-between px-4 py-2 transition-all duration-300'>
                    <h1 className='font-bold text-2xl'>
                        {formattedDate} - {getDayName(dayOfWeek)}
                    </h1>
                    <button>
                        <FaPlusCircle
                            onClick={() => setInputForm(inputForm === 'fixed' ? 'hidden' : 'fixed')}
                            className='text-4xl text-gray-300 hover:text-gray-100 transition-all duration-300 cursor-pointer'
                        />
                    </button>
                </div>
                <Cards home={'true'} setInputFormAllTask={setInputForm} data={tasks} refetch={fetchTasks} />
            </div>

            {/* Pass refetch to InputData */}
            {inputForm === 'fixed' && <InputData inputForm={inputForm} setInputForm={setInputForm} refetch={fetchTasks} />}
        </>
    );
};

export default AllTasks;
