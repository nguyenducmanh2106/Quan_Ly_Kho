import React, { useState, useEffect } from 'react';
import { NavLink, Link, Switch, useHistory, BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { parseJwt, getAccessToken, getUser, getAPI } from '../../../utils/helpers';
import { Layout, Menu, Breadcrumb, Button, Input, Avatar, Skeleton, PageHeader } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import renderHTML from 'react-render-html';
const BreadcrumbElement = (props) => {
    const { t } = useTranslation();
    const [text, setText] = useState("Trang chủ")
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    console.log(history.location)
    const routes = [
        {
            path: 'index',
            breadcrumbName: "Trang chủ",
        },
        {
            path: 'index',
            breadcrumbName: history.location.state?.controller ?? "",
        },
        {
            path: 'index',
            breadcrumbName: history.location.state?.action ?? "",
        },

    ];
    //useEffect(() => {
    //    async function getData() {
    //        var url = history.location.pathname;
    //        var fetchData = await getAPI(`api/menu/get-breadcumb/?url=${url}`);
    //        if (fetchData.status == true) {
    //            setText(fetchData.result.name)
    //            setIsLoading(!fetchData.status)
    //        }
    //    }

    //    //gọi hàm
    //    getData();
    //    return () => {
    //        //setAction(false)
    //        setIsLoading(true)
    //    }
    //}, [history.location.pathname])
    return (
        <PageHeader
            className="site-page-header"
            title={history.location.state?.controller}
            breadcrumb={{ routes }}
        //subTitle=""
        />
        //<Breadcrumb style={{ marginBottom: '24px' }}>
        //    <Breadcrumb.Item><AntdIcons.HomeOutlined /></Breadcrumb.Item>
        //    <Breadcrumb.Item>{history.location.state.controller}</Breadcrumb.Item>
        //    {history.location.state.action ? <Breadcrumb.Item>{history.location.state.action}</Breadcrumb.Item> : null}
        //</Breadcrumb>
    );
};


export default BreadcrumbElement;
