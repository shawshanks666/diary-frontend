import React from 'react';
import { useState } from 'react';


const Signin = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Create the request payload
    const payload = {
      email: email,
      password: password,
      username: username
    };

    try {
      // Send data to the backend using fetch or axios
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle success (e.g., store a token, redirect user)
        console.log('Sign-in successful', data);
        sessionStorage.setItem('authToken', data);

      } else {
        console.error('Sign-in failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    window.location.href = '/login';
  };

  return (
    <div className='absolute top-0 flex flex-row z-10 h-full w-full items-center justify-center sm:justify-end pt-12 sm:px-10'>
    <div className="flex h-fit flex-col align-centre justify-center px-6 py-12 mx-3 lg:px-8 sm:w-96 bg-grey/10 border-2 border-green-200/50 rounded-md backdrop-blur-md	">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-green-300">
          Create a new account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#"
        onSubmit={handleSubmit} method="POST">
          <div>
            <label htmlFor="email" className="mix-blend-color-burn block text-sm font-medium leading-6 text-white">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 p-1.5  text-gray-900 "
              />
        
            </div>
          </div>
          <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="current-username"
                required
                className="block w-full rounded-md border-0 p-1.5 text-black "
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
                className="block w-full rounded-md border-0 p-1.5 text-black "
              />
            </div>
            </div>


          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-white-400">Already have an account?
        <a href="/login" className="font-semibold leading-6 text-green-400 hover:text-green-200"> Log in! 
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Signin;
