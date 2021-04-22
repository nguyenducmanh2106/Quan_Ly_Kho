
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import ImgCrop from 'antd-img-crop';
import * as AntdIcons from '@ant-design/icons';
import { url_upload } from "../../../utils/helpers";
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload, Skeleton, Col, Row, Card, Tooltip, Space, Collapse } from 'antd';
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
            UserGroupID: data.UserGroupID ? data.UserGroupID.join(",") : "",
            PassWord: base64_encode(data.PassWord),
            Avatar: fileList.length > 0 ? fileList[0].name : null,
            File_Base64: fileList.length > 0 ? fileList[0].thumbUrl.split(",").splice(1).join("") : null,
            Status: data.Status ? 1 : 2,
            isRoot: data.isRoot ? true : false,
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
        <Form
            form={form}
            name="nest-messages" onFinish={onSubmit} id="myFormCreate"
            validateMessages={validateMessages}
            initialValues={{
                ["Ordering"]: 0
            }}
        >
            <Row gutter={24}>
                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }}>
                    <Card
                        style={{ marginTop: 16 }}
                        title={
                            <Space size={8}>
                                <AntdIcons.InfoCircleOutlined />
                                                    Thông tin
                                                </Space>
                        }>
                        <Row>
                            <Col>
                                <Form.Item name="Name" label="Tên sản phẩm" rules={[{ required: true }]}>
                                    <Input
                                        prefix={
                                            <Tooltip title="Tên sản phẩm">
                                                <AntdIcons.ShopOutlined />
                                            </Tooltip>
                                        }

                                    />

                                </Form.Item>
                            </Col>
                            <Col>
                                <Row gutter={24}>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="Code" label="Mã sản phẩm" rules={[{ required: true }]}>
                                            <Input
                                                prefix={
                                                    <Tooltip title="Mã">
                                                        <AntdIcons.KeyOutlined />
                                                    </Tooltip>
                                                }

                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="Barcode" label="Mã vạch">
                                            <Input
                                                prefix={
                                                    <Tooltip title="Email">
                                                        <AntdIcons.RedEnvelopeOutlined />
                                                    </Tooltip>
                                                }

                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row gutter={24}>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="KhoiLuong" label="Khối lượng" >
                                            <Input
                                                prefix={
                                                    <Tooltip title="Điện thoại">
                                                        <AntdIcons.PhoneOutlined />
                                                    </Tooltip>
                                                }

                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="DonViTinhId" label="Đơn vị tính">
                                            <Select
                                                showSearch
                                                //style={{ width: 200 }}
                                                placeholder="-- Chọn --"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                filterSort={(optionA, optionB) =>
                                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                }
                                            >
                                                <Option value={0}>Chọn</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Form.Item name="Status" label="" valuePropName="checked">
                                    <Checkbox>Đang giao dịch</Checkbox>
                                </Form.Item>
                            </Col>

                        </Row>
                    </Card>
                    <Card
                        style={{ marginTop: 16 }}
                        title={
                            <Space size={8}>
                                <AntdIcons.DollarOutlined />
                                                    Giá sản phẩm
                                                </Space>
                        }
                    >
                        <Row>
                            <Col>
                                <Row gutter={24}>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="GiaBanLe" label="Giá bán lẻ">
                                            <Input
                                                prefix={
                                                    <Tooltip title="Giá bán lẻ">
                                                        <AntdIcons.KeyOutlined />
                                                    </Tooltip>
                                                }

                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="GiaBanBuon" label="Giá bán buôn">
                                            <Input
                                                prefix={
                                                    <Tooltip title="Giá bán buôn">
                                                        <AntdIcons.UserOutlined />
                                                    </Tooltip>
                                                }

                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row gutter={24}>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="GiaNhap" label="Giá nhập">
                                            <Input
                                                prefix={
                                                    <Tooltip title="Giá nhập">
                                                        <AntdIcons.ShakeOutlined />
                                                    </Tooltip>
                                                }

                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="GiaCu" label="Giá cũ">
                                            <Input
                                                prefix={
                                                    <Tooltip title="Giá cũ">
                                                        <AntdIcons.EnvironmentOutlined />
                                                    </Tooltip>
                                                }

                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                    <Collapse expandIconPosition="right" style={{ marginTop: 16 }}>
                        <Collapse.Panel header="Thuộc tính" key="1">
                            <Form.List name="ThuocTinhs">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'first']}
                                                    fieldKey={[fieldKey, 'first']}
                                                    rules={[{ required: true, message: 'Missing first name' }]}
                                                >
                                                    <Input placeholder="First Name" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'last']}
                                                    fieldKey={[fieldKey, 'last']}
                                                    rules={[{ required: true, message: 'Missing last name' }]}
                                                >
                                                    <Input placeholder="Last Name" />
                                                </Form.Item>
                                                <AntdIcons.MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<AntdIcons.PlusOutlined />}>
                                                Thêm thuộc tính
              </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Collapse.Panel>
                    </Collapse>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
                    <Card
                        style={{ marginTop: 16 }}
                        title={
                            <Space size={8}>
                                <AntdIcons.DollarOutlined />
                                                    Phân loại
                                                </Space>
                        }>
                        <Row>
                            <Col>
                                <Form.Item name="LoaiSP" label="Loại sản phẩm">
                                    <Select
                                        showSearch
                                        //style={{ width: 200 }}
                                        placeholder="-- Chọn --"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        <Option value={0}>Chọn</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item name="ThuongHieuId" label="Thương Hiệu">
                                    <Select
                                        showSearch
                                        //style={{ width: 200 }}
                                        placeholder="-- Chọn --"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        <Option value={0}>Chọn</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item name="XuatXuId" label="Xuất xứ">
                                    <Select
                                        showSearch
                                        //style={{ width: 200 }}
                                        placeholder="-- Chọn --"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        <Option value={0}>Chọn</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                        </Row>
                    </Card>
                    <Card
                        style={{ marginTop: 16 }}
                        title={
                            <Space size={8}>
                                <AntdIcons.DollarOutlined />
                                                    Ảnh sản phẩm
                                                </Space>
                        }
                    >
                        <Row>
                            <Col>
                                <Form.Item name="Avatar" label="">
                                    <ImgCrop rotate>
                                        <Upload
                                            accept="image/*"
                                            action={url_upload}
                                            listType="picture-card"
                                            fileList={fileList}
                                            onChange={onChange}
                                            onPreview={onPreview}
                                        //beforeUpload={beforeUpload}
                                        >
                                            {fileList.length < 1 && '+ Upload'}
                                        </Upload>
                                    </ImgCrop>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Form>
    )
}
export default ModalCreate;
