import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment-timezone';
import { useParams } from 'react-router-dom'
import { getAPI, postAPI, postFormData, getCurrentLogin, FormatMoney } from './../../../utils/helpers';
import { url_upload } from './../../../utils/constants';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import logoDefault from "../../../static/images/user-profile.jpeg"
import * as AntdIcons from '@ant-design/icons';
import {
    Form, Input, InputNumber, Button, Select
    , Skeleton, Col, Row, Card, Tooltip, Space, notification,
    AutoComplete, Descriptions, Spin, Image, Menu, DatePicker, Checkbox, Empty, Popover, Typography, Divider
} from 'antd';
import useModal from './../../elements/modal/useModal';
import FormView from './../DM_SanPham/View';
const ModalUpdate = () => {
    const [DataDonVi, setDataDonVi] = useState([]);
    const [DataSanPham, setDataSanPham] = useState([]);
    const [DataNCC, setDataNCC] = useState([]);
    const [DataSanPhamSubmit, setDataSanPhamSubmit] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisibleInfoNCC, setIsVisibleInfoNCC] = useState(true);
    const [isThanhToanNCC, setIsThanhToanNCC] = useState(false);
    const [nhaCungCapSelected, setNhaCungCapSelected] = useState({});
    const [tomTatSP, setTomTatSP] = useState({ TongSl: 0, TongGiaTien: 0 });
    const [chietKhau, setChietKhau] = useState(0);
    const [tienPhaiTra, setTienPhaiTra] = useState(0);
    const [isVisible, setIsVisible] = useState(false)
    const [form] = Form.useForm();
    const [nhapHang, setNhapHang] = useState({});
    const [ngayHenGiao, setNgayHenGiao] = useState(null);
    const [isShowingView, toggleView] = useModal();
    const [ItemShow, setItemShow] = useState({})
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
    let { id } = useParams()
    useEffect(() => {
        async function getDonVi() {
            var fetchData = await getAPI(`api/dm_donvi/get-all-data-active`);
            if (fetchData.status == true) {
                setDataDonVi(fetchData.result)
            }
        }
        async function getData() {
            var fetchData = await getAPI(`api/dm_xuathang/find-by-id?Code=${id}&Id_Kho=${getCurrentLogin().donViId}`);
            if (fetchData.status == true) {
                var data = fetchData.result;
                console.log(data)
                setNhapHang(data);
                setNhaCungCapSelected(data.nhaCungCaps);
                setDataSanPhamSubmit(data.chiTietXuatHangs);
                setChietKhau(data.chietKhau);
                setTomTatSP({
                    ...tomTatSP,
                    TongSl: data.tongSoLuong,
                    TongGiaTien: data.tongTien
                })
                setNgayHenGiao(moment(data.ngayHenGiao, 'YYYY-MM-DD HH:mm').isValid() ? moment(data.ngayHenGiao, 'YYYY-MM-DD HH:mm') : null);
                setTienPhaiTra(data.tongTienPhaiTra);
                form.setFieldsValue({
                    NgayHenGiao: moment(data.ngayHenGiao, 'YYYY-MM-DD HH:mm').isValid() ? moment(data.ngayHenGiao, 'YYYY-MM-DD HH:mm') : null,
                    Description: data.description,
                    ID_ChiNhanhNhan: data.iD_ChiNhanhNhan,
                    ID_NhaCungCap: data.iD_NhaCungCap,
                    KhachHang: data.khachHang,
                    SdtKhachHang: data.sdtKhachHang
                })
            }
        }

        //gọi hàm
        getDonVi()
        getData()
    }, [])
    const onSubmit = (data) => {
        var tzDate = data.NgayHenGiao ? moment.tz(data.NgayHenGiao, "Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm") : null;
        var chiTietXuatHangs = []
        var sp = document.querySelectorAll("#SanPhams .ant-table-row")
        for (var i = 0; i < sp.length; i++) {
            var obj = {
                iD_SanPham: sp[i].querySelector(".iD_SanPham").value,
                SoLuong: Number.parseInt(sp[i].querySelector(".SoLuong").querySelector(".ant-input-number-input").value),
                GiaXuat: Number.parseInt(sp[i].querySelector(".GiaNhap").querySelector(".ant-input-number-input").value.replace(/\đ\s?|(,*)/g, '') ?? 0)
            }
            chiTietXuatHangs.push(obj)
        }
        var ThanhToanDonHang = {
            TongTienDaTra: Number.parseInt(data.TongTienDaTra ?? 0),
            NguoiThanhToan: getCurrentLogin().id,
            HinhThucThanhToan: data.HinhThucThanhToan
        }
        var obj = {
            ...data,
            Status: 0,
            Code: nhapHang.code,
            NhapKho: 1,
            strNgayHenGiao: tzDate,
            Created_By: getCurrentLogin().id,
            chiTietXuatHangs: chiTietXuatHangs,
            ThanhToanDonHang: ThanhToanDonHang,
            ChietKhau: chietKhau,
            TongTien: tomTatSP.TongGiaTien,
            TongSoLuong: tomTatSP.TongSl,
            TongTienPhaiTra: tienPhaiTra,
            ThanhToan: data.SoTienThanhToan == tienPhaiTra ? 1 : (data.TongTienDaTra < tienPhaiTra && data.TongTienDaTra != 0) ? 3 : data.TongTienDaTra == 0 ? 2 : -1
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
        setIsLoading(true)
        var result = await postAPI('api/dm_xuathang/update', JSON.stringify(obj))
        if (result.status) {
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
                var data = fetchData.result
                setDataSanPham(data)
            }
        }
        //console.log(value)
    };
    const handleSearchNCC = async (value) => {
        if (value.length > 2) {
            var obj = {
                Name: value,
                Id_Kho: getCurrentLogin().donViId
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
    const onHandleSelect = useCallback(
        async (value, option) => {
            if (value > 0) {
                var fetchData = await getAPI(`api/dm_sanpham/find-by-id?Code=${value}&Id_Kho=${getCurrentLogin().donViId}`);
                if (fetchData.status == true) {
                    var data = await fetchData.result
                    var obj = {
                        ...data,
                        iD_SanPham: data.code,
                        tenSanPham: data.name,
                        name: data.name,
                        code: data.code,
                        barCode: data.barCode,
                        tenDonViTinh: data.tenDonViTinh,
                        soLuong: 0,
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
                            if (item.iD_SanPham === obj.iD_SanPham) {
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
                }
            }

        },
        [DataSanPhamSubmit]
    )
    const tinhTongTien = () => {
        let arraySanPham = []
        let tongSl = 0;
        let tongTienDonHang = 0;
        let sp = document.querySelectorAll("#SanPhams .ant-table-row");
        for (let index = 0; index < sp.length; index++) {
            let soLuongMax = Number.parseInt(sp[index].querySelector(".SoLuong").querySelector(".ant-input-number-input").getAttribute("aria-valuemax") ?? 0)
            let soLuong = Number.parseInt(sp[index].querySelector(".SoLuong").querySelector(".ant-input-number-input").value) > soLuongMax ?
                soLuongMax : sp[index].querySelector(".SoLuong").querySelector(".ant-input-number-input").value;
            let giaNhap = sp[index].querySelector(".GiaNhap").querySelector(".ant-input-number-input").value ?? 0;
            let tongTien = soLuong * giaNhap.replace(/\đ\s?|(,*)/g, '')
            let obj = {
                SoLuong: soLuong,
                GiaNhap: giaNhap.replace(/\đ\s?|(,*)/g, ''),
                TongTien: tongTien
            }
            tongSl += Number.parseInt(soLuong);
            tongTienDonHang += tongTien;
            arraySanPham.push(obj)
            sp[index].querySelector(".TongTien").innerHTML = FormatMoney(tongTien, " đ")
        }
        setTomTatSP({
            ...tomTatSP,
            TongSl: tongSl,
            TongGiaTien: tongTienDonHang
        })
        onChangeChietKhau(tongTienDonHang)
        console.log(arraySanPham)
    }
    const onHandleDelete = (value) => {
        console.log(value)
        var result = DataSanPhamSubmit.filter(item => {
            return item.iD_SanPham !== value.iD_SanPham
        })

        setDataSanPhamSubmit(result)
        setTimeout(() => {
            tinhTongTien()
        })
    }
    const onHandleShowItem = (item) => {
        console.log(item)
        setItemShow(item)
        toggleView()
    }
    const renderBody = useCallback(
        () => {
            var result = ""
            //console.log(DataSanPhamSubmit)
            result = DataSanPhamSubmit.map((item, index) => {
                var giaNhap = item.giaXuat ?? 0;
                return (
                    <tr key={item.id} className="ant-table-row ant-table-row-level-0">
                        <td>
                            <input type="hidden" className="iD_SanPham" defaultValue={item.code} />
                            {item.tenSanPham}
                        </td>

                        <td style={{ textAlign: "center" }}>
                            <Typography.Link href="javascript:void(0)" onClick={() => onHandleShowItem(item)}>
                                {item.code}
                            </Typography.Link>
                        </td>
                        <td>
                            {item.tenDonViTinh}
                        </td>
                        <td className="SoLuong" id={item.iD_SanPham}>
                            <InputNumber min={1} max={item.soLuongCoTheXuat > 1 ? item.soLuongCoTheXuat : 1} onChange={tinhTongTien} defaultValue={item.soLuong}

                            />
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
                            {FormatMoney(giaNhap, " đ")}
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

    const onChangeChietKhau = (TongTien) => {
        let Chietkhau = 0
        let dvt = form.getFieldsValue("prefix").prefix;
        let ck = form.getFieldsValue("ChietKhau").ChietKhau ?? 0;
        console.log(TongTien)
        console.log(ck)
        if (dvt == 1) {
            Chietkhau = TongTien * ck / 100;
        }
        else {
            Chietkhau = Number.parseInt(ck);
        }
        setChietKhau(Chietkhau)
        setTienPhaiTra(TongTien - Chietkhau)
    }
    const prefixSelector = (

        <Form.Item name="prefix" noStyle>
            <Select
                onChange={() => onChangeChietKhau(tomTatSP.TongGiaTien)}
                style={{
                    width: 70,
                }}
            >
                <Option value={1}>%</Option>
                <Option value={2}>Tiền mặt</Option>
            </Select>
        </Form.Item>
    );
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
                    "Description": nhapHang.description
                }}
            >
                <Row gutter={16}>
                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 17 }}>
                        {getCurrentLogin().capDoDonVi == 1 ?
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
                            :
                            <Card
                                style={{ marginTop: 16 }}
                                title={
                                    <Space size={8}>
                                        <AntdIcons.InfoCircleOutlined />
                                   Thông tin khách hàng
                                </Space>
                                }>
                                <Row>
                                    <Col>
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
                                            <label htmlFor="nest-messages_KhachHang" className="ant-form-item-required" title="Tên khách hàng">
                                                Tên khách hàng
                                            </label>
                                        </Col>
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 18 }}>
                                            <Form.Item name="KhachHang" label="" rules={[{ required: true, message: 'Tên khách hàng không được để trống' }]}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Col>
                                    <Col>
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
                                            <label htmlFor="nest-messages_SdtKhachHang" className="ant-form-item-required" title="Số điện thoại khách hàng">
                                                Số điện thoại khách hàng
                                            </label>
                                        </Col>
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 18 }}>
                                            <Form.Item name="SdtKhachHang" label="" rules={[
                                                {
                                                    required: true, message: 'Số điện thoại khách hàng không được để trống', type: "regexp",
                                                    pattern: new RegExp(/\d+/g),
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        //console.log(value)
                                                        if (value === "") {
                                                            return Promise.reject(new Error('Số điện thoại khách hàng không được để trống'));
                                                        }
                                                        if ((Number.isNaN(value) || (/(84|0[3|5|7|8|9])+([0-9]{8})\b/g).test(value) == false)) {
                                                            return Promise.reject(new Error('Số điện thoại định dạng không đúng'));
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Col>
                                </Row>
                            </Card>
                        }
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
                                                {DataSanPham.map((item) => {
                                                    return (
                                                        <Option disabled={item.soLuongCoTheXuat > 0 ? false : true} key={item.code} value={item.code}>
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
                                                    )
                                                })}
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
                                                                    <th className="">
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
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} style={{ marginTop: "16px" }} className="TomTat">
                                            {DataSanPhamSubmit.length > 0 ?
                                                <>
                                                    <Descriptions title="" >
                                                        <Descriptions.Item label="Số lượng" className="TongSoLuong">{tomTatSP.TongSl}</Descriptions.Item>
                                                    </Descriptions>
                                                    <Descriptions>
                                                        <Descriptions.Item label="Tổng tiền" className="TongGiaTien">
                                                            {FormatMoney(tomTatSP.TongGiaTien, " đ")}
                                                        </Descriptions.Item>
                                                    </Descriptions>
                                                    <Descriptions>
                                                        <Descriptions.Item label={<Popover
                                                            content={
                                                                <Form.Item
                                                                    name="ChietKhau"
                                                                    label=""
                                                                >

                                                                    <Input
                                                                        onChange={() => onChangeChietKhau(tomTatSP.TongGiaTien)}
                                                                        addonBefore={prefixSelector}
                                                                        style={{
                                                                            width: '100%',
                                                                        }}
                                                                    />
                                                                </Form.Item>
                                                            }
                                                            title="Title"
                                                            trigger="click"
                                                            visible={isVisible}
                                                            onVisibleChange={handleVisibleChange}
                                                        >
                                                            <Typography.Link href="#">
                                                                Chiết khẩu <AntdIcons.DownOutlined />
                                                            </Typography.Link>

                                                        </Popover>
                                                        }>
                                                            {FormatMoney(chietKhau, " đ")}
                                                        </Descriptions.Item>
                                                    </Descriptions>
                                                    <Descriptions>
                                                        <Descriptions.Item label={<Typography.Text type="warning">Tiền phải trả</Typography.Text>}>
                                                            {FormatMoney(tienPhaiTra, " đ")}
                                                        </Descriptions.Item>
                                                    </Descriptions>
                                                </> :
                                                <Empty description="Đơn hàng của bạn chưa có sản phẩm" />
                                            }
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        {/*<Card*/}
                        {/*    style={{ marginTop: 16 }}*/}
                        {/*    title={*/}
                        {/*        <Space size={8}>*/}
                        {/*            <AntdIcons.CreditCardOutlined />*/}
                        {/*                           Thanh toán*/}
                        {/*                        </Space>*/}
                        {/*    }*/}
                        {/*    extra={<Checkbox va onChange={onChange} valuePropName="checked">Thanh toán với nhà cung cấp</Checkbox>}*/}
                        {/*>*/}
                        {/*    <Row gutter={24} style={{ display: isThanhToanNCC ? "block" : "none" }}>*/}
                        {/*        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>*/}
                        {/*            <Form.Item name="HinhThucThanhToan" label="Hình thức thanh toán" rules={[{ required: true }]}>*/}
                        {/*                <Select>*/}
                        {/*                    <Option value={1}>Tiền mặt</Option>*/}
                        {/*                    <Option value={2}>Chuyển khoản</Option>*/}
                        {/*                </Select>*/}
                        {/*            </Form.Item>*/}
                        {/*        </Col>*/}
                        {/*        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>*/}
                        {/*            <Form.Item name="TongTienDaTra" label="Số tiền thanh toán">*/}
                        {/*                <InputNumber*/}
                        {/*                    min={0}*/}
                        {/*                    max={tienPhaiTra}*/}
                        {/*                    style={{ width: "100%" }}*/}
                        {/*                    formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*/}
                        {/*                    parser={value => value.replace(/\đ\s?|(,*)/g, '')}*/}
                        {/*                />*/}
                        {/*            </Form.Item>*/}
                        {/*        </Col>*/}
                        {/*    </Row>*/}
                        {/*</Card>*/}
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
                                                    showTime
                                                    style={{ width: '100%' }}
                                                    format="DD/MM/YYYY HH:mm"
                                                    getPopupContainer={trigger => trigger.parentElement}
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
export default ModalUpdate;
