import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, BrowserRouter as Router, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { returnLogin, getLocalStorage } from "../../../utils/helpers";
import { USER_LOCALSTORAGE } from "../../../utils/constants";
import { URL_LOGIN } from "../../../utils/constants"
import { Layout, Menu, Button, Input, Avatar, Row, Col, Tabs, PageHeader, Dropdown, Space, Image, Badge } from 'antd';
import { ExportOutlined, DownOutlined, UserOutlined, BellTwoTone, SettingTwoTone   } from '@ant-design/icons';
const HeaderForm = () => {
    const [t] = useTranslation();
    const history = useHistory();
    const { Header } = Layout;
    const Search = Input.Search;
    const Logout = () => {
        returnLogin();
        history.push(URL_LOGIN)
    }

    const [userInfo, setUserInfo] = useState(JSON.parse(window.localStorage.getItem(USER_LOCALSTORAGE)))
    const pathAvatar = "data:image/png;base64," + userInfo.pathAvatar;
    //console.log(userInfo)
    return (
        <Header className="headerTop">
            <Row>
                <Col span={8}>

                </Col>
                <Col span={8} offset={8}>
                    <Menu mode="horizontal"
                        style={{textAlign:"right"}}
                    >
                        {/* <Menu.Item key="1">
                            <SettingTwoTone/>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Badge size="small" count={5} offset={[10, 0]}>
                                <BellTwoTone/>
                            </Badge>
                        </Menu.Item> */}
                        <Menu.Item key="3">
                            <Dropdown overlay={() => (
                                <Menu>
                                    <Menu.Item key="profile-view">
                                        <Link to="/profile">Profile</Link>
                                    </Menu.Item>
                                    <Menu.Item key="logout">
                                        <Link to onClick={Logout}>
                                            <Space size={8}>
                                                <ExportOutlined />
                                                <span>Logout</span>
                                            </Space>
                                        </Link>
                                    </Menu.Item>
                                </Menu>
                            )} trigger={['click']}>
                                <Space size={12}>
                                    <span>
                                        {userInfo.pathAvatar != "" ? <Avatar size={24}
                                            src={<Image src={pathAvatar} preview={false} />}
                                        /> :
                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                        }
                                        <span> {userInfo.fullName}</span>

                                    </span>
                                    <DownOutlined />
                                </Space>
                            </Dropdown>

                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>


        </Header >
    );
};

export default HeaderForm;
