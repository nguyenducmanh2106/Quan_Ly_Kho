import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ImgCrop from 'antd-img-crop';
import { url_upload } from "../../../utils/helpers";
import logoDefault from "../../../static/images/user-profile.jpeg"
import {
    Form, Input, InputNumber, Button, Select,
    Checkbox, Upload, Skeleton, Col, Row, Card,
    Tooltip, Space, Collapse, Divider, notification, Descriptions, Typography, Image
} from 'antd';
import * as AntdIcons from '@ant-design/icons';
import { getAPI, postAPI, getCurrentLogin } from './../../../utils/helpers';
import {
    useParams, Link
} from "react-router-dom";

const DetailComponent = ({ item }) => {
    const base64_avatar = "data:image/png;base64," + item.pathAvatar;
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
                            Trạng thái: {item.status == 1 ? <Typography.Text type="warning">Đang chờ phê duyệt</Typography.Text> : <Typography.Text type="success">Đã phê duyệt</Typography.Text>}
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
                                                    {new Date(item.created_At).getDate()}/{new Date(item.created_At).getMonth() + 1}/{new Date(item.created_At).getFullYear()} {new Date(item.created_At).getHours()}:{new Date(item.created_At).getMinutes()}
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
                                                <Descriptions.Item label="Ngày duyệt">
                                                    {item.ngayDuyet ? new Date(item.ngayDuyet).getDate() + "/" + (new Date(item.ngayDuyet).getMonth() + 1) + "/" + new Date(item.ngayDuyet).getFullYear() + " " + new Date(item.ngayDuyet).getHours() + ":" + new Date(item.ngayDuyet).getMinutes() : ""}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                            <Descriptions>
                                                <Descriptions.Item label="Thời gian hàng về">
                                                    {item.thoiGianGuiSanPham ? new Date(item.thoiGianGuiSanPham).getDate() + "/" + (new Date(item.thoiGianGuiSanPham).getMonth() + 1) + "/" + new Date(item.thoiGianGuiSanPham).getFullYear() + " " + new Date(item.thoiGianGuiSanPham).getHours() + ":" + new Date(item.thoiGianGuiSanPham).getMinutes() : ""}
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
