import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login';
import Protected from './components/Protected';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/protected">Protected</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/protected" component={Protected} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
