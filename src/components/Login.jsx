import React from 'react';
import { useState } from 'react';
import deriveKey from '../utility/deriveKey';
import { useNavigate } from 'react-router-dom';
import { storeKey } from '../utility/keyStore';
import { TextInput } from '@mantine/core';
import classes from './FloatingLabelInput.module.css';

const Login = () => {

  const navigate = useNavigate();
  const key = sessionStorage.getItem('aesKey');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const floating = value.trim().length !== 0 || focused || undefined;

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
    // <div className="centering-flexbox">

    //   <div className="login-container">
    //       <form className="login-form" action="#"
    //       onSubmit={handleSubmit} method="POST">
    //             <div className="login-title">
    //         Log in to your account
    //     </div>
    //         <div>
              
    //           <label htmlFor="username" className="sr-only">
    //             username address
    //           </label>
    //             <input
    //               id="username"
    //               name="username"
    //               value={username}
    //               onChange={(e) => setUsername(e.target.value)}
    //               required
    //               placeholder="Email"
    //               className="login-input"
    //             />
    //         </div>

    //         <div>
    //             <label htmlFor="password" className="sr-only">
    //               Password
    //             </label>

    //             <input
    //               id="password"
    //               name="password"
    //               type="password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               autoComplete="current-password"
    //               required
    //               placeholder='Password'
    //               className="login-input"
    //             />
    //         </div>

    //         <div>
    //           <button
    //             type="submit"
    //             className="login-button"
    //           >
    //             Log in
    //           </button>
    //         </div>
    //         <p className="form-text">Dont have an account?
    //       <a href="/signin" className="form-redirect"> Create a new account! 
    //         </a>
    //       </p>
    //       </form>


    
    //   </div>
    // </div>
    <TextInput
    label="Floating label"
    placeholder="OMG, it also has a placeholder"
    required
    value={value}
    onChange={(event) => setValue(event.currentTarget.value)}
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
    mt="md"
    autoComplete="off"
    data-floating={floating}
    labelProps={{ 'data-floating': floating }}
    classNames={{
      root: classes.root,
      label: classes.label,
      input: classes.input,
      required: classes.required,
    }}
  />
  );
};

export default Login;
