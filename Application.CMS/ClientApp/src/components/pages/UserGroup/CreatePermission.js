import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import { Modal } from "antd"
import { useForm, Controller } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import { TreeSelect } from 'antd';
const { SHOW_PARENT } = TreeSelect;
const ModalCreate = ({ isShowing, hide, data }) => {
    const dataJson = data;
    const [state, setState] = useState(['0-0-0']);
    const { register, handleSubmit, watch, errors, control } = useForm();
    const onChange = (value,label,extra) => {
        console.log('onChange ', value);
        console.log('label ', label);
        console.log('extra ', extra);
        setState(value);
    };
    function contains(arr, x) {
        return arr.filter(function (elem) { return elem.value === x }).length > 0;
    }
    const getPermission = (list, listSelected, namePermission) => {
        listSelected.filter((item) => {
            if (contains(list, item)) {
                if (item.children == undefined&&item.id!=="") {
                    if (namePermission != '') namePermission += ',';
                    namePermission += item.id;
                }
                else {
                    getPermission(item.children, namePermission)
                }
            }
        })
        for (var item of list) {
            if (item.children == undefined) {
                if (namePermission != '') namePermission += ',';
                namePermission += item.id;
            }
            else {
                getPermission(item.children, namePermission)
            }
        }
    }
    const tProps = {
        showSearch: true,
        treeData: dataJson,
        value: state,
        allowClear: true,
        autoClearSearchValue: true,
        onChange: onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: '-- Chọn --',
        style: {
            width: '100%',
        }
    };
    const onSubmit = (data) => {
        //var obj = {
        //    "Name": data.Name,
        //    "Ordering": Number.parseInt(data.Ordering),
        //    "Code": data.Code,
        //    "Status": data.Status == true ? 1 : 0
        //}
        //onPostCreateItem(obj)
    }

    return (
        <>
            {
                isShowing ? ReactDOM.createPortal(

                    <React.Fragment>
                        <Modal title="Tạo mới" visible={isShowing} okText="Lưu" cancelText="Quay lại" width={800}
                            onOk={handleSubmit(onSubmit)} style={{ top: 20 }} onCancel={hide}>
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
