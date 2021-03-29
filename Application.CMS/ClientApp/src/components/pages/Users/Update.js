﻿
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import ImgCrop from 'antd-img-crop';
import { url_upload } from "../../../utils/helpers";
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload } from 'antd';
const ModalUpdate = ({ isShowing, hide, item, onPostUpdateItem, donvi, chucvu, nhomNguoiDung }) => {
    const [fileList, setFileList] = useState([]);
    const { Option } = Select;
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    useEffect(() => {
        var objImg = [
            {
                uid: item?.id.toString(),
                name: item?.avatar,
                status: 'done',
                url: "data:image/png;base64," + item?.pathAvatar,
            },
        ]
        //console.log(objImg)
        setFileList(objImg)
    }, [item])
    const onSubmit = (data) => {
        console.log(fileList)
        var obj = {
            ...data,
            Id: item?.id,
            UserGroupID: data.UserGroupID ? data.UserGroupID.join(",") : "",
            PassWord: base64_encode(data.PassWord),
            Avatar: fileList.length > 0 ? fileList[0].name : null,
            File_Base64: fileList.length > 0 ? fileList[0].url.split(",").splice(1).join("") : null,
            Status: data.Status ? 1 : 0,
            isRoot: data.isRoot ? true : false,
            isThongKe: data.isThongKe ? true : false,
            PhoneNumber: data.PhoneNumber.toString()
        }
        //console.log(data)
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
        hide()
    }
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log(fileList)
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
    return (
        <>

            {
                isShowing ? ReactDOM.createPortal(

                    <React.Fragment>
                        <Modal title="Tạo mới" visible={isShowing} okText="Lưu" cancelText="Quay lại" width={800}
                           /* onOk={onSubmit}*/ style={{ top: 20 }} onCancel={closeForm}
                            okButtonProps={{ form: 'myForm', key: 'submit', htmlType: 'submit' }}
                        >
                            <Form {...layout} name="nest-messages" onFinish={onSubmit} id="myForm"
                                validateMessages={validateMessages}
                                initialValues={{
                                    ['UserName']: item.userName,
                                    ["Email"]: item?.email,
                                    ["FullName"]: item?.fullName,
                                    ["DonViId"]: item?.donViId,
                                    ["ChucVuId"]: item?.chucVuId,
                                    ["PhoneNumber"]: item?.phoneNumber,
                                    ["UserGroupID"]: item?.UserGroupID,
                                    ["Status"]: item.status == 1 ? true : false,
                                    ["isRoot"]: item.isRoot ? true : false,
                                    ["isThongKe"]: item.isThongKe ? true : false,
                                }}
                            >
                                <Form.Item name="UserName" label="Tên đăng nhập" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="Email" label="Email" rules={[{ type: 'email' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="FullName" label="Tên đầy đủ" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="DonViId" label="Đơn vị">
                                    <Select
                                        showSearch
                                        //style={{ width: 200 }}
                                        placeholder="-- Chọn đơn vị --"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        {donvi.map(item => (
                                            <Option value={item.id}>{item.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="ChucVuId" label="Chức vụ">
                                    <Select
                                        showSearch
                                        //style={{ width: 200 }}
                                        placeholder="-- Chọn chức vụ --"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        {chucvu.map(item => (
                                            <Option value={item.id}>{item.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="Avatar" label="Ảnh đại diện">
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
                                <Form.Item name="PhoneNumber" label="Số điện thoại" rules={[{ type: 'number', required: true }]}>
                                    <InputNumber
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item name="UserGroupID" label="Nhóm người dùng"
                                    //valuePropName="option"
                                >
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="-- Chọn nhóm quyền --"
                                        //onChange={handleChange}
                                        //optionLabelProp="label"
                                    >
                                        {nhomNguoiDung.map(value => {
                                            return (
                                                <Option value={value.id} label={value.name}>
                                                    <div className="demo-option-label-item">
                                                        <span role="img" aria-label={value.name}>
                                                            {value.name}
                                                        </span>
                                                    </div>
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="Status" label="Trạng thái" valuePropName="checked">
                                    <Checkbox />
                                </Form.Item>
                                <Form.Item name="isRoot" label="Quản trị tối cao" valuePropName="checked">
                                    <Checkbox />
                                </Form.Item>
                                <Form.Item name="isThongKe" label="Thống kê" valuePropName="checked">
                                    <Checkbox />
                                </Form.Item>
                            </Form>
                        </Modal>

                    </  React.Fragment>, document.body
                ) : null
            }
        </>
    )
}
export default ModalUpdate;
