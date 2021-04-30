import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import { url_upload } from "../../../utils/helpers";
import logoDefault from "../../../static/images/user-profile.jpeg"
import {
    Form, Input, InputNumber, Button, Select
    , Skeleton, Col, Row, Card, Tooltip, Space, notification, AutoComplete, Descriptions, Spin, Image, Menu, Badge, Modal
} from 'antd';
import * as AntdIcons from '@ant-design/icons';
import { getAPI, postAPI, getCurrentLogin } from './../../../utils/helpers';
import {
    useParams
} from "react-router-dom";

const FormUpdate = () => {
    let { id } = useParams();
    const [DataDonVi, setDataDonVi] = useState([]);
    const [DataSanPham, setDataSanPham] = useState([]);
    const [DataSanPhamSubmit, setDataSanPhamSubmit] = useState([]);
    const [DataLoaiDeNghi, setDataLoaiDeNghi] = useState([]);
    const [DataDonViById, setDataDonViById] = useState({});
    const [DataDonViCapDo, setDataDonViCapDo] = useState([]);
    const [ItemUpdate, setItemUpdate] = useState({});
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
        async function getItemUpdate() {
            var fetchData = await getAPI(`api/dm_denghidieudong/find-by-id?Code=${id}`);
            if (fetchData.status == true) {
                var data = fetchData.result;
                setItemUpdate(data)
                setDataSanPhamSubmit(data.chiTietDeNghiDieuDongs)
                form.setFieldsValue({
                    ID_ChiNhanhNhan: data.iD_ChiNhanhNhan,
                    LoaiDeNghi_Id: data.loaiDeNghi_Id,
                    Barcode: data.barcode,
                    Description: data.description,
                });
            }
        }
        //gọi hàm
        getItemUpdate();
        getDonVi()
        getLoaiDeNghi()
        getDonViById()
        getDonViByCapDo()
    }, [])
    const onSubmit = (data) => {
        var ChiTietDeNghiDieuDongs = []
        var sp = document.querySelectorAll("#SanPhams .ant-table-row")
        for (var i = 0; i < sp.length; i++) {
            var obj = {
                id: sp[i].querySelector(".id_chitietdieudong").value ? Number.parseInt(sp[i].querySelector(".id_chitietdieudong").value) : 0,
                ID_SanPham: sp[i].querySelector(".ID_SanPham").value,
                SoLuongYeuCau: Number.parseInt(sp[i].querySelector(".ant-input-number-input").value)
            }
            ChiTietDeNghiDieuDongs.push(obj)
        }
        var obj = {
            ...data,
            Id: ItemUpdate.id,
            Code: ItemUpdate.code,
            Status: 1,
            Created_By: getCurrentLogin().id,
            ID_ChiNhanhGui: getCurrentLogin().donViId,
            ChiTietDeNghiDieuDongs: ChiTietDeNghiDieuDongs
        }
        console.log(obj)
        onPostUpdateItem(obj)
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
    async function onPostUpdateItem(obj) {
        //console.log(obj)
        //setConfirmLoading(true)
        Modal.confirm({
            title: 'Bạn có chắc chắn không?',
            icon: <AntdIcons.ExclamationCircleOutlined />,
            content: 'Bla bla ...',
            okText: 'Đồng ý',
            cancelText: 'Quay lại',
            //okButtonProps: { loading: confirmLoading },
            onOk: () => {
                return postAPI('api/dm_denghidieudong/update', JSON.stringify(obj)).then(result => {
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
                });
            }
        });

    }
    const renderBody = () => {
        var result = ""
        result = DataSanPhamSubmit.map((item, index) => {
            return (
                <tr key={item.id} className="ant-table-row ant-table-row-level-0">
                    <td>
                        {item.tenSanPham}
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
                        <input type="hidden" className="ID_SanPham" defaultValue={item.iD_SanPham} />
                        <input type="hidden" className="id_chitietdieudong" defaultValue={item.id} />
                        {/*<InputNumber min={1} max={99} defaultValue={item.soLuongYeuCau} />*/}
                        {item.soLuongYeuCau}
                    </td>
                    <td>
                        <InputNumber min={1} max={99} />
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
                }}
            >
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

                                Trạng thái:  {ItemUpdate.status == 1 ?
                                    <Badge status="processing" text="Đang chờ phê duyệt" />
                                    : ItemUpdate.status == 2 ? <Badge status="success" text="Đã phê duyệt" /> : ItemUpdate.status == 3 ?
                                        <Badge status="error" text="Trả về" /> : ItemUpdate.status == 4 ?
                                            <Badge status="warning" text="Nhận lại" /> : ItemUpdate.status == 5 ?
                                                <Badge color="cyan" text="Đã nhận hàng" /> : ""
                                }
                            </span>}
                        >
                            <Row gutter={24}>
                                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                    <Row>
                                        <Col>
                                            <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                                <Descriptions>
                                                    <Descriptions.Item label="Từ kho">{ItemUpdate.tenChiNhanhGui}</Descriptions.Item>
                                                </Descriptions>
                                            </Col>
                                            <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                                <Descriptions>
                                                    <Descriptions.Item label="Đến kho">{ItemUpdate.tenChiNhanhNhan}</Descriptions.Item>
                                                </Descriptions>
                                            </Col>
                                            <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                                <Descriptions>
                                                    <Descriptions.Item label="Ngày tạo">
                                                        {ItemUpdate.created_At ? moment(ItemUpdate.created_At).format('DD/MM/YYYY, HH:mm') : ""} </Descriptions.Item>
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
                                                    <Descriptions.Item label="Người lập">{ItemUpdate.tenNguoiGui}</Descriptions.Item>
                                                </Descriptions>
                                            </Col>
                                            <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                                <Descriptions>
                                                    <Descriptions.Item label="Chức vụ">
                                                        {ItemUpdate.tenBoPhanGui}
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
                                        <Descriptions.Item label="Loại đề nghị">{ItemUpdate.tenLoaiDeNghi}</Descriptions.Item>
                                    </Descriptions>
                                </Col>
                                <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
                                    <Descriptions>
                                        <Descriptions.Item label="Ghi chú">{ItemUpdate.description}</Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop: "16px" }}>
                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                        <Card>
                            <Row>
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
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Item>
                            <Space size={8}>
                                <Button type="primary" htmlType="submit" icon={<AntdIcons.CheckSquareOutlined />}>
                                    Duyệt
                                    </Button>
                                <Button type="primary" danger htmlType="submit" icon={<AntdIcons.CloseSquareOutlined />}>
                                    Từ chối
                                    </Button>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </Form >
        </Spin>
    )
}
export default FormUpdate;
