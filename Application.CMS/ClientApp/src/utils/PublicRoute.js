import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils/helpers';
import { URL_DASHBOARD } from '../utils/constants';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLoggedIn() && restricted ?
                <Redirect to={URL_DASHBOARD} />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;