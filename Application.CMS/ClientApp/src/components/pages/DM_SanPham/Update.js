import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ImgCrop from 'antd-img-crop';
import { url_upload } from "../../../utils/helpers";
import {
    Form, Input, InputNumber, Button, Select,
    Checkbox, Upload, Skeleton, Col, Row, Card, Tooltip, Space, Collapse, Divider, notification
} from 'antd';
import * as AntdIcons from '@ant-design/icons';
import { getAPI, postAPI, getCurrentLogin } from './../../../utils/helpers';
import {
    useParams
} from "react-router-dom";

const FormUpdate = () => {
    let { id } = useParams();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [FileListDefault, setFileListDefault] = useState([]);
    const [dataLoaiSP, setDataLoaiSP] = useState([]);
    const [dataThuongHieu, setDataThuongHieu] = useState([]);
    const [dataXuatXu, setDataXuatXu] = useState([]);
    const [dataDonViTinh, setDataDonViTinh] = useState([]);
    const [SanPhamUpdate, setSanPhamUpdate] = useState({});
    const { Option } = Select;

    useEffect(() => {
        async function getLoaiSanpham() {
            var fetchData = await getAPI(`api/dm_loaisanpham/get-all-data-active`);
            if (fetchData.status == true) {
                setDataLoaiSP(fetchData.result)
            }
        }
        async function getThuongHieu() {
            var fetchData = await getAPI(`api/dm_thuonghieu/get-all-data-active`);
            if (fetchData.status == true) {
                setDataThuongHieu(fetchData.result)
            }
        }
        async function getXuatXu() {
            var fetchData = await getAPI(`api/dm_xuatxu/get-all-data-active`);
            if (fetchData.status == true) {
                setDataXuatXu(fetchData.result)
            }
        }
        async function getDonViTinh() {
            var fetchData = await getAPI(`api/dm_donvitinh/get-all-data-active`);
            if (fetchData.status == true) {
                setDataDonViTinh(fetchData.result)
            }
        }
        //gọi hàm
        getLoaiSanpham()
        getThuongHieu()
        getXuatXu()
        getDonViTinh()
    }, [])
    useEffect(() => {
        let getSanPhamUpdate = async () => {
            var fetchdata = await getAPI(`api/dm_sanpham/find-by-id?id=${id}`);
            if (fetchdata.status == true) {
                var data = fetchdata.result
                var img = [
                    {
                        uid: data.id,
                        name: data.avatar,
                        status: 'done',
                        url: "data:image/png;base64," + data.pathAvatar,
                    }]
                setFileList(img)
                setSanPhamUpdate(data)
                console.log(data)
                form.setFieldsValue({
                    Name: data.name,
                    Code: data.code,
                    Barcode: data.barcode,
                    KhoiLuong: data.khoiLuong,
                    DonViTinh_Id: data.donViTinh_Id,
                    GiaBanLe: data.giaBanLe,
                    GiaBanBuon: data.giaBanBuon,
                    GiaNhap: data.giaNhap,
                    GiaCu: data.giaCu,
                    LoaiSP: data.loaiSP,
                    ThuongHieu_Id: data.thuongHieu_Id,
                    XuatXu_Id: data.xuatXu_Id,
                    Status: data.status == 1 ? true : false,
                    ThuocTinhs: data.thuocTinhs,

                });
            }
        }
        //gọi hàm
        getSanPhamUpdate();
    }, [])
    const onSubmit = (data) => {
        var obj = {
            ...data,
            Id: SanPhamUpdate.id,
            Code: SanPhamUpdate.code,
            Avatar: fileList.length > 0 ? fileList[0].name : null,
            File_Base64: FileListDefault.length > 0 ? FileListDefault[0].thumbUrl.split(",").splice(1).join("") : null,
            Status: data.Status ? 1 : 2,
            Updated_By: getCurrentLogin().id
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
    const closeForm = () => {
        setFileList([]);
    }
    const onChange = ({ fileList: newFileList }) => {
        //mỗi lần thấy đổi sẽ set ảnh và đổ vào frame ảnh trên view
        setFileList(newFileList);
        //chỉ khi thay đổi ảnh mới có giá trị để set up ảnh
        setFileListDefault(newFileList)
        //console.log(newFileList)
    };
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    async function onPostUpdateItem(obj) {
        //setConfirmLoading(true)
        var result = await postAPI('api/dm_sanpham/update', JSON.stringify(obj))
        if (result.status) {
            //setAction(true)
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

    return (
        <Form
            form={form}
            onFinish={onSubmit}
            validateMessages={validateMessages}
            initialValues={{
                //["Name"]: sanPhamUpdate?.name,
                //["Code"]: sanPhamUpdate.code,
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
                        }>
                        <Row>
                            <Col>
                                <Form.Item name="Name" label="Tên sản phẩm" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Row gutter={24}>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="Barcode" label="Mã vạch">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="KhoiLuong" label="Khối lượng" >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row gutter={24}>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="DonViTinh_Id" label="Đơn vị tính">
                                            <Select
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
                                                {dataDonViTinh.map(item => {
                                                    return (
                                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                                    )
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>

                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Form.Item name="Status" label="" valuePropName="checked">
                                    <Checkbox>Đang giao dịch</Checkbox>
                                </Form.Item>
                            </Col>

                        </Row>
                    </Card>
                    <Card
                        style={{ marginTop: 16 }}
                        title={
                            <Space size={8}>
                                <AntdIcons.DollarOutlined />
                                                    Giá sản phẩm
                                                </Space>
                        }
                    >
                        <Row>
                            <Col>
                                <Row gutter={24}>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="GiaBanLe" label="Giá bán lẻ">
                                            <InputNumber
                                                style={{ width: "100%" }}
                                                formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\đ\s?|(,*)/g, '')}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="GiaBanBuon" label="Giá bán buôn">
                                            <InputNumber
                                                style={{ width: "100%" }}
                                                formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\đ\s?|(,*)/g, '')}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row gutter={24}>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="GiaNhap" label="Giá nhập">
                                            <InputNumber
                                                style={{ width: "100%" }}
                                                formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\đ\s?|(,*)/g, '')}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                                        <Form.Item name="GiaCu" label="Giá cũ">
                                            <InputNumber
                                                style={{ width: "100%" }}
                                                formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\đ\s?|(,*)/g, '')}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                    <Collapse expandIconPosition="right" style={{ marginTop: 16 }}>
                        <Collapse.Panel header="Thuộc tính" key="1">
                            <Form.List name="ThuocTinhs">
                                {(fields, { add, remove }) => (
                                    <>
                                        {console.log(fields)}
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'id']}
                                                    fieldKey={[fieldKey, 'id']}
                                                    style={{ display: "none" }}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'name']}
                                                    fieldKey={[fieldKey, 'name']}
                                                >
                                                    <Input placeholder="Tên thuộc tính" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'value']}
                                                    fieldKey={[fieldKey, 'value']}
                                                >
                                                    <Input placeholder="Giá trị" />
                                                </Form.Item>
                                                <AntdIcons.MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} icon={<AntdIcons.PlusOutlined />}>
                                                Thêm thuộc tính
              </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Collapse.Panel>
                    </Collapse>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
                    <Card
                        style={{ marginTop: 16 }}
                        title={
                            <Space size={8}>
                                <AntdIcons.BarsOutlined />
                                                    Phân loại
                                                </Space>
                        }>
                        <Row>
                            <Col>
                                <Form.Item name="LoaiSP" label="Loại sản phẩm">
                                    <Select
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
                                        {dataLoaiSP.map(item => {
                                            return (
                                                <Option key={item.id} value={item.id}>{item.name}</Option>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item name="ThuongHieu_Id" label="Thương Hiệu">
                                    <Select
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
                                        {dataThuongHieu.map(item => {
                                            return (
                                                <Option key={item.id} value={item.id}>{item.name}</Option>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item name="XuatXu_Id" label="Xuất xứ">
                                    <Select
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
                                        {dataXuatXu.map(item => {
                                            return (
                                                <Option key={item.id} value={item.id}>{item.name}</Option>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>

                        </Row>
                    </Card>
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
                                <Form.Item name="Avatar" label="">
                                    <ImgCrop rotate>
                                        <Upload
                                            accept="image/*"
                                            action={url_upload}
                                            listType="picture-card"
                                            fileList={fileList}
                                            onChange={onChange}
                                            onPreview={onPreview}
                                        //beforeUpload={beforeUpload}
                                        >
                                            {fileList.length < 1 && '+ Upload'}
                                        </Upload>
                                    </ImgCrop>
                                </Form.Item>
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
                    </Card>
                </Col>
            </Row>
        </Form >
    )
}
export default FormUpdate;
