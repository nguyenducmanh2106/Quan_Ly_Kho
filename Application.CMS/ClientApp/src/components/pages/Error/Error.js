import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import logo from '../../../static/images/icon-visitor.png';
import { returnLogin } from "../../../utils/helpers"
import { URL_ERROR, URL_LOGIN } from "../../../utils/constants"
import { Form, Input, Button, Checkbox, Layout, Row, Col } from 'antd';
import * as AntdIcons from '@ant-design/icons';
const Error = ({ name, codeError }) => {
    let history = useHistory();
    const returnUrl = () => {
        returnLogin()
        history.push(URL_LOGIN);

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout title="UnAuthorize" className="login">
            <div
                className="d-flex align-items-center justify-content-center flex-column"
                style={{ maxWidth: '360px', margin: 'auto', height: '100vh' }}
            >
                <div className="text-center">
                    <img src={logo} />
                    <h1 className="m-b-30 m-t-15">Bạn không có quyền truy cập hoặc thời gian truy cập đã hết hạn</h1>
                </div>
                <div className="text-center">
                    <span>Vui lòng đăng nhập lại</span>
                </div>
                <Form
                    className="login-form"
                    name="basic"

                >


                    <Row>
                        <Col md={{ span: 24 }} lg={{ span: 10 }}>
                            <Form.Item >
                                <Button
                                    block
                                    type="primary"
                                    onClick={() => window.history.back()}
                                    size="middle"
                                >
                                    Quay lại
              </Button>
                            </Form.Item>
                        </Col>
                        <Col md={{ span: 24 }} lg={{ span: 10,offset:2 }}>
                            <Form.Item >
                                <Button
                                    block
                                    type="primary"
                                    size="middle"
                                    onClick={returnUrl}
                                >
                                    Đăng nhập
              </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form >
            </div>
        </Layout>
    );
};
export default Error;