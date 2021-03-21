import React, { useEffect, useState } from 'react';
import Layout from './../Layout'
import FormCreate from './Create';
import FormUpdate from './Update';
import { Select } from 'antd';
import { Input } from 'antd';
import useModal from './../../elements/modal/useModal';
import { getAPI, postAPI, postFormData } from './../../../utils/helpers';
import ListData from './ListData';
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
function Menu() {
    //khai báo state
    const [state, setState] = useState();
    //Thực hiện thao tác update,create,delete sẽ load lại trang
    const [isAction, setAction] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState({ Name: "", Status: -1 })
    const [options, setOption] = useState([]);
    const [pageSize, setPageSize] = useState(4);
    const [nameSort, setNameSort] = useState('');
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
            var fetchData = await getAPI(`api/permission/list_data/?Name=${name}&Status=${status}&page=${page}&pageSize=${pageSize}&nameSort=${nameSort}`);

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
        }
    }, [isAction, nameSort, page, pageSize])
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
            var result = await postAPI('api/permission/update', JSON.stringify(ItemPosition))
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
    const onChangeSearchSelect = (newValue) => {
        setSearch({ ...search, Status: newValue })
    }
    const optionSearch = [
        { label: 'Tất cả', value: -1 },
        { label: 'Hoạt động', value: 1 },
        { label: 'Ngừng hoạt động', value: 2 },

    ];
    async function onHandleSearch() {
        let name = search.Name;
        let status = search.Status ? search.Status : -1;
        var fetchData = await getAPI(`api/permission/list_data?Name=${name}&Status=${status}`);
        if (fetchData.status == true) {
            setState(fetchData.result)
        }
    }
    const onChangeSearchInput = (event) => {
        var target = event.target;
        var value = target.value;
        setSearch({ ...search, Name: value })
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
                return postAPI('api/permission/delete', JSON.stringify(item)).then(data => {
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
                return postAPI('api/permission/toggle-status', JSON.stringify(itemUpdateStatus)).then(data => {
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
                    postFormData('api/permission/multidelete', formData).then(data => {
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
        var result = await postAPI('api/permission/update', JSON.stringify(obj))
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
        var result = await postAPI('api/permission/create', JSON.stringify(obj))
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
            <div className="header">
                <ToastContainer />
                <form id="searchForm" role="form" className="w100 pb10">
                    <div className="form-horizontal">
                        <div className="form-group mb-0">
                            <div className="row">
                                <div className="col-md-2 padR-0">
                                    <Input placeholder="Tên/Mã quyền" allowClear onChange={onChangeSearchInput} />
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
