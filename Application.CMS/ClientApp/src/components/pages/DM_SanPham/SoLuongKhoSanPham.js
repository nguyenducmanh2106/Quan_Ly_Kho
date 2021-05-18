import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Image, Badge, InputNumber, Menu, Button, Modal, Select, Checkbox, Upload, Pagination, Col, Row, Tooltip, Dropdown, Space } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import renderHTML from 'react-render-html';
import logoDefault from "../../../static/images/user-profile.jpeg"
import { Can } from "../../elements/Config_Roles/Can"
import { getLocalStorage, getAPI, postAPI, getCurrentLogin } from "../../../utils/helpers"
import { PERMISS_USER_CURRENT } from "../../../utils/constants"
import { defineAbilitiesFor } from "../../elements/Config_Roles/appAbility"
function Table({ item }) {
    //khai báo state
    console.log(item)
    //useEffect(() => {
    //    defineAbilitiesFor(getLocalStorage(PERMISS_USER_CURRENT))
    //}, [props])

    const renderBody = () => {
        var result = ""
        var array = item
        result = array.map((item, index) => {
            return (
                <tr key={item.id}>

                    <td className="text-center w50px">
                        {item.tenKho}
                    </td>
                    <td>
                        {item.soLuongTon}
                    </td>
                    <td>
                        {item.soLuongDangChuyenKho}
                    </td>
                    <td style={{ textAlign: "center" }}>
                        {item.soLuongDangXuat}
                    </td>
                    <td>
                        {item.soLuongThucTrongKho}
                    </td>
                    <td>
                        {item.soLuongChoNhapHangKhoKhac}
                    </td>
                    {item.capDoDonVi == 1 ? <td>{item.soLuongChoNhapHangNhaCungCap}</td> : null}
                </tr>
            );
        })

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
                                            Đang xuất/bán
                                        </th>
                                        <th className="" id="Barcode">
                                            Có thể xuất/bán
                                        </th>
                                        <th className="">
                                            Chờ nhập hàng(kho khác)
                                        </th>
                                        {getCurrentLogin().capDoDonVi == 1 ?
                                            <th className="">
                                                Chờ nhập hàng(nhà cung cấp)
                                        </th> : ""
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
        </>

    )
};
export default Table;
