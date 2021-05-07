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
import LoadingOverlay from 'react-loading-overlay'
import PrivateRoute from "../../../utils/PrivateRoute"
import BounceLoader from 'react-spinners/BounceLoader'
import IndexNhan from './IndexNhan'
function Index() {
    let history = useHistory()
    //khai báo state
    const { Header, Content, Footer } = Layout;
    const changeTab = (key) => {
        //console.log(key)
        //if (key == 1) {
        //    history.push({
        //        pathname: "/dm_denghidieudong/nhap", state: { controller: "Yêu cầu nhập-xuất hàng", action: "Nhập" }
        //    });
        //}
        //else {
        //    history.push({
        //        pathname: "/dm_denghidieudong/xuat", state: {
        //            controller: "Yêu cầu nhập-xuất hàng", action: "Xuất"
        //        }
        //    });
        //}
    }
    return (
        <Content className="main-container main-container-component">
            <Card>

                <Tabs defaultActiveKey="1" onChange={changeTab}>
                    <Tabs.TabPane tab=" Đơn xuất hàng" key="1">
                        <IndexNhan />
                    </Tabs.TabPane>
                    {/*<Tabs.TabPane tab="Đơn xuất hàng" key="2">*/}
                    {/*    <PrivateRoute exact path='/dm_nhaphang' component={IndexNhan} />*/}
                    {/*</Tabs.TabPane>*/}
                </Tabs>
            </Card>
        </Content>
    );
};

export default Index;
