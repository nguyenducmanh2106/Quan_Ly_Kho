import React, { useState, useEffect } from 'react';
import { NavLink, Link, Switch, useHistory, BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { parseJwt, getAccessToken, getUser, getAPI } from '../../../utils/helpers';
import { Menu, Skeleton } from 'antd';
import MyIcon from "../../elements/Icon-Antd/Icon";
import renderHTML from 'react-render-html';
import * as AntdIcons from '@ant-design/icons';
const MenuSidebar = (props) => {

    const { SubMenu } = Menu;
    const { t } = useTranslation();
    let history = useHistory();
    const [avt, setAvt] = useState("dist/img/user2-160x160.jpg")
    const [fullName, setFullName] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [listmenu, setMenu] = useState([])
    const [listmenu1, setMenu1] = useState([])

    useEffect(() => {
        async function getData() {
            var fetchData = await getAPI(`api/menu/raw_menu`);
            if (fetchData.status == true) {
                setMenu(fetchData.result)
                setIsLoading(!fetchData.status)
            }
        }

        //gọi hàm
        getData();
        return () => {
            //setAction(false)
        }
    }, [])
    const renderMenu = () => {
        return (
            <Skeleton loading={isLoading} active={true}>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="light"
                //className="classColor"

                >
                    {listmenu.map((item) => {
                        var icon = item.icon
                        if (item.childNode.length <= 0) {

                            return (
                                <Menu.Item key={item.id} icon={<MyIcon type={icon} /> ?? renderHTML(icon)}>
                                    <Link to={item.url}>{item.name}</Link>
                                </Menu.Item>
                            )
                        }
                        else {
                            return (
                                <SubMenu key={item.id} icon={<MyIcon type={icon} /> ?? renderHTML(icon)} title={item.name}>
                                    {item.childNode.map((itemChild1) => {
                                        var icon = itemChild1.icon
                                        if (itemChild1.childNode.length <= 0) {
                                            return (
                                                <Menu.Item key={itemChild1.id}>
                                                    <Link to={itemChild1.url}>
                                                        <div>
                                                            <MyIcon type={icon} />
                                                            <span>{itemChild1.name}</span>
                                                        </div>

                                                    </Link>
                                                </Menu.Item>
                                            )
                                        }
                                        else {
                                            return (
                                                <SubMenu key={itemChild1.id} icon={<MyIcon type={icon} /> || renderHTML(icon)} title={itemChild1.name}>
                                                    {itemChild1.childNodes.map((itemChild2, IndexChild2) => {
                                                        var icon = itemChild2.icon
                                                        if (itemChild2.childNode.length <= 0) {
                                                            return (
                                                                <Menu.Item key={itemChild2.id} icon={<MyIcon type={icon} /> || renderHTML(icon)}>
                                                                    <Link to={itemChild2.url}>{itemChild2.name}</Link>
                                                                </Menu.Item>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <SubMenu key={itemChild2.id} icon={<MyIcon type={icon} /> || renderHTML(itemChild2.icon)} title={itemChild2.name}>
                                                                    {itemChild2.childNode.map((itemChild3, IndexChild3) => {
                                                                        var icon = itemChild3.icon
                                                                        return (
                                                                            <Menu.Item key={itemChild3.id} icon={<MyIcon type={icon} /> || renderHTML(icon)}>
                                                                                <Link to={itemChild3.url}>{itemChild3.name}</Link>
                                                                            </Menu.Item>
                                                                        )
                                                                    })}
                                                                </SubMenu>
                                                            )
                                                        }
                                                    })}
                                                </SubMenu>
                                            )
                                        }
                                    })}
                                </SubMenu>
                            )
                        }
                    })
                    }
                </Menu>
            </Skeleton>
        )
    }
    return (
        <>{renderMenu()}</>

    );
};


export default MenuSidebar;
