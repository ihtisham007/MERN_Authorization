import React, { Component, useContext} from 'react'
import { SessionContext} from './../SessionContext';
import axios from 'axios';

const Login = () => {
  const { login } = useContext(SessionContext);


    const handleSignIn = async (event) => {
      event.preventDefault();
      const form = event.target;
  
      // Collect form data
      const email = form.elements.email.value;
      const password = form.elements.password.value;
  
      try {
        const response = await axios.post('/api/v1/users/login', {        
          email,
          password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        const data = response.data;
        console.log(data.status);
        if (response.status === 200) {
          // Signup successful
          console.log(data);    
          login(data); // Save the token to the session context
        } else {
          // Handle signup error
          // ...
        }
      } catch (error) {
        // Handle request error
        // ...
      }
    };
    return (
      <form onSubmit={handleSignIn}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    )
  
}

export default Login;