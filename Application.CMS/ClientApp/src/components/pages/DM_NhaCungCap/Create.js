import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, InputNumber, Button, Modal, Select, Space, Checkbox, Upload, Row, Col, Card, Tooltip } from 'antd';
import * as AntdIcons from '@ant-design/icons';
const ModalCreate = ({ isShowing, hide, data, onPostCreateItem, confirmLoading }) => {
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    const validateMessages = {
        required: '${label} không được để trống',
        types: {
            email: '${label} không đúng định dạng email',
            number: '${label} không đúng định dạng số',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onSubmit = (data) => {
        var obj = {
            ...data,
            Status: data.Status ? 1 : 2
        }
        //console.log(obj)
        onPostCreateItem(obj).then(onReset())
    }
    return (
        <>

            {
                isShowing ? ReactDOM.createPortal(

                    <React.Fragment>
                        <Modal title="Tạo mới" visible={isShowing} okText="Lưu" cancelText="Quay lại" width={1000}
                           /* onOk={onSubmit}*/ style={{ top: 20 }} onCancel={hide}
                            confirmLoading={confirmLoading}
                            okButtonProps={{ form: 'myFormCreate', key: 'submit', htmlType: 'submit' }}
                        >
                            <Form
                                form={form}
                                name="nest-messages" onFinish={onSubmit} id="myFormCreate"
                                validateMessages={validateMessages}
                                initialValues={{
                                    ["Ordering"]: 0
                                }}
                            >
                                <Row gutter={24} style={{ maxHeight: "70vh", overflow: "auto" }}>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Card
                                            hoverable
                                            style={{ marginTop: 16 }}
                                            title={
                                                <Space size={8}>
                                                    <AntdIcons.InfoCircleOutlined />
                                                    Thông tin
                                                </Space>
                                            }>
                                            <Row>
                                                <Col>
                                                    <Form.Item name="Name" label="" rules={[{ required: true }]}>

                                                        <Input placeholder="Tên nhà cung cấp *"
                                                            prefix={
                                                                <Tooltip title="Tên nhà cung cấp">
                                                                    <AntdIcons.ShopOutlined />
                                                                </Tooltip>
                                                            }

                                                        />

                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="Code" label="" rules={[{ required: true }]}>
                                                        <Input placeholder="Mã *"
                                                            prefix={
                                                                <Tooltip title="Mã">
                                                                    <AntdIcons.KeyOutlined />
                                                                </Tooltip>
                                                            }

                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="Email" label="" rules={[{ type: 'email' }]}>
                                                        <Input placeholder="Email"
                                                            prefix={
                                                                <Tooltip title="Email">
                                                                    <AntdIcons.RedEnvelopeOutlined />
                                                                </Tooltip>
                                                            }

                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="Phone" label="" rules={[{ required: true }]}>
                                                        <Input placeholder="Điện thoại *"
                                                            prefix={
                                                                <Tooltip title="Điện thoại">
                                                                    <AntdIcons.PhoneOutlined />
                                                                </Tooltip>
                                                            }

                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="Address" label="">
                                                        <Input placeholder="Địa chỉ"
                                                            prefix={
                                                                <Tooltip title="Địa chỉ">
                                                                    <AntdIcons.EnvironmentOutlined />
                                                                </Tooltip>
                                                            }

                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="MaSoThue" label="">
                                                        <Input placeholder="Mã số thuế"
                                                            prefix={
                                                                <Tooltip title="Mã số thuế">
                                                                    <AntdIcons.KeyOutlined />
                                                                </Tooltip>
                                                            }

                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="TenNguoiDaiDien" label="">
                                                        <Input placeholder="Tên người đại diện"
                                                            prefix={
                                                                <Tooltip title="Tên người đại diện">
                                                                    <AntdIcons.UserOutlined />
                                                                </Tooltip>
                                                            }

                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="SDTNguoiDaiDien" label="">
                                                        <Input placeholder="Điện thoại người đại diện"
                                                            prefix={
                                                                <Tooltip title="Điện thoại người đại diện">
                                                                    <AntdIcons.ShakeOutlined />
                                                                </Tooltip>
                                                            }

                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="DiaChiNguoiDaiDien" label="">
                                                        <Input placeholder="Địa chỉ người đại diện"
                                                            prefix={
                                                                <Tooltip title="Địa chỉ người đại diện">
                                                                    <AntdIcons.EnvironmentOutlined />
                                                                </Tooltip>
                                                            }

                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="Status" label="" valuePropName="checked">
                                                        <Checkbox>Đang giao dịch</Checkbox>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Card>

                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Card
                                            hoverable
                                            style={{ marginTop: 16 }}
                                            title={
                                                <Space size={8}>
                                                    <AntdIcons.DollarOutlined />
                                                    Thanh toán
                                                </Space>
                                            }>
                                            <Row>
                                                <Col>
                                                    <Form.Item name="TenNganHang" label="">

                                                        <Input placeholder="Ngân hàng"
                                                            prefix={
                                                                <Tooltip title="Ngân hàng">
                                                                    <AntdIcons.BankOutlined />
                                                                </Tooltip>
                                                            }

                                                        />

                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="ChiNhanhNH" label="" >
                                                        <Input placeholder="Chi nhánh"
                                                            prefix={
                                                                <Tooltip title="Chi nhánh">
                                                                    <AntdIcons.ClusterOutlined />
                                                                </Tooltip>
                                                            }

                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="STKNganHang" label="">
                                                        <Input placeholder="Số tài khoản"
                                                            prefix={
                                                                <Tooltip title="Số tài khoản">
                                                                    <AntdIcons.CreditCardOutlined />
                                                                </Tooltip>
                                                            }

                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="TenChuTKNganHang" label="">
                                                        <Input placeholder="Chủ tài khoản"
                                                            prefix={
                                                                <Tooltip title="Chủ tài khoản">
                                                                    <AntdIcons.IdcardOutlined />
                                                                </Tooltip>
                                                            }

                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="GhiChu" label="">
                                                        <Input.TextArea placeholder="Ghi chú"
                                                            prefix={
                                                                <Tooltip title="Ghi chú">
                                                                    <AntdIcons.MessageOutlined />
                                                                </Tooltip>
                                                            }

                                                        />
                                                    </Form.Item>
                                                </Col>

                                            </Row>
                                        </Card>

                                    </Col>
                                </Row>
                            </Form>
                        </Modal>
                    </  React.Fragment>, document.body
                ) : null
            }
        </>
    )
}
export default ModalCreate;
