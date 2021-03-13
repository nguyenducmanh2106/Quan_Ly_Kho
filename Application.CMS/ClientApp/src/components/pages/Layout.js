import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Profile from './/profile/Profile';
import Header from './header/Header';
import Footer from './footer/Footer';
//import RoutesModule, { routes } from './../../routes';
import Main from './Mains';
import MenuSidebar from './menu-sidebar/MenuSidebar';
import { Loading, PageLoading } from '../elements/index';
import ReactDOM from 'react-dom';
const Layout = () => {
    const [appLoadingState, updateAppLoading] = useState(true);
    const [menusidebarState, updateMenusidebarState] = useState({
        isMenuSidebarCollapsed: false
    });
   const toggleMenuSidebar = () => {
        updateMenusidebarState({
            isMenuSidebarCollapsed: !menusidebarState.isMenuSidebarCollapsed
        });
    };
    //useEffect(() => {
    //    console.log('cap nhat lại')
    //    updateAppLoading(false)
    //    return () => {
    //        updateAppLoading(true)
    //    }
    //}, [])


    //document.getElementById('root').classList.remove('register-page');
    //document.getElementById('root').classList.remove('login-page');
    //document.getElementById('root').classList.remove('hold-transition');

    //document.getElementById('root').className += ' sidebar-mini';

    //if (menusidebarState.isMenuSidebarCollapsed) {
    //    document.getElementById('root').classList.add('sidebar-collapse');
    //    document.getElementById('root').classList.remove('sidebar-open');
    //} else {
    //    document.getElementById('root').classList.add('sidebar-open');
    //    document.getElementById('root').classList.remove('sidebar-collapse');
    //}

    return (
        <div className="wrapper">
            <Loading appLoadingState />
            <Header />
            <MenuSidebar/>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Dashboard</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Dashboard v1</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <Main/>
            </div>

            <Footer />
            <div
                id="sidebar-overlay"
                role="presentation"
                onClick={toggleMenuSidebar}
                onKeyDown={() => { }}
            />
        </div>

    )
};


export default Layout;
