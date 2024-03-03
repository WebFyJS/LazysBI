import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from './Telas/Login';
import Home from './Telas/Home';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
      <Router>
        <Switch>
          <Route path="/login">
            {isLoggedIn ? <Redirect to="/" /> : <Login onLogin={handleLogin} />}
          </Route>
          <Route path="/">
            {isLoggedIn ? <Home onLogout={handleLogout} /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    );
};

export default App;
