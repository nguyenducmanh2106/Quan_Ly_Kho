import React from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Messages from './messages-dropdown/MessagesDropdown';
import CauHinh from './CauHinh/CauHinh';
import Notifications from './notifications-dropdown/NotificationsDropdown';
import Profile from './profile/Profile';
import { Layout, Menu, Breadcrumb, Button, Input, Avatar } from 'antd';
const Header = ({ toggleMenuSidebar, menusidebarState }) => {
    const [t] = useTranslation();
    const SubMenu = Menu.SubMenu;

    const Search = Input.Search;
    return (

        <Menu
            mode="horizontal"
            theme="light"
            className="d-flex align-items-center custom-navigation"
        >

            <Menu.Item key="brand-logo" className="brand-logo">
                <Link to="/dashboard">
                    <img src="http://via.placeholder.com/50x50" className="m-r-5" />
                    <span>Admin</span>
                </Link>
            </Menu.Item>
            

            <Menu.Item key="sidebar-toggle" className="custom-search auto" onClick={menusidebarState}>
                <span>LTR/RTR</span>
            </Menu.Item>
            {/* <SubMenu
          title={
            <span className="submenu-title-wrapper">
              Language{' '}
            </span>
          }
          className="custom-dropdown language-list"
        >
          <Menu.Item key="setting:1">English</Menu.Item>
          <Menu.Item key="setting:2">Dutch</Menu.Item>
          <Menu.Item key="setting:3">Hindi</Menu.Item>
          <Menu.Item key="setting:4">Urdu</Menu.Item>
        </SubMenu> */}

            <SubMenu
                key="profile"
                title={
                    <span>
                        <Avatar size={24} />
                        <span> Profile</span>
                    </span>
                }
                className=""
            >
                <Menu.Item key="profile-view">
                    <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="logout"><Link to="/logout">Logout</Link></Menu.Item>
            </SubMenu>

        </Menu>

    );
};

export default Header;
