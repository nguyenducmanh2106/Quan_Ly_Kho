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
import useModal from './../../elements/modal/useModal';
import FormView from './../DM_SanPham/View';
import {
    Form, Input, InputNumber, Button, Select
    , Skeleton, Col, Row, Card, Tooltip, Space, notification,
    AutoComplete, Descriptions, Spin, Image, Menu, DatePicker, Checkbox, Empty, Popover, Typography, Divider
} from 'antd';
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
    const [isShowingView, toggleView] = useModal();
    const [ItemShow, setItemShow] = useState({})
    const [ngayHenGiao, setNgayHenGiao] = useState(null);
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
            var fetchData = await getAPI(`api/dm_nhaphang/find-by-id?Code=${id}`);
            if (fetchData.status == true) {
                var data = fetchData.result;
                console.log(data)
                setNhapHang(data);
                setNhaCungCapSelected(data.nhaCungCaps);
                setDataSanPhamSubmit(data.chiTietNhapHangs);
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
                    ID_NhaCungCap: data.iD_NhaCungCap
                })
            }
        }

        //gọi hàm
        getDonVi()
        getData()
    }, [])
    const onHandleShowItem = (item) => {
        console.log(item)
        setItemShow(item)
        toggleView()
    }
    const onSubmit = (data) => {
        var tzDate = data.NgayHenGiao ? moment.tz(data.NgayHenGiao, "Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm") : null;
        var ChiTietNhapHangs = []
        var sp = document.querySelectorAll("#SanPhams .ant-table-row")
        for (var i = 0; i < sp.length; i++) {
            var obj = {
                iD_SanPham: sp[i].querySelector(".iD_SanPham").value,
                SoLuong: Number.parseInt(sp[i].querySelector(".SoLuong").querySelector(".ant-input-number-input").value),
                GiaNhap: Number.parseInt(sp[i].querySelector(".GiaNhap").querySelector(".ant-input-number-input").value.replace(/\đ\s?|(,*)/g, '') ?? 0)
            }
            ChiTietNhapHangs.push(obj)
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
            ChiTietNhapHangs: ChiTietNhapHangs,
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
        var result = await postAPI('api/dm_nhaphang/update', JSON.stringify(obj))
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
    const onHandleSelect = useCallback(
        async (value, option) => {
            if (value > 0) {
                var fetchData = await getAPI(`api/dm_sanpham/find-by-id?Code=${value}`);
                if (fetchData.status == true) {
                    var data = await fetchData.result
                    var obj = {
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
                    renderTomTat()
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
            let soLuong = sp[index].querySelector(".SoLuong").querySelector(".ant-input-number-input").value;
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
    }
    const renderTomTat = (TongSl, TongGiaTien) => {
        //console.log(TongSl)
        var data = ""
        data = <tr>
            <td>Số lượng :{TongSl}</td>
        </tr>
        return data;
    }
    const renderBody = useCallback(
        () => {
            var result = ""
            var TongSl = 0;
            var TongGiaTien = 0
            result = DataSanPhamSubmit.map((item, index) => {
                var giaNhap = item.giaNhap;
                TongSl += 1;
                TongGiaTien += Number.parseInt(giaNhap)
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
                            <InputNumber min={1} max={99} onChange={tinhTongTien} defaultValue={item.soLuong} />
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
            renderTomTat(TongSl, TongGiaTien)
            return (result)

        },
        [DataSanPhamSubmit]
    )

    const onChangeDatePicker = (date, dateString) => {
        setNgayHenGiao(dateString)
    }
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
                                                                    <Col>(Số lượng: {item.soLuongTrongKho})</Col>
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
