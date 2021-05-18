import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { getAPI, postAPI, postFormData, getCurrentLogin } from './../../../utils/helpers';
import { url_upload } from './../../../utils/constants';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import logoDefault from "../../../static/images/user-profile.jpeg"
import * as AntdIcons from '@ant-design/icons';
import {
    Form, Input, InputNumber, Button, Select
    , Skeleton, Col, Row, Card, Tooltip, Space, notification, AutoComplete, Descriptions, Spin, Image, Menu
} from 'antd';
const ModalCreate = () => {
    const [DataDonVi, setDataDonVi] = useState([]);
    const [DataSanPham, setDataSanPham] = useState([]);
    const [DataSanPhamSubmit, setDataSanPhamSubmit] = useState([]);
    const [DataLoaiDeNghi, setDataLoaiDeNghi] = useState([]);
    const [DataDonViById, setDataDonViById] = useState({});
    const [DataDonViCapDo, setDataDonViCapDo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
        async function getDonViByCapDo() {
            var fetchData = await getAPI(`api/dm_donvi/get-donvi-by-level?level=1`);
            if (fetchData.status == true) {
                setDataDonViCapDo(fetchData.result)
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
        getDonViByCapDo()
    }, [])
    const onSubmit = (data) => {
        setIsLoading(true)
        var ChiTietDeNghiDieuDongs = []
        var sp = document.querySelectorAll("#SanPhams .ant-table-row")
        for (var i = 0; i < sp.length; i++) {
            var obj = {
                ID_SanPham: sp[i].querySelector(".ID_SanPham").value,
                SoLuongYeuCau: Number.parseInt(sp[i].querySelector(".ant-input-number-input").value)
            }
            ChiTietDeNghiDieuDongs.push(obj)
        }
        var obj = {
            ...data,
            Status: 1,
            Created_By: getCurrentLogin().id,
            ID_ChiNhanhGui: getCurrentLogin().donViId,
            ChiTietDeNghiDieuDongs: ChiTietDeNghiDieuDongs,
            ID_BoPhanGui: getCurrentLogin().chucVuId
        }
        console.log(obj)
        onPostCreateItem(obj)
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
        var result = await postAPI('api/dm_denghidieudong/create', JSON.stringify(obj))
        if (result.status) {
            //setAction(true)
            setIsLoading(!result.status)
            notification.success({
                message: result.message,
                duration: 3

            })

        }
        else {
            setIsLoading(result.status)
            notification.error({
                message: result.message,
                duration: 3

            })
        }
    }
    const handleSearch = async (value) => {
        if (value.length > 2) {
            var obj = {
                Name: value,
                Id_Kho: getCurrentLogin().donViId
            }
            var fetchData = await postAPI(`api/dm_sanpham/find-by-name`, JSON.stringify(obj));
            if (fetchData.status == true) {
                setDataSanPham(fetchData.result)
            }
        }
        //console.log(value)
    };

    const onHandleSelect = async (value, option) => {
        if (value > 0) {
            var fetchData = await getAPI(`api/dm_sanpham/find-by-id?Code=${value}`);
            if (fetchData.status == true) {
                var data = await fetchData.result
                var obj = {
                    ID_SanPham: data.code,
                    name: data.name,
                    code: data.code,
                    barCode: data.barCode,
                    tenDonViTinh: data.tenDonViTinh,
                    SoLuongYeuCau: 1
                }
                var isExist = false
                if (DataSanPhamSubmit.length > 0) {
                    DataSanPhamSubmit.map(item => {
                        if (item.ID_SanPham === obj.ID_SanPham) {
                            item.SoLuongYeuCau += 1
                            isExist = true;
                            return;
                        }
                    })
                    if (isExist) {
                        setDataSanPhamSubmit(
                            [
                                ...DataSanPhamSubmit
                            ]
                        )
                    }
                    else {
                        setDataSanPhamSubmit(
                            [
                                ...DataSanPhamSubmit,
                                obj
                            ]
                        )
                    }
                }
                else {
                    setDataSanPhamSubmit(
                        [
                            ...DataSanPhamSubmit,
                            obj
                        ]
                    )
                }
                console.log(DataSanPhamSubmit)
            }
        }
    }
    const onHandleDelete = (value) => {
        var result = DataSanPhamSubmit.filter(item => {
            return item.ID_SanPham !== value.ID_SanPham
        })
        setDataSanPhamSubmit(result)
    }
    const renderBody = () => {
        var result = ""
        result = DataSanPhamSubmit.map((item, index) => {
            return (
                <tr key={item.id} className="ant-table-row ant-table-row-level-0">
                    <td>
                        {item.name}
                    </td>

                    <td style={{ textAlign: "center" }}>
                        {item.code}
                    </td>
                    <td>
                        {item.barcode}
                    </td>
                    <td>
                        {item.tenDonViTinh}
                    </td>
                    <td>
                        <input type="hidden" className="ID_SanPham" defaultValue={item.ID_SanPham} />
                        <InputNumber min={1} max={99} defaultValue={item.SoLuongYeuCau} />
                    </td>
                    <td>
                        <Tooltip title="Xoá">
                            <Button style={{ margin: "0 !important" }} type="primary" shape="circle" className="danger" icon={<AntdIcons.DeleteOutlined />} onClick={() => onHandleDelete(item)} />
                        </Tooltip>
                    </td>
                </tr>


            );
        })
        return (result)
    }
    return (
        <Spin spinning={isLoading}>
            <Form
                form={form}
                layout="horizontal"
                name="nest-messages" onFinish={onSubmit} id="myFormCreate"
                validateMessages={validateMessages}
                initialValues={{
                    "LoaiDeNghi_Id": 0,
                    "ID_ChiNhanhNhan": 0,
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
                                    </Form.Item>
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
                                                            <Option key={item.id} value={item.id}>
                                                                {item.name}
                                                            </Option>
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
                                        onFocus={() => setDataSanPham([])}
                                        onSelect={onHandleSelect}
                                        onSearch={handleSearch}
                                        placeholder="Sản phẩm"
                                        notFoundContent="Không tìm thấy sản phẩm"
                                    >
                                        {DataSanPham.map((item) => (
                                            <Option key={item.code} value={item.code}>
                                                <Row>
                                                    <Col lg={{ span: 5 }} md={{ span: 5 }} xs={{ span: 5 }}>
                                                        <Image
                                                            width={50}
                                                            preview={false}
                                                            src={"data:image/png;base64," + item.pathAvatar}
                                                            fallback={logoDefault}
                                                        />
                                                    </Col>
                                                    <Col lg={{ span: 19 }} md={{ span: 19 }} xs={{ span: 19 }}>
                                                        <Row>
                                                            <Col>{item.name}</Col>
                                                            <Col>({item.code})</Col>
                                                            <Col>(Số lượng có thể xuất: {item.soLuongCoTheXuat})</Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Option>
                                        ))}
                                    </AutoComplete>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} style={{ marginTop: "16px" }}>
                                    <div className="ant-table ant-table-bordered ant-table-ping-right ant-table-fixed-column ant-table-scroll-horizontal ant-table-has-fix-left ant-table-has-fix-right">
                                        <div className="ant-table-container">
                                            <div className="ant-table-content">
                                                <table /*className="ant-table"*/ id="SanPhams" style={{ tableLayout: "auto" }}>
                                                    <thead className="ant-table-thead">
                                                        <tr>
                                                            <th className="sapxep" id="Name">
                                                                Tên
                                                        </th>

                                                            <th className="sapxep" id="Code">
                                                                Mã SP
                                                        </th>
                                                            <th className="" id="Barcode">
                                                                Mã vạch
                                        </th>
                                                            <th className="">
                                                                ĐVT
                                        </th>
                                                            <th className="">
                                                                Số lượng cần
                                        </th>
                                                            <th className="">
                                                                Thao tác
                                        </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="ant-table-tbody">
                                                        {renderBody()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" icon={<AntdIcons.SaveOutlined />}>
                                Lưu
                                    </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form >
        </Spin>
    )
}
export default ModalCreate;
