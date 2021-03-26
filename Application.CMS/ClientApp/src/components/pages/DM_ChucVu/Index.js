import React, { useEffect, useState } from 'react';
import Layout from './../Layout'
import { Select, notification, Input, Skeleton } from 'antd';
import FormCreate from './Create';
import FormUpdate from './Update';
import { useForm, Controller } from "react-hook-form";
import useModal from './../../elements/modal/useModal';
import { getAPI, postAPI, postFormData } from './../../../utils/helpers';
import ListData from './ListData';
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'
import Swal from 'sweetalert2';
function Index() {
    //khai báo state
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState({ Name: "", Status: -1 })
    const { register, handleSubmit, watch, errors, control } = useForm();
    //Thực hiện thao tác update,create,delete sẽ load lại trang
    const [isAction, setAction] = useState(false);
    const [nameSort, setNameSort] = useState('');
    const [pageSize, setPageSize] = useState(4);
    const [page, setPage] = useState(1);
    const [ItemUpdate, setItemUpdate] = useState();
    const [listItemRemove, setListItemRemove] = useState([]);
    const { isShowing, toggle, isShowingUpdate, toggleUpdate } = useModal();
    const { Option } = Select;


    function onSearch(val) {
        console.log('search:', val);
    }
    useEffect(() => {
        async function getData(page, pageSize) {
            let name = search.Name;
            let status = search.Status ? search.Status : -1;
            var fetchData = await getAPI(`api/dm_chucvu/list_data/?Name=${name}&Status=${status}&page=${page}&pageSize=${pageSize}&nameSort=${nameSort}`);
            if (fetchData.status == true) {
                setState(fetchData.result)
                setIsLoading(!fetchData.status)
            }
        }
        //gọi hàm
        getData(page, pageSize);
        
        return () => {
            setAction(false)
        }
    }, [isAction, nameSort, page, pageSize])
    async function onUpdateItemPosition(ItemPosition) {
        console.log(ItemPosition)
        if (ItemPosition.ordering < 0 || Number.isNaN(ItemPosition.ordering)) {
            notification.error({
                message: "Giá trị nhập vào chưa chính xác",
                duration: 3

            })
        }
        else {
            var result = await postAPI('api/dm_chucvu/update', JSON.stringify(ItemPosition))
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
    const onChangeSearchSelect = (newValue) => {
        setSearch({ ...search, Status: newValue })
    }
    async function onHandleSearch() {
        let name = search.Name;
        let status = search.Status ? search.Status : -1;
        var fetchData = await getAPI(`api/dm_chucvu/list_data?Name=${name}&Status=${status}&page=${page}&pageSize=${pageSize}&nameSort=${nameSort}`);
        if (fetchData.status == true) {
            setState(fetchData.result)
        }
    }
    const onSetNameSort = (name) => {
        console.log(name)
        setNameSort(name)
    }
    const onChangeSearchInput = (event) => {
        var target = event.target;
        var value = target.value;
        setSearch({ ...search, Name: value })
    }
    
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
                return postAPI('api/dm_chucvu/update', JSON.stringify(item)).then(result => {
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
                return postAPI('api/dm_chucvu/delete', JSON.stringify(item)).then(result => {
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
                    postFormData('api/dm_chucvu/multidelete', formData).then(result => {
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

    }
    async function onPostUpdateItem(obj) {
        var result = await postAPI('api/dm_chucvu/update', JSON.stringify(obj))
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
        var result = await postAPI('api/dm_chucvu/create', JSON.stringify(obj))
        toggle();
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
    return (
        <div className="container-fluid">
            <div className="header">
                <form id="searchForm" role="form" className="w100 pb10">
                    <div className="form-horizontal">
                        <div className="form-group area-item mb-0">
                            {
                                !isLoading? (<div className="row">
                                    <div className="col-md-2 padR-0">
                                        <Input placeholder="Tên/Mã chức vụ" allowClear onChange={onChangeSearchInput} />
                                    </div>
                                    <div className="col-md-2 padR-0">

                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="-Chọn trạng thái-"
                                            optionFilterProp="children"
                                            onChange={onChangeSearchSelect}
                                            onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="-1">Tất cả</Option>
                                            <Option value="1">Hoạt động</Option>
                                            <Option value="2">Ngừng hoạt động</Option>
                                        </Select>
                                    </div>

                                </div>) : <Skeleton />
                            }
                            
                        </div>
                    </div>
                </form>
                <div className='form-group area-item'>
                    {
                        !isLoading ? (<div className='col-12' style={{ textAlign: 'right' }}>
                            <button onClick={onHandleSearch} className="btn btn-primary btn-sm">
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

                        </div>) : <Skeleton />
                    }
                    
                </div>
                <div className="cb" />
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

export default Index;