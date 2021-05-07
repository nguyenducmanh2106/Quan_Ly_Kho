import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Form, Input, Image, Badge, InputNumber, Menu, Button, Modal, Select, Checkbox, Upload, Pagination, Col, Row, Tooltip, Dropdown, Space } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import renderHTML from 'react-render-html';
import logoDefault from "../../../static/images/user-profile.jpeg"
import { Can } from "../../elements/Config_Roles/Can"
import { getLocalStorage, getCurrentLogin } from "../../../utils/helpers"
import { PERMISS_USER_CURRENT } from "../../../utils/constants"
import * as constantPermission from "../../../utils/constantPermission"
import { defineAbilitiesFor, _isPermission } from "../../elements/Config_Roles/appAbility"
function Table(props) {
    //khai báo state
    //console.log(Can)
    const [array, setArray] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [typeSort, setTypeSort] = useState(true);
    useEffect(() => {
        props.obj ? setArray(props.obj.data) : setArray([]);
        props.obj ? setPage(props.obj.page) : setPage(page);
        props.obj ? setPageSize(props.obj.pageSize) : setPageSize(pageSize);
        props.obj ? setTotal(props.obj.total) : setTotal(0);
        props.obj ? setTotalPage(props.obj.totalPage) : setTotal(0);
        defineAbilitiesFor(getLocalStorage(PERMISS_USER_CURRENT))
    }, [props])
    const onNextPage = (page, size) => {
        console.log(page)
        console.log(size)
        props.onChangePage(page, size)
    }
    const onShow = (item) => {
        props.onToggleView();
        props.onShowItem(item)

    }
    const update = (item) => {
        //props.onToggleFormpdate();
        props.UpdateItem(item)
    }
    const updatePosition = (event, item) => {
        var target = event.target
        item.ordering = Number.parseInt(target.value)
        props.onUpdateItemPosition(item)
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
        console.log(arrayRemove)
        props.onMultiDelete(arrayRemove)

    }
    const onDelete = (item) => {
        props.onDeleteItem(item)
    }
    const renderBody = () => {
        var result = ""
        if (array.length > 0) {
            result = array.map((item, index) => {
                const base64_avatar = "data:image/png;base64," + item.pathAvatar
                return (
                    <tr key={item.id} className="ant-table-row ant-table-row-level-0">
                        <td className="ant-table-cell">
                            <label className="ant-checkbox-wrapper">
                                <input className="checkbox-tick" type="checkbox" id={item.code} onChange={handleInputChange} />
                                <span />
                            </label>
                        </td>
                        <td className="text-center w50px">
                            {(index + 1) + (page - 1) * pageSize}
                        </td>
                        <td>
                            {item.created_At ? moment(item.created_At).format('DD/MM/YYYY, HH:mm') : ""}
                        </td>
                        <td>
                            {item.tenChiNhanhGui}
                        </td>
                        <td style={{ textAlign: "center" }}>
                            {item.ngayDuyet ? moment(item.ngayDuyet).format('DD/MM/YYYY, HH:mm') : ""}
                        </td>
                        <td>
                            {item.ngayNhanSanPham ? moment(item.ngayNhanSanPham).format('DD/MM/YYYY, HH:mm') : ""}
                        </td>
                        <td>
                            {item.status == 1 ?
                                <Badge status="processing" text="Đang chờ phê duyệt" />
                                : item.status == 2 ? <Badge status="success" text="Đã phê duyệt" /> : item.status == 3 ?
                                    <Badge status="error" text="Trả về" /> : item.status == 4 ?
                                        <Badge status="warning" text="Nhận lại" /> : item.status == 5 ?
                                            <Badge color="purple" text="Đã nhận hàng" /> : ""
                            }
                        </td>
                        <td>
                            <Dropdown placement="bottomCenter" overlay={() => (
                                <Menu>
                                    {!_isPermission(constantPermission.VIEW, constantPermission.DM_DENGHI_DIEUDONG) ? null :
                                        <Menu.Item style={{ textAlign: "center" }} key="2">
                                            <Tooltip title="Thông tin">
                                                <Button style={{ margin: "0 !important" }} type="primary" shape="circle" icon={<AntdIcons.EyeOutlined />} onClick={() => onShow(item)} />
                                            </Tooltip>
                                        </Menu.Item>
                                    }

                                    {!_isPermission(constantPermission.DUYET, constantPermission.DM_DENGHI_DIEUDONG) ? null : (item.status == 2 || item.status == 5) ? null :
                                        <Menu.Item style={{ textAlign: "center" }} key="3">
                                            <Tooltip title="Duyệt đơn">
                                                <Button style={{ margin: "0 !important" }} type="primary" shape="circle" icon={<AntdIcons.AuditOutlined />} onClick={() => update(item)} />
                                            </Tooltip>
                                        </Menu.Item>
                                    }
                                    {!_isPermission(constantPermission.DELETE, constantPermission.DM_DENGHI_DIEUDONG) ? null :
                                        <Menu.Item style={{ textAlign: "center" }} key="4">
                                            <Tooltip title="Xoá">
                                                <Button style={{ margin: "0 !important" }} type="primary" shape="circle" className="danger" icon={<AntdIcons.DeleteOutlined />} onClick={() => onDelete(item)} />
                                            </Tooltip>
                                        </Menu.Item>
                                    }


                                </Menu>
                            )} trigger={['click']}>
                                <Button>
                                    <AntdIcons.UnorderedListOutlined /> <AntdIcons.DownOutlined />
                                </Button>
                            </Dropdown>
                        </td>
                    </tr>
                );
            })
        }

        return result
    }
    const onSortNhan = (name) => {
        var itemClick = document.querySelectorAll("table th.sapxep");
        for (var item of itemClick) {
            var current_ClassName = item.className;
            //console.log(current_ClassName)
            console.log(item.getAttribute("id") + " " + name)
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

            <form className="">
                <div className="ant-table ant-table-bordered ant-table-ping-right ant-table-fixed-column ant-table-scroll-horizontal ant-table-has-fix-left ant-table-has-fix-right">
                    <div className="ant-table-container">
                        <div className="ant-table-content">
                            <table /*className="ant-table"*/ style={{ tableLayout: "auto" }}>
                                <thead className="ant-table-thead">
                                    <tr>
                                        <th>
                                            <label className="fancy-checkbox">
                                                <input type="hidden" id="hdfID" />
                                                <input className="select-all" id="chkall" type="checkbox" name="checkbox" onChange={handleInputChange} />
                                                <span />
                                            </label>
                                        </th>
                                        <th className="">STT</th>
                                        <th className="sapxep" id="Created_At" onClick={() => onSortNhan("Created_At")}>
                                            Ngày nhận yêu cầu
                                            <i className="fa fa-sort"></i>
                                        </th>
                                        <th className="">
                                            Kho yêu cầu
                                        </th>
                                        <th className="sapxep" id="NgayDuyet" onClick={() => onSortNhan("NgayDuyet")} >
                                            Ngày duyệt
                                            <i className="fa fa-sort"></i>
                                        </th>
                                        <th className="sapxep" id="NgayNhanHang" onClick={() => onSortNhan("NgayNhanHang")}>
                                            Ngày nhận hàng
                                            <i className="fa fa-sort"></i>
                                        </th>
                                        <th className="">
                                            Trạng thái
                                        </th>
                                        <th className="">
                                            Thao tác
                                        </th>
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
