import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { getAPI, postAPI, postFormData, getCurrentLogin } from './../../../utils/helpers';
import { url_upload } from './../../../utils/constants';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import logoDefault from "../../../static/images/user-profile.jpeg"
import * as AntdIcons from '@ant-design/icons';
import {
    Form, Input, InputNumber, Button, Select
    , Skeleton, Col, Row, Card, Tooltip, Space, notification,
    AutoComplete, Descriptions, Spin, Image, Menu, DatePicker, Checkbox
} from 'antd';
const ModalCreate = () => {
    const [DataDonVi, setDataDonVi] = useState([]);
    const [DataSanPham, setDataSanPham] = useState([]);
    const [DataNCC, setDataNCC] = useState([]);
    const [DataSanPhamSubmit, setDataSanPhamSubmit] = useState([]);
    const [DataLoaiDeNghi, setDataLoaiDeNghi] = useState([]);
    const [DataDonViById, setDataDonViById] = useState({});
    const [DataDonViCapDo, setDataDonViCapDo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisibleInfoNCC, setIsVisibleInfoNCC] = useState(false);
    const [isThanhToanNCC, setIsThanhToanNCC] = useState(false);
    const [nhaCungCapSelected, setNhaCungCapSelected] = useState({});
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
        var NgayHenGiao = data.NgayHenGiao ? new Date(data.NgayHenGiao.toDate()) : null;
        var obj = {
            ...data,
            NgayHenGiao
        }
        console.log(obj)
        //setIsLoading(true)
        //var ChiTietDeNghiDieuDongs = []
        //var sp = document.querySelectorAll("#SanPhams .ant-table-row")
        //for (var i = 0; i < sp.length; i++) {
        //    var obj = {
        //        ID_SanPham: sp[i].querySelector(".ID_SanPham").value,
        //        SoLuongYeuCau: Number.parseInt(sp[i].querySelector(".ant-input-number-input").value)
        //    }
        //    ChiTietDeNghiDieuDongs.push(obj)
        //}
        //var obj = {
        //    ...data,
        //    Status: 1,
        //    Created_By: getCurrentLogin().id,
        //    ID_ChiNhanhGui: getCurrentLogin().donViId,
        //    ChiTietDeNghiDieuDongs: ChiTietDeNghiDieuDongs,
        //    ID_BoPhanGui: getCurrentLogin().chucVuId
        //}
        //console.log(obj)
        //onPostCreateItem(obj)
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
                Name: value
            }
            var fetchData = await postAPI(`api/dm_sanpham/find-by-name`, JSON.stringify(obj));
            if (fetchData.status == true) {
                setDataSanPham(fetchData.result)
            }
        }
        //console.log(value)
    };
    const handleSearchNCC = async (value) => {
        if (value.length > 2) {
            var obj = {
                Name: value
            }
            var fetchData = await postAPI(`api/dm_nhacungcap/find-by-attributes`, JSON.stringify(obj));
            if (fetchData.status == true) {
                setDataNCC(fetchData.result)
            }
        }
        //console.log(value)
    };
    const onHandleSelectNCC = async (value, option) => {
        console.log(value)
        if (value > 0) {
            var fetchData = await getAPI(`api/dm_nhacungcap/find-by-id?id=${value}`);
            if (fetchData.status == true) {
                var data = await fetchData.result
                setNhaCungCapSelected(data)
                setIsVisibleInfoNCC(true)
            }
        }
    }
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
                    SoLuongYeuCau: 1,
                    giaNhap: data.giaNhap
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
    const tinhTongTien = () => {
        var arraySanPham = []
        var sp = document.querySelectorAll("#SanPhams .ant-table-row");
        for (var index = 0; index < sp.length; index++) {
            var soLuong = sp[index].querySelector(".SoLuong").querySelector(".ant-input-number-input").value;
            var giaNhap = sp[index].querySelector(".GiaNhap").querySelector(".ant-input-number-input").value ?? 0;
            var obj = {
                SoLuong: soLuong,
                GiaNhap: giaNhap.replace(/\đ\s?|(,*)/g, ''),
                TongTien: soLuong * giaNhap.replace(/\đ\s?|(,*)/g, '')
            }
            arraySanPham.push(obj)
        }
        console.log(arraySanPham)
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
            var giaNhap = item.giaNhap;
            return (
                <tr key={item.id} className="ant-table-row ant-table-row-level-0">
                    <td>
                        <input type="hidden" className="ID_SanPham" defaultValue={item.code} />
                        {item.name}
                    </td>

                    <td style={{ textAlign: "center" }}>
                        {item.code}
                    </td>
                    <td>
                        {item.tenDonViTinh}
                    </td>
                    <td className="SoLuong" id={item.ID_SanPham}>
                        <InputNumber min={1} max={99} defaultValue={1} onChange={tinhTongTien} />
                    </td>
                    <td className="GiaNhap">
                        <InputNumber
                            defaultValue={giaNhap}
                            style={{ width: "100%" }}
                            formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\đ\s?|(,*)/g, '')}
                            onChange={tinhTongTien}

                        />
                    </td>
                    <td className="TongTien">

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
    const onChangeDatePicker = (date, dateString) => {
        //console.log(date, dateString)

    }

    const renderNCC = () => {
        var item = nhaCungCapSelected;
        return (
            <>
                <Descriptions title={<Space>Thông tin  <AntdIcons.CloseCircleTwoTone onClick={() => setIsVisibleInfoNCC(false)} /> </Space>} >
                    <Descriptions.Item label="Tên nhà cung cấp">{item.name}</Descriptions.Item>
                </Descriptions>
                <Descriptions>
                    <Descriptions.Item label="Số điện thoại">{item.phone}</Descriptions.Item>
                </Descriptions>
                <Descriptions>
                    <Descriptions.Item label="Địa chỉ">{item.address}</Descriptions.Item>
                </Descriptions>
            </>)
    }
    const onChange = (e) => {
        //console.log(e.target.checked)
        setIsThanhToanNCC(e.target.checked)
    }
    return (
        <Spin spinning={isLoading}>
            <Form
                form={form}
                layout="horizontal"
                name="nest-messages" onFinish={onSubmit} id="myFormCreate"
                validateMessages={validateMessages}
                initialValues={{
                    "SoTienThanhToan": 0,
                    "HinhThucThanhToan": 1
                }}
            >
                <Row gutter={16}>
                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 17 }}>
                        <Card
                            style={{ marginTop: 16 }}
                            title={
                                <Space size={8}>
                                    <AntdIcons.InfoCircleOutlined />
                                                    Thông tin nhà cung cấp
                                                </Space>
                            }>
                            <Row>
                                <Col style={{ display: isVisibleInfoNCC ? "none" : "inherit" }}>
                                    <Form.Item name="ID_NhaCungCap" label="" rules={[{ required: true }]}>
                                        <AutoComplete
                                            style={{
                                                width: '100%',
                                            }}
                                            onFocus={() => setDataNCC([])}
                                            onSelect={onHandleSelectNCC}
                                            onSearch={handleSearchNCC}
                                            placeholder="Tìm kiếm nhà cung cấp theo SĐT, tên, mã nhà cung cấp"
                                            notFoundContent="Không tìm thấy nhà cung cấp nào"
                                        >
                                            {/*<Option key={0} value={0}>*/}
                                            {/*    <Row>*/}
                                            {/*        <Col lg={{ span: 5 }} md={{ span: 5 }} xs={{ span: 5 }}>*/}
                                            {/*            <AntdIcons.PlusCircleOutlined />*/}
                                            {/*        </Col>*/}
                                            {/*        <Col lg={{ span: 19 }} md={{ span: 19 }} xs={{ span: 19 }}>*/}
                                            {/*            Thêm mới nhà cung cấp*/}
                                            {/*        </Col>*/}
                                            {/*    </Row>*/}
                                            {/*</Option>*/}
                                            {DataNCC.map((item) => (
                                                <Option key={item.id} value={item.id}>
                                                    <Row>
                                                        <Col lg={{ span: 5 }} md={{ span: 5 }} xs={{ span: 5 }}>
                                                            {item.name}
                                                        </Col>
                                                        <Col lg={{ span: 19 }} md={{ span: 19 }} xs={{ span: 19 }}>
                                                            {item.phone}
                                                        </Col>
                                                    </Row>
                                                </Option>
                                            ))}
                                        </AutoComplete>
                                    </Form.Item>

                                </Col>
                                <Col style={{ display: isVisibleInfoNCC ? "inherit" : "none" }}>
                                    {renderNCC()}
                                </Col>
                            </Row>
                        </Card>
                        <Row gutter={16}>
                            <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                <Card
                                    style={{ marginTop: 16 }}
                                    title={
                                        <Space size={8}>
                                            <AntdIcons.InfoCircleOutlined />
                                                    Thông tin sản phẩm
                                                </Space>
                                    }>
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
                                                                        ĐVT
                                        </th>
                                                                    <th className="">
                                                                        Số lượng
                                        </th>
                                                                    <th className="" style={{ width: "25%" }}>
                                                                        Giá nhập
                                        </th>
                                                                    <th className="" style={{ width: "20%" }}>
                                                                        Thành tiền
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
                        <Card
                            style={{ marginTop: 16 }}
                            title={
                                <Space size={8}>
                                    <AntdIcons.CreditCardOutlined />
                                                   Thanh toán
                                                </Space>
                            }
                            extra={<Checkbox va onChange={onChange} valuePropName="checked">Thanh toán với nhà cung cấp</Checkbox>}
                        >
                            <Row gutter={24} style={{ display: isThanhToanNCC ? "block" : "none" }}>
                                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                    <Form.Item name="HinhThucThanhToan" label="Hình thức thanh toán" rules={[{ required: true }]}>
                                        <Select>
                                            <Option value={1}>Tiền mặt</Option>
                                            <Option value={2}>Chuyển khoản</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                    <Form.Item name="SoTienThanhToan" label="Số tiền thanh toán">
                                        <InputNumber
                                            style={{ width: "100%" }}
                                            formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\đ\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 7 }}>
                        <Card
                            style={{ marginTop: 16 }}
                            title={
                                <Space size={8}>
                                    <AntdIcons.DollarOutlined />
                                                   Thông tin đơn nhập hàng
                                                </Space>
                            }
                        >
                            <Row>
                                <Col>
                                    <Row gutter={24}>
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                            <Form.Item name="ID_ChiNhanhNhan" label="Chi nhánh" rules={[{ required: true }]}>
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
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                            <Form.Item name="NgayHenGiao" label="Ngày hẹn giao" style={{ width: '100%' }}>
                                                <DatePicker placeholder="Ngày hẹn giao"
                                                    style={{ width: '100%' }}
                                                    format={"DD/MM/YYYY"}
                                                    getPopupContainer={trigger => trigger.parentElement}
                                                    onChange={onChangeDatePicker}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                            <Form.Item name="Description" label="Ghi chú">
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
