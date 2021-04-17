import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload } from 'antd';
const ModalCreate = ({ isShowing, hide, onPostCreateItem, confirmLoading }) => {
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
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
           Status: data.Status?1:2
        }
        //console.log(obj)
        onPostCreateItem(obj).then(onReset())
    }
    return (
        <>

            {
                isShowing ? ReactDOM.createPortal(

                    <React.Fragment>
                        <Modal title="Tạo mới" visible={isShowing} okText="Lưu" cancelText="Quay lại" width={800}
                           /* onOk={onSubmit}*/ style={{ top: 20 }} onCancel={hide}
                            confirmLoading={confirmLoading}
                            okButtonProps={{ form: 'myFormCreate', key: 'submit', htmlType: 'submit' }}
                        >
                            <Form {...layout} name="nest-messages" form={form} onFinish={onSubmit} id="myFormCreate"
                                validateMessages={validateMessages}
                                initialValues={{
                                    ["Ordering"]: 0
                                }}
                            >
                                <Form.Item name="Name" label="Tên chức vụ" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="Code" label="Mã chức vụ" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="Ordering" label="Thứ tự" rules={[{ type: 'number'}]}>
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
                ) : null
            }
        </>
    )
}
export default ModalCreate;
