import React from 'react';
import { useState } from 'react';
import deriveKey from '../utility/deriveKey';
import { useNavigate } from 'react-router-dom';
import { storeKey } from '../utility/keyStore';
import { TextInput } from '@mantine/core';
import classes from './FloatingLabelInput.module.css';

const Login = () => {

  const navigate = useNavigate();
  // const key = sessionStorage.getItem('aesKey');
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);

  const emailFloating = email.trim().length !== 0 || emailFocused || undefined;
  const passwordFloating = password.trim().length !== 0 || passwordFocused || undefined;



  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Create the request payload
    const payload = {
      email: email,
      password: password
    };

    try {
      // const response = await fetch(`http://localhost:3000/auth/login`, {
      const url =import.meta.env.VITE_BACKEND_API;

      const response = await fetch(`${url}/auth/login`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log(response);
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
    <>    
    <div className="container">
    </div>  
    <div className='flower w-full h-64 bg-no-repeat bg-contain bg-center -z-10'></div>
    <div className="centering-flexbox">
      <div className='diarie-title'>Diarie</div>

      <div className="login-container">
          <form className="login-form" action="#"
          onSubmit={handleSubmit} method="POST">
                <div className="login-title">
            Log in to your account
        </div>
            <div>
              
              <label htmlFor="email" className="sr-only">
                email address
              </label>
                {/* <input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Email"
                  className="login-input"
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
                  placeholder='Password'
                  className="login-input"
                /> */}
                <TextInput
                  label="Password"
                  placeholder="Password"
                  type="password"
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
                className="login-button"
              >
                Log in
              </button>
            </div>

          </form>
          <p className="form-text">Dont have an account?
          <a href="/signin" className="form-redirect"> Create a new one! 
            </a>
          </p>

    
      </div>
    </div>
    </>

  );
};

export default Login;
