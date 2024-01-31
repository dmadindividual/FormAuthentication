import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app, db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';

const Login = () => {
  const navigate = useNavigate(); // Use useNavigate instead of history
  const auth = getAuth(app);
  const databaseInstance = collection(db, 'users');
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const submitBtn = async () => {
    if (input.email === '' || input.password === '') {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, input.email, input.password);
      await addDoc(databaseInstance, {
        name: input.password,
        email: input.email,
      });
      resetInput();
      navigate('/go'); // Use navigate instead of history.push
    } catch (err) {
      console.error(err.message);
    }
  };

  const loginBtn = async () => {
    if (input.email === '' || input.password === '') {
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, input.email, input.password);
      resetInput();
      navigate('/go'); // Use navigate instead of history.push
    } catch (err) {
      console.error(err.message);
    }
  };

  const resetInput = () => {
    setInput({
      email: '',
      password: '',
    });
  };

  const isValidEmail = (email) => {
    // Add your email validation logic here
    // For a simple example, checking if it contains '@'
    return email.includes('@');
  };
  
  const isValidPassword = (password) => {
    // Add your password validation logic here
    // For a simple example, checking if it's at least 6 characters long
    return password.length >= 6;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={preventDefault}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={handleInput}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              input.email && !isValidEmail(input.email) ? 'border-red-500' : ''
            }`}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleInput}
            value={input.password}
            placeholder="Password"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              input.password && !isValidPassword(input.password) ? 'border-red-500' : ''
            }`}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={submitBtn}
          >
            Sign up
          </button>

          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={loginBtn}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;