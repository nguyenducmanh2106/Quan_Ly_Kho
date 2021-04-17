import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, InputNumber, Button, Modal, Select, Checkbox, Upload, TreeSelect, Skeleton } from 'antd';
const { SHOW_PARENT, SHOW_NONE, SHOW_CHILD } = TreeSelect;
const ModalCreate = ({ isShowing, hide, data, onCreatePermission, confirmLoading,listPermission }) => {
    const dataJson = data;
    const [state, setState] = useState([]);
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 24 },
    };
    useEffect(() => {
        setState(listPermission);
    }, [listPermission])
    const onChange = (value,label) => {
        //console.log('onChange ', value);
        //console.log('label ', label);
        setState(value);
    };
    const SavePermission = () => {
        var data = state;
        onCreatePermission(data)
        setState([])
    }
    const tProps = {
        showSearch: true,
        treeData: dataJson,
        //value: state,
        allowClear: true,
        autoClearSearchValue: true,
        onChange: onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_CHILD,
        placeholder: '-- Chọn --',
        style: {
            width: '100%',
        }
    };

    return (
        <>
            {
                isShowing ? ReactDOM.createPortal(

                    <React.Fragment>
                        <Modal title="Tạo mới" visible={isShowing} okText="Lưu" cancelText="Quay lại" width={800}
                           /* onOk={onSubmit}*/ style={{ top: 20 }} onCancel={hide}
                            confirmLoading={confirmLoading}
                            okButtonProps={{ form: 'myFormCreatePermission', key: 'submit', htmlType: 'submit' }}
                        >
                            <Form {...layout} name="nest-messages" onFinish={SavePermission} id="myFormCreatePermission"
                                initialValues={{
                                    ['Permisson']: listPermission,

                                }}
                            >
                               
                                <Form.Item name="Permisson">
                                    <TreeSelect {...tProps} />
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
