'use client';
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with:', email, password);
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-2 w-full rounded-md mb-4"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="flex items-center justify-center">
          {/* Place your Google login icons here */}
          <button className="mr-2">
            <FcGoogle size={30} />
          </button>
          <span>Login with Google</span>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;