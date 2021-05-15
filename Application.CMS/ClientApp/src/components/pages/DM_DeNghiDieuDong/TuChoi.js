import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom'
import {
    Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload, notification
} from 'antd';
import * as AntdIcons from '@ant-design/icons';
import { getAPI, postAPI, getCurrentLogin } from './../../../utils/helpers';
const ModalForm = ({ isShowing, hide, item, confirmLoading }) => {
    const [form] = Form.useForm();
    let history = useHistory()
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
        }
        //console.log(obj)
        onPostTuChoiItem(obj)
    }
    async function onPostTuChoiItem(obj) {

        var data = {
            ...obj,
            Code: item.code
        }
        console.log(data)
        //setConfirmLoading(true)
        hide()
        postAPI('api/dm_denghidieudong/tuchoi', JSON.stringify(data)).then(result => {
            if (result.status) {
                notification.success({
                    message: result.message,
                    duration: 3

                })
                setTimeout(() => {
                    history.push({
                        pathname: `/dm_denghidieudong/xuat`,
                        state: { controller: "Yêu cầu nhập-xuất hàng", action: "Xuất" }
                    });
                }, 1000)
            }
            else {
                notification.error({
                    message: result.message,
                    duration: 3

                })
            }
           
        });
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
                <Form.Item name="LyDoTuChoi" label="Lý do từ chối" rules={[{ required: true }]} style={{ width: '100%' }}>
                    <Input.TextArea placeholder="Lý do từ chối *" style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default ModalForm;
