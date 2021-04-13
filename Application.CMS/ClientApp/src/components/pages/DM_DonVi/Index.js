import React, { useEffect, useState } from 'react';
import FormCreate from './Create';
import FormUpdate from './Update';
import { Select, notification, Input, Skeleton, Card, Col, Row, Layout, Button, Space } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import useModal from './../../elements/modal/useModal';
import { getAPI, postAPI, postFormData } from './../../../utils/helpers';
import ListData from './ListData';
import Swal from 'sweetalert2';
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'
function Index() {
    //khai báo state
    const [state, setState] = useState([]);
    const [stateTinh, setStateTinh] = useState([]);
    const [stateXa, setStateXa] = useState([]);
    const [stateHuyen, setStateHuyen] = useState([]);
    const [search, setSearch] = useState({ Name: "", Status: -1 })
    //Thực hiện thao tác update,create,delete sẽ load lại trang
    const [isAction, setAction] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [options, setOption] = useState([]);
    const [nameSort, setNameSort] = useState('');
    const [pageSize, setPageSize] = useState(10);
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
            var fetchData = await getAPI(`api/dm_donvi/list_data/?Name=${name}&Status=${status}&page=${page}&pageSize=${pageSize}&nameSort=${nameSort}`);
            if (fetchData.status == true) {
                setState(fetchData.result)
                setIsLoading(!fetchData.status)
            }
        }

        async function getOptions() {
            var fetchData = await getAPI('api/dm_donvi/get-options');
            //console.log(fetchData)
            let arrOption = []
            if (fetchData.status == true) {
                setOption(fetchData.result)
            }
        }
        //gọi hàm
        getData(page, pageSize);
        getOptions();

        return () => {
            setAction(false)
        }
    }, [isAction, nameSort, page, pageSize])
    useEffect(() => {
        async function getDonViHanhChinh() {
            var fetchData = await getAPI(`api/dm_donvihanhchinh/get-don-vi-hanh-chinh/?ParentId=0`);
            if (fetchData.status == true) {
                setStateTinh(fetchData.result)
            }
        }
        //gọi hàm
        getDonViHanhChinh()
    }, [])
    async function onUpdateItemPosition(ItemPosition) {
        console.log(ItemPosition)
        if (ItemPosition.ordering < 0 || Number.isNaN(ItemPosition.ordering)) {
            notification.error({
                message: "Giá trị nhập vào chưa chính xác",
                duration: 3

            })
        }
        else {
            var result = await postAPI('api/dm_donvi/update', JSON.stringify(ItemPosition))
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
        var fetchData = await getAPI(`api/dm_donvi/list_data?Name=${name}&Status=${status}&page=${page}&pageSize=${pageSize}&nameSort=${nameSort}`);
        if (fetchData.status == true) {
            setState(fetchData.result)
        }
    }
    const onChangeSelectTinh = async (TinhId) => {
        console.log(TinhId)
        var fetchData = await getAPI(`api/dm_donvihanhchinh/get-don-vi-hanh-chinh/?ParentId=${TinhId}`);
        if (fetchData.status == true) {
            setStateHuyen(fetchData.result)
        }
    }
    const onChangeSelectHuyen = async (HuyenId) => {
        console.log(HuyenId)
        var fetchData = await getAPI(`api/dm_donvihanhchinh/get-don-vi-hanh-chinh/?ParentId=${HuyenId}`);
        if (fetchData.status == true) {
            setStateXa(fetchData.result)
        }
    }
    const onSetNameSort = (name) => {
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
                return postAPI('api/dm_donvi/update', JSON.stringify(item)).then(result => {
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
                return postAPI('api/dm_donvi/delete', JSON.stringify(item)).then(result => {
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
    const onUpdateItem = async (item) => {
        onChangeSelectTinh(item.tinhId)
        onChangeSelectHuyen(item.huyenId)
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
                    return postFormData('api/dm_donvi/multidelete', formData).then(result => {
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
        var result = await postAPI('api/dm_donvi/update', JSON.stringify(obj))
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
        //console.log(obj)
        setIsLoading(true)
        var result = await postAPI('api/dm_donvi/create', JSON.stringify(obj))
        toggle();
        if (result.status) {
            setAction(true)
            setIsLoading(!result.status)
            notification.success({
                message: result.message,
                duration: 3

            })

        }
        else {
            setIsLoading(result.status)
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
                                    <Input placeholder="Tên/Mã đơn vị" allowClear onChange={onChangeSearchInput} />
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
                                Tinh={stateTinh}
                                Huyen={stateHuyen}
                                Xa={stateXa}
                                onChangeSelectTinh={onChangeSelectTinh}
                                onChangeSelectHuyen={onChangeSelectHuyen}
                            />
                            <FormUpdate
                                isShowing={isShowingUpdate}
                                hide={toggleUpdate}
                                item={ItemUpdate}
                                onPostUpdateItem={onPostUpdateItem}
                                data={options}
                                Tinh={stateTinh}
                                Huyen={stateHuyen}
                                Xa={stateXa}
                                onChangeSelectTinh={onChangeSelectTinh}
                                onChangeSelectHuyen={onChangeSelectHuyen}
                            />
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
                        </LoadingOverlay>
                    </Skeleton>
                </Row>
            </Card>
        </Content>

    );
};
export default Index;
