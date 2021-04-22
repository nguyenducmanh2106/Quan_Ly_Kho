import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import logo from '../../../static/images/logo.png';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { NavLink, Link, Switch, useHistory, useLocation, BrowserRouter as Router } from 'react-router-dom';
import { setAccessToken, isLoggedIn, postAPI, setLocalStorage, getToTalMiniSeconds_CurrentDateTime_Belong_TimeZone, setCookie } from '../../../utils/helpers';
import { USER_LOCALSTORAGE, PERMISS_USER_CURRENT, EXPIRES_AT_LOCALSTORAGE, ACCESS_TOKEN, URL_DASHBOARD } from "../../../utils/constants";
import { Form, Input, Button, Checkbox, Layout, Spin, Tag } from 'antd';
import { defineAbilitiesFor } from "../../elements/Config_Roles/appAbility"
import * as AntdIcons from '@ant-design/icons';
const Login = (props) => {
    let history = useHistory();
    let location = useLocation();
    //console.log(location)
    let { from } = location.state || { from: { pathname: "/" } };
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('Sign in to start your session')
    const [isError, setIsError] = useState(false)
    useEffect(() => {

    }, [])
    const onFinish = (values) => {
        // When pressing Enter, the page shouldn't reload
        //event.preventDefault();
        setIsLoading(true)
        var obj = {
            "UserName": values.nameAccount,
            "Password": base64_encode(values.passwordAccount)
        }
        var data = JSON.stringify(obj);
        // Send POST request with data submited from form
        postAPI('api/user/login', data, false).then(checkStatus)

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const checkStatus = (res) => {
        if (res.status == false) {
            setIsError(true)
            setMessage(res.message)
            setIsLoading(false)
        }
        else {

            var totalMiniseconds = getToTalMiniSeconds_CurrentDateTime_Belong_TimeZone(30)
            //setCookie(base64_encode(ACCESS_TOKEN), res.result.access_token, { path: '/', expires: new Date(totalMiniseconds) })
            setLocalStorage(base64_encode(ACCESS_TOKEN), res.result.access_token);
            setLocalStorage(EXPIRES_AT_LOCALSTORAGE, totalMiniseconds);
            setLocalStorage(USER_LOCALSTORAGE, JSON.stringify(res.result.userDetails));
            setLocalStorage(PERMISS_USER_CURRENT, JSON.stringify(res.result.permiss));
            //set Role
            defineAbilitiesFor(res.result.permiss);
            //history.replace('/');
            history.replace(from);
        }

    }
    return (
        <Spin spinning={isLoading} indicator={<AntdIcons.LoadingOutlined style={{ fontSize: 24 }} spin />}>
            <Layout title="login" className="login">
                <div
                    className="d-flex align-items-center justify-content-center flex-column"
                    style={{ maxWidth: '360px', margin: 'auto', height: '100vh' }}
                >
                    <div className="text-center">
                        <img src={logo} />
                        <h1 className="m-b-30 m-t-15">Login</h1>
                    </div>
                    <div className="text-center">
                        {isError ? <Tag color="red">{message}</Tag> : <span>{message}</span>}


                    </div>
                    <Form
                        className="login-form"
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="nameAccount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Username không được trống',
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <AntdIcons.UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                                }
                                placeholder="Username"
                            />
                        </Form.Item>

                        <Form.Item
                            name="passwordAccount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Password không được trống',
                                },
                            ]}
                        >
                            <Input.Password prefix={
                                <AntdIcons.LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                            }
                                placeholder="Password" />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="btn-block m-t-15"
                                size="large"
                            >
                                Log in
              </Button>
                        </Form.Item>
                    </Form >
                </div>
            </Layout>
        </Spin>
    );
};
export default Login;