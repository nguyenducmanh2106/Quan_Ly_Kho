import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils/helpers';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLoggedIn() && restricted ?
                <Redirect to="/dashboard" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;