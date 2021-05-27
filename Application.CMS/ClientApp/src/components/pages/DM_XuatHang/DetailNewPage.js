import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import {
  getAPI,
  postAPI,
  postFormData,
  getCurrentLogin,
  FormatMoney,
  getLocalStorage,
} from "./../../../utils/helpers";
import { url_upload } from "./../../../utils/constants";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import logoDefault from "../../../static/images/user-profile.jpeg";
import * as AntdIcons from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import ExportPDF from "./ExportPDF";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Skeleton,
  Col,
  Row,
  Card,
  Tooltip,
  Space,
  notification,
  AutoComplete,
  Descriptions,
  Spin,
  Image,
  Menu,
  DatePicker,
  Checkbox,
  Empty,
  Popover,
  Typography,
  Timeline,
  Steps,
  Divider,
  Dropdown,
} from "antd";
import { useParams, useHistory } from "react-router-dom";
import { PERMISS_USER_CURRENT } from "../../../utils/constants";
import * as PERMISSION from "../../../utils/constantPermission";
import {
  defineAbilitiesFor,
  _isPermission,
} from "../../elements/Config_Roles/appAbility";
const ModalCreate = () => {
  const componentRef = useRef();
  let history = useHistory();
  const [DataSanPham, setDataSanPham] = useState([]);
  const [DataNCC, setDataNCC] = useState([]);
  const [nhapHang, setNhapHang] = useState([]);
  const [thanhToan, setThanhToan] = useState([]);
  const [TongSl, setTongSl] = useState(0);
  const [TongGiaTien, setTongGiaTien] = useState(0);
  const [chietKhau, setChietKhau] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  let { id } = useParams();
  useEffect(() => {
    async function getData() {
      var fetchData = await getAPI(`api/dm_xuathang/find-by-id?Code=${id}`);
      if (fetchData.status == true) {
        setNhapHang(fetchData.result);
        setDataSanPham(fetchData.result.chiTietXuatHangs);
        setDataNCC(fetchData.result.nhaCungCaps);
        setThanhToan(fetchData.result.thanhToanDonHangs);
      }
    }

    //gọi hàm
    getData();
    defineAbilitiesFor(getLocalStorage(PERMISS_USER_CURRENT));
  }, [isRefresh]);
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
  async function onPostCreateItem(obj) {
    console.log(obj);
    var result = await postAPI("api/dm_xuathang/create", JSON.stringify(obj));
    if (result.status) {
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
  const tinhTongTien = useMemo(() => {
    let tongSl = 0;
    let tongGiaTien = 0;
    DataSanPham.map((item) => {
      tongSl += item.soLuong;
      tongGiaTien += item.soLuong * item.giaXuat;
    });
    setTongSl(tongSl);
    setTongGiaTien(tongGiaTien);
  }, [DataSanPham]);
  const openDetailSanPham = (item) => {
    history.push({
      pathname: `/dm_sanpham/view/${item.code}`,
      state: { controller: "Danh mục sản phẩm", action: item.code },
    });
  };
  const PheDuyet = async (item) => {
    setIsRefresh(true);
    var obj = {
      Code: item.code,
      TaiKhoanDuyet: getCurrentLogin().id,
    };
    var result = await postAPI("api/dm_xuathang/pheduyet", JSON.stringify(obj));
    if (result.status) {
      notification.success({
        message: result.message,
        duration: 3,
      });
      setIsRefresh(!result.status);
    } else {
      notification.error({
        message: result.message,
        duration: 3,
      });
      setIsRefresh(result.status);
    }
    //console.log(obj)
  };
  const NhapKho = async (item) => {
    setIsRefresh(true);
    var obj = {
      Code: item.code,
    };
    var result = await postAPI("api/dm_xuathang/xuatkho", JSON.stringify(obj));
    if (result.status) {
      notification.success({
        message: result.message,
        duration: 3,
      });

      setIsRefresh(!result.status);
    } else {
      notification.error({
        message: result.message,
        duration: 3,
      });
      setIsRefresh(result.status);
    }
  };
  const HoanThanh = async (item) => {
    //console.log(item)
    var ChiTietKho = [];
    item.chiTietXuatHangs.map((value) => {
      var nhaphang = {
        Id_SanPham: value.iD_SanPham,
        Id_Kho: item.iD_ChiNhanhNhan,
        SoLuong: value.soLuong,
      };
      ChiTietKho.push(nhaphang);
    });
    setIsRefresh(true);
    var obj = {
      Code: item.code,
      ChiTietKho: ChiTietKho,
    };
    console.log(obj);
    var result = await postAPI(
      "api/dm_xuathang/hoanthanh",
      JSON.stringify(obj)
    );
    if (result.status) {
      notification.success({
        message: result.message,
        duration: 3,
      });

      setIsRefresh(!result.status);
    } else {
      notification.error({
        message: result.message,
        duration: 3,
      });
      setIsRefresh(result.status);
    }
  };
  const HuyDon = useCallback(
    async (item) => {
      setIsRefresh(false);
      var obj = {
        Code: item.code,
      };
      var result = await postAPI("api/dm_xuathang/huydon", JSON.stringify(obj));
      if (result.status) {
        notification.success({
          message: result.message,
          duration: 3,
        });
        setIsRefresh(result.status);
      } else {
        notification.error({
          message: result.message,
          duration: 3,
        });
        setIsRefresh(result.status);
      }
    },
    [isRefresh]
  );
  const renderBody = useCallback(() => {
    var result = "";
    var TongSl = 0;
    var TongGiaTien = 0;
    result = DataSanPham.map((item, index) => {
      var giaNhap = item.giaXuat ?? 0;
      TongSl += 1;
      TongGiaTien += Number.parseInt(giaNhap);
      return (
        <tr key={item.id} className="ant-table-row ant-table-row-level-0">
          <td>
            <input
              type="hidden"
              className="ID_SanPham"
              defaultValue={item.code}
            />
            {item.tenSanPham}
          </td>

          <td style={{ textAlign: "center" }}>
            <Typography.Link
              href="javascript:void(0)"
              onClick={() => openDetailSanPham(item)}
            >
              {item.code}
            </Typography.Link>
          </td>
          <td>{item.tenDonViTinh}</td>
          <td className="SoLuong" id={item.ID_SanPham}>
            {item.soLuong}
          </td>
          <td className="GiaNhap">{FormatMoney(giaNhap, " đ")}</td>
          <td className="TongTien">
            {FormatMoney(giaNhap * item.soLuong, " đ")}
          </td>
        </tr>
      );
    });
    return result;
  }, [DataSanPham]);
  const onUpdateItem = (item) => {
    history.push({
      pathname: `/dm_xuathang/update/${item.code}`,
      state: { controller: "Phiếu nhập kho", action: "Cập nhật" },
    });
  };
  const menu = (
    <Menu>
      {_isPermission(PERMISSION.DUYET, PERMISSION.DM_XUATHANG) &&
      nhapHang?.status == 0 ? (
        <Menu.Item key="0" style={{ borderBottom: "1px solid #d8dee6" }}>
          <a href="javascript:void(0)" onClick={() => HuyDon(nhapHang)}>
            Huỷ đơn
          </a>
        </Menu.Item>
      ) : (
        ""
      )}
      {_isPermission(PERMISSION.EDIT, PERMISSION.DM_XUATHANG) &&
      getCurrentLogin().id == nhapHang?.created_By &&
      nhapHang?.status == 0 ? (
        <Menu.Item key="1" style={{ borderBottom: "1px solid #d8dee6" }}>
          <a href="javascript:void(0)" onClick={() => onUpdateItem(nhapHang)}>
            Sửa
          </a>
        </Menu.Item>
      ) : (
        ""
      )}
      <Menu.Item key="2">
        <ReactToPrint
          trigger={() => (
            <a href="javascript:void(0)">
              <AntdIcons.PrinterOutlined /> In đơn nhập hàng
            </a>
          )}
          content={() => componentRef.current}
          documentTitle={"PhieuNhapHang_" + history.location.state.action}
          bodyClass="whiteBackground"
        />
        <div style={{ display: "none" }}>
          <ExportPDF item={nhapHang} ref={componentRef} />
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <Spin spinning={isRefresh}>
      <Form
        layout="horizontal"
        name="nest-messages"
        id="myFormCreate"
        initialValues={{}}
      >
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button>
                Thêm thao tác <AntdIcons.DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 18 }}>
            <Steps
              current={
                nhapHang?.status == 0
                  ? 1
                  : nhapHang?.status == 1
                  ? 2
                  : nhapHang?.status == 2
                  ? 3
                  : 4
              }
              size="small"
            >
              <Steps.Step
                title="Tạo đơn"
                description={
                  nhapHang.created_At
                    ? moment(nhapHang.created_At).format("DD/MM/YYYY, HH:mm")
                    : ""
                }
              />
              <Steps.Step
                status={
                  nhapHang?.status == 4
                    ? "wait"
                    : nhapHang?.status > 0 && nhapHang?.status != 4
                    ? "finish"
                    : "process"
                }
                title="Duyệt"
                description={
                  nhapHang.ngayDuyet && nhapHang?.status != 4
                    ? moment(nhapHang.ngayDuyet).format("DD/MM/YYYY, HH:mm")
                    : ""
                }
              />
              <Steps.Step
                status={
                  nhapHang?.status == 4
                    ? "wait"
                    : nhapHang?.status == 0
                    ? "wait"
                    : nhapHang?.status > 1 && nhapHang?.status != 4
                    ? "finish"
                    : "process"
                }
                title="Xuất kho"
                description={
                  nhapHang.ngayXuatKho && nhapHang?.status != 4
                    ? moment(nhapHang.ngayXuatKho).format("DD/MM/YYYY, HH:mm")
                    : ""
                }
              />
              {nhapHang?.status != 4 ? (
                <Steps.Step
                  title="Hoàn thành"
                  description={
                    nhapHang.ngayHoanThanh
                      ? moment(nhapHang.ngayHoanThanh).format(
                          "DD/MM/YYYY, HH:mm"
                        )
                      : ""
                  }
                />
              ) : (
                <Steps.Step
                  title={
                    <Typography.Text type="danger">Huỷ đơn</Typography.Text>
                  }
                  description={
                    nhapHang.ngayHuyDon
                      ? moment(nhapHang.ngayHuyDon).format("DD/MM/YYYY, HH:mm")
                      : ""
                  }
                />
              )}
            </Steps>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 17 }}>
            {getCurrentLogin().capDoDonVi == 1 && DataNCC ? (
              <Card
                style={{ marginTop: 16 }}
                title={
                  <Space size={8}>
                    <AntdIcons.InfoCircleOutlined />
                    Thông tin nhà cung cấp
                  </Space>
                }
              >
                <Row>
                  <Col>
                    <Descriptions title="Thông tin">
                      <Descriptions.Item label="Tên nhà cung cấp">
                        {DataNCC.name}
                      </Descriptions.Item>
                    </Descriptions>
                    <Descriptions>
                      <Descriptions.Item label="Số điện thoại">
                        {DataNCC.phone}
                      </Descriptions.Item>
                    </Descriptions>
                    <Descriptions>
                      <Descriptions.Item label="Địa chỉ">
                        {DataNCC.address}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            ) : getCurrentLogin().capDoDonVi != 1 && nhapHang.khachHang ? (
              <Card
                style={{ marginTop: 16 }}
                title={
                  <Space size={8}>
                    <AntdIcons.InfoCircleOutlined />
                    Thông tin khách hàng
                  </Space>
                }
              >
                <Row>
                  <Col>
                    <Descriptions title="Thông tin">
                      <Descriptions.Item label="Tên khách hàng">
                        {nhapHang.khachHang}
                      </Descriptions.Item>
                    </Descriptions>
                    <Descriptions>
                      <Descriptions.Item label="Số điện thoại khách hàng">
                        {nhapHang.sdtKhachHang}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            ) : (
              ""
            )}
            <Row gutter={16}>
              <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <Card
                  style={{ marginTop: 16 }}
                  title={
                    <Space size={8}>
                      <AntdIcons.InfoCircleOutlined />
                      Thông tin sản phẩm
                    </Space>
                  }
                >
                  <Row className="ThongTinSP">
                    <Col
                      xs={{ span: 24 }}
                      md={{ span: 24 }}
                      lg={{ span: 24 }}
                      style={{ marginTop: "16px" }}
                    >
                      <div className="ant-table ant-table-bordered ant-table-ping-right ant-table-fixed-column ant-table-scroll-horizontal ant-table-has-fix-left ant-table-has-fix-right">
                        <div className="ant-table-container">
                          <div className="ant-table-content">
                            <table
                              /*className="ant-table"*/ id="SanPhams"
                              style={{ tableLayout: "auto" }}
                            >
                              <thead className="ant-table-thead">
                                <tr>
                                  <th className="sapxep" id="Name">
                                    Tên
                                  </th>

                                  <th className="sapxep" id="Code">
                                    Mã SP
                                  </th>
                                  <th className="" id="Barcode">
                                    ĐVT
                                  </th>
                                  <th className="">Số lượng</th>
                                  <th className="" style={{ width: "25%" }}>
                                    Giá nhập
                                  </th>
                                  <th className="">Thành tiền</th>
                                </tr>
                              </thead>
                              <tbody className="ant-table-tbody">
                                {renderBody()}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      md={{ span: 24 }}
                      lg={{ span: 24 }}
                      style={{ marginTop: "16px" }}
                      className="TomTat"
                    >
                      <Descriptions title="">
                        <Descriptions.Item
                          label="Số lượng"
                          className="TongSoLuong"
                        >
                          {TongSl}
                        </Descriptions.Item>
                      </Descriptions>
                      <Descriptions>
                        <Descriptions.Item
                          label="Tổng tiền"
                          className="TongGiaTien"
                        >
                          {FormatMoney(TongGiaTien, " đ")}
                        </Descriptions.Item>
                      </Descriptions>
                      <Descriptions>
                        <Descriptions.Item
                          label={
                            <Typography.Link href="javascript:void(0)">
                              Chiết khẩu
                            </Typography.Link>
                          }
                        >
                          {FormatMoney(nhapHang.chietKhau ?? 0, " đ")}
                        </Descriptions.Item>
                      </Descriptions>
                      <Descriptions>
                        <Descriptions.Item
                          label={
                            <Typography.Text type="warning">
                              Tiền phải trả
                            </Typography.Text>
                          }
                        >
                          {FormatMoney(nhapHang.tongTienPhaiTra ?? 0, " đ")}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            {/*<Card*/}
            {/*    style={{ marginTop: 16 }}*/}
            {/*    title={*/}
            {/*        <Row>*/}
            {/*            <Col>*/}
            {/*                <Space size={8}>*/}
            {/*                    <AntdIcons.CreditCardOutlined />*/}
            {/*                               Thanh toán*/}
            {/*                </Space>*/}
            {/*            </Col>*/}
            {/*            <Col>*/}
            {/*                <Row>*/}
            {/*                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>*/}
            {/*                        <Descriptions>*/}
            {/*                            <Descriptions.Item label="Đã thanh toán">*/}
            {/*                                {FormatMoney(nhapHang.tongDaThanhToan ?? 0, " đ")}*/}
            {/*                            </Descriptions.Item>*/}
            {/*                        </Descriptions>*/}
            {/*                    </Col>*/}
            {/*                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>*/}
            {/*                        <Descriptions>*/}
            {/*                            <Descriptions.Item label="Còn phải trả">*/}
            {/*                                {FormatMoney(nhapHang.tongTienPhaiTra - nhapHang.tongDaThanhToan, " đ")}*/}
            {/*                            </Descriptions.Item>*/}
            {/*                        </Descriptions>*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}

            {/*    }*/}
            {/*    extra={<Button>Xác nhận thanh toán</Button>}*/}
            {/*>*/}
            {/*    <Row gutter={24}>*/}
            {/*        <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>*/}
            {/*            <Timeline>*/}
            {/*                {thanhToan.map(item => {*/}
            {/*                    return (*/}
            {/*                        <Timeline.Item>*/}
            {/*                            <p> Xác nhận thanh toán {FormatMoney(item.tongTienDaTra ?? 0, " đ")}</p>*/}
            {/*                            <p>{item.ngayThanhToan ? moment(item.ngayThanhToan).format('DD/MM/YYYY, HH:mm') : ""}</p>*/}
            {/*                            <p>Người thanh toán: {item.tenNguoiThanhToan}</p>*/}
            {/*                            <p>Phương thức thanh toán: {item.tenHinhThucThanhToan}</p>*/}
            {/*                        </Timeline.Item>*/}
            {/*                    )*/}
            {/*                })}*/}
            {/*            </Timeline>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</Card>*/}
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 7 }}>
            <Card
              style={{ marginTop: 16 }}
              title={
                <Space size={8}>
                  <AntdIcons.DollarOutlined />
                  Thông tin đơn nhập hàng
                </Space>
              }
            >
              <Row>
                <Col>
                  <Row gutter={24}>
                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                      <Descriptions>
                        <Descriptions.Item label="Chi nhánh xuất">
                          {nhapHang.tenChiNhanhNhan}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                      <Descriptions>
                        <Descriptions.Item label="Ngày hẹn giao">
                          {nhapHang.ngayHenGiao
                            ? moment(nhapHang.ngayHenGiao).format(
                                "DD/MM/YYYY, HH:mm"
                              )
                            : ""}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                      <Descriptions>
                        <Descriptions.Item label="Ghi chú">
                          {nhapHang.description}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col style={{ textAlign: "right" }}>
            {nhapHang?.status == 0 &&
            _isPermission(PERMISSION.DUYET, PERMISSION.DM_XUATHANG) ? (
              <Button
                type="primary"
                icon={<AntdIcons.SaveOutlined />}
                onClick={() => PheDuyet(nhapHang)}
              >
                Duyệt đơn
              </Button>
            ) : nhapHang?.status == 1 &&
              _isPermission(PERMISSION.XUATKHO, PERMISSION.DM_XUATHANG) ? (
              <Button
                type="primary"
                icon={<AntdIcons.SaveOutlined />}
                onClick={() => NhapKho(nhapHang)}
              >
                Xuất kho
              </Button>
            ) : nhapHang?.status == 2 &&
              _isPermission(PERMISSION.XUATKHO, PERMISSION.DM_XUATHANG) ? (
              <Button
                type="primary"
                icon={<AntdIcons.SaveOutlined />}
                onClick={() => HoanThanh(nhapHang)}
              >
                Hoàn thành
              </Button>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
export default ModalCreate;
