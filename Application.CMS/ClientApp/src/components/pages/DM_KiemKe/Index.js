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
import IndexXuatHang from './../DM_XuatHang/IndexNhan'
import IndexNhapHang from './IndexNhan'
function Index() {
    let history = useHistory()
    //khai báo state
    const { Header, Content, Footer } = Layout;

    return (
        <Content className="main-container main-container-component">
            <Card>
                <IndexNhapHang />
            </Card>
        </Content>
    );
};

export default Index;
