import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import { getAPI, postAPI, postFormData, getCurrentLogin, FormatMoney } from './../../../utils/helpers';
import { url_upload } from './../../../utils/constants';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import logoDefault from "../../../static/images/user-profile.jpeg"
import * as AntdIcons from '@ant-design/icons';
import {
    Form, Input, InputNumber, Button, Select
    , Skeleton, Col, Row, Card, Tooltip, Space, notification,
    AutoComplete, Descriptions, Spin, Image, Menu, DatePicker, Checkbox, Empty, Popover, Typography, Timeline, Steps
} from 'antd';
import { useParams, useHistory } from 'react-router-dom'
const ModalCreate = () => {
    let history = useHistory()
    const [DataSanPham, setDataSanPham] = useState([]);
    const [DataNCC, setDataNCC] = useState([]);
    const [nhapHang, setNhapHang] = useState([]);
    const [thanhToan, setThanhToan] = useState([]);
    const [tomTatSP, setTomTatSP] = useState({ TongSl: 0, TongGiaTien: 0 });
    const [TongSl, setTongSl] = useState(0);
    const [TongGiaTien, setTongGiaTien] = useState(0)
    const [chietKhau, setChietKhau] = useState(0);

    let { id } = useParams();
    useEffect(() => {
        async function getData() {
            var fetchData = await getAPI(`api/dm_nhaphang/find-by-id?Code=${id}`);
            if (fetchData.status == true) {
                setNhapHang(fetchData.result)
                setDataSanPham(fetchData.result.chiTietNhapHangs)
                setDataNCC(fetchData.result.nhaCungCaps)
                setThanhToan(fetchData.result.thanhToanDonHangs)
            }
        }

        //gọi hàm
        getData()
    }, [])
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
        var result = await postAPI('api/dm_nhaphang/create', JSON.stringify(obj))
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
    const tinhTongTien = useMemo(
        () => {
            let tongSl = 0;
            let tongGiaTien = 0
            DataSanPham.map(item => {
                tongSl += item.soLuong;
                tongGiaTien += item.soLuong * item.giaNhap
            })
            setTongSl(tongSl)
            setTongGiaTien(tongGiaTien)
        },
        [DataSanPham]
    )
    const openDetailSanPham = (item) => {
        history.push({
            pathname: `/dm_sanpham/view/${item.code}`,
            state: { controller: "Danh mục sản phẩm", action: item.code }
        });
    }
    const renderBody = useCallback(
        () => {
            var result = ""
            var TongSl = 0;
            var TongGiaTien = 0
            result = DataSanPham.map((item, index) => {
                var giaNhap = item.giaNhap;
                TongSl += 1;
                TongGiaTien += Number.parseInt(giaNhap)
                return (
                    <tr key={item.id} className="ant-table-row ant-table-row-level-0">
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
                            {item.soLuong}
                        </td>
                        <td className="GiaNhap">
                            {FormatMoney(giaNhap, " đ")}
                        </td>
                        <td className="TongTien">
                            {FormatMoney(giaNhap * item.soLuong, " đ")}
                        </td>
                    </tr>


                );
            })
            return (result)

        },
        [DataSanPham]
    )
    console.log(nhapHang)
    return (
        <Form
            layout="horizontal"
            name="nest-messages" id="myFormCreate"
            initialValues={{
            }}
        >
            <Row>
                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}></Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 18 }}>
                    <Steps current={1} size="small">
                        <Steps.Step title="Đặt hàng" description={nhapHang.created_At ? moment(nhapHang.created_At).format('DD/MM/YYYY, HH:mm') : ""} />
                        <Steps.Step title="Duyệt" description={nhapHang.ngayDuyet ? moment(nhapHang.ngayDuyet).format('DD/MM/YYYY, HH:mm') : ""} />
                        <Steps.Step title="Nhập kho" description={nhapHang.ngayNhapKho ? moment(nhapHang.ngayNhapKho).format('DD/MM/YYYY, HH:mm') : ""} />
                        <Steps.Step title="Hoàn thành" description="This is a description." />
                    </Steps>
                </Col>
            </Row>
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
                            <Col>
                                <Descriptions title="Thông tin" >
                                    <Descriptions.Item label="Tên nhà cung cấp">{DataNCC.name}</Descriptions.Item>
                                </Descriptions>
                                <Descriptions>
                                    <Descriptions.Item label="Số điện thoại">{DataNCC.phone}</Descriptions.Item>
                                </Descriptions>
                                <Descriptions>
                                    <Descriptions.Item label="Địa chỉ">{DataNCC.address}</Descriptions.Item>
                                </Descriptions>
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
                                        <Descriptions title="" >
                                            <Descriptions.Item label="Số lượng" className="TongSoLuong">{TongSl}</Descriptions.Item>
                                        </Descriptions>
                                        <Descriptions>
                                            <Descriptions.Item label="Tổng tiền" className="TongGiaTien">
                                                {FormatMoney(TongGiaTien, " đ")}
                                            </Descriptions.Item>
                                        </Descriptions>
                                        <Descriptions>
                                            <Descriptions.Item label={<Typography.Link href="javascript:void(0)">
                                                Chiết khẩu <AntdIcons.DownOutlined />
                                            </Typography.Link>
                                            }>
                                                {FormatMoney(nhapHang.chietKhau ?? 0, " đ")}
                                            </Descriptions.Item>
                                        </Descriptions>
                                        <Descriptions>
                                            <Descriptions.Item label={<Typography.Text type="warning">Tiền phải trả</Typography.Text>}>
                                                {FormatMoney(nhapHang.tongTienPhaiTra ?? 0, " đ")}
                                            </Descriptions.Item>
                                        </Descriptions>

                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Card
                        style={{ marginTop: 16 }}
                        title={
                            <Row>
                                <Col>
                                    <Space size={8}>
                                        <AntdIcons.CreditCardOutlined />
                                                   Thanh toán
                                    </Space>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                            <Descriptions>
                                                <Descriptions.Item label="Đã thanh toán">
                                                    {FormatMoney(nhapHang.tongDaThanhToan ?? 0, " đ")}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                            <Descriptions>
                                                <Descriptions.Item label="Còn phải trả">
                                                    {FormatMoney(nhapHang.tongTienPhaiTra - nhapHang.tongDaThanhToan, " đ")}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                        }
                        extra={<Button>Xác nhận thanh toán</Button>}
                    >
                        <Row gutter={24}>
                            <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                <Timeline>
                                    {thanhToan.map(item => {
                                        return (
                                            <Timeline.Item>
                                                <p> Xác nhận thanh toán {FormatMoney(item.tongTienDaTra ?? 0, " đ")}</p>
                                                <p>{item.ngayThanhToan ? moment(item.ngayThanhToan).format('DD/MM/YYYY, HH:mm') : ""}</p>
                                                <p>Người thanh toán: {item.tenNguoiThanhToan}</p>
                                                <p>Phương thức thanh toán: {item.tenHinhThucThanhToan}</p>
                                            </Timeline.Item>
                                        )
                                    })}
                                </Timeline>
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
                                        <Descriptions>
                                            <Descriptions.Item label="Chi nhánh nhận">
                                                {nhapHang.tenChiNhanhNhan}
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                        <Descriptions>
                                            <Descriptions.Item label="Ngày hẹn giao">
                                                {nhapHang.ngayHenGiao ? moment(nhapHang.ngayHenGiao).format('DD/MM/YYYY, HH:mm') : ""}
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                                        <Descriptions>
                                            <Descriptions.Item label="Ghi chú">
                                                {nhapHang.description}
                                            </Descriptions.Item>
                                        </Descriptions>
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
    )
}
export default ModalCreate;
