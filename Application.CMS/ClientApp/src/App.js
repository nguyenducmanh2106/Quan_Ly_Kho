import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Skeleton from 'react-loading-skeleton';
import RoutesModule from './routes';
import Layout from './components/pages/Layout';
import Main from './components/pages/Mains';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
//import 'mdbreact/dist/css/mdb.css';
import 'sweetalert2/src/sweetalert2.scss';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    // Link,
} from "react-router-dom";
function App() {
    return (
        <Router>
            <Switch>
                <Main />
            </Switch>
        </Router>
    );
}

export default App;
