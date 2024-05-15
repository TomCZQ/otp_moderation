import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
//import Login from './components/Login';
import Protected from './components/Protected';

const Login = () => {
  return (
    

        <div>
          <ul>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/protected">Protected</a>
            </li>
          </ul>
        </div>
    
  );
};

export default App;
