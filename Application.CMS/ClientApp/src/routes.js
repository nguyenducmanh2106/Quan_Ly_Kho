import * as React from 'react';
import Layout from './components/pages/Layout';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { setAccessToken, setUser, isLoggedIn, postAPI } from './utils/helpers';
// import our main pages
//import { Layout } from './components/Layout';
import { Error } from './components/Error';
import Menu from './components/pages/Menu/Index';
import DM_ChucVu from './components/pages/DM_ChucVu/Index';
import UserGroup from './components/pages/UserGroup/Index';
import User from './components/pages/Users/Index';
import DM_DonVi from './components/pages/DM_DonVi/Index';
import Permission from './components/pages/Permission/Index';
import Dashboard from './components/pages/Dashboard/Dashboard';
// import our users pages

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

//const ScreensRoot = () => (
//    <Switch>
//        <Route path='/' exact render={() => {
//            return isLoggedIn() ? <Layout /> : <Redirect to="/login" />
//        }} />
//        <Route path='/login' component={Login} />
//        <Route path='/dashboard' component={Dashboard} />
//        <Route path='/menu' component={Menu} />
//        <Route path='/dm_chucvu' component={DM_ChucVu} />
//        <Route path='/dm_donvi' component={DM_DonVi} />
//        <Route path='/permission' component={Permission} />
//    </Switch>
//);

//export default ScreensRoot;
// route our components
const PrivateRoute = () => (
    <Switch>
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/menu' component={Menu} />
        <Route exact path='/dm_chucvu' component={DM_ChucVu} />
        <Route exact path='/dm_donvi' component={DM_DonVi} />
        <Route exact path='/permission' component={Permission} />
        <Route exact path='/user_group' component={UserGroup} />
        <Route exact path='/user' component={User} />
    </Switch>);
export default PrivateRoute