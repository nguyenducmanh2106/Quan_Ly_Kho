import React from "react";
import { Row, Col, Button } from "antd";
import moment from "moment";
import {
  getAPI,
  postAPI,
  postFormData,
  getCurrentLogin,
  FormatMoney,
  getLocalStorage,
} from "./../../../utils/helpers";
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExportExcel = ({ items,TuNgay,DenNgay }) => {
  var tungay=TuNgay?TuNgay:"...";
  var denngay=DenNgay?DenNgay:"..."
  var timeExport="Từ "+tungay+" đến "+denngay
  const styleBorder = {
    top: { style: "thin" },
    right: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
  };
  const fontCustom = {
    name: "Times New Roman",
    bold: true,
  };
  var records = [];
  items.map((item, index) => {
    var trangthai =
    item.status == 1 ?"Duyệt"
    : item.status == 2 ? "Xuất hàng" : item.status == 0 ?
        "Đơn xuất hàng" : item.status == 3 ?
           "Hoàn thành" : item.status == 4 ?
                "Huỷ đơn" : ""

    var arrays = [
      {
        value: index + 1,
        style: { border: styleBorder, font:{name:"Times New Roman"},alignment: { horizontal: "center" } },
      },
      {
        value: item.code,
        style: { border: styleBorder, font: { shadow: true,name:"Times New Roman" } },
      },
      {
        value: getCurrentLogin().capDoDonVi==1?item.tenNhaCungCap:item.khachHang,
        style: { border: styleBorder, font: { shadow: true ,name:"Times New Roman"} },
      },
      {
        value: trangthai,
        style: { border: styleBorder, font: { shadow: true ,name:"Times New Roman"} },
      },
      {
        value: item.tongTienPhaiTra,
        style: { border: styleBorder, font: { shadow: true ,name:"Times New Roman"} },
      },
      {
        value: item.tenNguoiTao,
        style: { border: styleBorder, font: { shadow: true ,name:"Times New Roman"} },
      },
      {
        value: item.created_At
          ? moment(item.created_At).format("DD/MM/YYYY, HH:mm")
          : "",
        style: { border: styleBorder, font: { shadow: true,name:"Times New Roman" } },
      },
    ];
    records.push(arrays);
  });
  const multiDataSet = [
    {
      ySteps: 2,
      columns: [
        { title: getCurrentLogin().capDoDonVi==1?"Thống kê phiếu trả hàng về nhà cung cấp":"Thống kê phiếu xuất hàng cho khách hàng" ,style:{font:{bold:true,name:"Times New Roman"}}},
      ],
      data: [],
    },
    {
      columns: [
        { title: timeExport,style:{ font:{ bold:false}} ,style:{font:{name:"Times New Roman"}}},
      ],
      data: [],
    },
    {
      // xSteps: 1, // Will start putting cell with 1 empty cell on left most
      ySteps: 2, //will put space of 5 rows,
      columns: [
        {
          title: "STT",
          width: { wpx: 40 },
          style: {
            font: fontCustom,
            border: styleBorder,
            alignment: { horizontal: "center" },
          },
        }, //pixels width: ;
        {
          title: "Mã đơn",
          width: { wch: 20 },
          style: {
            font: fontCustom,
            border: styleBorder,
            alignment: { horizontal: "center" },
          },
        }, //char width
        {
          title: getCurrentLogin().capDoDonVi==1?"Nhà cung cấp":"Khách hàng",
          width: { wpx: 90 },
          style: {
            font: fontCustom,
            border: styleBorder,
            alignment: { horizontal: "center" },
          },
        },
        {
          title: "Trạng thái",
          width: { wpx: 90 },
          style: {
            font: fontCustom,
            border: styleBorder,
            alignment: { horizontal: "center" },
          },
        },
        {
          title: "Tổng tiền",
          width: { wpx: 90 },
          style: {
            font: fontCustom,
            border: styleBorder,
            alignment: { horizontal: "center" },
          },
        },
        {
          title: "Nhân viên tạo",
          width: { wpx: 120 },
          style: {
            font: fontCustom,
            border: styleBorder,
            alignment: { horizontal: "center" },
          },
        },
        {
          title: "Ngày tạo",
          width: { wpx: 120 },
          style: {
            font: fontCustom,
            border: styleBorder,
            alignment: { horizontal: "center" },
          },
        },
      ],
      data: records,
    },
  ];
  const dataCurrent = moment(new Date()).format("DD_MM_YYYY").toString();
  var nameC1="PhieuTraHang_NhaCungCap" + dataCurrent
  var nameC2="PhieuXuatHang_KhachHang" + dataCurrent
  const fileName = getCurrentLogin().capDoDonVi==1?nameC1:nameC2;
  return (
    <div>
      <ExcelFile
        filename={fileName}
        element={
          <Button type="primary" ghost>
            Export Excel
          </Button>
        }
      >
        <ExcelSheet dataSet={multiDataSet} name={fileName} />
      </ExcelFile>
    </div>
  );
};
export default ExportExcel;
