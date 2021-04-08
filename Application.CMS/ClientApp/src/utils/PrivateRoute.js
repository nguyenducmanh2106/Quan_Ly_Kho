import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils/helpers';
import { URL_LOGIN } from '../utils/constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLoggedIn() ?
                <Component {...props} />
                : <Redirect to={URL_LOGIN} />
        )} />
    );
};
//function PrivateRoute({ children, ...rest }) {
//    return (
//        <Route
//            {...rest}
//            render={({ location }) =>
//                isLoggedIn() ? (
//                    children
//                ) : (
//                        <Redirect
//                            to={{
//                                pathname: "/login",
//                                state: { from: location }
//                            }}
//                        />
//                    )
//            }
//        />
//    );
//}

export default PrivateRoute;