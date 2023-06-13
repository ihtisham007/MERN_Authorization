import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login.component'
import SignUp from './components/signup.component'
import { SessionContext } from './SessionContext'
import Home from './components/home.component';

function App() {
  const { session, logout } = useContext(SessionContext);
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              Ihtisham
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                { localStorage.getItem('name') ? (
                   <>
                   <li className="nav-item">Welcome</li>
                   <li className="nav-link">{localStorage.getItem('name')}</li>
                   <li className="nav-item">
                     <button className="nav-link btn btn-link" onClick={() => {logout()}}>
                       Logout
                     </button>
                   </li>
                 </>
                ) : (
                  <><li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li><li className="nav-item">
                    <Link className="nav-link" to={'/sign-up'}>
                      Sign up
                    </Link>
                  </li></>
                ) }
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={ localStorage.getItem('name') ? <Home /> : <Login />} />
              <Route  path="/sign-in"  element={ localStorage.getItem('name') ? <Home /> : <Login /> } />
              <Route path="/sign-up" element={ localStorage.getItem('name') ? <Home /> : <SignUp /> } />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App