import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter,useHistory } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
//import RoutesModule, { PrivateRoute } from './../../routes';
import  PrivateRoute  from './../../routes';
import MenuSidebar from './menu-sidebar/MenuSidebar';
import { Loading, PageLoading } from '../elements/index';
import ReactDOM from 'react-dom';

const Main = () => {
    
    return (
        <section className="main">
            <PrivateRoute pathName />
        </section>
    )
};


export default Main;
