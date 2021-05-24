import React from "react";
import { Row, Col, Layout, Descriptions, Divider, Typography } from "antd";
import moment from "moment";
import {
  getAPI,
  postAPI,
  postFormData,
  getCurrentLogin,
  FormatMoney,
  getLocalStorage,
} from "./../../../utils/helpers";
const thStyle = {
  fontFamily: "Anton",
  fontWeight: "normal",
  fontStyle: "normal",
};
const { Header, Content, Footer } = Layout;
export default class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ThongTinKho: {},
    };
  }
  componentDidMount() {
    getAPI(`api/dm_donvi/find-by-id?Id=${getCurrentLogin().donViId}`).then(
      (res) => {
        this.setState({
          ThongTinKho: res.result,
        });
      }
    );
  }
  render() {
    const { item } = this.props;
    const { ThongTinKho } = this.state;
    return (
      <div>
        <Row gutter={10}>
          <Col>
            <Col xs={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
              Chi nhánh: <strong>{item.tenChiNhanhNhan}</strong>
            </Col>
            <Col
              xs={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ textAlign: "right" }}
            >
              Mã đơn nhập: <strong>{item.code}</strong>
            </Col>
          </Col>
          <Col>
            <Col xs={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}>
              Địa chỉ:{" "}
              <strong>
                {ThongTinKho.address +
                  ", " +
                  ThongTinKho.tenXa +
                  ", " +
                  ThongTinKho.tenHuyen +
                  ", " +
                  ThongTinKho.tenTinh}
              </strong>
            </Col>
            <Col
              xs={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ textAlign: "right" }}
            >
              Ngày lập:{" "}
              <strong>{moment(item.created_At).format("DD/MM/YYYY")}</strong>
            </Col>
          </Col>
          <Col>
            <Col xs={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }}></Col>
            <Col
              xs={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ textAlign: "right" }}
            >
              Ngày nhận hàng:{" "}
              <strong>
                {item.ngayNhapKho
                  ? moment(item.ngayNhapKho).format("DD/MM/YYYY")
                  : ""}
              </strong>
            </Col>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col style={{ textAlign: "center" }}>
            <Typography.Title level={3}>Đơn xuất hàng</Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Descriptions layout="vertical" size="small">
              <Descriptions.Item
                label={
                  <Typography.Title level={5}>Nhà cung cấp</Typography.Title>
                }
              >
                {item.tenNhaCungCap}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <Typography.Title level={5}>Hoá đơn đến</Typography.Title>
                }
              >
                {item.tenChiNhanhNhan}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <Typography.Title level={5}>Giao hàng đến</Typography.Title>
                }
              >
                {item.tenChiNhanhNhan}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Row style={{ marginTop: "16px" }}>
          <Col>
            <div className="ant-table ant-table-bordered ant-table-ping-right ant-table-fixed-column ant-table-scroll-horizontal ant-table-has-fix-left ant-table-has-fix-right">
              <div className="ant-table-container">
                <div className="ant-table-content">
                  <table
                    /*className="ant-table"*/
                    style={{ tableLayout: "auto" }}
                  >
                    <thead className="ant-table-thead">
                      <tr>
                        <th style={{ textAlign: "center" }}>STT</th>
                        <th style={{ textAlign: "center" }}>Tên sản phẩm</th>
                        <th style={{ textAlign: "center" }}>Đơn vị</th>
                        <th style={{ textAlign: "center" }}>Số lượng</th>
                        <th style={{ textAlign: "center" }}>Đơn giá</th>
                        <th style={{ textAlign: "center" }}>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      {item.chiTietXuatHangs.map((value, index) => {
                        return (
                          <tr key={value.iD_SanPham}>
                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                            <td>{value.tenSanPham}</td>
                            <td>{value.tenDonViTinh}</td>
                            <td>{value.soLuong}</td>
                            <td>{FormatMoney(value.giaNhap ?? 0, " đ")}</td>
                            <td>
                              {FormatMoney(value.giaNhap * value.soLuong, " đ")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "16px" }}>
          <Col xs={{ span: 16 }} md={{ span: 16 }} lg={{ span: 16 }}></Col>
          <Col xs={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }}>
            <Descriptions size="small">
              <Descriptions.Item label="Tổng số lượng">
                {item.tongSoLuong}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions size="small">
              <Descriptions.Item label="Tổng tiền hàng">
                {FormatMoney(item.tongTien, " đ")}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions size="small">
              <Descriptions.Item label="VAT">
                {FormatMoney(item.chietKhau, " đ")}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions size="small">
              <Descriptions.Item label="Tổng tiền">
                {FormatMoney(item.tongTienPhaiTra, " đ")}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 6 }} md={{ span: 6 }} lg={{ span: 6 }} style={{ textAlign: "center" }}>
            <Typography.Text strong>Người lập phiếu</Typography.Text><br/>
            <Typography.Text>(Ký, họ tên)</Typography.Text>
          </Col>
          <Col xs={{ span: 6 }} md={{ span: 6 }} lg={{ span: 6 }} style={{ textAlign: "center" }}>
          <Typography.Text strong>Người nhận hàng</Typography.Text><br/>
            <Typography.Text>(Ký, họ tên)</Typography.Text>
          </Col>
          <Col xs={{ span: 6 }} md={{ span: 6 }} lg={{ span: 6 }} style={{ textAlign: "center" }}>
          <Typography.Text strong>Thủ kho</Typography.Text><br/>
            <Typography.Text>(Ký, họ tên)</Typography.Text>
          </Col>
          <Col xs={{ span: 6 }} md={{ span: 6 }} lg={{ span: 6 }} style={{ textAlign: "center" }}>
          <Typography.Text strong>Giám đốc</Typography.Text><br/>
            <Typography.Text>(Ký, họ tên)</Typography.Text>
          </Col>
        </Row>
      </div>
    );
  }
}
