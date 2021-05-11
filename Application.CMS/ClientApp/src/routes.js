import React, { useState } from 'react';
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
import DM_SanPham_Detail_NewPage from './components/pages/DM_SanPham/DetailNewPage';
import DM_LoaiDeNghi from './components/pages/DM_LoaiDeNghi/Index';
import DM_DeNghiDieuDong from './components/pages/DM_DeNghiDieuDong/Index';
import DM_DeNghiDieuDong_Nhan from './components/pages/DM_DeNghiDieuDong/IndexGui';
import DM_DeNghiDieuDong_Create from './components/pages/DM_DeNghiDieuDong/Create';
import DM_DeNghiDieuDong_Update from './components/pages/DM_DeNghiDieuDong/Update';
import DM_DeNghiDieuDong_Detail_NewPage from './components/pages/DM_DeNghiDieuDong/DetailNewPage';
import DM_DeNghiDieuDong_PheDuyet from './components/pages/DM_DeNghiDieuDong/PheDuyet';
import DM_NhapHang from './components/pages/DM_NhapHang/Index';
import DM_NhapHang_Create from './components/pages/DM_NhapHang/Create';
import DM_NhapHang_Update from './components/pages/DM_NhapHang/Update';
import DM_NhapHang_DetailNewPage from './components/pages/DM_NhapHang/DetailNewPage';

import DM_XuatHang from './components/pages/DM_XuatHang/Index';
import DM_XuatHang_Create from './components/pages/DM_XuatHang/Create';
import DM_XuatHang_Update from './components/pages/DM_XuatHang/Update';
import DM_XuatHang_DetailNewPage from './components/pages/DM_XuatHang/DetailNewPage';

import DM_KiemKe from './components/pages/DM_KiemKe/Index';
import DM_KiemKe_Create from './components/pages/DM_KiemKe/Create';
import DM_KiemKe_DetailNewPage from './components/pages/DM_KiemKe/DetailNewPage';
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
            <PrivateRoute exact path='/menu' component={Menu} />
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
            <PrivateRoute exact path='/dm_sanpham/create' component={DM_SanPham_Create} />
            <PrivateRoute exact path='/dm_sanpham/update/:id' component={DM_SanPham_Update} />
            <PrivateRoute exact path='/dm_sanpham/view/:id' component={DM_SanPham_Detail_NewPage} />
            <PrivateRoute exact path='/dm_loaidenghi' component={DM_LoaiDeNghi} />
            <PrivateRoute exact path='/dm_loaidenghi' component={DM_LoaiDeNghi} />
            <PrivateRoute path='/dm_denghidieudong' component={DM_DeNghiDieuDong} />
            <PrivateRoute exact path='/dm_denghidieudong-create/create' component={DM_DeNghiDieuDong_Create} />
            <PrivateRoute exact path='/dm_denghidieudong-update/update/:id' component={DM_DeNghiDieuDong_Update} />
            <PrivateRoute exact path='/dm_denghidieudong-pheduyet/pheduyet/:id' component={DM_DeNghiDieuDong_PheDuyet} />
            {/*<PrivateRoute path='/dm_denghidieudong/view/:id' component={DM_DeNghiDieuDong_Detail_NewPage} />*/}
            <PrivateRoute exact path='/dm_nhaphang' component={DM_NhapHang} />
            <PrivateRoute exact path='/dm_nhaphang/create' component={DM_NhapHang_Create} />
            <PrivateRoute exact path='/dm_nhaphang/update/:id' component={DM_NhapHang_Update} />
            <PrivateRoute exact path='/dm_nhaphang/view/:id' component={DM_NhapHang_DetailNewPage} />
            <PrivateRoute exact path='/dm_xuathang' component={DM_XuatHang} />
            <PrivateRoute exact path='/dm_xuathang/create' component={DM_XuatHang_Create} />
            <PrivateRoute exact path='/dm_xuathang/update/:id' component={DM_XuatHang_Update} />
            <PrivateRoute exact path='/dm_xuathang/view/:id' component={DM_XuatHang_DetailNewPage} />
            //
            <PrivateRoute exact path='/dm_kiemke' component={DM_KiemKe} />
            <PrivateRoute exact path='/dm_kiemke/create' component={DM_KiemKe_Create} />
            <PrivateRoute exact path='/dm_kiemke/view/:id' component={DM_KiemKe_DetailNewPage} />
        </Switch>
    );
}
export default RouteSinglePage