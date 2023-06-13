import React, { useContext } from 'react';
import { SessionContext ,token } from './../SessionContext';
import axios from 'axios';

const SignUp = () => {
   const { login } = useContext(SessionContext);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const form = event.target;

    // Collect form data
    const fullName = form.elements.fullName.value;
    const email = form.elements.email.value;
    const phone = form.elements.phone.value;
    const password = form.elements.password.value;

    try {
      const response = await axios.post('/api/v1/users/signup', {
        fullName,
        email,
        phone,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      const data = response.data;
      if (response.status === 201) {
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
    <div>
      <form onSubmit={handleSignUp}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Full name</label>
          <input
            type="text"
            className="form-control"
            placeholder="enter name"
            name="fullName"
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="enter email address"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label>Phone</label>
          <input
            type="number"
            className="form-control"
            placeholder="enter mobile number"
            name="phone"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="enter password"
            name="password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
