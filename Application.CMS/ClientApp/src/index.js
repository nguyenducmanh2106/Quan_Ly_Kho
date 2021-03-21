
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Layout from './components/pages/Layout';
import { Login } from './components/users/Login';
import Skeleton from 'react-loading-skeleton';
import { setAccessToken, setUser, isLoggedIn, postAPI } from './utils/helpers';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'antd-button-color/dist/css/style.css';
//import 'bootstrap-css-only/css/bootstrap.min.css';
//import 'mdbreact/dist/css/mdb.css';
import 'antd/dist/antd.css';
import 'sweetalert2/src/sweetalert2.scss';
import 'react-toastify/dist/ReactToastify.css';

//let routes = RoutesModule.routes;
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';
//import { ToastProvider, useToasts } from 'react-toast-notifications';
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

ReactDOM.render(
    <AppContainer>
        <Router>
            {console.log(baseUrl)}
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/">
                   <Layout />
                </Route>
            </Switch>
        </Router>
    </AppContainer>,
    document.getElementById('root'));

//<Route path='/' exact render={() => {
//    return isLoggedIn() ? <Layout /> : <Redirect to="/login" />
//}} />
//registerServiceWorker();

