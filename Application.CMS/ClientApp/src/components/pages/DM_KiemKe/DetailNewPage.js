import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import { getAPI, postAPI, postFormData, getCurrentLogin, FormatMoney, getLocalStorage } from './../../../utils/helpers';
import { url_upload } from './../../../utils/constants';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import logoDefault from "../../../static/images/user-profile.jpeg"
import * as AntdIcons from '@ant-design/icons';
import {
    Form, Input, InputNumber, Button, Select
    , Skeleton, Col, Row, Card, Tooltip, Space, notification,
    AutoComplete, Descriptions, Spin, Image, Menu, DatePicker, Checkbox, Empty, Popover, Typography, Timeline, Steps, Divider, Dropdown
} from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import { PERMISS_USER_CURRENT } from "../../../utils/constants"
import * as PERMISSION from "../../../utils/constantPermission"
import { defineAbilitiesFor, _isPermission } from "../../elements/Config_Roles/appAbility"
const ModalCreate = () => {
    let history = useHistory()
    const [DataSanPham, setDataSanPham] = useState([]);
    const [nhapHang, setNhapHang] = useState([]);
    const [TongSl, setTongSl] = useState(0);
    const [isRefresh, setIsRefresh] = useState(false)
    let { id } = useParams();
    useEffect(() => {
        async function getData() {
            var fetchData = await getAPI(`api/dm_kiemke/find-by-id?Code=${id}`);
            if (fetchData.status == true) {
                setNhapHang(fetchData.result)
                setDataSanPham(fetchData.result.chiTietKiemKes)
            }
        }

        //gọi hàm
        getData()
        defineAbilitiesFor(getLocalStorage(PERMISS_USER_CURRENT))
    }, [isRefresh])
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
        var result = await postAPI('api/dm_kiemke/create', JSON.stringify(obj))
        if (result.status) {
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
    const openDetailSanPham = (item) => {
        history.push({
            pathname: `/dm_sanpham/view/${item.code}`,
            state: { controller: "Danh mục sản phẩm", action: item.code }
        });
    }
    const DangKiemHang = async (item) => {
        setIsRefresh(true)
        var obj = {
            Code: item.code
        }
        var result = await postAPI('api/dm_kiemke/dangkiemhang', JSON.stringify(obj))
        if (result.status) {
            setIsRefresh(!result.status)

        }
        else {
            notification.error({
                message: result.message,
                duration: 3

            })
            setIsRefresh(result.status)
        }
        //console.log(obj)
    }
    const KiemHang = async (item) => {
        setIsRefresh(true)
        var ChiTietKiemKes = []
        var sp = document.querySelectorAll("#SanPhams .ant-table-row")
        for (var i = 0; i < sp.length; i++) {
            var object = {
                Id: Number.parseInt(sp[i].querySelector(".ID_SanPham").value),
                TonThucTe: sp[i].querySelector(".SoLuong").querySelector(".ant-input-number-input").value ? Number.parseInt(sp[i].querySelector(".SoLuong").querySelector(".ant-input-number-input").value) : 0,
                GhiChu: sp[i].querySelector(".GhiChu").querySelector("textarea").value
            }
            ChiTietKiemKes.push(object)
        }
        var obj = {
            Code: nhapHang.code,
            ChiTietKiemKes
        }
        var result = await postAPI('api/dm_kiemke/kiemhang', JSON.stringify(obj))
        if (result.status) {
            notification.success({
                message: result.message,
                duration: 3
            })
            setIsRefresh(!result.status)

        }
        else {
            notification.error({
                message: result.message,
                duration: 3

            })
            setIsRefresh(result.status)
        }

    }
    const CanBangKho = async (item) => {
        setIsRefresh(true)
        var obj = {
            Code: item.code
        }
        var result = await postAPI('api/dm_kiemke/canbang', JSON.stringify(obj))
        if (result.status) {
            notification.success({
                message: result.message,
                duration: 3
            })

            setIsRefresh(!result.status)

        }
        else {
            notification.error({
                message: result.message,
                duration: 3
            })
            setIsRefresh(result.status)
        }
    }
    const HoanThanh = async (item) => {
        setIsRefresh(true)
        var ChiTietKho = []
        var sp = document.querySelectorAll("#SanPhams .ant-table-row")
        for (var i = 0; i < sp.length; i++) {
            var obj = {
                Id_Kho: item.id_ChiNhanh,
                Id_SanPham: sp[i].querySelector(".ID_SanPham").value,
                SoLuong: Number.parseInt(sp[i].querySelector(".SoLuong").innerText),
            }
            ChiTietKho.push(obj)
        }

        var obj = {
            Code: item.code,
            ChiTietKho: ChiTietKho
        }
        console.log(obj)
        var result = await postAPI('api/dm_kiemke/hoanthanh', JSON.stringify(obj))
        if (result.status) {
            notification.success({
                message: result.message,
                duration: 3
            })

            setIsRefresh(!result.status)

        }
        else {
            notification.error({
                message: result.message,
                duration: 3
            })
            setIsRefresh(result.status)
        }
    }
    const renderBody = () => {
        let kiemhangStatus = nhapHang.status ?? 0
        var result = ""
        var TongSl = 0;
        if (kiemhangStatus == 4) {
            result = DataSanPham.map((item, index) => {
                TongSl += 1;
                return (
                    <tr key={item.id} className="ant-table-row ant-table-row-level-0">
                        <td>
                            {index + 1}
                        </td>
                        <td>
                            <input type="hidden" className="ID_SanPham" defaultValue={item.id} />
                            {item.tenSanPham}
                        </td>

                        <td style={{ textAlign: "center" }}>
                            <Typography.Link href="javascript:void(0)" onClick={() => openDetailSanPham(item)}>
                                {item.code}
                            </Typography.Link>
                        </td>
                        <td>
                            {item.tenDonViTinh}
                        </td>
                        <td id={item.ID_SanPham}>
                            {item.tonChiNhanh}
                        </td>
                        <td className="SoLuong">
                            <InputNumber min={1} max={99} required />
                        </td>
                        <td className="GhiChu">
                            <Input.TextArea />
                        </td>
                    </tr>


                );
            })
        }
        if (kiemhangStatus == 1) {
            result = DataSanPham.map((item, index) => {
                TongSl += 1;
                return (
                    <tr key={item.id} className="ant-table-row ant-table-row-level-0">
                        <td>
                            {index + 1}
                        </td>
                        <td>
                            <input type="hidden" className="ID_SanPham" defaultValue={item.id} />
                            {item.tenSanPham}
                        </td>

                        <td style={{ textAlign: "center" }}>
                            <Typography.Link href="javascript:void(0)" onClick={() => openDetailSanPham(item)}>
                                {item.code}
                            </Typography.Link>
                        </td>
                        <td>
                            {item.tenDonViTinh}
                        </td>
                        <td id={item.ID_SanPham}>
                            {item.tonChiNhanh}
                        </td>
                        <td className="SoLuong">
                            {item.tonThucTe}
                        </td>
                        <td className="GhiChu">
                            {item.ghiChu}
                        </td>
                    </tr>


                );
            })
        }
        if (kiemhangStatus == 0) {
            result = DataSanPham.map((item, index) => {
                TongSl += 1;
                return (
                    <tr key={item.id} className="ant-table-row ant-table-row-level-0">
                        <td>
                            {index + 1}
                        </td>
                        <td>
                            <input type="hidden" className="ID_SanPham" defaultValue={item.code} />
                            {item.tenSanPham}
                        </td>

                        <td style={{ textAlign: "center" }}>
                            <Typography.Link href="javascript:void(0)" onClick={() => openDetailSanPham(item)}>
                                {item.code}
                            </Typography.Link>
                        </td>
                        <td>
                            {item.tenDonViTinh}
                        </td>
                        <td className="SoLuong" id={item.ID_SanPham}>
                            {item.tonChiNhanh}
                        </td>
                    </tr>


                );
            })
        }
        if (kiemhangStatus == 2 || kiemhangStatus == 3) {
            result = DataSanPham.map((item, index) => {
                TongSl += 1;
                return (
                    <tr key={item.id} className="ant-table-row ant-table-row-level-0">
                        <td>
                            {index + 1}
                        </td>
                        <td>
                            <input type="hidden" className="ID_SanPham" defaultValue={item.code} />
                            {item.tenSanPham}
                        </td>

                        <td style={{ textAlign: "center" }}>
                            <Typography.Link href="javascript:void(0)" onClick={() => openDetailSanPham(item)}>
                                {item.code}
                            </Typography.Link>
                        </td>
                        <td>
                            {item.tenDonViTinh}
                        </td>
                        <td >
                            {item.tonChiNhanh}
                        </td>
                        <td className="SoLuong">
                            {item.tonThucTe}
                        </td>
                        <td>
                            {item.tonChiNhanh - item.tonThucTe}
                        </td>
                        <td>
                            {item.ghiChu}
                        </td>
                    </tr>


                );
            })
        }
        return (result)

    }
    const onUpdateItem = (item) => {
        history.push({
            pathname: `/dm_kiemke/update/${item.code}`,
            state: { controller: "Phiếu kiểm hàng", action: "Cập nhật" }
        });
    }
    const menu = (
        <Menu>
            {_isPermission(PERMISSION.EDIT, PERMISSION.DM_NHAPHANG) && getCurrentLogin().id == nhapHang?.created_By && nhapHang?.status == 0 ?
                <Menu.Item key="1" style={{ borderBottom: "1px solid #d8dee6" }}>
                    <a href="javascript:void(0)" onClick={() => onUpdateItem(nhapHang)}>Sửa</a>
                </Menu.Item> :
                ""
            }
            <Menu.Item key="2">
                <a href="javascript:void(0)">
                    <AntdIcons.PrinterOutlined /> xuất file phiếu kiểm hàng
                    </a>
            </Menu.Item>
        </Menu>
    );
    console.log(nhapHang)
    return (
        <Spin spinning={isRefresh}>
            <Form
                layout="horizontal"
                name="nest-messages" id="myFormCreate"
                initialValues={{
                }}
            >
                <Row>
                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button>
                                Thêm thao tác <AntdIcons.DownOutlined />
                            </Button>
                        </Dropdown>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 18 }}>
                        <Steps current={nhapHang?.status == 0 ? 1 : nhapHang?.status == 1 ? 2 : nhapHang?.status == 2 ? 3 : 1}

                            size="small">
                            <Steps.Step title="Tạo phiếu" description={nhapHang.created_At ? moment(nhapHang.created_At).format('DD/MM/YYYY, HH:mm') : ""} />
                            <Steps.Step title="Kiểm hàng" description={nhapHang.ngayKiem && nhapHang?.status != 4 ? moment(nhapHang.ngayKiem).format('DD/MM/YYYY, HH:mm') : ""} />
                            <Steps.Step title="Thống kê" description={nhapHang.ngayCanBang && nhapHang?.status != 4 ? moment(nhapHang.ngayCanBang).format('DD/MM/YYYY, HH:mm') : ""} />
                            <Steps.Step title="Hoàn thành" description={nhapHang.ngayHoanThanh ? moment(nhapHang.ngayHoanThanh).format('DD/MM/YYYY, HH:mm') : ""} />

                        </Steps>
                    </Col>
                </Row>
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
                                <Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
                                        <Descriptions >
                                            <Descriptions.Item label="Tên chi nhánh">{nhapHang.tenChiNhanh}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
                                        <Col>
                                            <Descriptions>
                                                <Descriptions.Item label="Nhân viên tạo">{nhapHang.tenNguoiTao}</Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col>
                                            <Descriptions>
                                                <Descriptions.Item label="Nhân viên kiểm">{nhapHang.tenNguoiKiem}</Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
                                        <Col>
                                            <Descriptions>
                                                <Descriptions.Item label="Ngày tạo">
                                                    {nhapHang.created_At ? moment(nhapHang.created_At).format('DD/MM/YYYY, HH:mm') : ""}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col>
                                            <Descriptions>
                                                <Descriptions.Item label="Ngày kiểm">
                                                    {nhapHang.ngayKiem ? moment(nhapHang.ngayKiem).format('DD/MM/YYYY, HH:mm') : ""}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col>
                                            {nhapHang.status == 2 ? <Descriptions>
                                                <Descriptions.Item label="Ngày cân bằng">
                                                    {nhapHang.ngayCanBang ? moment(nhapHang.ngayCanBang).format('DD/MM/YYYY, HH:mm') : ""}
                                                </Descriptions.Item>
                                            </Descriptions> : ""}
                                        </Col>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
                                        <Descriptions>
                                            <Descriptions.Item label="Ghi Chú">
                                                {nhapHang.ghiChu}
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Col>
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
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} style={{ marginTop: "16px" }}>
                                            <div className="ant-table ant-table-bordered ant-table-ping-right ant-table-fixed-column ant-table-scroll-horizontal ant-table-has-fix-left ant-table-has-fix-right">
                                                <div className="ant-table-container">
                                                    <div className="ant-table-content">
                                                        <table /*className="ant-table"*/ id="SanPhams" style={{ tableLayout: "auto" }}>
                                                            <thead className="ant-table-thead">
                                                                <tr>
                                                                    <th className="sapxep" id="Name">
                                                                        STT
                                                        </th>
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
                                                                    {nhapHang.status == 1 || nhapHang.status == 3 ?
                                                                        <>
                                                                            <th className="">
                                                                                Tồn thực tế
                                        </th>
                                                                            <th className="">
                                                                                Ghi chú
                                        </th> </> : nhapHang.status == 2 ?
                                                                            <>
                                                                                <th className="">
                                                                                    Tồn thực tế
                                        </th>
                                                                                <th className="">
                                                                                    Số lượng lệch
                                        </th>
                                                                                <th className="">
                                                                                    Ghi chú
                                        </th>
                                                                            </> :
                                                                            ""

                                                                    }

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
                    <Col style={{ textAlign: "right" }}>
                        {nhapHang?.status == 0 && _isPermission(PERMISSION.DUYET, PERMISSION.DM_NHAPHANG) ?
                            <Button type="primary" icon={<AntdIcons.SaveOutlined />} onClick={() => DangKiemHang(nhapHang)}>
                                Kiểm hàng
                                    </Button> :
                            nhapHang?.status == 4 && _isPermission(PERMISSION.NHAPKHO, PERMISSION.DM_NHAPHANG) ?
                                <Button type="primary" icon={<AntdIcons.SaveOutlined />} onClick={() => KiemHang(nhapHang)}>
                                    Hoàn thành kiểm
                                    </Button> :
                                nhapHang?.status == 1 && _isPermission(PERMISSION.NHAPKHO, PERMISSION.DM_NHAPHANG) ?
                                    <Button type="primary" icon={<AntdIcons.SaveOutlined />} onClick={() => CanBangKho(nhapHang)}>
                                        Cân băng kho
                                    </Button> :
                                    nhapHang?.status == 2 && _isPermission(PERMISSION.NHAPKHO, PERMISSION.DM_NHAPHANG) ?
                                        <Button type="primary" icon={<AntdIcons.SaveOutlined />} onClick={() => HoanThanh(nhapHang)}>
                                            Hoàn thành
                                    </Button> :
                                        ""

                        }
                    </Col>
                </Row>
            </Form >
        </Spin>
    )
}
export default ModalCreate;
