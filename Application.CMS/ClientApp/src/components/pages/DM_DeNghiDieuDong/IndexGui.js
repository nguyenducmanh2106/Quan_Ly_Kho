import React, { useEffect, useState, useMemo } from "react";
import { useHistory, Route, Redirect } from "react-router-dom";
import moment from "moment";
import {
  Select,
  notification,
  Input,
  Skeleton,
  Card,
  Col,
  Row,
  Layout,
  Button,
  Space,
  Form,
  Modal,
  Drawer,
  DatePicker,
  Tooltip,
} from "antd";
import * as AntdIcons from "@ant-design/icons";
import useModal from "./../../elements/modal/useModal";
import {
  getAPI,
  postAPI,
  postFormData,
  getLocalStorage,
} from "./../../../utils/helpers";
import { USER_LOCALSTORAGE } from "./../../../utils/constants";
import ListData from "./ListDataGui";
// import FormView from "./View";
import ExportExcel from "./ExportExcelGui";
import LoadingOverlay from "react-loading-overlay";
import PrivateRoute from "../../../utils/PrivateRoute";
import BounceLoader from "react-spinners/BounceLoader";
function Index({ onSetSanPhamUpdate }) {
  let history = useHistory();
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
    NgayNhanSanPham: "",
    TypeFilterNgayTao: -1,
    TypeFilterNgayDuyet: -1,
    TypeFilterNgayNhanSanPham: -1,
  });
  //Thực hiện thao tác update,create,delete sẽ load lại trang
  const [isAction, setAction] = useState(false);
  const [nameSort, setNameSort] = useState("");
  const [TuNgay, setTuNgay] = useState("");
  const [DenNgay, setDenNgay] = useState("");
  const [DataDonVi, setDataDonVi] = useState([]);
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
    //setSearch({
    //    ...search,
    //    NgayTao: ''
    //})
  };
  const validateMessages = {
    required: "${label} không được để trống",
    types: {
      email: "${label} không đúng định dạng email",
      number: "${label} không đúng định dạng số",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  useState(() => {
    const getDonVi = async () => {
      var fetchData = await getAPI(`api/dm_donvi/get-all-data-active`);
      if (fetchData.status == true) {
        setDataDonVi(fetchData.result);
      }
    };
    const getDonViById = async () => {
      var Id = getLocalStorage(USER_LOCALSTORAGE).donViId;
      var fetchData = await getAPI(`api/dm_donvi/find-by-id?Id=${Id}`);
      if (fetchData.status == true) {
        setDataDonViById(fetchData.result);
      }
    };
    //gọi hàm
    getDonVi();
    getDonViById();
  }, [DataDonVi, DataDonViById]);
  useEffect(() => {
    async function getData(page, pageSize) {
      var Id = getLocalStorage(USER_LOCALSTORAGE).donViId;
      let name = search.Name;
      let status = search.Status ? search.Status : -1;
      var obj = {
        Name: name,
        Status: status,
        nameSort: nameSort,
        ID_ChiNhanhGui: Id,
      };
      var fetchData = await postAPI(
        `api/dm_denghidieudong/list_data_gui/`,
        JSON.stringify(obj)
      );
      if (fetchData.status == true) {
        setState(fetchData.result);
        setIsLoading(!fetchData.status);
      }
    }
    //gọi hàm
    getData(page, pageSize);
    return () => {
      setAction(false);
      setConfirmLoading(false);
    };
  }, [isAction, nameSort, page, pageSize]);
  async function onUpdateItemPosition(ItemPosition) {
    console.log(ItemPosition);
    if (ItemPosition.ordering < 0 || Number.isNaN(ItemPosition.ordering)) {
      notification.error({
        message: "Giá trị nhập vào không chính xác",
        duration: 3,
      });
    } else {
      var result = await postAPI(
        "api/dm_denghidieudong/update",
        JSON.stringify(ItemPosition)
      );
      if (result.status) {
        setAction(true);
        notification.success({
          message: result.message,
          duration: 3,
        });
      } else {
        notification.error({
          message: result.message,
          duration: 3,
        });
      }
    }
  }
  const onChangePage = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  async function onHandleSearch(data) {
    //console.log(data.NgayTao.toDate())
    var NgayTao = data.NgayTao ? new Date(data.NgayTao.toDate()) : "";
    var NgayDuyet = data.NgayDuyet ? new Date(data.NgayDuyet.toDate()) : "";
    var NgayNhanSanPham = data.NgayNhanSanPham
      ? new Date(data.NgayNhanSanPham.toDate())
      : "";
    var TuNgay = data.TuNgay ? moment(data.TuNgay).format("YYYY/MM/DD") : "";
    var DenNgay = data.DenNgay ? moment(data.DenNgay).format("YYYY/MM/DD") : "";
    setTuNgay(data.TuNgay ? moment(data.TuNgay).format("DD/MM/YYYY") : "");
    setDenNgay(data.DenNgay ? moment(data.DenNgay).format("DD/MM/YYYY") : "");
    var Id = getLocalStorage(USER_LOCALSTORAGE).donViId;
    var obj = {
      ...data,
      TuNgay: TuNgay,
      DenNgay: DenNgay,
      NgayTao: NgayTao,
      NgayDuyet: NgayDuyet,
      NgayNhanSanPham: NgayNhanSanPham,
      Status: data.Status,
      page: page,
      pageSize: pageSize,
      nameSort: nameSort,
      ID_ChiNhanhGui: Id,
      TypeFilterNgayTao: 0,
      TypeFilterNgayDuyet: 0,
      TypeFilterNgayNhanSanPham: 0,
    };
    //setSearch({
    //    ...search,
    //    Status: data.Status ? data.Status : -1
    //})
    console.log(obj);
    var fetchData = await postAPI(
      `api/dm_denghidieudong/list_data_gui`,
      JSON.stringify(obj)
    );
    if (fetchData.status == true) {
      setState(fetchData.result);
    }
  }
  const onSetNameSort = (name) => {
    //console.log(name)
    setNameSort(name);
  };
  const onToggleStatus = (item) => {
    Modal.confirm({
      title: "Bạn có chắc chắn không?",
      icon: <AntdIcons.ExclamationCircleOutlined />,
      content: "Bla bla ...",
      okText: "Đồng ý",
      cancelText: "Quay lại",
      //okButtonProps: { loading: confirmLoading },
      onOk: () => {
        return postAPI(
          "api/dm_denghidieudong/toggle-status",
          JSON.stringify(item)
        ).then((result) => {
          if (result.status) {
            setAction(true);
            toggleView();
            notification.success({
              message: result.message,
              duration: 3,
            });
          } else {
            notification.error({
              message: result.message,
              duration: 3,
            });
          }
        });
      },
    });
  };
  const onReceived = (item) => {
    var ChiTietKhos = [];
    item.chiTietDeNghiDieuDongs.map((value) => {
      var chitietkho = {
        Id_SanPham: value.iD_SanPham,
        //Id_Kho: item.iD_ChiNhanhNhan,
        ID_ChiNhanhGui: item.iD_ChiNhanhGui,
        ID_ChiNhanhNhan: item.iD_ChiNhanhNhan,
        SoLuong: value.soLuongDuyet,
      };
      ChiTietKhos.push(chitietkho);
    });
    var obj = {
      Code: item.code,
      ChiTietKhos,
    };
    console.log(obj);
    Modal.confirm({
      title: "Bạn có chắc chắn không?",
      icon: <AntdIcons.ExclamationCircleOutlined />,
      content: "Bla bla ...",
      okText: "Đồng ý",
      cancelText: "Quay lại",
      //okButtonProps: { loading: confirmLoading },
      onOk: () => {
        return postAPI(
          "api/dm_denghidieudong/nhanhang",
          JSON.stringify(obj)
        ).then((result) => {
          if (result.status) {
            setAction(true);
            toggleView();
            notification.success({
              message: result.message,
              duration: 3,
            });
          } else {
            notification.error({
              message: result.message,
              duration: 3,
            });
          }
        });
      },
    });
  };
  const onDelete = (item) => {
    Modal.confirm({
      title: "Bạn có chắc chắn không?",
      icon: <AntdIcons.ExclamationCircleOutlined />,
      content: "Bla bla ...",
      okText: "Đồng ý",
      cancelText: "Quay lại",
      //okButtonProps: { loading: confirmLoading },
      onOk: () => {
        return postAPI(
          "api/dm_denghidieudong/delete",
          JSON.stringify(item)
        ).then((result) => {
          if (result.status) {
            setAction(true);
            notification.success({
              message: result.message,
              duration: 3,
            });
          } else {
            notification.error({
              message: result.message,
              duration: 3,
            });
          }
        });
      },
    });
  };

  async function onMultiDelete() {
    if (listItemRemove.length == 0) {
      notification.error({
        message: "Chưa chọn dữ liệu để xoá",
        duration: 3,
      });
    } else {
      var formData = new FormData();
      formData.append("lstid", listItemRemove.join(","));
      Modal.confirm({
        title: "Bạn có chắc chắn không?",
        icon: <AntdIcons.ExclamationCircleOutlined />,
        content: "Bla bla ...",
        okText: "Đồng ý",
        cancelText: "Quay lại",
        //okButtonProps: { loading: confirmLoading },
        onOk: () => {
          return postAPI("api/dm_denghidieudong/multidelete", formData).then(
            (result) => {
              if (result.status) {
                setAction(true);
                notification.success({
                  message: result.message,
                  duration: 3,
                });
              } else {
                notification.error({
                  message: result.message,
                  duration: 3,
                });
              }
            }
          );
        },
      });
    }
  }
  const showDrawer = () => {
    setIsVisibleDrawer(true);
  };
  const onSubmitTimKiemNangCao = async (data) => {
    var Id = getLocalStorage(USER_LOCALSTORAGE).donViId;
    var NgayTao = data.NgayTao ? moment(data.NgayTao).format("YYYY/MM/DD") : "";
    var NgayDuyet = data.NgayDuyet
      ? moment(data.NgayDuyet).format("YYYY/MM/DD")
      : "";
    var NgayNhanSanPham = data.NgayNhanSanPham
      ? moment(data.NgayNhanSanPham).format("YYYY/MM/DD")
      : "";
    var obj = {
      ...data,
      NgayTao: NgayTao,
      NgayDuyet: NgayDuyet,
      NgayNhanSanPham: NgayNhanSanPham,
      Name: data.Name ?? "",
      ID_ChiNhanhGui: Id,
    };
    var fetchData = await postAPI(
      `api/dm_denghidieudong/list_data_gui`,
      JSON.stringify(obj)
    );
    if (fetchData.status == true) {
      setState(fetchData.result);
    }
    console.log(obj);
  };
  const onClose = () => {
    setIsVisibleDrawer(false);
  };
  function openCreate() {
    history.push({
      pathname: "/dm_denghidieudong-create/create",
      state: { controller: "Yêu cầu nhập hàng - Tạo mới", action: "Tạo mới" },
    });
  }
  const onUpdateItem = (item) => {
    history.push({
      pathname: `/dm_denghidieudong-update/update/${item.code}`,
      state: { controller: "Yêu cầu nhập hàng - Cập nhật", action: "Cập nhật" },
    });
  };
  const onShowItem = async (item) => {
    setItemShow(item);
  };
  let NgayTao = search.NgayTao;
  let NgayDuyet = search.NgayDuyet;
  let NgayNhanSanPham = search.NgayNhanSanPham;
  return (
    <Content className="main-container main-container-component">
      <Card>
        <Row>
          <Col
            xs={{ span: 24 }}
            lg={{ span: 24 }}
            style={{ marginBottom: "16px" }}
          >
            <Skeleton loading={isLoading} active>
              <Row gutter={8}>
                <Form
                  name="nest-messages"
                  layout="inline"
                  onFinish={onHandleSearch}
                  id="myFormSearch"
                  validateMessages={validateMessages}
                  initialValues={{
                    //["NgayTao"]: moment(NgayTao, 'YYYY-MM-DD').isValid() ? moment(NgayTao, 'YYYY-MM-DD') : moment(new Date(), 'YYYY-MM-DD'),
                    //["NgayDuyet"]: moment(NgayDuyet, 'YYYY-MM-DD').isValid() ? moment(NgayDuyet, 'YYYY-MM-DD') : "",
                    //["NgayNhanSanPham"]: moment(NgayNhanSanPham, 'YYYY-MM-DD').isValid() ? moment(NgayNhanSanPham, 'YYYY-MM-DD') : "",
                    ["Status"]: -1,
                    ["GuiDenKho"]: -1,
                  }}
                >
                  <Col xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 8 }}>
                    <Form.Item name="TuNgay" label="" style={{ width: "100%" }}>
                      <DatePicker
                        placeholder="Từ ngày"
                        style={{ width: "100%" }}
                        format={"DD/MM/YYYY"}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 8 }}>
                    <Form.Item
                      name="DenNgay"
                      label=""
                      style={{ width: "100%" }}
                    >
                      <DatePicker
                        placeholder="Đến ngày"
                        style={{ width: "100%" }}
                        format={"DD/MM/YYYY"}
                        getPopupContainer={(trigger) => trigger.parentElement}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 8 }}>
                    <Form.Item
                      name="GuiDenKho"
                      label=""
                      style={{ width: "100%" }}
                    >
                      <Select
                        showSearch
                        placeholder="-Gửi đến kho-"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value={-1}>-Gửi đến kho-</Option>
                        {DataDonVi.map((value) => {
                          return (
                            <Option key={value.id} value={value.id}>
                              {value.name}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 5 }} md={{ span: 8 }}>
                    <Form.Item name="Status" label="" style={{ width: "100%" }}>
                      <Select
                        showSearch
                        placeholder="-Chọn trạng thái-"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value={-1}>Tất cả</Option>
                        <Option value={1}>Chờ phê duyệt</Option>
                        <Option value={2}>Đã phê duyệt</Option>
                        <Option value={3}>Trả về</Option>
                        <Option value={4}>Nhận lại</Option>
                        <Option value={5}>Đã nhận hàng</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 4 }} md={{ span: 12 }}>
                    <Form.Item label="" colon={false} style={{ width: "100%" }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        icon={<AntdIcons.SearchOutlined />}
                      >
                        Tìm Kiếm
                      </Button>
                    </Form.Item>
                  </Col>
                </Form>
              </Row>
            </Skeleton>
          </Col>
          <Col
            xs={{ span: 24 }}
            lg={{ span: 24 }}
            style={{ marginBottom: "16px" }}
          >
            <Skeleton loading={isLoading} active>
              <Space size={8}>
                <Button
                  type="primary"
                  className="success"
                  onClick={openCreate}
                  icon={<AntdIcons.PlusOutlined />}
                >
                  Thêm mới
                </Button>
                <Button
                  type="primary"
                  className="danger"
                  onClick={onMultiDelete}
                  icon={<AntdIcons.DeleteOutlined />}
                >
                  Xoá nhiều
                </Button>
                <Button
                  type="primary"
                  className="primary"
                  onClick={showDrawer}
                  icon={<AntdIcons.ControlOutlined />}
                >
                  Tìm kiếm nâng cao
                </Button>
                <ExportExcel items={state.data} TuNgay={TuNgay} DenNgay={DenNgay}/>
              </Space>
            </Skeleton>
          </Col>
        </Row>
        <Row>
          <Skeleton loading={isLoading} active paragraph={false}>
            {/* <FormView
              isShowing={isShowingView}
              hide={toggleView}
              item={ItemShow}
              toggleStatus={onToggleStatus}
              onReceived={onReceived}
              confirmLoading={confirmLoading}
            /> */}
            <ListData
              obj={state}
              onChangePage={onChangePage}
              onDeleteItem={onDelete}
              UpdateItem={onUpdateItem}
              onToggleView={toggleView}
              onMultiDelete={setListItemRemove}
              onUpdateItemPosition={onUpdateItemPosition}
              toggleStatus={onToggleStatus}
              onReceived={onReceived}
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
                    textAlign: "right",
                  }}
                >
                  <Button onClick={onReset} style={{ marginRight: 8 }}>
                    Xoá bộ lọc
                  </Button>
                  <Button
                    form="formTimKiemNangCao"
                    key="submit"
                    htmlType="submit"
                    type="primary"
                  >
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
                  ["Status"]: -1,
                  ["TypeFilterNgayTao"]: -1,
                  ["TypeFilterNgayDuyet"]: -1,
                  ["TypeFilterNgayNhanSanPham"]: -1,
                  //["NgayTao"]: moment(NgayTao, 'YYYY-MM-DD').isValid() ? moment(NgayTao, 'YYYY-MM-DD') : moment(new Date(), 'YYYY-MM-DD'),
                  //["NgayDuyet"]: moment(NgayDuyet, 'YYYY-MM-DD').isValid() ? moment(NgayDuyet, 'YYYY-MM-DD') : "",
                  //["NgayNhanSanPham"]: moment(NgayNhanSanPham, 'YYYY-MM-DD').isValid() ? moment(NgayNhanSanPham, 'YYYY-MM-DD') : "",
                }}
                onFinish={onSubmitTimKiemNangCao}
                hideRequiredMark
              >
                <Row gutter={16}>
                  <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
                    <Form.Item name="NgayTao" label="Ngày tạo">
                      <DatePicker
                        style={{ width: "100%" }}
                        getPopupContainer={(trigger) => trigger.parentElement}
                        format={"DD/MM/YYYY"}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
                    <Form.Item name="TypeFilterNgayTao" label="Kiểu lọc ngày">
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
                    <Form.Item name="NgayDuyet" label="Ngày duyệt">
                      <DatePicker
                        style={{ width: "100%" }}
                        getPopupContainer={(trigger) => trigger.parentElement}
                        format={"DD/MM/YYYY"}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
                    <Form.Item name="TypeFilterNgayDuyet" label="Kiểu lọc ngày">
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
                    <Form.Item name="NgayNhanSanPham" label="Ngày nhận hàng">
                      <DatePicker
                        style={{ width: "100%" }}
                        getPopupContainer={(trigger) => trigger.parentElement}
                        format={"DD/MM/YYYY"}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
                    <Form.Item
                      name="TypeFilterNgayNhanSanPham"
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
                    <Form.Item name="Status" label="" style={{ width: "100%" }}>
                      <Select
                        showSearch
                        placeholder="-Chọn trạng thái-"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value={-1}>Tất cả</Option>
                        <Option value={1}>Chờ phê duyệt</Option>
                        <Option value={2}>Đã phê duyệt</Option>
                        <Option value={3}>Trả về</Option>
                        <Option value={4}>Nhận lại</Option>
                        <Option value={5}>Đã nhận hàng</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                    lg={{ span: 12 }}
                    md={{ span: 24 }}
                    xs={{ span: 24 }}
                  ></Col>
                </Row>
              </Form>
            </Drawer>
          </Skeleton>
        </Row>
      </Card>
    </Content>
  );
}

export default Index;
