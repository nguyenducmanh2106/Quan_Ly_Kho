import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Badge, InputNumber, Menu, Button, Modal, Select, Checkbox, Upload, Pagination, Col, Row, Tooltip, Dropdown } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import renderHTML from 'react-render-html';
import { getLocalStorage } from './../../../utils/helpers';
import { PERMISS_USER_CURRENT } from "../../../utils/constants"
import * as constantPermission from "../../../utils/constantPermission"
import { defineAbilitiesFor, _isPermission } from "../../elements/Config_Roles/appAbility"
function Table(props) {
    //khai báo state
    const [array, setArray] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [typeSort, setTypeSort] = useState(true);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [listCheck, setListCheck] = useState([]);
    useEffect(() => {
        props.obj ? setArray(props.obj.data) : setArray([]);
        props.obj ? setPage(props.obj.page) : setPage(page);
        props.obj ? setPageSize(props.obj.pageSize) : setPageSize(pageSize);
        props.obj ? setTotal(props.obj.total) : setTotal(0);
        props.obj ? setTotalPage(props.obj.totalPage) : setTotal(0);
        defineAbilitiesFor(getLocalStorage(PERMISS_USER_CURRENT))
        return () => {
            setIndeterminate(false)
            setCheckAll(false)
        }
    }, [props.obj])
    const onNextPage = (page, size) => {
        //console.log(page)
        //console.log(size)
        props.onChangePage(page, size)
    }
    const update = (item) => {
        props.onToggleFormpdate();
        props.UpdateItem(item)
    }
    const updatePosition = (value) => {
        //item.ordering = Number.parseInt(value)
        console.log(value)
        //props.onUpdateItemPosition(item)
    }
    const toggleStatus = (status, item) => {
        item.status = status;
        props.toggleStatus(item)
    }
    const handleInputChange = (event) => {
        var arrayRemove = []
        var arrayCheck = document.querySelectorAll(".checkbox-tick");
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        //hiển thị trạng thái check
        if (target.id === 'chkall') {
            if (value == true) {
                arrayCheck.forEach((value, index) => {
                    value.checked = true;
                })
            }
            if (value == false) {
                arrayCheck.forEach((value, index) => {
                    value.checked = false
                })
            }
        }
        //những input[type=checkbox] có class ='checkbox-tick' mà có checked==true thì push id vào mảng arrayRemove
        arrayCheck.forEach((value, index) => {
            if (value.checked) {
                arrayRemove.push(value.id);
            }
        })
        setIndeterminate(!!arrayRemove.length && arrayRemove.length < arrayCheck.length);
        setCheckAll(arrayRemove.length === arrayCheck.length);
        console.log(arrayRemove)
        props.onMultiDelete(arrayRemove)

    }
    const onDelete = (item) => {
        props.onDeleteItem(item)
    }

    const renderBody = () => {
        var result = ""
        result = array != [] ? array.map((item, index) => {
            return (
                <tr key={item.id} className="ant-table-row ant-table-row-level-0">
                    <td className="ant-table-cell">
                        <input className="checkbox-tick" type="checkbox" id={item.id} onChange={handleInputChange} />
                    </td>
                    <td className="text-center w50px">
                        {(index + 1) + (page - 1) * pageSize}
                    </td>
                    <td>
                        {item.name}
                    </td>
                    <td>
                        {item.ordering}
                    </td>
                    <td>
                        {item.code}
                    </td>
                    <td>

                        {item.status == 1 ? <Button type="primary" className="success-outline" ghost onClick={() => toggleStatus(2, item)}>
                            <Badge status="success" text="Đang hoạt động" />
                        </Button> : <Button type="primary" className="danger-outline" ghost onClick={() => toggleStatus(1, item)}>
                                <Badge status="error" text="Ngừng hoạt động" />
                            </Button>}
                    </td>

                    {_isPermission(constantPermission.EDIT, constantPermission.DM_CHUCVU) || _isPermission(constantPermission.DELETE, constantPermission.DM_CHUCVU) ?
                        <td>
                            <Dropdown placement="bottomCenter" overlay={() => (
                                <Menu>
                                    {_isPermission(constantPermission.EDIT, constantPermission.DM_CHUCVU) ?
                                        <Menu.Item style={{ textAlign: "center" }} key="2">
                                            <Tooltip title="Chỉnh sửa">
                                                <Button type="primary" shape="circle" icon={<AntdIcons.EditOutlined />} onClick={() => update(item)} />
                                            </Tooltip>
                                        </Menu.Item> : null
                                    }
                                    {_isPermission(constantPermission.DELETE, constantPermission.DM_CHUCVU) ?
                                        <Menu.Item style={{ textAlign: "center" }} key="3">
                                            <Tooltip title="Xoá">
                                                <Button type="primary" shape="circle" className="danger" icon={<AntdIcons.DeleteOutlined />} onClick={() => onDelete(item)} />
                                            </Tooltip>
                                        </Menu.Item> : null
                                    }

                                </Menu>
                            )} trigger={['click']}>
                                <Button>
                                    <AntdIcons.UnorderedListOutlined /> <AntdIcons.DownOutlined />
                                </Button>
                            </Dropdown>
                        </td> : null
                    }


                </tr>
            );
        }) : <span>Dữ liệu đang cập nhật...</span>
        return result
    }
    const onSort = (name) => {
        var itemClick = document.querySelectorAll("table th.sapxep");
        for (var item of itemClick) {
            var current_ClassName = item.className;
            console.log(current_ClassName)
            if (item.getAttribute("id") == name) {
                if (current_ClassName == "sapxep" || current_ClassName == "sapxep _desc") {
                    item.className = "sapxep _asc"
                    item.childNodes[1].className = "fa fa-sort fa-sort-up";
                    name += "_asc";
                }
                else {
                    item.className = "sapxep _desc"
                    item.childNodes[1].className = "fa fa-sort fa-sort-down";
                    name += "_desc";
                }

            }
            else {
                item.className = "sapxep"
                item.childNodes[1].className = "fa fa-sort";
            }
        }
        props.onSetNameSort(name)
    }
    return (
        <>

            <form className="ant-table-wrapper">
                <div className="ant-table ant-table-bordered ant-table-ping-right ant-table-fixed-column ant-table-scroll-horizontal ant-table-has-fix-left ant-table-has-fix-right">
                    <div className="ant-table-container">
                        <div className="ant-table-content">
                            <table style={{ tableLayout: "auto" }}>
                                <thead className="ant-table-thead">
                                    <tr>
                                        <th>
                                            <Checkbox indeterminate={indeterminate} id="chkall" onChange={handleInputChange} checked={checkAll} />

                                        </th>
                                        <th className="text-center">STT</th>
                                        <th className="sapxep text-center" id="Name" onClick={() => onSort("Name")}>
                                            Tên chức vụ
                                <i className="fa fa-sort"></i>
                                        </th>
                                        <th className="sapxep text-center" id="Ordering" onClick={() => onSort("Ordering")}>
                                            Thứ tự
                                <i className="fa fa-sort"></i>
                                        </th>
                                        <th className="sapxep text-center" id="Code" onClick={() => onSort("Code")}>
                                            Mã
                                <i className="fa fa-sort"></i>
                                        </th>
                                        <th className="text-center">
                                            Trạng thái
        </th>
                                        {_isPermission(constantPermission.EDIT, constantPermission.DM_CHUCVU) || _isPermission(constantPermission.DELETE, constantPermission.DM_CHUCVU) ?
                                            <th className="text-center">
                                                Thao tác
                                            </th> : null
                                        }
                                    </tr>
                                </thead>
                                <tbody className="ant-table-tbody">
                                    {renderBody()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </form>
            <Row>
                <Col xs={{ span: 23, offset: 1 }} lg={{ span: 22, offset: 2 }}>
                    <Pagination className="ant-table-pagination ant-table-pagination-right"
                        total={total}
                        onChange={onNextPage}
                        showSizeChanger
                        showTotal={total => `Tổng số bản ghi: ${total}`}
                        defaultPageSize={pageSize}
                        pageSizeOptions={[10, 20, 50, 100]}
                        responsive
                        current={page}
                    />
                </Col>
            </Row>

        </>
    )
};
export default Table;
