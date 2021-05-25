import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom'
import { getAPI, postAPI, postFormData, getCurrentLogin, FormatMoney } from './../../../utils/helpers';
import { url_upload } from './../../../utils/constants';
import moment from 'moment'
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import logoDefault from "../../../static/images/user-profile.jpeg"
import * as AntdIcons from '@ant-design/icons';
import useModal from './../../elements/modal/useModal';
import FormView from './../DM_SanPham/View';
import {
    Form, Input, InputNumber, Button, Select
    , Skeleton, Col, Row, Card, Tooltip, Space, notification,
    AutoComplete, Descriptions, Spin, Image, Menu, DatePicker, Checkbox, Empty, Popover, Typography, Divider
} from 'antd';

const ModalCreate = () => {
    let history = useHistory()
    const [users, setUsers] = useState([]);
    const [DataDonVi, setDataDonVi] = useState([]);
    const [DataDonViCurrent, setDataDonViCurrent] = useState(-1);
    const [DataSanPham, setDataSanPham] = useState([]);
    const [DataSanPhamSubmit, setDataSanPhamSubmit] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [tomTatSP, setTomTatSP] = useState({ TongSl: 0, TongGiaTien: 0 });
    const [isShowingView, toggleView] = useModal();
    const [ItemShow, setItemShow] = useState({})
    const [isVisible, setIsVisible] = useState(false)
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    const handleVisibleChange = visible => {
        setIsVisible(visible);
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
    let donviId = getCurrentLogin().donViId ?? 0;
    useEffect(() => {
        setDataDonViCurrent(getCurrentLogin().donViId ?? 0)
        async function getDonVi() {
            var fetchData = await getAPI(`api/dm_donvi/get-all-data-active`);
            if (fetchData.status == true) {
                setDataDonVi(fetchData.result)
            }
        }
        async function getUserByDonVi() {
            var fetchData = await getAPI(`api/user/get-user-by-donvi?Id_DonVi=${donviId}`);
            if (fetchData.status == true) {
                setUsers(fetchData.result)
            }
        }
        //gọi hàm
        getDonVi();
        getUserByDonVi();
    }, [])
    const onSubmit = (data) => {
        var ChiTietKiemKes = []
        var sp = document.querySelectorAll("#SanPhams .ant-table-row")
        for (var i = 0; i < sp.length; i++) {
            var obj = {
                ID_SanPham: sp[i].querySelector(".ID_SanPham").value,
                TonChiNhanh: Number.parseInt(sp[i].querySelector(".SoLuong").innerText),
            }
            ChiTietKiemKes.push(obj)
        }
        var obj = {
            ...data,
            Status: 0,
            NhapKho: 1,
            Created_By: getCurrentLogin().id,
            ChiTietKiemKes
        }
        console.log(obj)
        onPostCreateItem(obj)
    }
    const onHandleShowItem = (item) => {
        console.log(item)
        setItemShow(item)
        toggleView()
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
        setIsLoading(true)
        var result = await postAPI('api/dm_kiemke/create', JSON.stringify(obj))
        if (result.status) {
            setIsLoading(!result.status)
            notification.success({
                message: result.message,
                duration: 3

            })
            setTimeout(() => {
                history.push({
                    pathname: `/dm_kiemke/view/${result.result}`,
                    state: { controller: "Phiếu kiểm hàng", action: result.result }
                });
            }, 1500)

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
        // if (value.length > 2) {
        //     var obj = {
        //         Name: value,
        //         Id_Kho: DataDonViCurrent > 0 ? DataDonViCurrent : getCurrentLogin().donViId
        //     }
        //     var fetchData = await postAPI(`api/dm_sanpham/find-by-name-by-kho`, JSON.stringify(obj));
        //     if (fetchData.status == true) {
        //         var data = fetchData.result
        //         setDataSanPham(data)
        //     }
        // }
        if (value.length > 2) {
            var obj = {
                Name: value,
                Id_Kho: getCurrentLogin().donViId
            }
            var fetchData = await postAPI(`api/dm_sanpham/find-by-name`, JSON.stringify(obj));
            if (fetchData.status == true) {
                var data = fetchData.result
                setDataSanPham(data)
            }
        }
        //console.log(value)
    };
    console.log(DataDonViCurrent)
    const onHandleSelect = async (value, option) => {
        if (value > 0) {
            console.log(DataDonViCurrent)
            console.log(getCurrentLogin().donViId)
            var Id_Kho = DataDonViCurrent > 0 ? DataDonViCurrent : getCurrentLogin().donViId
            var fetchData = await getAPI(`api/dm_sanpham/find-by-id?Code=${value}&Id_Kho=${Id_Kho}`);
            if (fetchData.status == true) {
                var data = await fetchData.result
                var obj = {
                    ID_SanPham: data.code,
                    name: data.name,
                    code: data.code,
                    barCode: data.barCode,
                    tenDonViTinh: data.tenDonViTinh,
                    soLuongTrongKho: data.soLuongTrongKho,
                    giaBanLe: data.giaBanLe,
                    khoiLuong: data.khoiLuong,
                    giaCu: data.giaCu,
                    giaNhap: data.giaNhap,
                    giaBanBuon: data.giaBanBuon,
                    created_At: data.created_At,
                    tenLoaiSanPham: data.tenLoaiSanPham,
                    tenThuongHieu: data.tenThuongHieu,
                    xuatXu: data.xuatXu,
                    thuocTinhs: data.thuocTinhs,
                    pathAvatar: data.pathAvatar,
                    avatar: data.avatar
                }
                var isExist = false
                if (DataSanPhamSubmit.length > 0) {
                    DataSanPhamSubmit.map(item => {
                        if (item.ID_SanPham === obj.ID_SanPham) {
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
            }
        }

    }
    const onHandleDelete = (value) => {
        var result = DataSanPhamSubmit.filter(item => {
            return item.ID_SanPham !== value.ID_SanPham
        })

        setDataSanPhamSubmit(result)
    }
    const renderBody = useCallback(
        () => {
            var result = ""
            var TongSl = 0;
            result = DataSanPhamSubmit.map((item, index) => {
                TongSl += 1;
                return (
                    <tr key={item.id} className="ant-table-row ant-table-row-level-0">
                        <td>
                            <input type="hidden" className="ID_SanPham" defaultValue={item.code} />
                            {item.name}
                        </td>

                        <td style={{ textAlign: "center" }}>
                            <Typography.Link href="javascript:void(0)" onClick={() => onHandleShowItem(item)}>
                                {item.code}
                            </Typography.Link>
                        </td>
                        <td>
                            {item.tenDonViTinh}
                        </td>
                        <td className="SoLuong" id={item.ID_SanPham}>
                            {item.soLuongTrongKho}
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

        },
        [DataSanPhamSubmit]
    )
    const onHandleChangeIdChiNhanh = async (value) => {
        setDataDonViCurrent(value)
        var fetchData = await getAPI(`api/user/get-user-by-donvi?Id_DonVi=${value}`);
        if (fetchData.status == true) {
            setUsers(fetchData.result)
        }
    }
    const onChangeDatePicker = (date, dateString) => {
        //console.log(date, dateString)

    }
    return (
        <Spin spinning={isLoading}>
            <FormView
                isShowing={isShowingView}
                hide={toggleView}
                item={ItemShow}
            /*confirmLoading={confirmLoading}*/
            />
            <Form
                form={form}
                layout="horizontal"
                name="nest-messages" onFinish={onSubmit} id="myFormCreate"
                validateMessages={validateMessages}
                initialValues={{
                    "ID_ChiNhanh": getCurrentLogin().donViId,
                    "NhanVienKiem": getCurrentLogin().id
                }}
            >
                <Row gutter={16}>
                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                        <Card
                            style={{ marginTop: 16 }}
                            title={
                                <Space size={8}>
                                    <AntdIcons.InfoCircleOutlined />
                                                    Thông tin phiếu kiểm hàng
                                                </Space>
                            }>
                            <Row gutter={10}>
                                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
                                    <Form.Item name="ID_ChiNhanh" label="Chi nhánh kiểm" rules={[{ required: true }]}>
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
                                            onChange={onHandleChangeIdChiNhanh}
                                        >
                                            {DataDonVi.map(item => (
                                                <Option key={item.id} value={item.id}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
                                    <Form.Item name="NhanVienKiem" label="Nhân viên kiểm" rules={[{ required: true }]}>
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
                                            {users.map(item => (
                                                <Option key={item.id} value={item.id}>{item.fullName}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
                                    <Form.Item name="GhiChu" label="Ghi chú">
                                        <Input.TextArea />
                                    </Form.Item>
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
                                                    Danh sách sản phẩm
                                                </Space>
                                    }>
                                    <Row className="ThongTinSP">
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
                                                                    <Col>(Tồn kho: {item.soLuongTrongKho})</Col>
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
                                                                        Tồn chi nhánh
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
                    </Col>
                </Row>
                <Divider />
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
