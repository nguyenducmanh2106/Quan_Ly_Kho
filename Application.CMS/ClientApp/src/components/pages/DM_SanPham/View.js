import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload, Tabs } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import DetailComponent from "./Detail";
const ModalView = ({ item, isShowing, hide, confirmLoading }) => {
   console.log(item)
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
                        <Modal title={item.name} visible={isShowing} okText="Lưu" cancelText="Quay lại" width="80vw"
                           /* onOk={onSubmit}*/ style={{ top: 20 }} onCancel={hide}
                            confirmLoading={confirmLoading}
                            /*okButtonProps={{ form: 'myFormCreate', key: 'submit', htmlType: 'submit' }}*/
                            footer={null}
                        >
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane
                                    tab={
                                        <span>
                                            <AntdIcons.IssuesCloseOutlined />
          Thông tin
        </span>
                                    }
                                    key="1"
                                >
                                    <DetailComponent item={item}/>
    </Tabs.TabPane>
                                <Tabs.TabPane
                                    tab={
                                        <span>
                                            <AntdIcons.HistoryOutlined />
          Tồn kho
        </span>
                                    }
                                    key="2"
                                >
                                    Tab 2
    </Tabs.TabPane>
                            </Tabs>
                        </Modal>
                    </  React.Fragment>, document.body
                ) : null
            }
        </>
    )
}
export default ModalView;
