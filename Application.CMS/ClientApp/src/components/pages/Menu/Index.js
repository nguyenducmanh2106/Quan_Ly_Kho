﻿import React, { useEffect, useState } from 'react';
import Layout from './../Mains'
import FormCreate from './Create';
import FormUpdate from './Update';
import useModal from './../../elements/modal/useModal';
import {  PageLoading } from './../../elements/index'
import { getAPI, postAPI, postFormData } from './../../../utils/helpers';
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'
import ListData from './ListData';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
function Menu() {
    
    //khai báo state
    const [state, setState] = useState();
    //Thực hiện thao tác update,create,delete sẽ load lại trang
    const [isAction, setAction] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [options, setOption] = useState([]);
    const [nameSort, setNameSort] = useState('');
    const [pageSize, setPageSize] = useState(4);
    const [page, setPage] = useState(1);
    const [ItemUpdate, setItemUpdate] = useState();
    const [listItemRemove, setListItemRemove] = useState([]);
    const { isShowing, toggle, isShowingUpdate, toggleUpdate } = useModal();
    useEffect(() => {
        console.log("set")
        async function getData(page, pageSize) {
            var fetchData = await getAPI(`api/menu/list_data/?page=${page}&pageSize=${pageSize}&nameSort=${nameSort}`);
            if (fetchData.status == true) {
                setState(fetchData.result)
            }
        }
        async function getOptions() {
            var fetchData = await getAPI('api/menu/get-options');
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
        setIsLoading(false)
        return () => {
            setAction(false)
            setIsLoading(true)
        }
    }, [nameSort,isAction, page, pageSize])
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
            var result = await postAPI('api/menu/update', JSON.stringify(ItemPosition))
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
                return postAPI('api/menu/delete', JSON.stringify(item)).then(data => {
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
            },
            //allowOutsideClick: () => !Swal.isLoading()
        })

    }
    const onToggleStatus = (itemUpdateStatus) => {
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
                return postAPI('api/menu/toggle-status', JSON.stringify(itemUpdateStatus)).then(data => {
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
            },
            //allowOutsideClick: () => !Swal.isLoading()
        })

    }
    const onUpdateItem = (item) => {
        setItemUpdate(item)
    }
    const onSetNameSort = (name) => {
        setNameSort(name)
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
                    return postFormData('api/menu/multidelete', formData).then(data => {
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
                },
                allowOutsideClick: () => !Swal.isLoading()
            })
        }

    }
    async function onPostUpdateItem(obj) {
        var result = await postAPI('api/menu/update', JSON.stringify(obj))
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
        var result = await postAPI('api/menu/create', JSON.stringify(obj))
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
        <div className="container-fluid">
            <div className='row form-group'>
                <div className='col-12' style={{ textAlign: 'right' }}>
                    <ToastContainer />
                    <button id="btnCreate" type='button' className="btn btn-success btn-sm" onClick={toggle}>
                        <i className="fas fa-plus mr-2" aria-hidden="true"></i>Thêm mới
                        </button>
                    <button id="btnXoaNhieu" type='button' className="btn btn-danger btn-sm" onClick={onMultiDelete}>
                        <i className="fas fa-trash"></i> Xóa nhiều
                        </button>
                    <FormCreate
                        isShowing={isShowing}
                        hide={toggle}
                        data={options}
                        onPostCreateItem={onPostCreateItem}
                    />
                    <FormUpdate
                        isShowing={isShowingUpdate}
                        hide={toggleUpdate}
                        data={options}
                        item={ItemUpdate}
                        onPostUpdateItem={onPostUpdateItem}
                    />

                </div>
            </div>
            <div className="table-responsive" id="gridData">
                <LoadingOverlay
                    active={isLoading}
                    spinner
                    //spinner={<BounceLoader />}
                    //text='Loading your content...'
                >
                    <ListData obj={state}
                        onChangePage={onChangePage}
                        options={options}
                        onDeleteItem={onDelete}
                        UpdateItem={onUpdateItem}
                        onToggleFormpdate={toggleUpdate}
                        onMultiDelete={setListItemRemove}
                        onUpdateItemPosition={onUpdateItemPosition}
                        toggleStatus={onToggleStatus}
                        onSetNameSort={onSetNameSort}
                    />
                </LoadingOverlay>
            </div>
        </div>
    );
};

export default Menu;