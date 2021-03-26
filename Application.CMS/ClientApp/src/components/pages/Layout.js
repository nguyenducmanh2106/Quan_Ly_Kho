
import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
import Profile from './/profile/Profile';
import HeaderElement from './header/Header';
import BreadcrumbForm from './Breadcrumb/Index';
import Footer from './footer/Footer';
import { Layout, Menu, Breadcrumb, Button, Input, Avatar } from 'antd';
import Main from './Mains';
import MyIcon from "../elements/Icon-Antd/Icon";
import MenuSidebar from './menu-sidebar/MenuSidebar';


import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
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
                
                <MenuSidebar />
                {menusidebarState ? <MenuUnfoldOutlined className="trigger" onClick={toggleMenuSidebar} /> : <MenuFoldOutlined className="trigger" onClick={toggleMenuSidebar} />}
            </Sider>
            <Layout>
                <Header className="headerTop">
                    <HeaderElement/>
                </Header>
                
                <Content
                    style={{
                        padding: "24px 0",
                        minHeight: '100vh',
                    }}
                    className={menusidebarState ? "collapsed mainContnet" : "mainContnet"}
                >
                    <BreadcrumbForm/>
                    <Main />
                </Content>
            </Layout>
        </Layout>


    )
};


export default LayoutForm;

