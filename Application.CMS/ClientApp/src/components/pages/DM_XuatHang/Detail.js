import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ImgCrop from 'antd-img-crop';
import moment from 'moment'
import { url_upload, FormatMoney } from "../../../utils/helpers";
import logoDefault from "../../../static/images/user-profile.jpeg"
import {
    Form, Input, InputNumber, Button, Select,
    Checkbox, Upload, Skeleton, Col, Row, Card,
    Tooltip, Space, Collapse, Divider, notification, Descriptions, Typography, Image, Badge
} from 'antd';
import * as AntdIcons from '@ant-design/icons';
import { getAPI, postAPI, getCurrentLogin, getLocalStorage } from './../../../utils/helpers';
import { PERMISS_USER_CURRENT } from "../../../utils/constants"
import * as constantPermission from "../../../utils/constantPermission"
import { defineAbilitiesFor, _isPermission } from "../../elements/Config_Roles/appAbility"
import {
    useParams, Link
} from "react-router-dom";

const DetailComponent = ({ item, toggleStatus, onReceived, hide }) => {
    const base64_avatar = "data:image/png;base64," + item.pathAvatar;
    useEffect(() => {
        defineAbilitiesFor(getLocalStorage(PERMISS_USER_CURRENT))
    }, [])
    const onToggleStatus = (status, item) => {
        item.status = status;
        toggleStatus(item)
        //console.log(item)
    }
    const NhanHang = (item) => {
        onReceived(item)
    }
    const renderBody = () => {
        var result = ""
        result = item.chiTietDeNghiDieuDongs.map((value) => {
            const base64_avatar = "data:image/png;base64," + value.imgSanPham
            return (
                <tr key={value.id} className="ant-table-row ant-table-row-level-0">
                    <td>
                        <Image
                            width={70}
                            src={base64_avatar}
                            fallback={logoDefault}
                        />
                    </td>
                    <td>
                        <Link to={{ pathname: `/dm_sanpham/view/${value.iD_SanPham}`, state: { controller: "Xem chi tiết sản phẩm", action: value.tenSanPham } }}>
                            {value.tenSanPham}
                        </Link>
                    </td>

                    <td style={{ textAlign: "center" }}>
                        {value.code}
                    </td>
                    <td>
                        {value.barCode}
                    </td>
                    <td>
                        {value.tenDonViTinh}
                    </td>
                    <td>
                        {value.soLuongYeuCau}
                    </td>
                    <td>
                        {value.soLuongDuyet}
                    </td>
                </tr>


            );
        })
        return (result)
    }
    return (
        <>
            <Row>
                <Col style={{ textAlign: "right" }}>
                    {!_isPermission(constantPermission.EDIT, constantPermission.DM_DENGHI_DIEUDONG) ? null : (item.status != 1) ? null : item.created_By === getCurrentLogin().id ?
                        <Button style={{ margin: "0 !important" }} type="primary" icon={<AntdIcons.RedoOutlined />} onClick={() => onToggleStatus(4, item)}>
                            Lấy lại
                            </Button>
                        : null}
                    {!_isPermission(constantPermission.DUYET, constantPermission.DM_DENGHI_DIEUDONG) ? null : (item.status != 2) ? null :
                        <Button style={{ margin: "0 !important" }} type="primary" icon={<AntdIcons.FileDoneOutlined />} onClick={() => NhanHang(item)}>
                            Nhận hàng
                            </Button>
                    }
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }}>
                    <Card
                        style={{ marginTop: 16 }}
                        title={
                            <Space size={8}>
                                <AntdIcons.InfoCircleOutlined />
                                                    Thông tin
                                                </Space>
                        }
                        extra={<span>

                            Trạng thái:  {item.status == 1 ?
                                <Badge status="processing" text="Đang chờ phê duyệt" />
                                : item.status == 2 ? <Badge status="success" text="Đã phê duyệt" /> : item.status == 3 ?
                                    <Badge status="error" text="Trả về" /> : item.status == 4 ?
                                        <Badge status="warning" text="Nhận lại" /> : item.status == 5 ?
                                            <Badge color="purple" text="Đã nhận hàng" /> : ""
                            }
                        </span>}
                    >
                        <Row gutter={24}>
                            <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                <Row>
                                    <Col>
                                        <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                            <Descriptions>
                                                <Descriptions.Item label="Từ kho">{item.tenChiNhanhGui}</Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                            <Descriptions>
                                                <Descriptions.Item label="Đến kho">{item.tenChiNhanhNhan}</Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                            <Descriptions>
                                                <Descriptions.Item label="Ngày tạo">
                                                    {item.created_At ? moment(item.created_At).format('DD/MM/YYYY, HH:mm') : ""} </Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                            <Descriptions>
                                                <Descriptions.Item label="Ngày nhận được hàng">
                                                    {item.ngayNhanSanPham ? moment(item.ngayNhanSanPham).format('DD/MM/YYYY, HH:mm') : ""}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                <Row>
                                    <Col>
                                        <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                            <Descriptions>
                                                <Descriptions.Item label="Người lập">{item.tenNguoiGui}</Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                            <Descriptions>
                                                <Descriptions.Item label="Chức vụ">
                                                    {item.tenBoPhanGui}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                            <Descriptions>
                                                <Descriptions.Item label="Ngày duyệt">
                                                    {item.ngayDuyet ? moment(item.ngayDuyet).format('DD/MM/YYYY, HH:mm') : ""}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                            <Descriptions>
                                                <Descriptions.Item label="Lý do từ chối">
                                                    {item.lyDoTuChoi ?? ""}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>

                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }} order={0}>
                    <Card
                        style={{ marginTop: 16 }}
                        title={
                            <Space size={8}>
                                <AntdIcons.FileImageOutlined />
                                                    Thông tin khác
                                                </Space>
                        }
                    >
                        <Row gutter={24}>
                            <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                <Descriptions>
                                    <Descriptions.Item label="Loại đề nghị">{item.tenLoaiDeNghi}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                <Descriptions>
                                    <Descriptions.Item label="Ghi chú">{item.description}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: "16px" }}>
                <Card>
                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} style={{ marginTop: "16px" }}>
                        <div className="ant-table ant-table-bordered ant-table-ping-right ant-table-fixed-column ant-table-scroll-horizontal ant-table-has-fix-left ant-table-has-fix-right">
                            <div className="ant-table-container">
                                <div className="ant-table-content">
                                    <table /*className="ant-table"*/ id="SanPhams" style={{ tableLayout: "auto" }}>
                                        <thead className="ant-table-thead">
                                            <tr>
                                                <th className="sapxep" id="Anh">
                                                    Ảnh
                                                        </th>
                                                <th className="sapxep" id="Name">
                                                    Tên sản phẩm
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
                                                    Số lượng phê duyệt
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
                </Card>
            </Row>
        </>
    )
}
export default DetailComponent;
