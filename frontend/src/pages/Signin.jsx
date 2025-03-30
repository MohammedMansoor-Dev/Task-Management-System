import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for redirecting
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/user/userSlice'

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To handle error messages
  const dispatch = useDispatch()
  const navigate = useNavigate(); // Hook for navigating to other pages after successful login

  const handleSignin = async (e) => {
    e.preventDefault();

    // Basic validation before sending the request
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      // Send the email and password to the backend for signin
      const response = await axios.post('http://localhost:8000/user/signin', { email, password }, { withCredentials: true });

      // Assuming the response contains a token or some form of authentication
      if (response.data) {
        const { username, email, role } = response.data
        if (role === 'admin') {
          navigate('/admin-dashboard')
        } else {
          navigate('/'); // Redirect to the dashboard or any other page after successful login
        }
        dispatch(setUser({ username, email, role }))
      } else {
        setError('Invalid credentials, please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 h-[46vh] rounded bg-gray-800 flex flex-col gap-2'>
        <h3 className='text-3xl font-semibold text-center'>Signin</h3>

        {error && <p className='text-red-500 text-center'>{error}</p>} {/* Display error message if any */}

        <form onSubmit={handleSignin}>
          <input
            type="email"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your Email'
            className='text-xl my-3 w-full py-3 px-3 bg-gray-700 rounded'
            required
          />

          <input
            type="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your Password'
            className='text-xl my-3 w-full py-3 px-3 bg-gray-700 rounded'
            required
          />

          <p className='text-end underline text-blue-800 text-sm cursor-pointer'>Forget Password</p>

          <button
            type="submit" // Change to submit for form submission
            className='w-full bg-blue-400 text-xl font-semibold text-black px-3 py-3 rounded cursor-pointer hover:bg-blue-300 transition-all duration-300 hover:scale-105'
          >
            Signin
          </button>
        </form>

        <Link className='text-center underline text-blue-700' to={'/signup'} >
          Not having an account? Signup
        </Link>
      </div>
    </div>
  );
};

export default Signin;
