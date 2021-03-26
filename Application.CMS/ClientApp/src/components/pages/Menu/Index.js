import React, { useEffect, useState } from 'react';
import Layout from './../Mains'
import FormCreate from './Create';
import FormUpdate from './Update';
import { notification, Skeleton } from "antd"
import useModal from './../../elements/modal/useModal';
import { getAPI, postAPI, postFormData } from './../../../utils/helpers';
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'
import ListData from './ListData';
import Swal from 'sweetalert2';
function Menu() {
    
    //khai báo state
    const [state, setState] = useState([]);
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
        async function getData(page, pageSize) {
            var fetchData = await getAPI(`api/menu/list_data/?page=${page}&pageSize=${pageSize}&nameSort=${nameSort}`);
            if (fetchData.status == true) {
                setState(fetchData.result)
                setIsLoading(!fetchData.status)
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
        
        return () => {
            setAction(false)
            setIsLoading(true)
        }
    }, [nameSort,isAction, page, pageSize])
    async function onUpdateItemPosition(ItemPosition) {
        console.log(ItemPosition)
        if (ItemPosition.ordering < 0 || Number.isNaN(ItemPosition.ordering)) {
            notification.error({
                message:"Giá trị nhập vào chưa chính xác",
                duration: 3

            })
        }
        else {
            var result = await postAPI('api/menu/update', JSON.stringify(ItemPosition))
            if (result.status) {
                setAction(true)
                notification.success({
                    message: result.message,
                    duration: 3

                })
            }
            else {
                notification.error({
                    message: result.message,
                    duration: 3

                })
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
                return postAPI('api/menu/delete', JSON.stringify(item)).then(result => {
                    if (result.status) {
                        setAction(true)
                        notification.success({
                            message: result.message,
                            duration: 3

                        })
                    }
                    else {
                        notification.error({
                            message: result.message,
                            duration: 3

                        })
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
                return postAPI('api/menu/toggle-status', JSON.stringify(itemUpdateStatus)).then(result => {
                    if (result.status) {
                        setAction(true)
                        notification.success({
                            message: result.message,
                            duration: 3

                        })

                    }
                    else {
                        notification.error({
                            message: result.message,
                            duration: 3

                        })
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
            notification.error({
                message: "Chưa chọn dữ liệu để xoá",
                duration: 3

            })
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
                    return postFormData('api/menu/multidelete', formData).then(result => {
                        if (result.status) {
                            setAction(true)
                            notification.success({
                                message: result.message,
                                duration: 3

                            })

                        }
                        else {
                            notification.error({
                                message: result.message,
                                duration: 3

                            })
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
            notification.success({
                message: result.message,
                duration: 3

            })

        }
        else {
            notification.error({
                message: result.message,
                duration: 3

            })
        }

    }
    async function onPostCreateItem(obj) {
        var result = await postAPI('api/menu/create', JSON.stringify(obj))
        toggle();
        if (result.status) {
            setAction(true)
            notification.success({
                message: result.message,
                duration: 3

            })

        }
        else {
            notification.success({
                message: result.message,
                duration: 3

            })
        }
    }
    return (
        <div className="container-fluid">
            <div className='form-group area-item'>
                {
                    !isLoading ? (<div className='col-12' style={{ textAlign: 'right' }}>
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

                    </div>) : <Skeleton />
                }
                
            </div>
            <div className="table-responsive" id="gridData">
                {
                    !isLoading ? (<LoadingOverlay
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
                    </LoadingOverlay>) : <Skeleton />
                }
               
            </div>
        </div>
    );
};

export default Menu;
