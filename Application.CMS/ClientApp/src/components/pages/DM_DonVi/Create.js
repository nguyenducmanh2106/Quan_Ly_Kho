import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload } from 'antd';
const ModalCreate = ({ isShowing, hide, data, onPostCreateItem, Tinh, Huyen, Xa, onChangeSelectTinh, onChangeSelectHuyen }) => {
    const { Option } = Select;
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
    const layout = {
        labelCol: {
            sm: { span: 24 },
            md: { span: 8 },
        },
        wrapperCol: {
            sm: { span: 24 },
            md: { span: 16 }
        },
    };
    const onSubmit = (data) => {
        var obj = {
            ...data,
            Status: data.Status ? 1 : 2
        }
        console.log(obj)
        //onPostCreateItem(obj)
    }
    const onHandleChangeTinh = (value) => {
        //console.log(value)
        onChangeSelectTinh(value)
    }
    const onHandleChangeHuyen = (value) => {
        //console.log(value)
        onChangeSelectHuyen(value)
    }
    return (
        ReactDOM.createPortal(
            <React.Fragment>
                <Modal title="Tạo mới" visible={isShowing} okText="Lưu" cancelText="Quay lại" width={800}
                           /* onOk={onSubmit}*/ style={{ top: 20 }} onCancel={hide}
                    okButtonProps={{ form: 'myForm', key: 'submit', htmlType: 'submit' }}
                >
                    <Form {...layout} name="nest-messages" onFinish={onSubmit} id="myForm"
                        validateMessages={validateMessages}
                        initialValues={{
                            ["Ordering"]: 0,
                            ["TinhId"]: "-1",
                            ["HuyenId"]: "-1",
                            ["XaId"]: "-1",
                        }}
                    >
                        <Form.Item name="ParentId" label="Đơn vị cha">
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
                                {data.map(item => (
                                    <Option key={item.value} value={item.value}>{item.label}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="Name" label="Tên đơn vị" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="Code" label="Mã đơn vị" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        
                        <Form.Item name="TinhId" label="Tỉnh/Thành phố"
                        >
                            <Select
                                showSearch
                                //style={{ width: 200 }}
                                placeholder="-- Tỉnh/Thành phố --"
                                optionFilterProp="tp"
                                filterOption={(input, option) =>
                                    option.tp.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.tp.toLowerCase().localeCompare(optionB.tp.toLowerCase())
                                }
                                onChange={onHandleChangeTinh}
                                
                            >
                                <Option value="-1">--Chọn--</Option>
                                {Tinh.map(item => (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="HuyenId" label="Quận/Huyện"
                        >
                            <Select
                                showSearch
                                //style={{ width: 200 }}
                                placeholder="-- Quận/Huyện --"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                onChange={onHandleChangeHuyen}
                            >
                                <Option value="-1">--Chọn--</Option>
                                {Huyen.map(item => (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="XaId" label="Phường/Xã"
                        >
                            <Select
                                showSearch
                                //style={{ width: 200 }}
                                placeholder="-- Phường/Xã --"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                <Option value="-1">--Chọn--</Option>
                                {Xa.map(item => (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="Address" label="Địa chỉ">
                            <Input />
                        </Form.Item>
                        <Form.Item name="Longitude" label="Kinh độ" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="Latitude" label="Vĩ độ" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="Ordering" label="Thứ tự" rules={[{ type: 'number' }]}>
                            <InputNumber
                                style={{
                                    width: "100%",
                                }}
                                min="0"
                            />
                        </Form.Item>
                        <Form.Item name="Status" label="Trạng thái" valuePropName="checked">
                            <Checkbox />
                        </Form.Item>
                    </Form>
                </Modal>
            </  React.Fragment>, document.body
        )
    )
}
export default ModalCreate;
