﻿import React, { useEffect, useState } from 'react';
import FormCreate from './Create';
import FormUpdate from './Update';
import { Select, notification, Input, Skeleton, Card, Col, Row, Layout, Button, Space, Form, Modal } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import useModal from './../../elements/modal/useModal';
import { getAPI, postAPI, postFormData } from './../../../utils/helpers';
import ListData from './ListData';
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'
function Index() {
    //khai báo state
    const [state, setState] = useState([]);
    const [dataDonVi, setDataDonVi] = useState([]);
    const [dataChucVu, setDataChucVu] = useState([]);
    const [dataNhomNguoiDung, setDataNhomNguoiDung] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [search, setSearch] = useState({ Name: "", Status: -1 })
    //Thực hiện thao tác update,create,delete sẽ load lại trang
    const [isAction, setAction] = useState(false);
    const [nameSort, setNameSort] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [ItemUpdate, setItemUpdate] = useState();
    const [listItemRemove, setListItemRemove] = useState([]);
    const [isShowing, toggle] = useModal();
    const [isShowingUpdate, toggleUpdate] = useModal();
    const { Option } = Select;
    const { Header, Content, Footer } = Layout;
    function onSearch(val) {
        console.log('search:', val);
    }
    const validateMessages = {
        required: '${label} không được để trống',
        types: {
            email: '${label} không đúng định dạng email',
            number: '${label} không đúng định dạng số',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    //useEffect(() => {

    //    async function getDonVi() {
    //        var fetchData = await getAPI(`api/dm_donvi/get-all-data-active`);
    //        if (fetchData.status == true) {
    //            setDataDonVi(fetchData.result)
    //        }
    //    }
    //    async function getChucVu() {
    //        var fetchData = await getAPI(`api/dm_chucvu/get-all-data-active`);
    //        if (fetchData.status == true) {
    //            setDataChucVu(fetchData.result)
    //        }
    //    }
    //    async function getNhomNguoiDung() {
    //        var fetchData = await getAPI(`api/user_group/get-all-data-active`);
    //        if (fetchData.status == true) {
    //            setDataNhomNguoiDung(fetchData.result)
    //        }
    //    }
    //    //gọi hàm
    //    getDataPermission()
    //    getDataPermission_TraiPhang()
    //    getDonVi()
    //    getChucVu()
    //    getNhomNguoiDung()
    //    return () => {
    //        setAction(false)
    //    }
    //}, [])
    useEffect(() => {
        async function getData(page, pageSize) {
            let name = search.Name;
            let status = search.Status ? search.Status : -1;
            var obj = {}
            var fetchData = await postAPI(`api/dm_sanpham/list_data/`, JSON.stringify(obj));
            if (fetchData.status == true) {
                setState(fetchData.result)
                setIsLoading(!fetchData.status)
            }
        }
        //gọi hàm
        getData(page, pageSize);
        return () => {
            setAction(false)
            setConfirmLoading(false)
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
            var result = await postAPI('api/dm_sanpham/update', JSON.stringify(ItemPosition))
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

    async function onHandleSearch(data) {
        let name = data.Name ? data.Name : "";
        let status = data.Status ? data.Status : -1;
        console.log(data)
        setSearch({
            ...search,
            Name: name,
            Status: status
        })
        var fetchData = await getAPI(`api/user/list_data?Name=${name}&Status=${status}&page=${page}&pageSize=${pageSize}&nameSort=${nameSort}`);
        if (fetchData.status == true) {
            setState(fetchData.result)
        }
    }
    const onSetNameSort = (name) => {
        //console.log(name)
        setNameSort(name)
    }
    const onToggleStatus = (item) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn không?',
            icon: <AntdIcons.ExclamationCircleOutlined />,
            content: 'Bla bla ...',
            okText: 'Đồng ý',
            cancelText: 'Quay lại',
            //okButtonProps: { loading: confirmLoading },
            onOk: () => {
                return postAPI('api/dm_sanpham/toggle-status', JSON.stringify(item)).then(result => {
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
            }
        });
    }
    const onDelete = (item) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn không?',
            icon: <AntdIcons.ExclamationCircleOutlined />,
            content: 'Bla bla ...',
            okText: 'Đồng ý',
            cancelText: 'Quay lại',
            //okButtonProps: { loading: confirmLoading },
            onOk: () => {
                return postAPI('api/dm_sanpham/delete', JSON.stringify(item)).then(result => {
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
            }
        });
    }
    const onUpdateItem = (item) => {
        //console.log(obj)
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
            Modal.confirm({
                title: 'Bạn có chắc chắn không?',
                icon: <AntdIcons.ExclamationCircleOutlined />,
                content: 'Bla bla ...',
                okText: 'Đồng ý',
                cancelText: 'Quay lại',
                //okButtonProps: { loading: confirmLoading },
                onOk: () => {
                    return postAPI('api/dm_sanpham/multidelete', formData).then(result => {
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
                }
            });
        }

    }
    async function onPostUpdateItem(obj) {
        setConfirmLoading(true)
        var result = await postAPI('api/dm_sanpham/update', JSON.stringify(obj))
        if (result.status) {
            setAction(true)
            toggleUpdate()
            notification.success({
                message: result.message,
                duration: 3
            })
        }
        else {
            toggleUpdate()
            notification.error({
                message: result.message,
                duration: 3
            })
        }

    }
    async function onPostCreateItem(obj) {
        console.log(obj)
        setConfirmLoading(true)
        var result = await postAPI('api/dm_sanpham/create', JSON.stringify(obj))

        if (result.status) {
            setAction(true)
            toggle();
            notification.success({
                message: result.message,
                duration: 3

            })

        }
        else {
            toggle();
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
                            <Form name="nest-messages" layout="inline" onFinish={onHandleSearch} id="myFormSearch"
                                validateMessages={validateMessages}
                                initialValues={{
                                    //["Ordering"]: 0
                                }}
                            >
                                <Row gutter={8}>
                                    <Col xs={{ span: 24 }} lg={{ span: 8 }} md={{ span: 12 }}>
                                        <Form.Item name="Name" label="" style={{ width: '100%' }}>
                                            <Input placeholder="Tên" allowClear />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} lg={{ span: 8 }} md={{ span: 12 }}>
                                        <Form.Item name="Status" label="" style={{ width: '100%' }}>
                                            <Select
                                                showSearch
                                                placeholder="-Chọn trạng thái-"
                                                optionFilterProp="children"
                                                onSearch={onSearch}
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option value="-1">Tất cả</Option>
                                                <Option value="1">Hoạt động</Option>
                                                <Option value="2">Ngừng hoạt động</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} lg={{ span: 8 }} md={{ span: 12 }}>
                                        <Form.Item label="" colon={false} style={{ width: '100%' }}>
                                            <Button type="primary" htmlType="submit" icon={<AntdIcons.SearchOutlined />}>
                                                Tìm Kiếm
    </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
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
                                confirmLoading={confirmLoading}
                            />
                            <FormUpdate
                                isShowing={isShowingUpdate}
                                hide={toggleUpdate}
                                item={ItemUpdate}
                                onPostUpdateItem={onPostUpdateItem}
                                donvi={dataDonVi}
                                chucvu={dataChucVu}
                                nhomNguoiDung={dataNhomNguoiDung}
                                confirmLoading={confirmLoading}
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