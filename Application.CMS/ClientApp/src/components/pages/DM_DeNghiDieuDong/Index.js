import React, { useEffect, useState, useMemo } from 'react';
import { useHistory, Route, Redirect } from 'react-router-dom';

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
function Index({ onSetSanPhamUpdate }) {
    let history = useHistory()
    //khai báo state
    const { Header, Content, Footer } = Layout;
    return (
        <Content className="main-container main-container-component">
            <Card>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Yêu cầu nhập hàng" key="1">
                        <IndexGui />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Yêu cầu xuất hàng" key="2">
                        Yêu cầu xuất hàng
    </Tabs.TabPane>
                </Tabs>
            </Card>
        </Content>
    );
};

export default Index;
