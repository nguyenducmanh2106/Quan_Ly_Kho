import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import { Loading, PageLoading } from './../../elements/index'
import Pagination from "react-js-pagination";
import Skeleton from 'react-loading-skeleton';
import { useForm, Controller } from "react-hook-form";
import renderHTML from 'react-render-html';
function Table(props) {
    //khai báo state
    const [array, setArray] = useState([]);
    const [page, setPage] = useState(null);
    const [pageSize, setPageSize] = useState(null);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        props.obj ? setArray(props.obj.data) : setArray([]);
        props.obj ? setPage(props.obj.page) : setPage(null);
        props.obj ? setPageSize(props.obj.pageSize) : setPageSize(null);
        props.obj ? setTotal(props.obj.total) : setTotal(0);
    }, [props])
    const { register, handleSubmit, watch, errors, control } = useForm();
    const onChangePageSize = () => {
        var obj = document.getElementById('pageSize');
        props.onChangePage(1, obj.value)
    }
    const onNextPage = (page) => {
        var obj = document.getElementById('pageSize');
        props.onChangePage(page, obj.value)
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
    return (
        <>
            {
                !props.obj ? <PageLoading /> :
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
                                        <th className="sapxep text-center">
                                            Tên chức vụ
        </th>
                                        <th className="sapxep text-center">
                                            Thứ tự
        </th>
                                        <th className="sapxep text-center">
                                            Mã
        </th>
                                        <th className="sapxep text-center">
                                            Trạng thái
        </th>
                                        <th className="sapxep text-center">
                                            Thao tác
        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {array != [] ? array.map((item, index) => {
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
                                                    {item.name}
                                                </td>
                                                <td>
                                                    <input defaultValue={item.ordering} min={0} className="form-control" onChange={(event) => handleSubmit(updatePosition(event, item))}
                                                        ref={register({ required: true })} id="Ordering" name="Ordering" type="number" />
                                                    {errors.Ordering && <span class="parsley-required">Giá trị là bắt buộc</span>}
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    {item.code}
                                                </td>
                                                <td>
                                                    {item.status == 1 ? <a className="badge badge-success">Hoạt động</a> : <a className="badge badge-danger">Ngừng hoạt động</a>}
                                                </td>
                                                <td className="text-center">
                                                    <button type="button" className="btn btn-sm btn-outline-dark" title="Danh sách tin">
                                                        <i className="fa fa-list"></i>
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
                                    }) : null
                                    }
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
                                    <Pagination
                                        activePage={page}
                                        itemsCountPerPage={pageSize}
                                        totalItemsCount={total}
                                        pageRangeDisplayed={6}
                                        onChange={onNextPage}
                                        innerClass={"pagination pagination-sm pull-right"}
                                        itemClass={"page"}
                                        linkClass="page-link"
                                        hideDisabled
                                    />
                                </div>
                            </div>
                            <div className="cb" />
                        </div>
                    </div>
            }
        </>
    )
};
export default Table;
