import React from 'react';
import { useState } from 'react';
import classes from './FloatingLabelInput.module.css';
import { TextInput } from '@mantine/core';


const Signin = () => {
  
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);

  const usernameFloating = username.trim().length !== 0 || usernameFocused || undefined;
  const passwordFloating = password.trim().length !== 0 || passwordFocused || undefined;
  const emailFloating = email.trim().length !== 0 || emailFocused || undefined;


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Create the request payload
    const payload = {
      email: email,
      password: password,
      username: username
    };
    console.log(payload);
    try {
      console.log("ENV:", import.meta.env);

      const url =import.meta.env.VITE_BACKEND_API;
      // Send data to the backend using fetch or axios
      // const response = await fetch('http://localhost:3000/auth/signup', {
      const response = await fetch(`${url}/auth/signup`, {

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
    <>    
    <div className="container">
    </div>  
    <div className='flower w-full h-64 bg-no-repeat bg-contain bg-center -z-10'></div>
    <div className='centering-flexbox'>
    <div className='diarie-title'>Diarie</div>

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
              {/* <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="Email"

                className="signin-input"
              /> */}
              <TextInput
                  label="Email"
                  placeholder="Email"
                  // required
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  data-floating={emailFloating}
                  labelProps={{ 'data-floating': emailFloating }}
                  classNames={{
                    root: classes.root,
                    label: classes.label,
                    wrapper:classes.wrapper,
                    required: classes.required,
                    input:classes.input,
                  }}
                  // styles={{
                  //   input: {
                  //     // backgroundColor: '#111',
                  //     color: '#000000',
                  //     borderColor: '#000000',
                  //     borderRadius: '0',
                  //     fontSize: '14px',
                  //     width: '100%',
                  //     height: '42px',
                  //     paddingInline: '8px',
                  //     paddingTop: '12px',
                  //     paddingBottom: '4px',
                  //     fontFamily: 'mine',
                  //     borderWidth: '2px',
                  //     boxSizing: 'border-box',
                  //     '&::placeholder': { color: '#9ca3af' },
                  //   },}}
                />
        
          </div>
          <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              {/* <input
                id="username"
                name="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="current-username"
                required
                placeholder="Password"
                className="signin-input"
              /> */}
              <TextInput
                  label="Username"
                  placeholder="Username"
                  // required
                  value={username}
                  onChange={(event) => setUsername(event.currentTarget.value)}
                  onFocus={() => setUsernameFocused(true)}
                  onBlur={() => setUsernameFocused(false)}
                  data-floating={usernameFloating}
                  labelProps={{ 'data-floating': usernameFloating }}
                  classNames={{
                    root: classes.root,
                    label: classes.label,
                    wrapper:classes.wrapper,
                    required: classes.required,
                    input:classes.input,
                  }}
                  // styles={{
                  //   input: {
                  //     // backgroundColor: '#111',
                  //     color: '#000000',
                  //     borderColor: '#000000',
                  //     borderRadius: '0',
                  //     fontSize: '14px',
                  //     width: '100%',
                  //     height: '42px',
                  //     paddingInline: '8px',
                  //     paddingTop: '12px',
                  //     paddingBottom: '4px',
                  //     fontFamily: 'mine',
                  //     borderWidth: '2px',
                  //     boxSizing: 'border-box',
                  //     '&::placeholder': { color: '#9ca3af' },
                  //   },}}
                />
          </div>
          <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              {/* <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder="Re-enter Password"
                className="signin-input"
              /> */}
                <TextInput
                  label="Password"
                  placeholder="Password"
                  // required
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  data-floating={passwordFloating}
                  labelProps={{ 'data-floating': passwordFloating }}
                  classNames={{
                    root: classes.root,
                    label: classes.label,
                    wrapper:classes.wrapper,
                    required: classes.required,
                    input:classes.input,
                  }}
                  // styles={{
                  //   input: {
                  //     // backgroundColor: '#111',
                  //     color: '#000000',
                  //     borderColor: '#000000',
                  //     borderRadius: '0',
                  //     fontSize: '14px',
                  //     width: '100%',
                  //     height: '42px',
                  //     paddingInline: '8px',
                  //     paddingTop: '12px',
                  //     paddingBottom: '4px',
                  //     fontFamily: 'mine',
                  //     borderWidth: '2px',
                  //     boxSizing: 'border-box',
                  //     '&::placeholder': { color: '#9ca3af' },
                  //   },}}
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
    </>
  );
};

export default Signin;
