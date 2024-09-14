// src/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the server
      const response = await fetch('https://content-craft.onrender.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials (cookies) with request
        body: JSON.stringify({ email, password }),
      });

      const data = await response.text(); // Assuming server sends a text message response
      if (response.ok) {
        setMessage(data);
        navigate('/cover'); // Display success message
      } else {
        setMessage(`Error: ${data}`);
      }
    } catch (error) {
      setMessage('An error occurred during login.');
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
        <h3 className="text-3xl mb-5 text-center">Login User</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="px-3 py-2 rounded-md bg-transparent border-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="px-3 py-2 rounded-md bg-transparent border-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="px-5 py-2 rounded-md bg-blue-500 cursor-pointer hover:bg-blue-600 transition-colors text-white"
            type="submit"
            value="Login User"
          />
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
