import React, { useState, useEffect } from 'react';
import { NavLink, Link, Switch, useHistory, BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { parseJwt, getAccessToken, getUser, getAPI } from '../../../utils/helpers';
import { Menu, Skeleton, Space } from 'antd';
import MyIcon from "../../elements/Icon-Antd/Icon";
import renderHTML from 'react-render-html';
import { Can } from "../../elements/Config_Roles/Can"
import { getLocalStorage } from "../../../utils/helpers"
import { PERMISS_USER_CURRENT } from "../../../utils/constants"
import { defineAbilitiesFor, _isPermission } from "../../elements/Config_Roles/appAbility"
import * as AntdIcons from '@ant-design/icons';
const MenuSidebar = (props) => {

    const { SubMenu } = Menu;
    const { t } = useTranslation();
    let history = useHistory();
    const [avt, setAvt] = useState("dist/img/user2-160x160.jpg")
    const [fullName, setFullName] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [listmenu, setMenu] = useState([])

    useEffect(() => {
        defineAbilitiesFor(getLocalStorage(PERMISS_USER_CURRENT))
        async function getData() {
            var fetchData = await getAPI(`api/menu/raw_menu`);
            if (fetchData.status == true) {
                //console.log(fetchData.result)
                //console.log(ability.rules[0].subject)
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

                    mode="inline"
                    theme="dark"
                //className="classColor"

                >
                    {listmenu.map((item) => {
                        var icon = item.icon
                        if (!item.childNode.length) {
                            if (_isPermission("view", item.url.substr(1))) {
                                return (
                                    //<Can I="view" a={item.url.substr(1)}>

                                    <Menu.Item  key={item.id} icon={<MyIcon type={icon} />} >
                                        <Link to={item.url}>
                                            {item.name}
                                        </Link>
                                    </Menu.Item>

                                    // </Can>
                                )
                            }
                        }
                        else {
                            if (_isPermission("view",item.url.substr(1))) {
                                return (
                                    // <Can I="view" a={item.url.substr(1)}>
                                    <SubMenu key={item.id} icon={<MyIcon type={icon} />} title={item.name}>
                                        {item.childNode.map((itemChild1) => {
                                            var icon = itemChild1.icon;
                                            if (!itemChild1.childNode.length) {
                                                if (_isPermission("view", itemChild1.url.substr(1))) {
                                                    return (
                                                        <Menu.Item key={itemChild1.id}>
                                                            <Link to={itemChild1.url}>
                                                                <MyIcon type={icon} />
                                                                <span>{itemChild1.name}</span>
                                                            </Link>
                                                        </Menu.Item>
                                                    )

                                                }

                                            }
                                            else {
                                                if (_isPermission("view",itemChild1.url.substr(1))) {
                                                    return (
                                                        <SubMenu key={itemChild1.id} icon={<MyIcon type={icon} />} title={itemChild1.name}>
                                                            {itemChild1.childNodes.map((itemChild2, IndexChild2) => {
                                                                var icon = itemChild2.icon
                                                                if (!itemChild2.childNode.length) {
                                                                    if (_isPermission("", itemChild2.url.substr(1))) {
                                                                        return (
                                                                            <Menu.Item key={itemChild2.id} icon={<MyIcon type={icon} />}>
                                                                                {/*<Can I="view" a={itemChild2.url.substr(1)}>*/}
                                                                                <Link to={itemChild2.url}>{itemChild2.name}</Link>
                                                                                {/*</Can>*/}
                                                                            </Menu.Item>
                                                                        )
                                                                    }
                                                                }
                                                                else {
                                                                    if (_isPermission("view", itemChild2.url.substr(1))) {
                                                                        return (
                                                                            //<Can I="view" a={itemChild2.url.substr(1)}>
                                                                            <SubMenu key={itemChild2.id} icon={<MyIcon type={icon} />} title={itemChild2.name}>
                                                                                {itemChild2.childNode.map((itemChild3, IndexChild3) => {
                                                                                    var icon = itemChild3.icon
                                                                                    if (_isPermission("view", itemChild3.url.substr(1))) {
                                                                                        return (
                                                                                            <Menu.Item key={itemChild3.id} icon={<MyIcon type={icon} /> || renderHTML(icon)}>
                                                                                                {/*<Can I="view" a={itemChild3.url.substr(1)}>*/}
                                                                                                <Link to={itemChild3.url}>{itemChild3.name}</Link>
                                                                                                {/*</Can>*/}
                                                                                            </Menu.Item>
                                                                                        )
                                                                                    }

                                                                                })}
                                                                            </SubMenu>
                                                                            //</Can>
                                                                        )
                                                                    }
                                                                }
                                                            })}
                                                        </SubMenu>
                                                        //</Can>
                                                    )
                                                }
                                            }
                                        })}
                                    </SubMenu>
                                    // </Can>
                                )
                            }
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
