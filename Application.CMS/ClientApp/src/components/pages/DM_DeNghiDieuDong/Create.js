import React, { useEffect, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { getAPI, postAPI, postFormData, getCurrentLogin } from './../../../utils/helpers';
import { url_upload } from './../../../utils/constants';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import * as AntdIcons from '@ant-design/icons';
import {
    Form, Input, InputNumber, Button, Select
    , Skeleton, Col, Row, Card, Tooltip, Space, notification, AutoComplete, Descriptions
} from 'antd';
const ModalCreate = ({ isShowing, hide, onPostCreateItem, confirmLoading, donvi, chucvu, nhomNguoiDung }) => {
    const [DataDonVi, setDataDonVi] = useState([]);
    const [DataSanPham, setDataSanPham] = useState([]);
    const [DataLoaiDeNghi, setDataLoaiDeNghi] = useState([]);
    const [DataDonViById, setDataDonViById] = useState({});
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    const { Option } = Select;
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        labelCol: {
            xs: { span: 24 },
            md: { span: 24 },
            lg: { span: 8 }
        },
        wrapperCol: {
            xs: { span: 24 },
            md: { span: 24 },
            lg: { span: 16 }
        },
    };
    useEffect(() => {
        async function getDonVi() {
            var fetchData = await getAPI(`api/dm_donvi/get-all-data-active`);
            if (fetchData.status == true) {
                setDataDonVi(fetchData.result)
            }
        }
        async function getDonViById() {
            var Id = getCurrentLogin().donViId
            var fetchData = await getAPI(`api/dm_donvi/find-by-id?Id=${Id}`);
            if (fetchData.status == true) {
                setDataDonViById(fetchData.result)
            }
        }
        async function getLoaiDeNghi() {
            var fetchData = await getAPI(`api/dm_loaidenghi/get-all-data-active`);
            if (fetchData.status == true) {
                setDataLoaiDeNghi(fetchData.result)
            }
        }

        //gọi hàm
        getDonVi()
        getLoaiDeNghi()
        getDonViById()
    }, [])
    const onSubmit = (data) => {
        var obj = {
            ...data,
            Status: data.Status ? 1 : 2,
            Created_By: getCurrentLogin().id
        }
        //console.log(obj)
        onPostCreateItem(obj).then()
    }
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
    async function onPostCreateItem(obj) {
        console.log(obj)
        //setConfirmLoading(true)
        var result = await postAPI('api/dm_sanpham/create', JSON.stringify(obj))
        if (result.status) {
            //setAction(true)
            notification.success({
                message: result.message,
                duration: 3

            })

        }
        else {
            notification.error({
                message: result.message,
                duration: 3

            })
        }
    }
    const renderItem = (title, count) => ({
        value: title,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {title}
                <span>
                    {count}
                </span>
            </div>
        ),
    });
    const handleSearch = async (value) => {
        var fetchData = await getAPI(`api/dm_sanpham/find-by-name?Name=${value}`);
        if (fetchData.status == true) {
            setDataSanPham(fetchData.result)
        }
        console.log(value)
    };
    return (
        <Form
            form={form}
            layout="horizontal"
            name="nest-messages" onFinish={onSubmit} id="myFormCreate"
            validateMessages={validateMessages}
            initialValues={{
                "LoaiDeNghi_Id": 0,
                "ID_ChiNhanhNhan": 0
            }}
        >
            <Row gutter={24}>
                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                    <Card
                        style={{ marginTop: 16 }}
                        title={
                            <Space size={8}>
                                <AntdIcons.InfoCircleOutlined />
                                                    Kho hàng
                                                </Space>
                        }>
                        <Row>
                            <Col>
                                <Descriptions title="" layout="horizontal">
                                    <Descriptions.Item label="Từ kho">{DataDonViById.name ?? ""}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col>
                                {getCurrentLogin().capDoDonVi == 1 ?
                                    <Form.Item name="ID_ChiNhanhNhan" label="Đến kho" rules={[{ required: true }]}>
                                        < Select
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
                                            <Option value={0}>-- Chọn --</Option>
                                            {DataDonVi.map(item => {
                                                return (
                                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item> :
                                    <Descriptions title="" layout="horizontal">
                                        <Descriptions.Item label="Đến kho">Zhou Maomao</Descriptions.Item>
                                    </Descriptions>
                                }
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                    <Card
                        style={{ marginTop: 16 }}
                        title={
                            <Space size={8}>
                                <AntdIcons.DollarOutlined />
                                                   Thông tin
                                                </Space>
                        }
                    >
                        <Row>
                            <Col>
                                <Row gutter={24}>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                        <Form.Item name="LoaiDeNghi_Id" label="Loại đề nghị" {...tailLayout}>
                                            < Select
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
                                                <Option value={0}>-- Chọn --</Option>
                                                {DataLoaiDeNghi.map(item => {
                                                    return (
                                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                                    )
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                        <Form.Item name="Description" label="Ghi chú" {...tailLayout}>
                                            <Input.TextArea
                                                allowClear
                                                showCount
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: "16px" }}>
                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                    <Card>
                        <Row>
                            <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                <AutoComplete
                                    style={{
                                        width: '100%',
                                    }}
                                    onSearch={handleSearch}
                                    backfill={true}
                                    placeholder="Sản phẩm"
                                    notFoundContent="Không tìm thấy sản phẩm"
                                >
                                    {DataSanPham.map((item) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </AutoComplete>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Form >
    )
}
export default ModalCreate;
