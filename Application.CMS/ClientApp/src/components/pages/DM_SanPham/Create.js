
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import ImgCrop from 'antd-img-crop';
import * as AntdIcons from '@ant-design/icons';
import { url_upload } from "../../../utils/helpers";
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload, Skeleton, Col, Row, Card, Tooltip,Space } from 'antd';
const ModalCreate = ({ isShowing, hide, onPostCreateItem, confirmLoading, donvi, chucvu, nhomNguoiDung }) => {
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    const [fileList, setFileList] = useState([]);
    const { Option } = Select;
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const onSubmit = (data) => {
        var obj = {
            ...data,
            UserGroupID: data.UserGroupID ? data.UserGroupID.join(","):"",
            PassWord: base64_encode(data.PassWord),
            Avatar: fileList.length>0?fileList[0].name:null,
            File_Base64: fileList.length > 0 ? fileList[0].thumbUrl.split(",").splice(1).join("") : null,
            Status:data.Status?1: 2,
            isRoot:data.isRoot?true:false,
            isThongKe: data.isThongKe ? true : false,
            PhoneNumber: data.PhoneNumber.toString()
        }
        //console.log(obj)
        onPostCreateItem(obj).then(onReset())
    }
    //const handleChange = (value) => {
    //    console.log(value)
    //}
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
    const closeForm = () => {
        setFileList([]);
        hide()
    }
    //const beforeUpload = (file) => {
    //    const isLt2M = file.size / 1024 / 1024 < 2;
    //    if (!isLt2M) {
    //        file.flag = true;
    //        return false;
    //    }
    //    return true;
    //}
    
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        //console.log(fileList)
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
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
                                <Row gutter={24} style={{ maxHeight: "70vh", overflow: "auto",paddingBottom:"10px" }}>
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
