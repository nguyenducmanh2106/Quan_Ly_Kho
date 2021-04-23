
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Layout from './components/pages/Layout';
import Login from './components/pages/Account/Login';
import Error from './components/pages/Error/Error';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
function App() {
    return (
        <Router>
            <Switch>
                <PublicRoute restricted={true} path="/login" component={Login} />
                <PublicRoute restricted={true} path="/error" component={Error} />
                <PrivateRoute path="/" component={Layout} />
            </Switch>
        </Router>
    );
}

export default App;
