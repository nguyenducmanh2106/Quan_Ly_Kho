
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import logo from '../../../static/images/logo.png';
import 'isomorphic-fetch';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { NavLink, Link, Switch, useHistory, BrowserRouter as Router } from 'react-router-dom';
import { setAccessToken, isLoggedIn, postAPI, parseJwt, setUser } from '../../../utils/helpers';
import { Form, Input, Button, Checkbox, Layout } from 'antd';
import * as AntdIcons from '@ant-design/icons';
const Login = () => {
    const [stateData, setStateData] = useState({
            loggedIn: isLoggedIn(),
            isError: false,
            messageError: 'Sign in to start your session',
        })
    const onFinish = (values) => {
        //console.log('Success:', values);
        // When pressing Enter, the page shouldn't reload
        //event.preventDefault();
        var obj = {
            "UserName": values.username,
            "Password": base64_encode(values.password)
        }
        var data = JSON.stringify(obj);
        //console.log(obj)
        // Send POST request with data submited from form
        var data = postAPI('api/user/login', data, false).then(checkStatus)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const checkStatus = (res) => {
        console.log(res)
        if (res.status) {
            setAccessToken(res.result.access_token);
            setUser(res.result.userDetails);
            setStateData({ ...stateData, loggedIn: true });
            //this.props.history.push('/admin');
            window.location.href = "/"
            console.log("đăng nhập thành công")
        } else {
            //let error = new Error(res.statusTest);
            //console.log(error);
            //this.props.history.push('/error');
            setStateData({
                ...stateData,
                isError: true,
                messageError: res.message
            })
        }
    }
    return (
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
                    <span>{stateData.messageError}</span>
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
                        name="username"
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
                        name="password"
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
    );
};
export default Login;
//export class Login extends React.Component {
//    formRef = React.createRef();
//    constructor() {
//        super();

//        this.state = {
//            userName: '',
//            password: '',
//            loggedIn: isLoggedIn(),
//            isError: false,
//            messageError: 'Sign in to start your session',
//            appLoadingState: true
//        };
//    }


//    componentDidMount() {
//        this.setState({ appLoadingState: false })
//    }

//    handleOnChange = (event) => {
//        this.setState({ [event.target.name]: event.target.value, errors: [] });
//    }

//    prepareFormData = (data = this.state) => {
//        return {
//            UserName: data.userName.trim(),
//            PassWord: data.password.trim()
//        };
//    }
//    // Tell fetch() that 4xx and 5xx are client and server errors respectively,
//    // since it hasn't clue yet; redirect to pages depending of response's status code
//    checkStatus = (res) => {

//        if (res.status) {
//            setAccessToken(res.result.access_token);
//            setUser(res.result.userDetails);
//            this.setState({ loggedIn: true });
//            //this.props.history.push('/admin');
//            window.location.href = "/"
//            console.log("đăng nhập thành công")
//        } else {
//            //let error = new Error(res.statusTest);
//            //console.log(error);
//            //this.props.history.push('/error');
//            this.setState({
//                appLoadingState: false,
//                isError: true,
//                isError: res.message
//            })
//        }
//    }
//    loginUser = (event) => {
//        // When pressing Enter, the page shouldn't reload
//        event.preventDefault();
//        var data = JSON.stringify(this.prepareFormData());
//        // Send POST request with data submited from form
//        this.setState({ appLoadingState: true })
//        var data = postAPI('api/user/login', data, false).then(this.checkStatus)
//    }

//    render() {
//        //if (this.state.loggedIn) {
//        //    return <Redirect to="/" />;
//        //}

//        return (
//           
//        );
//    }
//}