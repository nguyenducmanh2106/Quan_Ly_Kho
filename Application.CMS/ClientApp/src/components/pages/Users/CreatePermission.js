import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import { Modal } from "antd"
import { useForm, Controller } from "react-hook-form";
import { TreeSelect } from 'antd';
const { SHOW_PARENT, SHOW_NONE, SHOW_CHILD } = TreeSelect;
const ModalCreate = ({ isShowing, hide, data, onCreatePermission, listPermission }) => {
    const dataJson = data;
    const [state, setState] = useState([]);
    const { register, handleSubmit, watch, errors, control } = useForm();
    const onChange = (value,label) => {
        //console.log('onChange ', value);
        //console.log('label ', label);
        setState(value);
    };
    useEffect(() => {
        setState(listPermission)
    }, [listPermission])
    const SavePermission = () => {
        var data = state;
        onCreatePermission(data)
        setState([])
    }
    const tProps = {
        showSearch: true,
        treeData: dataJson,
        value: state,
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
                            onOk={handleSubmit(SavePermission)} style={{ top: 20 }} onCancel={hide}>
                            <form>
                                <TreeSelect {...tProps} />
                            </form>
                        </Modal>
                    </  React.Fragment>, document.body
                ) : null
            }
        </>
    )
}
export default ModalCreate;
