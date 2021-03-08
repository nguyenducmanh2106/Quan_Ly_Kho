
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import RoutesModule from './routes';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
//let routes = RoutesModule.routes;
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import { ToastProvider, useToasts } from 'react-toast-notifications';
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

function renderApp() {
    ReactDOM.render(
        <ToastProvider>
            <AppContainer>
                <BrowserRouter basename={baseUrl} >
                    <RoutesModule />
                </BrowserRouter>
            </AppContainer>
        </ToastProvider>,
        rootElement);
}
renderApp()
//registerServiceWorker();

