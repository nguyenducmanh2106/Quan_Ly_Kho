import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload, Space, Row, Col, Card, Tooltip, Tag } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import TagCustom from "../../elements/Tag_Antd/Tag";
const ModalCreate = ({ isShowing, hide, onPostCreateItem, confirmLoading }) => {
    const [form] = Form.useForm();
    const [thuoctinhs, setThuocTinhs] = useState([])
    const [isTag, setIsTag] = useState(false)
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
    const layout = {
        labelCol: {
            sm: { span: 24 },
            md: { span: 8 },
        },
        wrapperCol: {
            sm: { span: 24 },
            md: { span: 16 }
        },
    };

    const onChangeKieuNhap = (value) => {
        if (value != 1) {
            setIsTag(true)
        }
        else {
            setIsTag(false)
        }
    }
    const onSetThuocTinhs = (array) => {
        setThuocTinhs(array)
    }
    const onSubmit = (data) => {
        var lstThuocTinh = thuoctinhs
        var obj = {
            ...data,
            Status: data.Status ? 1 : 2,
            lstStringThuocTinhs: lstThuocTinh
        }
        console.log(obj)
        onPostCreateItem(obj).then(onReset())
    }
    return (
        <>

            {
                isShowing ? ReactDOM.createPortal(

                    <React.Fragment>
                        <Modal title="Tạo mới" visible={isShowing} okText="Lưu" cancelText="Quay lại" width={800}
                           /* onOk={onSubmit}*/ style={{ top: 20 }} onCancel={hide}
                            confirmLoading={confirmLoading}
                            okButtonProps={{ form: 'myFormCreate', key: 'submit', htmlType: 'submit' }}
                        >
                            <Form
                                form={form}
                                name="nest-messages" onFinish={onSubmit} id="myFormCreate"
                                validateMessages={validateMessages}
                                initialValues={{
                                    ["Ordering"]: 0,
                                    ["KieuNhap"]: 1,
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
                                                        <Input placeholder="Tên thuộc tính *"
                                                            prefix={
                                                                <Tooltip title="Tên thuộc tính">
                                                                    <AntdIcons.ShopOutlined />
                                                                </Tooltip>
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="Code" label="" rules={[{ required: true }]}>
                                                        <Input placeholder="Mã thuộc tính*"
                                                            prefix={
                                                                <Tooltip title="Mã thuộc tính">
                                                                    <AntdIcons.KeyOutlined />
                                                                </Tooltip>
                                                            }

                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="Ordering" label="" rules={[{ type: "number", required: true }]}>
                                                        <InputNumber placeholder="Thứ tự"
                                                            prefix={
                                                                <Tooltip title="Thứ tự">
                                                                    <AntdIcons.ShopOutlined />
                                                                </Tooltip>
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="Description" label="">
                                                        <Input.TextArea placeholder="Mô tả" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="isRequired" label="" valuePropName="checked">
                                                        <Checkbox>Bắt buộc</Checkbox>
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name="Status" label="" valuePropName="checked">
                                                        <Checkbox>Hiện</Checkbox>
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
                                                    <AntdIcons.UnorderedListOutlined />
                                                    Thuộc tính
                                                </Space>
                                            }>
                                            <Row>
                                                <Col>
                                                    <Form.Item name="KieuNhap" label="Kiểu nhập" >
                                                        <Select style={{ width: 120 }} onChange={onChangeKieuNhap}>
                                                            <Select.Option value={1}>Text</Select.Option>
                                                            <Select.Option value={2}>Select</Select.Option>
                                                            <Select.Option value={3}>Checkbox</Select.Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    {isTag == true ?
                                                        <Form.Item name="ThuocTinhs" label="Giá trị" >
                                                            <TagCustom onSetThuocTinhs={onSetThuocTinhs} />
                                                        </Form.Item>
                                                        : ""}
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
