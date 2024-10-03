// src/components/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  // State to hold form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // State to display any error or success messages
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch( 'https://content-craft.onrender.com/create', {
        // 'http://localhost:3000/create'
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();
        setMessage('User created successfully!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to create user'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center text-white flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images3.alphacoders.com/857/857828.jpg')`,
      }}
    >
      <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-lg max-w-md w-full">
        <h3 className="text-3xl mb-5 text-center">Sign Up</h3>
        {message && <p className="text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="px-3 py-2 rounded-md bg-transparent border-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none"
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className="px-3 py-2 rounded-md bg-transparent border-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="px-3 py-2 rounded-md bg-transparent border-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            className="px-5 py-2 rounded-md bg-blue-500 cursor-pointer hover:bg-blue-600 transition-colors text-white"
            type="submit"
            value="Create User"
          />
        </form>
      </div>
    </div>
  );
}

export default Signup;

