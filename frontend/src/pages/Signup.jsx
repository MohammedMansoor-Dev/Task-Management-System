import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Import axios for HTTP requests

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/user/signup', { username, email, password });

      if (response.data) {
        setSuccess(true);
        setError('');
        // Optionally, redirect the user to the login page
        setTimeout(() => {
          window.location.href = '/signin';
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setError('Error signing up. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 h-[55vh] rounded bg-gray-800 flex flex-col gap-2'>
        <h3 className='text-3xl font-semibold text-center'>Signup</h3>

        {/* Display success or error message */}
        <div>
          {success && <p className="text-green-500">Signup successful! You can now sign in.</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          placeholder="Enter your Name"
          className="text-xl my-3 w-full py-3 px-3 bg-gray-700 rounded"
          required
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Enter your Email"
          className="text-xl my-3 w-full py-3 px-3 bg-gray-700 rounded"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Enter your Password"
          className="text-xl my-3 w-full py-3 px-3 bg-gray-700 rounded"
          required
        />
        <button
          onClick={handleSignup}
          className="w-full bg-blue-400 text-xl font-semibold text-black px-3 py-3 rounded cursor-pointer hover:bg-blue-300 transition-all duration-300 hover:scale-105"
        >
          Signup
        </button>
        <Link className="text-center underline text-blue-700" to="/signin">
          Already have an account? Signin
        </Link>
      </div>
    </div>
  );
};

export default Signup;