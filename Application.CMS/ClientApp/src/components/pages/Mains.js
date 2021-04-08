import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter,useHistory } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
//import RoutesModule, { PrivateRoute } from './../../routes';
import RouteSinglePage  from './../../routes';
import MenuSidebar from './menu-sidebar/MenuSidebar';
import ReactDOM from 'react-dom';

const Main = () => {
    
    return (
        <section className="main">
            <RouteSinglePage />
        </section>
    )
};


export default Main;
