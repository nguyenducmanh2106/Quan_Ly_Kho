import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Image, Badge, InputNumber, Menu, Button, Modal, Select, Checkbox, Upload, Pagination, Col, Row, Tooltip, Dropdown, Space } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import renderHTML from 'react-render-html';
import logoDefault from "../../../static/images/user-profile.jpeg"
import { Can } from "../../elements/Config_Roles/Can"
import { getLocalStorage } from "../../../utils/helpers"
import { PERMISS_USER_CURRENT } from "../../../utils/constants"
import { defineAbilitiesFor } from "../../elements/Config_Roles/appAbility"
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
    const onShow = (item) => {
        props.onToggleView();
        props.onShowItem(item)

    }
    const renderBody = () => {
        var result = ""
        if (array.length > 0) {
            result = array.map((item, index) => {
                const base64_avatar = "data:image/png;base64," + item.pathAvatar
                return (
                    <tr key={item.id} className="ant-table-row ant-table-row-level-0">

                        <td className="text-center w50px">
                            {(index + 1) + (page - 1) * pageSize}
                        </td>
                        <td>
                            <Image
                                width={70}
                                src={base64_avatar}
                                fallback={logoDefault}
                            />
                        </td>
                        <td>
                            {item.name}
                        </td>

                        <td style={{ textAlign: "center" }}>
                            {item.code}
                        </td>
                        <td>
                            {item.barcode}
                        </td>
                        <td>
                            {item.status == 1 ? <Button type="primary" className="success-outline" ghost >
                                <Badge status="success" text="Đang hoạt động" />
                            </Button> : <Button type="primary" ghost className="danger-outline" >
                                    <Badge status="error" text="Ngừng hoạt động" />
                                </Button>}
                        </td>

                    </tr>
                );
            })
        }

        return result
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
                                        <th className="">Kho</th>
                                        <th className="" id="Avatar">
                                            Tồn
                                        </th>
                                        <th className="sapxep" id="Name" >
                                            Đang chuyển kho
                                        </th>

                                        <th className="sapxep" id="Code" >
                                            Đang giao hàng
                                        </th>
                                        <th className="" id="Barcode">
                                            Có thể bán
                                        </th>
                                        <th className="">
                                            Chờ nhập hàng
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
        </>

    )
};
export default Table;
