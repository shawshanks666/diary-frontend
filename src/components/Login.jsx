import React from 'react';
import { useState } from 'react';
import deriveKey from '../utility/deriveKey';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storeKey } from '../utility/keyStore';
const Login = () => {

  const navigate = useNavigate();
  const key = sessionStorage.getItem('aesKey');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Create the request payload
    const payload = {
      username: username,
      password: password
    };

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle success (e.g., store a token, redirect user)
        // console.log('Sign-in successful', data);
        
        sessionStorage.setItem('authToken', data.access_token);
        const salt = data.salt;
        const keyGenerated = await deriveKey(password,salt);
        storeKey(keyGenerated);
        // console.log('Derived Key Type:', key.constructor.name); // Should log "CryptoKey"

        // dispatch(setKey(keyGenerated)); 

        // console.log(key);
        navigate('/dashboard'); // Use `useNavigate` for smooth transitions


      } else {
        // Handle errors (e.g., invalid credentials)
        console.error('Sign-in failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <div className='absolute top-0 flex flex-row z-10 h-full w-full items-center justify-center sm:justify-end pt-12 sm:px-12'>
    <div className="flex h-fit flex-col align-centre justify-center px-6 py-12 lg:px-8 bg-grey/10 border-2 border-green-200/50 rounded-md backdrop-blur-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-green-300">
          Log in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#"
        onSubmit={handleSubmit} method="POST">
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
              username address
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-black"
              />
        
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Password
              </label>

            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 p-1.5 text-black"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-10 flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500"
            >
              Log in
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-white-400">Dont have an account?
        <a href="/signin" className="font-semibold leading-6 text-green-400 hover:text-green-200"> Create a new account! 
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
