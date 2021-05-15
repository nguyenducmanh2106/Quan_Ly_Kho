import React, { useEffect, useState, useMemo } from 'react';
import { useHistory, Route, Redirect, Link, Switch } from 'react-router-dom';

import {
    Select, notification, Input, Skeleton,
    Card, Col, Row, Layout, Button, Space, Form, Modal,
    Drawer, DatePicker, Tooltip, Tabs
} from 'antd';
import * as AntdIcons from '@ant-design/icons';
import useModal from './../../elements/modal/useModal';
import { getAPI, postAPI, postFormData, getLocalStorage } from './../../../utils/helpers';
import { USER_LOCALSTORAGE } from './../../../utils/constants';
import ListData from './ListDataGui';
import FormView from './View';
import LoadingOverlay from 'react-loading-overlay'
import PrivateRoute from "../../../utils/PrivateRoute"
import BounceLoader from 'react-spinners/BounceLoader'
import IndexGui from './IndexGui'
import DM_DeNghiDieuDong_Create from './Create'
import DM_DeNghiDieuDong_Update from './Update'
import IndexNhan from './IndexNhan'
function Index({ onSetSanPhamUpdate }) {
    let history = useHistory()
    //khai báo state
    console.log(history.location)
    const { Header, Content, Footer } = Layout;
    const changeTab = (key) => {
        //console.log(key)
        if (key == 1) {
            //history.push({
            //    pathname: "/dm_denghidieudong/nhap", state: { controller: "Yêu cầu nhập-xuất hàng", action: "Nhập" }
            //});
            history.push({
                pathname: "/dm_denghidieudong", state: { controller: "Yêu cầu nhập-xuất hàng", action: "Nhập" }
            });
        }
        if (key == 2) {
            history.push({
                pathname: "/dm_denghidieudong/xuat", state: {
                    controller: "Yêu cầu nhập-xuất hàng", action: "Xuất"
                }
            });
        }
    }
    return (
        <Content className="main-container main-container-component">
            <Card>

                <Tabs defaultActiveKey={history.location.pathname == "/dm_denghidieudong" ? "1" : "2"} onChange={changeTab}>
                    <Tabs.TabPane tab=" Yêu cầu nhập hàng" key="1">
                        {/*<PrivateRoute exact path='/dm_denghidieudong' component={IndexGui} />*/}
                        <IndexGui />
                        {/*<IndexGui />*/}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Yêu cầu xuất hàng" key="2">
                        <PrivateRoute exact path='/dm_denghidieudong/xuat' component={IndexNhan} />
                    </Tabs.TabPane>
                </Tabs>
            </Card>
        </Content>
    );
};

export default Index;
