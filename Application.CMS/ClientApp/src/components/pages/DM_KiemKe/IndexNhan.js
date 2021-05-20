﻿import React, { useEffect, useState, useMemo } from 'react';
import { useHistory, Route, Redirect } from 'react-router-dom';
import moment from 'moment';
import {
    Select, notification, Input, Skeleton,
    Card, Col, Row, Layout, Button, Space, Form, Modal,
    Drawer, DatePicker, Tooltip
} from 'antd';
import * as AntdIcons from '@ant-design/icons';
import useModal from './../../elements/modal/useModal';
import { getAPI, postAPI, postFormData, getCurrentLogin } from './../../../utils/helpers';
import { USER_LOCALSTORAGE } from './../../../utils/constants';
import ListData from './ListData';
import LoadingOverlay from 'react-loading-overlay'
import PrivateRoute from "../../../utils/PrivateRoute"
import BounceLoader from 'react-spinners/BounceLoader'
import { getLocalStorage } from './../../../utils/helpers';
import { PERMISS_USER_CURRENT } from "../../../utils/constants"
import * as constantPermission from "../../../utils/constantPermission"
import { defineAbilitiesFor, _isPermission } from "../../elements/Config_Roles/appAbility"
function Index({ onSetSanPhamUpdate }) {
    let history = useHistory()
    //khai báo state
    const [state, setState] = useState([]);
    const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [search, setSearch] = useState({
        Status: -1,
        ID_ChiNhanh: -1,
        NgayTao: "",
        NgayKiem: "",
        TypeFilterNgayTao: -1,
        TypeFilterNgayKiem: -1,

    })
    //Thực hiện thao tác update,create,delete sẽ load lại trang
    const [isAction, setAction] = useState(false);
    const [nameSort, setNameSort] = useState('');
    const [DataDonVi, setDataDonVi] = useState({});
    const [DataDonViById, setDataDonViById] = useState({});
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [ItemShow, setItemShow] = useState();
    const [listItemRemove, setListItemRemove] = useState([]);
    const [isShowingView, toggleView] = useModal();
    const { Option } = Select;
    const { Header, Content, Footer } = Layout;
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
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
    useState(() => {
        const getDonVi = async () => {
            var fetchData = await getAPI(`api/dm_donvi/get-all-data-active`);
            if (fetchData.status == true) {
                setDataDonVi(fetchData.result)
            }
        }
        const getDonViById = async () => {
            var Id = getLocalStorage(USER_LOCALSTORAGE).donViId
            var fetchData = await getAPI(`api/dm_donvi/find-by-id?Id=${Id}`);
            if (fetchData.status == true) {
                setDataDonViById(fetchData.result)
            }
        }
        //gọi hàm
        getDonVi()
        getDonViById();
    }, [DataDonVi, DataDonViById])
    useEffect(() => {
        async function getData(page, pageSize) {
            var Id = getLocalStorage(USER_LOCALSTORAGE).donViId
            let name = search.Name;
            let status = search.Status ? search.Status : -1;
            var obj = {
                Name: name,
                Status: status,
                ID_ChiNhanh: Id,
                nameSort: nameSort,
                page,
                pageSize
            }
            var fetchData = await postAPI(`api/dm_kiemke/list_data/`, JSON.stringify(obj));
            if (fetchData.status == true) {
                setState(fetchData.result)
                setIsLoading(!fetchData.status)
            }
        }
        //gọi hàm
        getData(page, pageSize);
        defineAbilitiesFor(getLocalStorage(PERMISS_USER_CURRENT))
        return () => {
            setAction(false)
            setConfirmLoading(false)
        }
    }, [isAction, nameSort, page, pageSize])
    const onChangePage = (page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
    }
    const onSetNameSort = (name) => {
        console.log(name)
        setNameSort(name)
    }
    async function onHandleSearch(data) {
        var NgayTao = data.NgayTao ? moment(data.NgayTao).format('YYYY/MM/DD') : "";
        var NgayKiem = data.NgayKiem ? moment(data.NgayKiem).format('YYYY/MM/DD') : "";
        var Id = getLocalStorage(USER_LOCALSTORAGE).donViId
        var obj = {
            NgayTao: NgayTao,
            NgayKiem: NgayKiem,
            Status: data.Status,
            page: page,
            pageSize: pageSize,
            ID_ChiNhanh: Id,
            TypeFilterNgayTao: 0,
            TypeFilterNgayKiem: 0,
        }
        //setSearch({
        //    ...search,
        //    Status: data.Status ? data.Status : -1
        //})
        console.log(obj)
        var fetchData = await postAPI(`api/dm_kiemke/list_data`, JSON.stringify(obj));
        if (fetchData.status == true) {
            setState(fetchData.result)
        }
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
                return postAPI('api/dm_kiemke/delete', JSON.stringify(item)).then(result => {
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
                    return postAPI('api/dm_kiemke/multidelete', formData).then(result => {
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
    const showDrawer = () => {
        setIsVisibleDrawer(true)
    };
    const onSubmitTimKiemNangCao = async (data) => {
        var NgayTao = data.NgayTao ? moment(data.NgayTao).format('YYYY/MM/DD') : "";
        var NgayKiem = data.NgayKiem ? moment(data.NgayKiem).format('YYYY/MM/DD') : "";
        var Id = getLocalStorage(USER_LOCALSTORAGE).donViId
        var obj = {
            ...data,
            NgayTao: NgayTao,
            NgayKiem: NgayKiem,
            Status: data.Status,
            page: page,
            pageSize: pageSize,
            ID_ChiNhanh: Id,
        }
        var fetchData = await postAPI(`api/dm_kiemke/list_data`, JSON.stringify(obj));
        if (fetchData.status == true) {
            setState(fetchData.result)
        }
        console.log(obj)
    }
    const onChangeDatePickerNgayTao = (date, dateString) => {
        //console.log(date, dateString)
        setSearch({
            ...search,
            NgayTao: dateString
        })
    }
    const onChangeDatePickerNgayKiem = (date, dateString) => {
        //console.log(date, dateString)
        setSearch({
            ...search,
            NgayKiem: dateString
        })
    }
    const onClose = () => {
        setIsVisibleDrawer(false)
    };
    function openCreate() {
        history.push({
            pathname: '/dm_kiemke/create',
            state: { controller: "Phiếu kiểm hàng", action: "" }
        });
    }
    const onUpdateItem = async (item) => {
        var obj = {
            Code: item.code,
            TaiKhoanDuyet: getCurrentLogin().id
        }
        var result = await postAPI('api/dm_nhaphang/pheduyet', JSON.stringify(obj))
        if (result.status) {
            notification.success({
                message: result.message,
                duration: 3

            })
            setAction(result.status)

        }
        else {
            notification.error({
                message: result.message,
                duration: 3

            })
            setAction(result.status)
        }
        //console.log(obj)
    }
    const onShowItem = async (item) => {
        setItemShow(item)
    }
    let NgayTao = search.NgayTao
    let NgayKiem = search.NgayKiem
    return (
        <Content className="main-container main-container-component">
            <Card>
                <Row>
                    <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{ marginBottom: "16px" }}>
                        <Skeleton loading={isLoading} active>
                            <Row gutter={8}>
                                <Form
                                    name="nest-messages" layout="inline" onFinish={onHandleSearch} id="myFormSearch"
                                    validateMessages={validateMessages}
                                    initialValues={{
                                        //["NgayTao"]: moment(NgayTao, 'YYYY-MM-DD').isValid() ? moment(NgayTao, 'YYYY-MM-DD') : moment(new Date(), 'YYYY-MM-DD'),
                                        //["NgayDuyet"]: moment(NgayDuyet, 'YYYY-MM-DD').isValid() ? moment(NgayDuyet, 'YYYY-MM-DD') : "",
                                        //["NgayNhanSanPham"]: moment(NgayNhanSanPham, 'YYYY-MM-DD').isValid() ? moment(NgayNhanSanPham, 'YYYY-MM-DD') : "",
                                        ["Status"]: -1
                                    }}
                                >
                                    <Col xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 8 }}>
                                        <Form.Item name="NgayTao" label="" style={{ width: '100%' }}>
                                            <DatePicker placeholder="Ngày tạo"
                                                style={{ width: '100%' }}
                                                format={"DD/MM/YYYY"}
                                                onChange={onChangeDatePickerNgayTao} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 8 }}>
                                        <Form.Item name="NgayKiem" label="" style={{ width: '100%' }}>
                                            <DatePicker placeholder="Ngày kiểm hàng"
                                                style={{ width: '100%' }}
                                                format={"DD/MM/YYYY"}
                                                getPopupContainer={trigger => trigger.parentElement}
                                                onChange={onChangeDatePickerNgayKiem}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 8 }}>
                                        <Form.Item name="Status" label="" style={{ width: '100%' }}>
                                            <Select
                                                showSearch
                                                placeholder="-Chọn trạng thái-"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option value={-1}>Tất cả</Option>
                                                <Option value={0}>Tạo phiếu</Option>
                                                <Option value={1}>Đã kiểm kho</Option>
                                                <Option value={2}>Đang cân bằng kho</Option>
                                                <Option value={3}>Hoàn thành</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} lg={{ span: 4 }} md={{ span: 12 }}>
                                        <Form.Item label="" colon={false} style={{ width: '100%' }}>
                                            <Button type="primary" htmlType="submit" icon={<AntdIcons.SearchOutlined />}>
                                                Tìm Kiếm
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Form>
                            </Row>
                        </Skeleton>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{ marginBottom: "16px" }}>
                        <Skeleton loading={isLoading} active>
                            <Space size={8}>
                                {_isPermission(constantPermission.CREATE, constantPermission.DM_KIEMKE) ?
                                    <Button type="primary" className="success" onClick={openCreate} icon={<AntdIcons.PlusOutlined />}>
                                        Thêm mới
                                    </Button> : null
                                }
                                {_isPermission(constantPermission.DELETE, constantPermission.DM_KIEMKE) ?
                                    <Button type="primary" className="danger" onClick={onMultiDelete} icon={<AntdIcons.DeleteOutlined />}>
                                        Xoá nhiều
                                    </Button> : null
                                }
                                <Button type="primary" className="primary" onClick={showDrawer} icon={<AntdIcons.ControlOutlined />}>
                                    Tìm kiếm nâng cao
                                </Button>
                            </Space>
                        </Skeleton>
                    </Col>

                </Row>
                <Row>
                    <Skeleton loading={isLoading} active paragraph={false}>
                        <ListData obj={state}
                            onChangePage={onChangePage}
                            onDeleteItem={onDelete}
                            UpdateItem={onUpdateItem}
                            onToggleView={toggleView}
                            onMultiDelete={setListItemRemove}
                            onShowItem={onShowItem}
                            onSetNameSort={onSetNameSort}
                        />
                        <Drawer
                            title="Tìm kiếm nâng cao"
                            width="40vw"
                            onClose={onClose}
                            visible={isVisibleDrawer}
                            bodyStyle={{ paddingBottom: 80 }}
                            footer={
                                <div
                                    style={{
                                        textAlign: 'right',
                                    }}
                                >
                                    <Button onClick={onReset} style={{ marginRight: 8 }}>
                                        Xoá bộ lọc
              </Button>
                                    <Button form="formTimKiemNangCao" key="submit" htmlType="submit" type="primary">
                                        Lọc
              </Button>
                                </div>
                            }
                        >

                            <Form
                                id="formTimKiemNangCao"
                                form={form}
                                layout="vertical"
                                initialValues={{
                                    ["TypeFilterNgayTao"]: -1,
                                    ["TypeFilterNgayKiem"]: -1,
                                    ["Status"]: -1,
                                    //["NgayTao"]: moment(NgayTao, 'YYYY-MM-DD').isValid() ? moment(NgayTao, 'YYYY-MM-DD') : moment(new Date(), 'YYYY-MM-DD'),
                                    //["NgayDuyet"]: moment(NgayDuyet, 'YYYY-MM-DD').isValid() ? moment(NgayDuyet, 'YYYY-MM-DD') : "",
                                    //["NgayNhanSanPham"]: moment(NgayNhanSanPham, 'YYYY-MM-DD').isValid() ? moment(NgayNhanSanPham, 'YYYY-MM-DD') : "",
                                }}
                                onFinish={onSubmitTimKiemNangCao}
                                hideRequiredMark                            >
                                <Row gutter={16}>
                                    <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
                                        <Form.Item
                                            name="NgayTao"
                                            label="Ngày tạo"
                                        >
                                            <DatePicker
                                                style={{ width: '100%' }}
                                                getPopupContainer={trigger => trigger.parentElement}
                                                onChange={onChangeDatePickerNgayTao}
                                                format={"DD/MM/YYYY"}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
                                        <Form.Item
                                            name="TypeFilterNgayTao"
                                            label="Kiểu lọc ngày"
                                        >
                                            <Select placeholder="Please choose the type">
                                                <Option value={-1}>-- Chon --</Option>
                                                <Option value={0}>Bằng</Option>
                                                <Option value={1}>Lớn hơn hoặc bằng</Option>
                                                <Option value={2}>Nhỏ hơn hoặc bằng</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
                                        <Form.Item
                                            name="NgayKiem"
                                            label="Ngày kiểm hàng"
                                        >
                                            <DatePicker
                                                style={{ width: '100%' }}
                                                getPopupContainer={trigger => trigger.parentElement}
                                                onChange={onChangeDatePickerNgayKiem}
                                                format={"DD/MM/YYYY"}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
                                        <Form.Item
                                            name="TypeFilterNgayKiem"
                                            label="Kiểu lọc ngày"
                                        >
                                            <Select placeholder="Please choose the type">
                                                <Option value={-1}>-- Chon --</Option>
                                                <Option value={0}>Bằng</Option>
                                                <Option value={1}>Lớn hơn hoặc bằng</Option>
                                                <Option value={2}>Nhỏ hơn hoặc bằng</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
                                        <Form.Item name="Status" label="" style={{ width: '100%' }}>
                                            <Select
                                                showSearch
                                                placeholder="-Chọn trạng thái-"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option value={-1}>Tất cả</Option>
                                                <Option value={0}>Tạo phiếu</Option>
                                                <Option value={1}>Đã kiểm kho</Option>
                                                <Option value={2}>Đang cân bằng kho</Option>
                                                <Option value={3}>Hoàn thành</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>

                                    </Col>
                                </Row>
                            </Form>
                        </Drawer>
                    </Skeleton>
                </Row>
            </Card>
        </Content >
    );
};

export default Index;
