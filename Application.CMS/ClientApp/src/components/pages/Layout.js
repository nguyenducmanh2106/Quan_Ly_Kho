import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Profile from './/profile/Profile';
import Header from './header/Header';
import BreadcrumbForm from './Breadcrumb/Index';
import Footer from './footer/Footer';
import Main from './Mains';
import MenuSidebar from './menu-sidebar/MenuSidebar';
import ReactDOM from 'react-dom';
const Layout = () => {
    const [appLoadingState, updateAppLoading] = useState(true);
    const [Breadcrumb, setBreadcrumb] = useState("");
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
            <Header />
            <MenuSidebar onHandleSetBreadCrumb={setBreadcrumb} />
            <div className="content-wrapper">
                <BreadcrumbForm textBreadcrumb={Breadcrumb}/>
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
