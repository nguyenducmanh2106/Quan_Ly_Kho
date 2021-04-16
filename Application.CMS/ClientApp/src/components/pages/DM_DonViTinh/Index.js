import React, { useEffect, useState } from 'react';
import FormCreate from './Create';
import FormUpdate from './Update';
import { Select, notification, Input, Skeleton, Card, Col, Row, Layout, Button, Space, Modal } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import useModal from './../../elements/modal/useModal';
import { getAPI, postAPI, postFormData } from './../../../utils/helpers';
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'
import ListData from './ListData';
function Menu() {

    //khai báo state
    const [state, setState] = useState([]);
    //Thực hiện thao tác update,create,delete sẽ load lại trang
    const [isAction, setAction] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [nameSort, setNameSort] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [ItemUpdate, setItemUpdate] = useState();
    const [listItemRemove, setListItemRemove] = useState([]);
    const [isShowing, toggle] = useModal();
    const [isShowingUpdate, toggleUpdate] = useModal();
    const { Header, Content, Footer } = Layout;
    useEffect(() => {
        async function getData(page, pageSize) {
            var fetchData = await getAPI(`api/dm_donvitinh/list_data/?page=${page}&pageSize=${pageSize}&nameSort=${nameSort}`);
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
    }, [nameSort, isAction, page, pageSize])
    async function onUpdateItemPosition(ItemPosition) {
        console.log(ItemPosition)
        if (ItemPosition.ordering < 0 || Number.isNaN(ItemPosition.ordering)) {
            notification.error({
                message: "Giá trị nhập vào chưa chính xác",
                duration: 3

            })
        }
        else {
            var result = await postAPI('api/dm_donvitinh/update', JSON.stringify(ItemPosition))
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
        Modal.confirm({
            title: 'Bạn có chắc chắn không?',
            icon: <AntdIcons.ExclamationCircleOutlined />,
            content: 'Bla bla ...',
            okText: 'Đồng ý',
            cancelText: 'Quay lại',
            //okButtonProps: { loading: confirmLoading },
            onOk: () => {
                return postAPI('api/dm_donvitinh/delete', JSON.stringify(item)).then(result => {
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
    const onToggleStatus = (itemUpdateStatus) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn không?',
            icon: <AntdIcons.ExclamationCircleOutlined />,
            content: 'Bla bla ...',
            okText: 'Đồng ý',
            cancelText: 'Quay lại',
            //okButtonProps: { loading: confirmLoading },
            onOk: () => {
                return postAPI('api/dm_donvitinh/toggle-status', JSON.stringify(itemUpdateStatus)).then(result => {
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
            Modal.confirm({
                title: 'Bạn có chắc chắn không?',
                icon: <AntdIcons.ExclamationCircleOutlined />,
                content: 'Bla bla ...',
                okText: 'Đồng ý',
                cancelText: 'Quay lại',
                //okButtonProps: { loading: confirmLoading },
                onOk: () => {
                    return postFormData('api/dm_donvitinh/multidelete', formData).then(result => {
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
        var result = await postAPI('api/dm_donvitinh/update', JSON.stringify(obj))

        if (result.status) {
            setAction(true)
            toggleUpdate()
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
        setConfirmLoading(true)
        var result = await postAPI('api/dm_donvitinh/create', JSON.stringify(obj))

        if (result.status) {
            setAction(true)
            toggle();
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
        <Content className="main-container main-container-component">
            <Card>
                <Row>
                    <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{ marginBottom: "16px" }}>
                        <Skeleton loading={isLoading} active>
                            <Space size={8}>
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
                                confirmLoading={confirmLoading}
                            />
                            <FormUpdate
                                isShowing={isShowingUpdate}
                                hide={toggleUpdate}
                                item={ItemUpdate}
                                onPostUpdateItem={onPostUpdateItem}
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

export default Menu;
