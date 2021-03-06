import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload, Tabs } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import DetailComponent from "./Detail";
import { getAPI, postAPI, postFormData, getLocalStorage } from './../../../utils/helpers';
const ModalView = ({ item, isShowing, hide, confirmLoading, toggleStatus, onReceived }) => {
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
    return (
        <>

            {
                isShowing ? ReactDOM.createPortal(

                    <React.Fragment>
                        <Modal title="Yêu cầu nhập sản phẩm" visible={isShowing} okText="Lưu" cancelText="Quay lại" width="80vw"
                           /* onOk={onSubmit}*/ style={{ top: 20 }} onCancel={hide}
                            confirmLoading={confirmLoading}
                            /*okButtonProps={{ form: 'myFormCreate', key: 'submit', htmlType: 'submit' }}*/
                            footer={null}
                        >
                            <DetailComponent item={item} toggleStatus={toggleStatus} onReceived={onReceived} hide={hide}/>
                        </Modal>
                    </  React.Fragment>, document.body
                ) : null
            }
        </>
    )
}
export default ModalView;
