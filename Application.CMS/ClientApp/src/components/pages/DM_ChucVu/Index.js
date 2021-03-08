import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Layout from './../Mains'
import Select from 'react-select';
import FormCreate from './Create';
import FormUpdate from './Update';
import { useForm, Controller } from "react-hook-form";
import useModal from './../../elements/modal/useModal';
import { getAPI, postAPI, postFormData } from './../../../utils/helpers';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import ListData from './ListData';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import SelectSearch from 'react-select-search';
function Index() {
    //khai báo state
    const [state, setState] = useState();
    const { register, handleSubmit, watch, errors, control } = useForm();
    //Thực hiện thao tác update,create,delete sẽ load lại trang
    const [isAction, setAction] = useState(false);
    const [pageSize, setPageSize] = useState(4);
    const [page, setPage] = useState(1);
    const [ItemUpdate, setItemUpdate] = useState();
    const [listItemRemove, setListItemRemove] = useState([]);
    const { addToast } = useToasts();
    const { isShowing, toggle, isShowingUpdate, toggleUpdate } = useModal();
    useEffect(() => {
        async function getData(page, pageSize) {
            var fetchData = await getAPI(`api/dm_chucvu/list_data/?page=${page}&pageSize=${pageSize}`);
            if (fetchData.status == true) {
                setState(fetchData.result)
            }
        }
        //gọi hàm
        getData(page, pageSize);
        return () => {
            setAction(false)
        }
    }, [isAction, page, pageSize])
    async function onUpdateItemPosition(ItemPosition) {
        console.log(ItemPosition)
        if (ItemPosition.ordering < 0 || Number.isNaN(ItemPosition.ordering)) {
            addToast("Giá trị nhập vào sai", {
                appearance: 'error',
                autoDismiss: true,
            });
        }
        else {
            var result = await postAPI('api/dm_chucvu/update', JSON.stringify(ItemPosition))
            if (result.status) {
                setAction(true)
                addToast(result.message, {
                    appearance: 'success',
                    autoDismiss: true,
                });
            }
            else {
                addToast(result.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }

    }
    const onChangePage = (page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
    }
    const options = [
        { label: 'Swedish', value: 'sv' },
        { label: 'English', value: 'en' },

    ];
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
                return postAPI('api/dm_chucvu/delete', JSON.stringify(item)).then(data => {
                    if (data.status) {
                        addToast(data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        setAction(true)
                    }
                    else {
                        addToast(data.message, {
                            appearance: 'error',
                            autoDismiss: true,
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
    async function onMultiDelete() {
        if (listItemRemove.length == 0) {
            addToast("Chưa chọn dữ liệu để xoá!", {
                appearance: 'error',
                autoDismiss: true,
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

                    return postFormData('api/dm_chucvu/multidelete', formData).then(data => {
                        if (data.status) {
                            addToast(data.message, {
                                appearance: 'success',
                                autoDismiss: true,
                            });
                            setAction(true)

                        }
                        else {
                            addToast(data.message, {
                                appearance: 'error',
                                autoDismiss: true,
                            });
                        }
                    });

                },
                //allowOutsideClick: () => !Swal.isLoading()
            })
        }

    }
    async function onPostUpdateItem(obj) {
        var result = await postAPI('api/dm_chucvu/update', JSON.stringify(obj))
        toggleUpdate()
        if (result.status) {
            setAction(true)
            addToast(result.message, {
                appearance: 'success',
                autoDismiss: true,
            });

        }
        else {
            addToast(result.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }

    }
    async function onPostCreateItem(obj) {
        var result = await postAPI('api/dm_chucvu/create', JSON.stringify(obj))
        toggle();
        if (result.status) {
            setAction(true)
            addToast(result.message, {
                appearance: 'success',
                autoDismiss: true,
            });

        }
        else {
            addToast(result.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }
    return (
        <Layout>
            <div className="container-fluid">
                <div className="header">
                    <form id="searchForm" role="form" className="w100 pb10">
                        <div className="form-horizontal">
                            <div className="form-group mb-0">
                                <div className="row">
                                    <div className="col-md-2 padR-0">
                                        <input type="text" className="form-control" name="keySearch" id="keySearch" placeholder="Tên/Mã chức vụ" />
                                    </div>
                                    <div className="col-md-2 padR-0">
                                        <Select options={options} search={true} placeholder="Chọn" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='row form-group'>
                        <div className='col-12' style={{ textAlign: 'right' }}>
                            <button href="javascript:void(0)" className="btn btn-primary btn-sm">
                                <i className="fa fa-search" aria-hidden="true" /> Tìm kiếm
                                            </button>
                            <button id="btnCreate" className=" btn btn-success btn-sm" onClick={toggle}>
                                <i className="fas fa-plus mr-2" aria-hidden="true"></i>Thêm mới
                        </button>

                            <button id="btnXoaNhieu" className="btn btn-danger btn-sm" onClick={onMultiDelete}>
                                <i className="fas fa-trash"></i> Xóa nhiều
                        </button>
                            <FormCreate
                                isShowing={isShowing}
                                hide={toggle}
                                onPostCreateItem={onPostCreateItem}
                            />
                            <FormUpdate
                                isShowing={isShowingUpdate}
                                hide={toggleUpdate}
                                item={ItemUpdate}
                                onPostUpdateItem={onPostUpdateItem}
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
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Index;
