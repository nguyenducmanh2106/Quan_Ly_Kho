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
function ExportExcel() {
  const multiDataSet = [
    {
      columns: [
        { title: "Headings", width: { wpx: 80 } }, //pixels width
        { title: "Text Style", width: { wch: 40 } }, //char width
        { title: "Colors", width: { wpx: 90 } },
      ],
      data: [
        [
          { value: "H1", style: { font: { sz: "24", bold: true } } },
          { value: "Bold", style: { font: { bold: true } } },
          {
            value: "Red",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FFFF0000" } },
            },
          },
        ],
        [
          { value: "H2", style: { font: { sz: "18", bold: true } } },
          { value: "underline", style: { font: { underline: true } } },
          {
            value: "Blue",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FF0000FF" } },
            },
          },
        ],
        [
          { value: "H3", style: { font: { sz: "14", bold: true } } },
          { value: "italic", style: { font: { italic: true } } },
          {
            value: "Green",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
            },
          },
        ],
        [
          { value: "H4", style: { font: { sz: "12", bold: true } } },
          { value: "strike", style: { font: { strike: true } } },
          {
            value: "Orange",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FFF86B00" } },
            },
          },
        ],
        [
          { value: "H5", style: { font: { sz: "10.5", bold: true } } },
          { value: "outline", style: { font: { outline: true } } },
          {
            value: "Yellow",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FFFFFF00" } },
            },
          },
        ],
        [
          { value: "H6", style: { font: { sz: "7.5", bold: true } } },
          { value: "shadow", style: { font: { shadow: true } } },
          {
            value: "Light Blue",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
            },
          },
        ],
      ],
    },
  ];
  const dataCurrent=moment(new Date()).format("DD_MM_YYYY_HH_mm").toString();
  const fileName="PhieuNhapHang_"+dataCurrent;
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
        <ExcelSheet dataSet={multiDataSet} name="Organization" />
      </ExcelFile>
    </div>
  );
}
export default ExportExcel;
