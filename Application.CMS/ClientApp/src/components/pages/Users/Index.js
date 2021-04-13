import React, { useEffect, useState } from 'react';
import FormCreate from './Create';
import FormChangePass from './ChangePassWord';
import FormCreatePermission from './CreatePermission';
import FormUpdate from './Update';
import { Select, notification, Input, Skeleton, Card, Col, Row, Layout, Button, Space } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import useModal from './../../elements/modal/useModal';
import { getAPI, postAPI, postFormData } from './../../../utils/helpers';
import ListData from './ListData';
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'
import Swal from 'sweetalert2';
function Index() {
    //khai báo state
    const [state, setState] = useState([]);
    const [permission, setPermission] = useState([]);
    const [permission_TraiPhang, setPermission_TraiPhang] = useState([]);
    const [dataDonVi, setDataDonVi] = useState([]);
    const [dataChucVu, setDataChucVu] = useState([]);
    const [dataNhomNguoiDung, setDataNhomNguoiDung] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState({ Name: "", Status: -1 })
    //Thực hiện thao tác update,create,delete sẽ load lại trang
    const [isAction, setAction] = useState(false);
    const [nameSort, setNameSort] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [listPermission, setListPermission] = useState([]);
    const [ItemCreatePermission, setItemCreatePermission] = useState();
    const [ItemUpdate, setItemUpdate] = useState();
    const [listItemRemove, setListItemRemove] = useState([]);
    const { isShowing, toggle, isShowingUpdate, toggleUpdate, isOpenPermission, toggleFormPermission,
        isOpenChangePass, toggleFormChangePass
    } = useModal();
    const { Option } = Select;
    const { Header, Content, Footer } = Layout;
    function onSearch(val) {
        console.log('search:', val);
    }
    useEffect(() => {
        async function getDataPermission() {
            var obj = {
                usergroupId: 1,
                code: "users"
            }
            var fetchData = await getAPI(`api/permission/data-permission?usergroupId=${obj.usergroupId}&code=${obj.code}`);
            if (fetchData.status == true) {
                setPermission(fetchData.result)
            }
        }
        async function getDataPermission_TraiPhang() {
            var obj = {
                usergroupId: 1,
                code: "users"
            }
            var fetchData = await getAPI(`api/permission/data-permission-trai-phang?usergroupId=${obj.usergroupId}&code=${obj.code}`);
            if (fetchData.status == true) {
                setPermission_TraiPhang(fetchData.result)
            }
        }
        async function getDonVi() {
            var fetchData = await getAPI(`api/dm_donvi/get-all-data-active`);
            if (fetchData.status == true) {
                setDataDonVi(fetchData.result)
            }
        }
        async function getChucVu() {
            var fetchData = await getAPI(`api/dm_chucvu/get-all-data-active`);
            if (fetchData.status == true) {
                setDataChucVu(fetchData.result)
            }
        }
        async function getNhomNguoiDung() {
            var fetchData = await getAPI(`api/user_group/get-all-data-active`);
            if (fetchData.status == true) {
                setDataNhomNguoiDung(fetchData.result)
            }
        }
        //gọi hàm
        getDataPermission()
        getDataPermission_TraiPhang()
        getDonVi()
        getChucVu()
        getNhomNguoiDung()
        return () => {
            setAction(false)
        }
    }, [])
    useEffect(() => {
        async function getData(page, pageSize) {
            let name = search.Name;
            let status = search.Status ? search.Status : -1;
            var fetchData = await getAPI(`api/user/list_data/?Name=${name}&Status=${status}&page=${page}&pageSize=${pageSize}&nameSort=${nameSort}`);
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
                message: "Giá trị nhập vào không chính xác",
                duration: 3

            })
        }
        else {
            var result = await postAPI('api/user/update', JSON.stringify(ItemPosition))
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
    async function onCreatePermission(lstPermission) {
        var permission = "";
        var itemUpdate = ItemCreatePermission
        if (lstPermission.length > 0 && permission_TraiPhang.length > 0) {
            permission_TraiPhang.map(item => {
                if (lstPermission.includes(item.value) && item.id !== "") {
                    if (permission === "") {
                        permission = item.id
                    }
                    else {
                        permission += `,${item.id}`;
                    }
                }
            })
        }
        console.log(permission_TraiPhang)
        var obj = {
            ...itemUpdate,
            permission
        }
        //console.log(obj)
        var result = await postAPI('api/user/change-permission', JSON.stringify(obj))
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
        toggleFormPermission()
    }
    async function onHandleSearch() {
        let name = search.Name;
        let status = search.Status ? search.Status : -1;
        var fetchData = await getAPI(`api/user/list_data?Name=${name}&Status=${status}&page=${page}&pageSize=${pageSize}&nameSort=${nameSort}`);
        if (fetchData.status == true) {
            setState(fetchData.result)
        }
    }
    const onSetNameSort = (name) => {
        //console.log(name)
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
                return postAPI('api/user/toggle-status', JSON.stringify(item)).then(result => {
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
                return postAPI('api/user/delete', JSON.stringify(item)).then(result => {
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
        var nhomND = []
        if (item && item.userGroupID) {
            nhomND = item.userGroupID.split(",");
        }
        var result = nhomND.map(item => {
            return Number.parseInt(item)
        })
        var obj = {
            ...item,
            userGroupID: result
        }
        //console.log(obj)
        setItemUpdate(obj)
    }
    const onSetItemCreatePermission = (itemPermiss) => {
        //set Item sẽ tạo quyền
        setItemCreatePermission(itemPermiss)
        //trả ra dạng ["string","string"] là danh sách path của các quyền trong tree-select
        var array = [];
        if (itemPermiss && itemPermiss.permission) {
            var lstStringPermission = []
            itemPermiss.permission.split(",").forEach(item => {
                lstStringPermission.push(item)
            })
            permission_TraiPhang.map(item => {
                if (item.id !== "" && lstStringPermission.includes(item.id)) {
                    array.push(item.value)

                }
            })
        }
        setListPermission(array)
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
                //confirmButtonClass: "ant-btn ant-btn-primary",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Có",
                cancelButtonText: "Không",
                showLoaderOnConfirm: true,
                preConfirm: (isConfirm) => {
                    postFormData('api/user/multidelete', formData).then(result => {
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
        toggleUpdate()
        var result = await postAPI('api/user/update', JSON.stringify(obj))

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
    async function onPostChangePassWordItem(obj) {
        var result = await postAPI('api/user/changepass-user', JSON.stringify(obj))
        toggleFormChangePass()
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
        console.log(obj)
        var result = await postAPI('api/user/create', JSON.stringify(obj))
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
                                    <Input placeholder="Tên" allowClear onChange={onChangeSearchInput} />
                                </Col>
                                <Col xs={{ span: 24 }} lg={{ span: 4, offset: 1 }}>
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
                    <Skeleton loading={isLoading} active paragraph={false}>
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
                                donvi={dataDonVi}
                                chucvu={dataChucVu}
                                nhomNguoiDung={dataNhomNguoiDung}
                            />
                            <FormUpdate
                                isShowing={isShowingUpdate}
                                hide={toggleUpdate}
                                item={ItemUpdate}
                                onPostUpdateItem={onPostUpdateItem}
                                donvi={dataDonVi}
                                chucvu={dataChucVu}
                                nhomNguoiDung={dataNhomNguoiDung}
                            />
                            <FormCreatePermission
                                isShowing={isOpenPermission}
                                hide={toggleFormPermission}
                                data={permission}
                                onCreatePermission={onCreatePermission}
                                listPermission={listPermission}
                            />
                            <FormChangePass
                                isShowing={isOpenChangePass}
                                hide={toggleFormChangePass}
                                item={ItemUpdate}
                                onPostChangePassWordItem={onPostChangePassWordItem}
                            />
                            <ListData obj={state}
                                onChangePage={onChangePage}
                                onDeleteItem={onDelete}
                                UpdateItem={onUpdateItem}
                                onToggleFormpdate={toggleUpdate}
                                toggleFormPermission={toggleFormPermission}
                                toggleFormChangePass={toggleFormChangePass}
                                onMultiDelete={setListItemRemove}
                                onUpdateItemPosition={onUpdateItemPosition}
                                toggleStatus={onToggleStatus}
                                onSetNameSort={onSetNameSort}
                                onSetItemCreatePermission={onSetItemCreatePermission}

                            />
                        </LoadingOverlay>
                    </Skeleton>
                </Row>
            </Card>
        </Content>
    );
};

export default Index;
