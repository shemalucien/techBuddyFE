import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './features/User/Login';
import Signup from './features/User/Signup';
import Dashboard from './features/User/Dashboard';
import NotFound from './features/User/NotFound';
import Welcome from './features/User/Welcome';
import { PrivateRoute } from './helpers/PrivateRoute';

function App() {
  return (
    <div >
      <Router>
        <Switch>
          <Route exact component={Welcome} path="/" />
          <Route exact component={Login} path="/login" />
          <Route exact component={Signup} path="/signup" />
          <PrivateRoute exact component={Dashboard} path="/dashboard" />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
