import React, { useEffect, useState, useMemo } from 'react';
import { useHistory, Route, Redirect } from 'react-router-dom';

import {
    Select, notification, Input, Skeleton,
    Card, Col, Row, Layout, Button, Space, Form, Modal,
    Drawer, DatePicker, Tooltip
} from 'antd';
import * as AntdIcons from '@ant-design/icons';
import useModal from './../../elements/modal/useModal';
import { getAPI, postAPI, postFormData } from './../../../utils/helpers';
import ListData from './ListData';
import FormView from './View';
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
    const [search, setSearch] = useState({ Name: "", Status: -1, LoaiSP: 0, ThuongHieu_Id: 0, XuatXu_Id: 0, NgayTao: "", TypeFilterNgayTao: -1 })
    //Thực hiện thao tác update,create,delete sẽ load lại trang
    const [isAction, setAction] = useState(false);
    const [nameSort, setNameSort] = useState('');
    const [dataLoaiSP, setDataLoaiSP] = useState([]);
    const [dataThuongHieu, setDataThuongHieu] = useState([]);
    const [dataXuatXu, setDataXuatXu] = useState([]);
    const [dataDonViTinh, setDataDonViTinh] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [ItemUpdate, setItemUpdate] = useState();
    const [ItemShow, setItemShow] = useState();
    const [listItemRemove, setListItemRemove] = useState([]);
    const [isShowing, toggle] = useModal();
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

        async function getLoaiSanpham() {
            var fetchData = await getAPI(`api/dm_loaisanpham/get-all-data-active`);
            if (fetchData.status == true) {
                setDataLoaiSP(fetchData.result)
            }
        }
        async function getThuongHieu() {
            var fetchData = await getAPI(`api/dm_thuonghieu/get-all-data-active`);
            if (fetchData.status == true) {
                setDataThuongHieu(fetchData.result)
            }
        }
        async function getXuatXu() {
            var fetchData = await getAPI(`api/dm_xuatxu/get-all-data-active`);
            if (fetchData.status == true) {
                setDataXuatXu(fetchData.result)
            }
        }
        async function getDonViTinh() {
            var fetchData = await getAPI(`api/dm_donvitinh/get-all-data-active`);
            if (fetchData.status == true) {
                setDataDonViTinh(fetchData.result)
            }
        }
        //gọi hàm
        getLoaiSanpham()
        getThuongHieu()
        getXuatXu()
        getDonViTinh()
    }, [dataLoaiSP, dataThuongHieu, dataXuatXu, dataDonViTinh])
    useEffect(() => {
        async function getData(page, pageSize) {
            let name = search.Name;
            let status = search.Status ? search.Status : -1;
            var obj = {
                Name: name,
                Status: status,
                nameSort: nameSort,
                page,
                pageSize
            }
            var fetchData = await postAPI(`api/dm_sanpham/list_data/`, JSON.stringify(obj));
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
        //console.log(data)
        var obj = {
            Name: data.Name ?? "",
            Status: data.Status ? Number.parseInt(data.Status) : -1,
            page: page,
            pageSize: pageSize,
            nameSort: nameSort
        }
        setSearch({
            ...search,
            Name: data.Name ?? "",
            Status: data.Status ? Number.parseInt(data.Status) : -1
        })
        var fetchData = await postAPI(`api/dm_sanpham/list_data`, JSON.stringify(obj));
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
    const showDrawer = () => {
        setIsVisibleDrawer(true)
    };
    const onSubmitTimKiemNangCao = async (data) => {
        var obj = {
            ...data,
            NgayTao: search.NgayTao,
            Name: data.Name ?? ""
        }
        var fetchData = await postAPI(`api/dm_sanpham/list_data`, JSON.stringify(obj));
        if (fetchData.status == true) {
            setState(fetchData.result)
        }
        console.log(obj)
    }
    const onChangeDatePicker = (date, dateString) => {
        setSearch({
            ...search,
            NgayTao: dateString
        })
    }
    const onClose = () => {
        setIsVisibleDrawer(false)
    };
    function openCreate() {
        history.push({
            pathname: '/dm_sanpham/create',
            state: { controller: "Danh mục sản phẩm", action: "Tạo mới" }
        });
    }
    const onUpdateItem = (item) => {
        history.push({
            pathname: `/dm_sanpham/update/${item.code}`,
            state: { controller: "Danh mục sản phẩm", action: "Cập nhật" }
        });
    }
    const onShowItem = (item) => {
        setItemShow(item)
    }
    return (
        <Content className="main-container main-container-component">
            <Card>
                <Row>
                    <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{ marginBottom: "16px" }}>
                        <Skeleton loading={isLoading} active>
                            <Row gutter={8}>
                                <Form name="nest-messages" layout="inline" onFinish={onHandleSearch} id="myFormSearch"
                                    validateMessages={validateMessages}
                                    initialValues={{
                                        //["Ordering"]: 0
                                    }}
                                >

                                    <Col xs={{ span: 24 }} lg={{ span: 14 }} md={{ span: 12 }}>
                                        <Form.Item name="Name" label="" style={{ width: '100%' }}>
                                            <Input placeholder="Tên sản phẩm,mã sản phẩm,barcode" allowClear prefix={<AntdIcons.SearchOutlined />} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 12 }}>
                                        <Form.Item name="Status" label="" style={{ width: '100%' }}>
                                            <Select
                                                showSearch
                                                placeholder="-Chọn trạng thái-"
                                                optionFilterProp="children"
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
                                    <Col xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 12 }}>
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
                                {_isPermission(constantPermission.CREATE, constantPermission.DM_SANPHAM) ?
                                    <Button type="primary" className="success" onClick={openCreate} icon={<AntdIcons.PlusOutlined />}>
                                        Thêm mới
                                    </Button> : null
                                }
                                {_isPermission(constantPermission.DELETE, constantPermission.DM_SANPHAM) ?
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
                        <FormView
                            isShowing={isShowingView}
                            hide={toggleView}
                            item={ItemShow}
                            confirmLoading={confirmLoading}
                        />
                        <ListData obj={state}
                            onChangePage={onChangePage}
                            onDeleteItem={onDelete}
                            UpdateItem={onUpdateItem}
                            onToggleView={toggleView}
                            onMultiDelete={setListItemRemove}
                            onUpdateItemPosition={onUpdateItemPosition}
                            toggleStatus={onToggleStatus}
                            onSetNameSort={onSetNameSort}
                            onShowItem={onShowItem}

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
                                    ["ThuongHieu_Id"]: -1,
                                    ["XuatXu_Id"]: -1,
                                    ["LoaiSP"]: -1,
                                    ["TypeFilterNgayTao"]: -1
                                }}
                                onFinish={onSubmitTimKiemNangCao}
                            /*hideRequiredMark*/
                            >
                                <Row gutter={16}>
                                    <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
                                        <Form.Item
                                            name="Name"
                                            label="Tên,Mã,Barcode"
                                        >
                                            <Input placeholder="Mã sản phẩm,tên sản phẩm,barcode" allowClear />
                                        </Form.Item>
                                    </Col>
                                    <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
                                        <Form.Item
                                            name="LoaiSP"
                                            label="Loại sản phẩm"
                                        >
                                            <Select
                                                showSearch
                                                //style={{ width: 200 }}
                                                placeholder="-- Chọn --"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                filterSort={(optionA, optionB) =>
                                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                }
                                            >
                                                <Option value={-1}>-- Chọn --</Option>
                                                {dataLoaiSP.map(item => {
                                                    return (
                                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                                    )
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
                                        <Form.Item
                                            name="NgayTao"
                                            label="Ngày tạo"
                                        >
                                            <DatePicker
                                                style={{ width: '100%' }}
                                                getPopupContainer={trigger => trigger.parentElement}
                                                onChange={onChangeDatePicker}
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
                                            name="XuatXu_Id"
                                            label="Xuất xứ"
                                        >
                                            <Select placeholder="Please choose">
                                                <Option value={-1}>-- Chọn --</Option>
                                                {dataXuatXu.map(item => {
                                                    return (
                                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                                    )
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
                                        <Form.Item
                                            name="ThuongHieu_Id"
                                            label="Thương Hiệu"
                                        >
                                            <Select placeholder="Please choose the type">
                                                <Option value={-1}>-- Chọn --</Option>
                                                {dataThuongHieu.map(item => {
                                                    return (
                                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                                    )
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Drawer>
                    </Skeleton>
                </Row>
            </Card>
        </Content>
    );
};

export default Index;
