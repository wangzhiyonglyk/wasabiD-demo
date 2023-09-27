/**
 * 表格头部 单独处理，方便知道有哪些属性
 *
 * name:列名
 * label:列描述
 * footerContent:头部内容函数（name, label)
 * footerContent:尾部内容函数 (statsType,name, label)
 * align:对齐方式
 * sticky:固定列方式，left ,right ,或为空
 * rowSpan：占几行
 * colSpan：占几列
 * width:列的宽度，在colgroup中设置，不在这里
 * sortAble：是否允许排序
 * filterAble:是否允许筛选
 * exportAble：是否允许导出,
 * editAble:列是否允许编辑，
 * content:此列的渲染函数（rowData,rowIndex,columnIndex) 此函数权限最大
 * editor:{
 * type:"",表单类型
 * options:{} 表单其他属性
 *
 * }
 */

import React, { useMemo } from "react";
import { TableCell } from "../../Table";
import func from "../../../libs/func";
import regs from "../../../libs/regs";

const Footer = function (props) {
  const {
    statsType, // 默认是求合
    name,
    label,
    footerContent,
    headerRowIndex,
    headerColumnIndex,
    align,
    sticky,
    colSpan,
    data,
    footer,
    url,
  } = props;

  // 得到内容
  const getfooterContent = useMemo(() => {
    //内容
    let newcontent;
    let pretext;
    switch (statsType) {
      case "sum":
        pretext = "总计:";
        break;
      case "avg":
        pretext = "平均值:";
        break;
      case "min":
        pretext = "最小值:";
        break;
      case "max":
        pretext = "最大值:";
        break;
    }
    if (statsType && typeof footerContent === "function") {
      //函数
      try {
        newcontent = footerContent(statsType, name, label);
      } catch (e) {
        console.log("生成统计列报错,原因", e.message);
        newcontent = "";
      }
    } else if (statsType) {
      if (!func.isEmptyObject(footer)) {
        if (Array.isArray(footer[name])) {
          newcontent = footer[name].map((item, index) => {
            return (
              <div
                key={index}
                className={"wasabi-table-cell-span " + item.className}
                style={item.style}
              >
                {item.label}
              </div>
            );
          });
        } else if (!func.isEmptyObject(footer[name])) {
          // 这个是值是对象
          newcontent = (
            <div
              className={"wasabi-table-cell-span " + footer[name].className}
              style={footer[name].style}
            >
              {footer[name].label}
            </div>
          );
        } else {
          newcontent = (
            <div>
              {pretext}
              {footer[name]}
            </div>
          );
        }
      } else if (!url && statsType) {
        // 静态数据，自动统计
        let sum = 0;
        let min = 0;
        let max = 0;
        // 不是从后台取的数据
        if (statsType === "count") {
          // 不是求个数
          newcontent = (data && data.length) || 0;
        } else {
          data &&
            data.forEach((rowData) => {
              // 只有数字统计总和
              sum += regs.number.test(rowData[name]) ? rowData[name] : 0;
              if (min > (rowData[name] || 0)) {
                min = rowData[name] || 0;
              }
              if (max < (rowData[name] || 0)) {
                max = rowData[name] || 0;
              }
            });
          switch (statsType) {
            case "avg":
              newcontent =
                data.length > 0
                  ? func.numToEnglishFormat(sum / data.length, 2)
                  : "";
              break;
            case "min":
              newcontent = min;
              break;
            case "max":
              newcontent = max;
              break;
            case "sum":
              newcontent = sum;
              break;
          }
        }
        newcontent = (
          <div>
            {pretext}
            {newcontent}
          </div>
        );
      }
    }
    return <div>{newcontent}</div>;
  }, [name, label, statsType, data, url, footer, footerContent]);

  return (
    <TableCell
      rowIndex={headerRowIndex}
      columnIndex={headerColumnIndex}
      name={name || label}
      key={"footer-" + headerRowIndex + "-" + headerColumnIndex.toString()}
      position="footer"
      align={align}
      style={{
        position: sticky ? "sticky" : null,
        zIndex: sticky ? 1 : null,
        left: sticky === "left" ? "0px" : null,
        right: sticky === "right" ? "0px" : null,
      }}
      colSpan={colSpan}
    >
      {getfooterContent}
    </TableCell>
  );
};

export default React.memo(Footer);
