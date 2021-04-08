import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload } from 'antd';
const ModalForm = ({ isShowing, hide, data, onPostCreateItem }) => {
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
            Status: data.Status ? 1 : 2,
            isMenu: data.isMenu ? true : false,
        }
        //console.log(obj)
        onPostCreateItem(obj)
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
                            ["Ordering"]: 0
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
                                {data.map(item => (
                                    <Select.Option value={item.value}>{item.label}</Select.Option>
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
        )
    )
}
export default ModalForm;
