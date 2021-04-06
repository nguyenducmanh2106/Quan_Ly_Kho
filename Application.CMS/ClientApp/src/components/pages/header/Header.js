import React from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout, Menu, Button, Input, Avatar, Row, Col, Tabs, PageHeader } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
const HeaderForm = () => {
    const [t] = useTranslation();
    const { Header } = Layout;
    const Search = Input.Search;
    const { TabPane } = Tabs;
    return (
        <Header className="headerTop">
            <PageHeader
                ghost={true}
                onBack={() => window.history.back()}
                title="Tổng quan"
                extra={[
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane
                            tab={
                                <Button
                                    type="primary"
                                    icon={<AppleOutlined />}
                                    onClick={() => this.enterLoading(1)}
                                >
                                    Tab 1
        </Button>

                            }
                            key="1"
                        >
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                        </TabPane>
                    </Tabs>
                ]}
            >

            </PageHeader>


        </Header>
    );
};

export default HeaderForm;
//<Row>
//    <Col span={8}><img src="http://via.placeholder.com/50x50" className="m-r-5" />
//        <span>Admin</span></Col>
//    <Col span={8} offset={8}>
//        <Menu
//            mode="horizontal"
//            theme="light"
//            style={{ height: "52px", display: "flex" }}

//        >
//            <Menu.Item key="sidebar-toggle">
//                <span>LTR/RTR</span>
//            </Menu.Item>
//            <SubMenu
//                title={
//                    <span className="submenu-title-wrapper">
//                        Language{' '}
//                    </span>
//                }
//                className="custom-dropdown language-list"
//            >
//                <Menu.Item key="setting:1">English</Menu.Item>
//                <Menu.Item key="setting:2">Dutch</Menu.Item>
//                <Menu.Item key="setting:3">Hindi</Menu.Item>
//                <Menu.Item key="setting:4">Urdu</Menu.Item>
//            </SubMenu>

//            <SubMenu
//                key="profile"
//                title={
//                    <span>
//                        <Avatar size={24} />
//                        <span> Profile</span>
//                    </span>
//                }
//                className=""
//            >
//                <Menu.Item key="profile-view">
//                    <Link to="/profile">Profile</Link>
//                </Menu.Item>
//                <Menu.Item key="logout"><Link to="/logout">Logout</Link></Menu.Item>
//            </SubMenu>

//        </Menu>
//    </Col>
//</Row>