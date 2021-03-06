import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
//import Layout from './components/pages/Layout';
//import Login from './components/pages/Account/Login';
//import Error from './components/pages/Error/Error';
import { List, Avatar } from 'antd';

//import 'antd-button-color/dist/css/style.css';
import 'antd/dist/antd.css';
import '../src/styles/global.scss';
//let routes = RoutesModule.routes;
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

ReactDOM.render(
    <AppContainer>
       <App/>
    </AppContainer>
    ,document.getElementById('root'));



