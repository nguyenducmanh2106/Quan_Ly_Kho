/// <reference path="components/pages/dm_sanpham/context.js" />
import React, { useState } from 'react';
import Layout from './components/pages/Layout';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { setAccessToken, setUser, isLoggedIn, postAPI } from './utils/helpers';
import PrivateRoute from './utils/PrivateRoute';
import { UserProvider } from './components/pages/DM_SanPham/Context'
// import our main pages
import Menu from './components/pages/Menu/Index';
import DM_DonViHanhChinh from './components/pages/DM_DonViHanhChinh/Index';
import DM_ChucVu from './components/pages/DM_ChucVu/Index';
import UserGroup from './components/pages/UserGroup/Index';
import User from './components/pages/Users/Index';
import DM_DonVi from './components/pages/DM_DonVi/Index';
import Permission from './components/pages/Permission/Index';
import DM_NhaCungCap from './components/pages/DM_NhaCungCap/Index';
import Dashboard from './components/pages/Dashboard/Dashboard';
import DM_XuatXu from './components/pages/DM_XuatXu/Index';
import DM_DonViTinh from './components/pages/DM_DonViTinh/Index';
import DM_LoaiSanPham from './components/pages/DM_LoaiSanPham/Index';
import DM_ThuongHieu from './components/pages/DM_ThuongHieu/Index';
import DM_NhomThuocTinh from './components/pages/DM_NhomThuocTinh/Index';
import DM_SanPham from './components/pages/DM_SanPham/Index';
import DM_SanPham_Create from './components/pages/DM_SanPham/Create';
import DM_SanPham_Update from './components/pages/DM_SanPham/Update';
// import our users pages

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

// route our components
const RouteSinglePage = () => {
    //var [sanphamUpdate, setSanPhamUpdate] = useState({});
    //const onSetSanPhamUpdate = (data) => {
    //    setSanPhamUpdate(data)
    //}
    return (
        <Switch>
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute component={Menu} path='/menu' exact />
            <PrivateRoute exact path='/dm_chucvu' component={DM_ChucVu} />
            <PrivateRoute exact path='/dm_donvi' component={DM_DonVi} />
            <PrivateRoute exact path='/permission' component={Permission} />
            <PrivateRoute exact path='/user_group' component={UserGroup} />
            <PrivateRoute exact path='/user' component={User} />
            <PrivateRoute exact path='/dm_donvihanhchinh' component={DM_DonViHanhChinh} />
            <PrivateRoute exact path='/dm_nhacungcap' component={DM_NhaCungCap} />
            <PrivateRoute exact path='/dm_xuatxu' component={DM_XuatXu} />
            <PrivateRoute exact path='/dm_donvitinh' component={DM_DonViTinh} />
            <PrivateRoute exact path='/dm_loaisanpham' component={DM_LoaiSanPham} />
            <PrivateRoute exact path='/dm_thuonghieu' component={DM_ThuongHieu} />
            <PrivateRoute exact path='/dm_nhomthuoctinh' component={DM_NhomThuocTinh} />
            <PrivateRoute exact path='/dm_sanpham' component={DM_SanPham} />
            <PrivateRoute path='/dm_sanpham/create' component={DM_SanPham_Create} />
            <PrivateRoute path='/dm_sanpham/update/:id' component={DM_SanPham_Update} />
        </Switch>
    );
}
export default RouteSinglePage