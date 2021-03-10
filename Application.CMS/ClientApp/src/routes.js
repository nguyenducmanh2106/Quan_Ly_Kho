import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { setAccessToken, setUser, isLoggedIn, postAPI } from './utils/helpers';
// import our main pages
//import { Layout } from './components/Layout';
import { Error } from './components/Error';
import Menu from './components/pages/Menu/Menu';
import DM_ChucVu from './components/pages/DM_ChucVu/Index';
import DM_DonVi from './components/pages/DM_DonVi/Index';
import Permission from './components/pages/Permission/Index';
import Dashboard from './components/pages/Dashboard/Dashboard';
// import our users pages
import { Users } from './components/users/Users';
import { Login } from './components/users/Login';
import { Register } from './components/users/Register';
//import Main from './components/pages/Main';
import Mains from './components/pages/Mains';
const ScreensRoot = () => (
    <>
        <Route path='/' exact render={() => {
            return isLoggedIn() ? <Mains /> : <Redirect to="/login" />
        }} />
        <Route path='/login' component={Login} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/menu' component={Menu} />
        <Route path='/dm_chucvu' component={DM_ChucVu} />
        <Route path='/dm_donvi' component={DM_DonVi} />
        <Route path='/permission' component={Permission} />
    </>
);

export default ScreensRoot;
// route our components
//export const routes =
//    <Layout>
//        <Route exact path='/' component={Home} />
//        <Route path='/about' component={About} />
//        <Route path='/error' component={Error} />

//        <Route path='/users' component={Users} />
//        <Route path='/login' component={Login} />
//        <Route path='/register' component={Register} />
//        <Route path='/example' component={Example} />
//    </Layout>;