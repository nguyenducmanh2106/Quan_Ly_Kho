import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload } from 'antd';
const ModalForm = ({ isShowing, hide, item, confirmLoading }) => {
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
    const onCloseForm = () => {
        form.resetFields();
        hide()
    }
    const onSubmit = (data) => {
        var obj = {
            ...data,
            Status: data.Status ? 1 : 2,
        }
        //console.log(obj)
    }

    return (
        <Modal title="Bạn có chắc chắn muốn từ chối không?" visible={isShowing} okText="Đồng ý" cancelText="Quay lại" width={416}
                           /* onOk={onSubmit}*/ style={{ top: 100 }} onCancel={onCloseForm}
            confirmLoading={confirmLoading}
            okButtonProps={{ form: 'myFormReject', key: 'reject', htmlType: 'submit' }}
        >
            <Form {...layout} name="nest-messages" form={form} onFinish={onSubmit} id="myFormReject"
                validateMessages={validateMessages}
                initialValues={{
                    ["Ordering"]: 0,
                }}
            >
                <Form.Item name="LyDoTuChoi" label="Lý do từ chối" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default ModalForm;
