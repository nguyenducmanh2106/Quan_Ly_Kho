import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload } from 'antd';
const ModelUpdate = ({ isShowing, hide, data, item, onPostUpdateItem, confirmLoading, Tinh, Huyen, Xa, onChangeSelectTinh, onChangeSelectHuyen }) => {
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
    console.log(item)
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
            Id: item.id,
            Status: data.Status ? 1 : 2
        }
        //console.log(obj)
        onPostUpdateItem(obj)
    }
    const getDefaultOption = (data, item) => {
        var itemDefault = data ? data[0] : {};
        itemDefault = data.find(value =>
            value.value === item.parentId
        )
        return itemDefault
    }
    const onHandleChangeTinh = (value) => {
        onChangeSelectTinh(value)
    }
    const onHandleChangeHuyen = (value) => {
        onChangeSelectHuyen(value)
    }
    return (
        <>
            {isShowing ? ReactDOM.createPortal(

                <React.Fragment>
                    <Modal title="Cập nhật" visible={isShowing} okText="Lưu" cancelText="Quay lại" width={800}
                           /* onOk={onSubmit}*/ style={{ top: 20 }} onCancel={hide}
                        confirmLoading={confirmLoading}
                        okButtonProps={{ form: 'myForm', key: 'submit', htmlType: 'submit' }}
                    >
                        <Form {...layout} name="nest-messages" onFinish={onSubmit} id="myForm"
                            validateMessages={validateMessages}
                            initialValues={{
                                ["Ordering"]: item.ordering,
                                ["ParentId"]: item.parentId,
                                ["Name"]: item.name,
                                ["Code"]: item.code,
                                ["Status"]: item.status == 1 ? true : false,
                                ["TinhId"]: item.tinhId?item.tinhId:-1,
                                ["HuyenId"]: item.huyenId? item.huyenId:-1,
                                ["XaId"]: item.xaId?item.xaId:-1,
                                ["Address"]: item.address,
                                ["Longitude"]: item.longitude,
                                ["Latitude"]: item.latitude,
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
                                    <Select.Option value={0}>--Chọn--</Select.Option>
                                    {data.map(item => (
                                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
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
                                    <Select.Option value={-1}>--Chọn--</Select.Option>
                                    {Tinh.map(item => (
                                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="HuyenId" label="Quận/Huyện"
                            >
                                <Select
                                    showSearch
                                    //style={{ width: 200 }}
                                    placeholder="-- Quận/Huyện --"
                                    optionFilterProp="huyen"
                                    filterOption={(input, option) =>
                                        option.huyen.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.huyen.toLowerCase().localeCompare(optionB.huyen.toLowerCase())
                                    }
                                    onChange={onHandleChangeHuyen}
                                >
                                    <Select.Option value={-1}>--Chọn--</Select.Option>
                                    {Huyen.map(item => (
                                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="XaId" label="Phường/Xã"
                            >
                                <Select
                                    showSearch
                                    //style={{ width: 200 }}
                                    placeholder="-- Phường/Xã --"
                                    optionFilterProp="xa"
                                    filterOption={(input, option) =>
                                        option.xa.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.xa.toLowerCase().localeCompare(optionB.xa.toLowerCase())
                                    }
                                >
                                    <Select.Option value={-1}>--Chọn--</Select.Option>
                                    {Xa.map(item => (
                                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
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
            ) : null}
        </>
    )
}
export default ModelUpdate;
