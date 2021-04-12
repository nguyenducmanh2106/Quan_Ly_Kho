import * as React from 'react';
import Layout from './components/pages/Layout';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { setAccessToken, setUser, isLoggedIn, postAPI } from './utils/helpers';
import PrivateRoute from './utils/PrivateRoute';
// import our main pages
import Menu from './components/pages/Menu/Index';
import DM_DonViHanhChinh from './components/pages/DM_DonViHanhChinh/Index';
import DM_ChucVu from './components/pages/DM_ChucVu/Index';
import UserGroup from './components/pages/UserGroup/Index';
import User from './components/pages/Users/Index';
import DM_DonVi from './components/pages/DM_DonVi/Index';
import Permission from './components/pages/Permission/Index';
import Dashboard from './components/pages/Dashboard/Dashboard';
// import our users pages

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

// route our components
const RouteSinglePage = () => (
    <Switch>
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute component={Menu} path='/menu' exact />
        <PrivateRoute exact path='/dm_chucvu' component={DM_ChucVu} />
        <PrivateRoute exact path='/dm_donvi' component={DM_DonVi} />
        <PrivateRoute exact path='/permission' component={Permission} />
        <PrivateRoute exact path='/user_group' component={UserGroup} />
        <PrivateRoute exact path='/user' component={User} />
        <PrivateRoute exact path='/dm_donvihanhchinh' component={DM_DonViHanhChinh} />
    </Switch>
);
export default RouteSinglePage