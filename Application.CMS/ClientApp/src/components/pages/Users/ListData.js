import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";
import { Image } from 'antd';
import Skeleton from 'react-loading-skeleton';
import renderHTML from 'react-render-html';
function Table(props) {
    //khai báo state
    const [array, setArray] = useState([]);
    const [page, setPage] = useState(null);
    const [pageSize, setPageSize] = useState(null);
    const [total, setTotal] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [typeSort, setTypeSort] = useState(true);
    useEffect(() => {
        props.obj ? setArray(props.obj.data) : setArray([]);
        props.obj ? setPage(props.obj.page) : setPage(null);
        props.obj ? setPageSize(props.obj.pageSize) : setPageSize(null);
        props.obj ? setTotal(props.obj.total) : setTotal(0);
        props.obj ? setTotalPage(props.obj.totalPage) : setTotal(0);
    }, [props])
    const onChangePageSize = () => {
        var obj = document.getElementById('pageSize');
        props.onChangePage(1, obj.value)
    }
    const onNextPage = (page) => {
        var obj = document.getElementById('pageSize');
        props.onChangePage(page, obj.value)
    }
    const onCreatePermission = (item) => {
        props.toggleFormPermission();
        props.onSetItemCreatePermission(item)
    }
    const update = (item) => {
        props.onToggleFormpdate();
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
        var result=""
        if (array.length>0) {
            result = array.map((item, index) => {
                const base64_avatar = "data:image/png;base64," + item.avatar
                return (
                    <tr key={item.id}>
                        <td className="w50px">
                            <label className="fancy-checkbox">
                                <input className="checkbox-tick" type="checkbox" id={item.id} onChange={handleInputChange} />
                                <span />
                            </label>
                        </td>
                        <td className="text-center w50px">
                            {(index + 1) + (page - 1) * pageSize}
                        </td>
                        <td>
                            <Image
                                width={50}
                                height={50}
                                src="http://via.placeholder.com/50x50"
                                fallback={base64_avatar}
                            />
                        </td>
                        <td>
                            {item.fullName}
                        </td>
                        
                        <td style={{ textAlign: "center" }}>
                            {item.userName}
                        </td>
                        <td>
                            {item.email}
                        </td>
                        <td>
                            {item.status == 1 ? <button type="button" className="btn btn-block btn-outline-success btn-sm" onClick={() => toggleStatus(2, item)}>Hoạt động</button> : <button type="button" className="btn btn-block btn-outline-danger btn-sm" onClick={() => toggleStatus(1, item)}>Ngừng hoạt động</button>}
                        </td>
                        <td className="text-center">
                            <button type="button" className="btn btn-sm btn-outline-primary" title="Phân quyền" onClick={() => onCreatePermission(item)}>
                                <i className="fa fa-cog"></i>
                            </button>
                            <button type="button" className="btn btn-outline-success btn-sm" onClick={() => update(item)}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-danger" title="Xóa" onClick={() => onDelete(item)}>
                                <i className="fa fa-trash" />
                            </button>
                        </td>
                    </tr>
                );
            })
        }
        
        return result
    }
    const onSort = (name) => {
        var itemClick = document.querySelectorAll("table th.sapxep");
        setTypeSort(!typeSort);
        for (var item of itemClick) {
            if (item.getAttribute("id") == name) {
                if (typeSort) {
                    item.childNodes[1].className = "fa fa-sort fa-sort-up";
                    name += "_asc";
                }
                else {
                    item.childNodes[1].className = "fa fa-sort fa-sort-down";
                    name += "_desc";
                }

            }
            else {
                item.childNodes[1].className = "fa fa-sort";
            }
        }
        props.onSetNameSort(name)
    }
    return (
        <div>

            <form>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>
                                <label className="fancy-checkbox">
                                    <input type="hidden" id="hdfID" />
                                    <input className="select-all" id="chkall" type="checkbox" name="checkbox" onChange={handleInputChange} />
                                    <span />
                                </label>
                            </th>
                            <th className="text-center">STT</th>
                            <th className="text-center" id="Avatar">
                                Ảnh
                            </th>
                            <th className="sapxep text-center" id="Name" onClick={() => onSort("Name")}>
                                Tên
                                <i className="fa fa-sort"></i>
        </th>
                            
                            <th className="text-center" id="UserName">
                                Username
        </th>
                            <th className="text-center" id="Email">
                                Email
        </th>
                            <th className="text-center">
                                Trạng thái
        </th>
                            <th className="text-center">
                                Thao tác
        </th>
                        </tr>
                    </thead>

                    <tbody>
                        {renderBody()}
                    </tbody>

                </table>
            </form>

            <div className="commonTool">
                <div className="fl">
                    <label className="lh35 mb0">Tổng số bản ghi: {total}</label>
                </div>
                <div className="fr">
                    <select id="pageSize" name="pageSize" aria-controls="pageSize" className="form-control input-sm input-xsmall input-inline" onChange={onChangePageSize}>
                        <option value={4}>4</option>
                        <option value={3}>3</option>
                        <option value={6}>6</option>
                        <option value={10}>10</option>
                    </select>
                    <div id="paginationholder">
                        {totalPage > 1 ? <Pagination
                            activePage={page}
                            itemsCountPerPage={pageSize}
                            totalItemsCount={total}
                            pageRangeDisplayed={6}
                            onChange={onNextPage}
                            innerClass={"pagination pagination-sm pull-right"}
                            itemClass={"page"}
                            linkClass="page-link"
                            hideDisabled
                            nextPageText={renderHTML('<i class="fa fa-step-forward" aria-hidden="true"></i>')}
                            lastPageText={renderHTML('<i class="fa fa-fast-forward" aria-hidden="true"></i>')}
                            firstPageText={renderHTML('<i class="fa fa-fast-backward" aria-hidden="true"></i>')}
                            prevPageText={renderHTML('<i class="fa fa-step-backward" aria-hidden="true"></i>')}
                        /> : null}
                    </div>
                </div>
                <div className="cb" />
            </div>
        </div>
    )
};
export default Table;
