
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import Skeleton from 'react-loading-skeleton';
import ImgCrop from 'antd-img-crop';
import { url_upload } from "../../../utils/helpers";
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload } from 'antd';
const ModalCreate = ({ isShowing, hide, data, onPostCreateItem, donvi, chucvu, nhomNguoiDung }) => {
    const [fileList, setFileList] = useState([]);
    const { Option } = Select;
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const onSubmit = (data) => {
        //var obj = {
        //    "Name": data.Name,
        //    "Ordering": Number.parseInt(data.Ordering),
        //    "Code": data.Code,
        //    "Status": data.Status == true ? 1 : 0
        //}
        var obj = {
            ...data.user,
            UserGroupId: data.user.UserGroupId ? data.user.UserGroupId.join(","):"",
            PassWord: base64_encode(data.PassWord),
            Avatar: fileList.length>0?fileList[0].name:null,
            File_Base64: fileList.length > 0 ? fileList[0].thumbUrl.split(",").splice(1).join("") : null,
            Status:data.user.Status?1: 0,
            //isRoot:data.user.isRoot?1:0,
            //isThongKe: data.user.isThongKe ? 1 : 0,
            PhoneNumber: data.user.PhoneNumber.toString()
        }
        //console.log(obj)
        onPostCreateItem(obj)
    }
    //const handleChange = (value) => {
    //    console.log(value)
    //}
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
    //const beforeUpload = (file) => {
    //    const isLt2M = file.size / 1024 / 1024 < 2;
    //    if (!isLt2M) {
    //        file.flag = true;
    //        return false;
    //    }
    //    return true;
    //}
    
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        //console.log(fileList)
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
                            <Form {...layout} name="nest-messages" onFinish={onSubmit} id="myForm" validateMessages={validateMessages}>
                                <Form.Item name={['user', 'UserName']} label="Tên đăng nhập" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['user', 'Email']} label="Email" rules={[{ type: 'email' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['user', 'FullName']} label="Tên đầy đủ" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['user', 'DonViId']} label="Đơn vị">
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
                                <Form.Item name={['user', 'ChucVuId']} label="Chức vụ">
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
                                <Form.Item name={['user', 'Avatar']} label="Ảnh đại diện">
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

                                <Form.Item name={['user', 'PhoneNumber']} label="Số điện thoại" rules={[{ type: 'number', required: true }]}>
                                    <InputNumber
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name='PassWord'
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                        }, ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('PassWord').length>=6) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject(new Error('Mật khẩu phải lớn hơn 6 ký tự'));
                                            },
                                        }),
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="ConFirmPassWord"
                                    label="Confirm Password"
                                    dependencies={['PassWord']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('PassWord') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Mật khẩu nhập lại không khớp'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item name={['user', 'UserGroupId']} label="Nhóm người dùng">
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="-- Chọn nhóm quyền --"
                                        //defaultValue={['china']}
                                        //onChange={handleChange}
                                        optionLabelProp="label"
                                    >
                                        {nhomNguoiDung.map(item => (
                                            <Option value={item.id} label={item.name}>
                                                <div className="demo-option-label-item">
                                                    <span role="img" aria-label={item.name}>
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item name={['user', 'Status']} label="Trạng thái" valuePropName="checked">
                                    <Checkbox />
                                </Form.Item>
                                <Form.Item name={['user', 'isRoot']} label="Quản trị tối cao" valuePropName="checked">
                                    <Checkbox />
                                </Form.Item>
                                <Form.Item name={['user', 'isThongKe']} label="Thống kê" valuePropName="checked">
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
export default ModalCreate;
