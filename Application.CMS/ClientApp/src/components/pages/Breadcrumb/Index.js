import React, { useState, useEffect } from 'react';
import { NavLink, Link, Switch, useHistory, BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { parseJwt, getAccessToken, getUser, getAPI } from '../../../utils/helpers';
import Skeleton from 'react-loading-skeleton';
import { Layout, Menu, Breadcrumb, Button, Input, Avatar } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import renderHTML from 'react-render-html';
const BreadcrumbElement = (props) => {
    const { t } = useTranslation();
    const [text, setText] = useState("Trang chủ")
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    //console.log(history.location)
    useEffect(() => {
        async function getData() {
            var url = history.location.pathname;
            var fetchData = await getAPI(`api/menu/get-breadcumb/?url=${url}`);
            if (fetchData.status == true) {
                setText(fetchData.result.name)
                setIsLoading(!fetchData.status)
            }
        }
      
        //gọi hàm
        getData();
        return () => {
            //setAction(false)
            setIsLoading(true)
        }
    }, [history.location.pathname])
    return (
        <Breadcrumb style={{ margin: '0 0 16px 16px' }}>
            <Breadcrumb.Item><AntdIcons.HomeOutlined /></Breadcrumb.Item>
            <Breadcrumb.Item>{text}</Breadcrumb.Item>
        </Breadcrumb>
    );
};


export default BreadcrumbElement;
