﻿import React, { useEffect, useState } from 'react'
import FormCreate from './Create';
import FormUpdate from './Update';
import { Select, notification, Input, Skeleton, Card, Col, Row, Layout, Button, Space } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import useModal from './../../elements/modal/useModal';
import { getAPI, postAPI, postFormData } from './../../../utils/helpers';
import ListData from './ListData';
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'
import Swal from 'sweetalert2';
function Menu() {
    //khai báo state
    const [state, setState] = useState([]);
    //Thực hiện thao tác update,create,delete sẽ load lại trang
    const [isAction, setAction] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState({ Name: "", Status: -1 })
    const [options, setOption] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [nameSort, setNameSort] = useState('');
    const [page, setPage] = useState(1);
    const [ItemUpdate, setItemUpdate] = useState();
    const [listItemRemove, setListItemRemove] = useState([]);
    const { isShowing, toggle, isShowingUpdate, toggleUpdate } = useModal();
    const { Option } = Select;
    const { Header, Content, Footer } = Layout;
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
            var result = await postAPI('api/permission/update', JSON.stringify(ItemPosition))
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
    const onChangeSearchSelect = (newValue) => {
        setSearch({ ...search, Status: newValue })
    }
    async function onHandleSearch() {
        let name = search.Name;
        let status = search.Status ? search.Status : -1;
        var fetchData = await getAPI(`api/permission/list_data?Name=${name}&Status=${status}&page=${page}&pageSize=${pageSize}&nameSort=${nameSort}`);
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
                return postAPI('api/permission/delete', JSON.stringify(item)).then(result => {
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
                return postAPI('api/permission/toggle-status', JSON.stringify(itemUpdateStatus)).then(result => {
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
                    postFormData('api/permission/multidelete', formData).then(result => {
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
        var result = await postAPI('api/permission/update', JSON.stringify(obj))
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
        var result = await postAPI('api/permission/create', JSON.stringify(obj))
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
        <Content className="main-container main-container-component">
            <Card>
                <Row>
                    <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{ marginBottom: "16px" }}>
                        <Skeleton loading={isLoading} active>
                            <Row>
                                <Col xs={{ span: 24 }} lg={{ span: 4 }}>
                                    <Input placeholder="Tên/Mã quyền" allowClear onChange={onChangeSearchInput} />
                                </Col>
                                <Col xs={{ span: 23 }} lg={{ span: 4, offset: 1 }}>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
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
                                </Col>
                            </Row>
                        </Skeleton>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{ marginBottom: "16px" }}>
                        <Skeleton loading={isLoading} active>
                            <Space size={8}>
                                <Button type="primary" onClick={onHandleSearch} icon={<AntdIcons.SearchOutlined />}>
                                    Tìm Kiếm
    </Button>
                                <Button type="primary" className="success" onClick={toggle} icon={<AntdIcons.PlusOutlined />}>
                                    Thêm mới
    </Button>
                                <Button type="primary" className="danger" onClick={onMultiDelete} icon={<AntdIcons.DeleteOutlined />}>
                                    Xoá nhiều
    </Button>
                            </Space>
                        </Skeleton>
                    </Col>

                </Row>
                <Row>
                    <Skeleton loading={isLoading} active>
                        <LoadingOverlay
                            active={isLoading}
                            spinner
                        //spinner={<BounceLoader />}
                        //text='Loading your content...'
                        >
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
                    </Skeleton>
                </Row>
            </Card>
        </Content>

    );
};

export default Menu;
