import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload } from 'antd';
const ModelUpdate = ({ isShowing, hide, data, item, onPostUpdateItem, confirmLoading }) => {
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
            Id: item.id,
            ...data,
            Status: data.Status ? 1 : 2,
            isMenu: data.isMenu ? true : false,
        }
        //console.log(obj)
        onPostUpdateItem(obj)
    }
    return (
        <>
            {isShowing ? ReactDOM.createPortal(
                <React.Fragment>
                    <Modal title="Cập nhật" visible={isShowing} okText="Lưu" cancelText="Quay lại" width={800}
                           /* onOk={onSubmit}*/ style={{ top: 20 }} onCancel={hide}
                        confirmLoading={confirmLoading}
                        okButtonProps={{ form: 'myFormUpdate', key: 'submit', htmlType: 'submit' }}
                    >
                        <Form {...layout} name="nest-messages" onFinish={onSubmit} id="myFormUpdate"
                            validateMessages={validateMessages}
                            initialValues={{
                                ["Ordering"]: item.ordering,
                                ["ParentId"]: item.parentId,
                                ["Name"]: item.name,
                                ["Code"]: item.code,
                                ["Status"]: item.status == 1 ? true : false,
                                ["isMenu"]: item.isMenu ? true : false,
                                ["Url"]: item.url,
                                ["icon"]: item.icon
                            }}
                        >
                            <Form.Item name="ParentId" label="Danh mục cha">
                                <Select
                                    showSearch
                                    //style={{ width: 200 }}
                                    placeholder="-- Chọn danh mục --"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    <Select.Option value={0}>----</Select.Option>
                                    {data.map(item => (
                                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="Name" label="Tên danh mục" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="icon" label="Icon">
                                <Input />
                            </Form.Item>
                            <Form.Item name="Url" label="Đường dẫn">
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
                            <Form.Item name="isMenu" label="Hiển thị menu" valuePropName="checked">
                                <Checkbox />
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
