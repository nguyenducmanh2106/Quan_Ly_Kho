
import React, { useState, useEffect } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Profile from './/profile/Profile';
import HeaderElement from './header/Header';
import BreadcrumbForm from './Breadcrumb/Index';
import Footer from './footer/Footer';
import { Layout, Menu, Breadcrumb, Button, Input, Avatar, Switch, Skeleton } from 'antd';
import Main from './Mains';
import MyIcon from "../elements/Icon-Antd/Icon";
import MenuSidebar from './menu-sidebar/MenuSidebar';
import Logo from "./../../static/images/logo_icon.png"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MoreOutlined
} from '@ant-design/icons';
import ReactDOM from 'react-dom';
const LayoutForm = () => {

    const { Header, Content, Footer, Sider } = Layout;
    const [appLoadingState, updateAppLoading] = useState(true);
    //const [Breadcrumb, setBreadcrumb] = useState("");
    const [menusidebarState, updateMenusidebarState] = useState(false);
    const toggleMenuSidebar = () => {
        updateMenusidebarState(!menusidebarState);
    };

    return (
        <Layout>
            <Sider trigger={null} collapsible
                collapsed={menusidebarState} style={{ background: '#fff' }}
                width='240'
                className="sidebar-left" onCollapse={toggleMenuSidebar}>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <div className={menusidebarState ? "logo toggleLogo" : "logo"}>
                        <a style={{ textAlign: 'center' }}>
                            <img className="logo--full" src={Logo} style={{width:'60%'}} />
                        </a>
                        <MoreOutlined onClick={toggleMenuSidebar} twoToneColor="#eb2f96" style={{ fontSize: "30px" }} />
                    </div>
                    <div className="menuWrapper">
                        <div className="menuInner">
                            <MenuSidebar />
                        </div>
                    </div>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <HeaderElement />
                <Content
                    style={{
                        padding: "24px",
                        minHeight: '100vh',
                    }}
                //className={menusidebarState ? "collapsed mainContnet" : "mainContnet"}
                >
                    <BreadcrumbForm />
                    <Main />
                </Content>
            </Layout>
        </Layout>


    )
};


export default LayoutForm;
 //<HeaderElement />
