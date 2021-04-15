import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload } from 'antd';
const ChangePass = ({ isShowing, hide, item, onPostChangePassWordItem, confirmLoading }) => {
    //console.log(item)
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
            ID: item.id,
            PassWord: base64_encode(data.PassWord),
            RePassWord: base64_encode(data.RePassWord),
        }
        console.log(obj)
        onPostChangePassWordItem(obj)
    }

    return (
        <>

            {
                isShowing ? ReactDOM.createPortal(

                    <React.Fragment>
                        <Modal title="Thay đổi mật khẩu" visible={isShowing} okText="Lưu" cancelText="Quay lại" width={800}
                           /* onOk={onSubmit}*/ style={{ top: 20 }} onCancel={hide}
                            confirmLoading={confirmLoading}
                            okButtonProps={{ form: 'myForm', key: 'submit', htmlType: 'submit' }}
                        >
                            <Form {...layout} name="nest-messages" onFinish={onSubmit} id="myForm"
                                validateMessages={validateMessages}
                                initialValues={{
                                }}
                            >
                                <Form.Item name="PassWord" label="Mật khẩu mới" rules={[{ required: true }]}>
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    name="RePassWord"
                                    label="Nhập lại mật khẩu"
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
                            </Form>
                        </Modal>
                    </  React.Fragment>, document.body
                ) : null
            }
        </>
    )
}
export default ChangePass;
