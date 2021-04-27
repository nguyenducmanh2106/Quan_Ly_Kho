import React, { useEffect, useState, useMemo } from 'react';
import { useHistory, Route, Redirect } from 'react-router-dom';

import {
    Select, notification, Input, Skeleton,
    Card, Col, Row, Layout, Button, Space, Form, Modal,
    Drawer, DatePicker, Tooltip
} from 'antd';
import * as AntdIcons from '@ant-design/icons';
import useModal from './../../elements/modal/useModal';
import { getAPI, postAPI, postFormData, getLocalStorage } from './../../../utils/helpers';
import { USER_LOCALSTORAGE } from './../../../utils/constants';
import ListData from './ListDataGui';
import FormView from './View';
import LoadingOverlay from 'react-loading-overlay'
import PrivateRoute from "../../../utils/PrivateRoute"
import BounceLoader from 'react-spinners/BounceLoader'
function Index({ onSetSanPhamUpdate }) {
    let history = useHistory()
    //khai báo state
    const [state, setState] = useState([]);
    const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [search, setSearch] = useState({
        Name: "",
        Status: -1,
        ID_ChiNhanhGui: -1,
        LoaiDeNghi_Id: -1,
        NgayTao: "",
        NgayDuyet: "",
        ThoiGianGuiSanPham: "",
        TypeFilterNgayTao: -1,
        TypeFilterNgayDuyet: -1,
        TypeFilterThoiGianGuiSanPham: -1,

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
                nameSort: nameSort,
                ID_ChiNhanhGui: Id
            }
            var fetchData = await postAPI(`api/dm_denghidieudong/list_data_gui/`, JSON.stringify(obj));
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
            var result = await postAPI('api/dm_denghidieudong/update', JSON.stringify(ItemPosition))
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
        var Id = getLocalStorage(USER_LOCALSTORAGE).donViId
        var obj = {
            Name: data.Name ?? "",
            Status: data.Status ? Number.parseInt(data.Status) : -1,
            page: page,
            pageSize: pageSize,
            nameSort: nameSort,
            ID_ChiNhanhGui: Id
        }
        setSearch({
            ...search,
            Name: data.Name ?? "",
            Status: data.Status ? Number.parseInt(data.Status) : -1
        })
        var fetchData = await postAPI(`api/dm_denghidieudong/list_data_gui`, JSON.stringify(obj));
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
                return postAPI('api/dm_denghidieudong/delete', JSON.stringify(item)).then(result => {
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
                    return postAPI('api/dm_denghidieudong/multidelete', formData).then(result => {
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
        var Id = getLocalStorage(USER_LOCALSTORAGE).donViId
        var obj = {
            ...data,
            NgayTao: search.NgayTao,
            Name: data.Name ?? "",
            ID_ChiNhanhGui: Id
        }
        var fetchData = await postAPI(`api/dm_denghidieudong/list_data_gui`, JSON.stringify(obj));
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
            pathname: '/dm_denghidieudong/create',
            state: { controller: "Yêu cầu nhập hàng", action: "Tạo mới" }
        });
    }
    const onUpdateItem = (item) => {
        history.push({
            pathname: `/dm_denghidieudong/update/${item.id}`,
            state: { controller: "Yêu cầu nhập hàng", action: "Cập nhật" }
        });
    }
    const onShowItem = async (item) => {
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
                                                <Option value="1">Đang chờ phê duyệt</Option>
                                                <Option value="2">Đã phê duyệt</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 12 }}>
                                        <Form.Item label="" colon={false} style={{ width: '100%' }}>
                                            <Button type="primary" htmlType="submit" icon={<AntdIcons.SearchOutlined />}>
                                                Tìm Kiếm
                                            </Button>
                                            <Tooltip title="Tìm kiếm nâng cao">
                                                <Button type="primary" icon={<AntdIcons.ControlOutlined />} onClick={showDrawer} />
                                            </Tooltip>
                                        </Form.Item>
                                    </Col>
                                </Form>
                            </Row>
                        </Skeleton>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{ marginBottom: "16px" }}>
                        <Skeleton loading={isLoading} active>
                            <Space size={8}>
                                <Button type="primary" className="success" onClick={openCreate} icon={<AntdIcons.PlusOutlined />}>
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
                                    ["TypeFilterNgayTao"]: -1,
                                    ["TypeFilterNgayDuyet"]: -1,
                                    ["TypeFilterThoiGianGuiSanPham"]: -1,
                                }}
                                onFinish={onSubmitTimKiemNangCao}
                            /*hideRequiredMark*/
                            >
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
                                            name="NgayDuyet"
                                            label="Ngày duyệt"
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
                                            name="TypeFilterNgayDuyet"
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
                                            name="ThoiGianGuiSanPham"
                                            label="Ngày gửi hàng"
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
                                            name="TypeFilterThoiGianGuiSanPham"
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
                            </Form>
                        </Drawer>
                    </Skeleton>
                </Row>
            </Card>
        </Content>
    );
};

export default Index;
