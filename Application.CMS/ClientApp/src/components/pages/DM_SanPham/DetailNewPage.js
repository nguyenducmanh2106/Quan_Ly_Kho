import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import logoDefault from "../../../static/images/user-profile.jpeg"
import {
    Form, Input, InputNumber, Button, Select,
    Checkbox, Upload, Skeleton, Col, Row, Card, Tooltip, Space, Collapse, Divider, notification, Descriptions, Image
} from 'antd';
import * as AntdIcons from '@ant-design/icons';
import { getAPI, postAPI, getCurrentLogin } from './../../../utils/helpers';
import {
    useParams
} from "react-router-dom";

const FormUpdate = () => {
    let { id } = useParams();
    const [item, setItem] = useState({});
    useEffect(() => {
        const getSanPhamUpdate = async () => {
            var fetchdata = await getAPI(`api/dm_sanpham/find-by-id?Code=${id}`);
            if (fetchdata.status == true) {
                var data = fetchdata.result
                setItem(data)
            }
        }
        //gọi hàm
        getSanPhamUpdate();
    }, [])
    const renderThuocTinh = () => {
        var thuocTinhs = item?.thuocTinhs;
        console.log(thuocTinhs?.length ?? "")
        var array = thuocTinhs ?? []
        var result = array.map(item => (
            <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                <Descriptions>
                    <Descriptions.Item label={item.name}>{item.value}</Descriptions.Item>
                </Descriptions>
            </Col>
        ));
        return result;
    }
    const base64_avatar = "data:image/png;base64," + item.pathAvatar
    return (
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
                        Trạng thái: {item.status == 1 ? "Đang giao dịch" : "Ngừng hoạt động"}
                    </span>}
                >
                    <Row gutter={24}>
                        <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                            <Descriptions>
                                <Descriptions.Item label="Tên sản phẩm">{item.name}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }}>
                            <Descriptions>
                                <Descriptions.Item label="Mã vạch">{item.barcode}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions>
                                <Descriptions.Item label="Mã sản phẩm">{item.code}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions>
                                <Descriptions.Item label="Khối lượng">{item.khoiLuong}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions>
                                <Descriptions.Item label="Đơn vị tính">{item.tenDonViTinh}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions>
                                <Descriptions.Item label="Ngày tạo">
                                    {new Date(item.created_At).getDate()}/{new Date(item.created_At).getMonth() + 1}/{new Date(item.created_At).getFullYear()}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }}>
                            <Descriptions>
                                <Descriptions.Item label="Giá cũ">{item.giaCu}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions>
                                <Descriptions.Item label="Giá nhập">{item.giaNhap}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions>
                                <Descriptions.Item label="Giá bán">{item.giaBanLe}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions>
                                <Descriptions.Item label="Giá bán buôn">{item.giaBanBuon}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </Card>
                <Card
                    style={{ marginTop: 16 }}
                    title={
                        <Space size={8}>
                            <AntdIcons.InfoCircleOutlined />
                                                   Thuộc tính
                                                </Space>
                    }
                >
                    <Row gutter={24}>
                        {renderThuocTinh()}
                    </Row>
                </Card>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }} order={0}>
                <Card
                    style={{ marginTop: 16 }}
                    title={
                        <Space size={8}>
                            <AntdIcons.FileImageOutlined />
                                                    Ảnh sản phẩm
                                                </Space>
                    }
                >
                    <Row>
                        <Col>
                            <Image
                                width={120}
                                src={base64_avatar}
                                fallback={logoDefault}
                            />
                        </Col>
                    </Row>
                </Card>
                <Card
                    style={{ marginTop: 16 }}
                    title={
                        <Space size={8}>
                            <AntdIcons.BarsOutlined />
                                                   Thông tin khác
                                                </Space>
                    }>
                    <Row>
                        <Col >
                            <Space>
                                Loại sản phẩm: {item.tenLoaiSanPham}
                            </Space>
                        </Col>
                        <Col style={{ marginTop: "16px" }}>
                            <Space>
                                Thương hiệu: {item.tenThuongHieu}
                            </Space>
                        </Col>
                        <Col style={{ marginTop: "16px" }}>
                            <Space>
                                Xuất xứ: {item.xuatXu}
                            </Space>
                        </Col>
                    </Row>
                </Card>

            </Col>
        </Row>
    )
}
export default FormUpdate;
