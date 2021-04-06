
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Layout from './components/pages/Layout';
import Login from './components/pages/Account/Login';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import { isLoggedIn } from './utils/helpers';
function App() {
    return (
        <Router>
            <Switch>
                <PublicRoute restricted={true} path="/login" component={Login} />
                <PrivateRoute path="/">
                    {isLoggedIn() ? <Layout /> : <Redirect to="/login" />}
                </PrivateRoute>

            </Switch>
        </Router>
    );
}

export default App;
