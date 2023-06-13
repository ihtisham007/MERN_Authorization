// SessionContext.js

import React, { createContext, useState } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  const login = (token) => {
    // Store the session token in browser storage (e.g., localStorage)
    localStorage.setItem('token', token.token);
    localStorage.setItem('name', token.user.fullName)
    // Update the session state in the context
    setSession(token);
    window.location.href ='/'
  };

  const logout = () => {
    // Clear the session token from browser storage
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    // Update the session state in the context
    setSession(null);
    window.location.href = '/sign-in';
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
