﻿import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Layout from './../Mains'
import Select from 'react-select';
import FormCreate from './Create';
import FormUpdate from './Update';
import { useForm, Controller } from "react-hook-form";
import useModal from './../../elements/modal/useModal';
import { getAPI, postAPI, postFormData } from './../../../utils/helpers';
import ListData from './ListData';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { ToastContainer, toast } from 'react-toastify';
function Index() {
    //khai báo state
    const [state, setState] = useState();
    const [search, setSearch] = useState({ Name: "", Status: -1 })
    const { register, handleSubmit, watch, errors, control } = useForm();
    //Thực hiện thao tác update,create,delete sẽ load lại trang
    const [isAction, setAction] = useState(false);
    const [options, setOption] = useState([]);
    const [pageSize, setPageSize] = useState(4);
    const [page, setPage] = useState(1);
    const [ItemUpdate, setItemUpdate] = useState();
    const [listItemRemove, setListItemRemove] = useState([]);
    const { isShowing, toggle, isShowingUpdate, toggleUpdate } = useModal();
    useEffect(() => {
        async function getData(page, pageSize) {
            let name = search.Name;
            let status = search.Status ? search.Status:-1;
            var fetchData = await getAPI(`api/dm_donvi/list_data/?Name=${name}&Status=${status}&page=${page}&pageSize=${pageSize}`);
            if (fetchData.status == true) {
                setState(fetchData.result)
            }
        }
        async function getOptions() {
            var fetchData = await getAPI('api/dm_donvi/get-options');
            //console.log(fetchData)
            let arrOption = []
            if (fetchData.status == true) {
                fetchData.result.map((item, index) => {
                    let option = {
                        value: item.id,
                        label: item.name
                    }
                    arrOption.push(option)
                });
                arrOption.unshift({
                    value: 0,
                    label: '----'
                })
                setOption(arrOption)
            }
        }
        //gọi hàm
        getData(page, pageSize);
        getOptions();
        return () => {
            setAction(false)
        }
    }, [isAction, page, pageSize])
    async function onUpdateItemPosition(ItemPosition) {
        console.log(ItemPosition)
        if (ItemPosition.ordering < 0 || Number.isNaN(ItemPosition.ordering)) {
            toast.error("🦄 Giá trị nhập vào chưa chính xác", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: 'toast-error',
                progressClassName: 'error-progress-bar',
            });
        }
        else {
            var result = await postAPI('api/dm_donvi/update', JSON.stringify(ItemPosition))
            if (result.status) {
                setAction(true)
                toast.success("🦄" + result.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    className: 'toast-success',
                    progressClassName: 'success-progress-bar',
                });
            }
            else {
                toast.error("🦄" + result.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    className: 'toast-error',
                    progressClassName: 'error-progress-bar',
                });
            }
        }

    }
    const onChangePage = (page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
    }
    const onChangeSearchSelect = (newValue) => {

        var valueSelect = newValue.value;
        setSearch({ ...search, Status: valueSelect })
    }
    async function onHandleSearch() {
        let name = search.Name;
        let status = search.Status ? search.Status : -1;
        var fetchData = await getAPI(`api/dm_donvi/list_data?Name=${name}&Status=${status}`);
        if (fetchData.status == true) {
            setState(fetchData.result)
        }
    }
    const onChangeSearchInput = (event) => {
        var target = event.target;
        var name = target.name ? target.name : "";
        var value = target.value;
        console.log(name + ": " + value)
        setSearch({ [name]: value })
    }
    const optionSearch = [
        { label: 'Tất cả', value: -1 },
        { label: 'Hoạt động', value: 1 },
        { label: 'Ngừng hoạt động', value: 2 },

    ];
    const onToggleStatus = (item) => {
        Swal.fire({
            title: "Bạn có chắc chắn không?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Có",
            cancelButtonText: "Không",
            showLoaderOnConfirm: true,
            preConfirm: (isConfirm) => {
                console.log(isConfirm)
                if (isConfirm) {
                    postAPI('api/dm_donvi/update', JSON.stringify(item)).then(data => {
                        if (data.status) {
                            setAction(true)
                            toast.success("🦄" + data.message, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                className: 'toast-success',
                                progressClassName: 'success-progress-bar',
                            });
                        }
                        else {
                            toast.error("🦄" + data.message, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                className: 'toast-error',
                                progressClassName: 'error-progress-bar',
                            });
                        }
                    });
                }

            },
            //allowOutsideClick: () => !Swal.isLoading()
        })

    }
    const onDelete = (item) => {
        Swal.fire({
            title: "Bạn có chắc chắn không?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Có",
            cancelButtonText: "Không",
            showLoaderOnConfirm: true,
            preConfirm: (isConfirm) => {
                if (isConfirm) {
                    postAPI('api/dm_donvi/delete', JSON.stringify(item)).then(data => {
                        if (data.status) {
                            setAction(true)
                            toast.success("🦄" + data.message, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                className: 'toast-success',
                                progressClassName: 'success-progress-bar',
                            });
                        }
                        else {
                            toast.error("🦄" + data.message, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                className: 'toast-error',
                                progressClassName: 'error-progress-bar',
                            });
                        }
                    });

                }
            },
            //allowOutsideClick: () => !Swal.isLoading()
        })

    }
    const onUpdateItem = (item) => {
        setItemUpdate(item)
    }
    async function onMultiDelete() {
        if (listItemRemove.length == 0) {
            toast.error("🦄 Chưa chọn dữ liệu để xoá", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: 'toast-error',
                progressClassName: 'error-progress-bar',
            });
        }
        else {
            var formData = new FormData()
            formData.append("lstid", listItemRemove.join(','))
            Swal.fire({
                title: "Bạn có chắc chắn không?",
                text: "",
                icon: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Có",
                cancelButtonText: "Không",
                showLoaderOnConfirm: true,
                preConfirm: (isConfirm) => {
                    console.log(isConfirm)
                    if (isConfirm) {
                        postFormData('api/dm_donvi/multidelete', formData).then(data => {
                            if (data.status) {
                                setAction(true)
                                toast.success("🦄" + data.message, {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    className: 'toast-success',
                                    progressClassName: 'success-progress-bar',
                                });
                            }
                            else {
                                toast.error("🦄" + data.message, {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    className: 'toast-error',
                                    progressClassName: 'error-progress-bar',
                                });
                            }
                        });

                    }
                },
                //allowOutsideClick: () => !Swal.isLoading()
            })
        }

    }
    async function onPostUpdateItem(obj) {
        var result = await postAPI('api/dm_donvi/update', JSON.stringify(obj))
        toggleUpdate()
        if (result.status) {
            setAction(true)
            toast.success("🦄" + result.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: 'toast-success',
                progressClassName: 'success-progress-bar',
            });

        }
        else {
            toast.error("🦄" + result.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: 'toast-error',
                progressClassName: 'error-progress-bar',
            });
        }

    }
    async function onPostCreateItem(obj) {
        var result = await postAPI('api/dm_donvi/create', JSON.stringify(obj))
        toggle();
        if (result.status) {
            setAction(true)
            toast.success("🦄" + result.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: 'toast-success',
                progressClassName: 'success-progress-bar',
            });

        }
        else {
            toast.error("🦄" + result.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: 'toast-error',
                progressClassName: 'error-progress-bar',
            });
        }
    }
    return (
        <Layout>
            <div className="container-fluid">
                <div className="header">
                    <ToastContainer />
                    <form id="searchForm" role="form" className="w100 pb10">
                        <div className="form-horizontal">
                            <div className="form-group mb-0">
                                <div className="row">
                                    <div className="col-md-2 padR-0">
                                        <input type="text" className="form-control" onChange={onChangeSearchInput} name="Name" id="Name" placeholder="Tên/Mã đơn vị" />
                                    </div>
                                    <div className="col-md-2 padR-0">
                                        <Select options={optionSearch} search={true} name="Status" placeholder="Chọn" onChange={onChangeSearchSelect} />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='row form-group'>
                        <div className='col-12' style={{ textAlign: 'right' }}>
                            <button onClick={onHandleSearch} className="btn btn-primary btn-sm btn-rounded" data-mdb-ripple-color="dark">
                                <i className="fa fa-search" aria-hidden="true" /> Tìm kiếm
                                            </button>
                            <button id="btnCreate" className=" btn btn-success btn-sm" data-mdb-ripple-color="dark" onClick={toggle}>
                                <i className="fas fa-plus mr-2" aria-hidden="true"></i>Thêm mới
                        </button>

                            <button id="btnXoaNhieu" className="btn btn-danger btn-sm" data-mdb-ripple-color="dark" onClick={onMultiDelete}>
                                <i className="fas fa-trash"></i> Xóa nhiều
                        </button>
                            <FormCreate
                                isShowing={isShowing}
                                hide={toggle}
                                onPostCreateItem={onPostCreateItem}
                                data={options}
                            />
                            <FormUpdate
                                isShowing={isShowingUpdate}
                                hide={toggleUpdate}
                                item={ItemUpdate}
                                onPostUpdateItem={onPostUpdateItem}
                                data={options}
                            />

                        </div>
                    </div>
                    <div className="cb" />
                </div>
                <div className="table-responsive" id="gridData">
                    <ListData obj={state}
                        onChangePage={onChangePage}
                        onDeleteItem={onDelete}
                        UpdateItem={onUpdateItem}
                        onToggleFormpdate={toggleUpdate}
                        onMultiDelete={setListItemRemove}
                        onUpdateItemPosition={onUpdateItemPosition}
                        toggleStatus={onToggleStatus}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Index;
