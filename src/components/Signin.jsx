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
    <div className='centering-flexbox'>
    <div className="signin-container">
        <form className="signin-form" action="#"
        onSubmit={handleSubmit} method="POST">
          <div className='signin-title'>
          Create a new account
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="Email"

                className="signin-input"
              />
        
          </div>
          <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="current-username"
                required
                placeholder="Password"
                className="signin-input"
              />
          </div>
          <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder="Re-enter Password"
                className="signin-input"
              />
            </div>


          <div>
            <button
              type="submit"
              className="signin-button"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="form-text">Already have an account?
        <a href="/login" className="form-redirect"> Log in! 
          </a>
        </p>
    </div>
    </div>
  );
};

export default Signin;
