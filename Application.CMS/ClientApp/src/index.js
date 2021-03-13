
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Layout from './components/pages/Layout';
import { Login } from './components/users/Login';
import Skeleton from 'react-loading-skeleton';
import { setAccessToken, setUser, isLoggedIn, postAPI } from './utils/helpers';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
//import 'mdbreact/dist/css/mdb.css';
import 'sweetalert2/src/sweetalert2.scss';
import 'react-toastify/dist/ReactToastify.css';

//let routes = RoutesModule.routes;
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';
//import { ToastProvider, useToasts } from 'react-toast-notifications';
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

ReactDOM.render(
    <AppContainer>
        <BrowserRouter basename={baseUrl}>
            <Layout/>
        </BrowserRouter>
    </AppContainer>,
    document.getElementById('root'));

//<Route path='/' exact render={() => {
//    return isLoggedIn() ? <Layout /> : <Redirect to="/login" />
//}} />
//registerServiceWorker();

