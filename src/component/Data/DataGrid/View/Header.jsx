/**
 * 表格头部 单独处理，方便知道有哪些属性
 *
 * name:列名
 * label:列描述
 * className:样式，
 * style:样式，
 * headerContent:头部内容函数（name, label)
 * footerContent:尾部内容函数 (sType,name, label)
 * statsType:"sum", 统计方式，avg,平均值，min最小值，max，最大值，sum求和
 * align:对齐方式
 * sticky:固定列方式，left ,right ,或为空
 * rowSpan：占几行
 * colSpan：占几列
 * width:列的宽度，在colgroup中设置，不在这里
 * sortAble：是否允许排序
 * filterAble:是否允许筛选
 * editAble:列是否允许编辑，
 * exportAble:是否允许导出
 * content:此列的渲染函数（rowData,rowIndex,columnIndex) 此函数权限最大
 * editor:{
 * type:"",表单类型
 * options:{} 表单其他属性
 *
 * }
 */

import React, { useCallback, useMemo } from "react";
import { TableCell } from "../../Table";

const Header = function (props) {
  const {
    name,
    label,
    className,
    headerContent,
    headerRowIndex,
    headerColumnIndex,
    align,
    sticky,
    rowSpan,
    colSpan,
    sortAble,
    sortName,
    sortOrder,
    filterAble,
    onSort,
    filterOpen,
    onMouseMove,
    onMouseDown,
  } = props;

  const sortIconCls =
    sortAble == true
      ? sortName == name
        ? "icon-sort-" + sortOrder
        : "icon-sort"
      : "";

  const onClick = useCallback(
    (mysorName, mySortOrder) => {
      onSort(mysorName, mySortOrder);
    },
    [onSort]
  );
  // 得到内容
  const getHeaderContent = useMemo(() => {
    //内容
    let newcontent;
    if (typeof headerContent === "function") {
      //函数
      try {
        newcontent = headerContent(name, label);
      } catch (e) {
        console.log("生成自定列出错,原因", e.message);
        newcontent = "";
      }
    } else {
      //为空时
      newcontent = label || "";
    }
    return newcontent;
  }, [name, label, headerContent]);

  return (
    <TableCell
      rowIndex={headerRowIndex}
      columnIndex={headerColumnIndex}
      name={name || label}
      key={"header-" + headerRowIndex + "-" + headerColumnIndex.toString()}
      position="header"
      align={align}
      className={className || ""}
      style={{
        position: sticky ? "sticky" : null,
        zIndex: sticky ? 1 : null,
        left: sticky === "left" ? "0px" : null,
        right: sticky === "right" ? "0px" : null,
      }}
      rowSpan={rowSpan}
      colSpan={colSpan}
      onClick={
        sortAble
          ? onClick.bind(this, name, sortOrder === "asc" ? "desc" : "asc")
          : null
      }
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown.bind(this, headerColumnIndex)}
    >
      {getHeaderContent}
      {sortIconCls ? <i className={sortIconCls}></i> : null}
      {filterAble ? (
        <i
          className="icon-filter"
          onClick={filterOpen.bind(
            this,
            headerRowIndex,
            headerColumnIndex,
            props
          )}
        ></i>
      ) : null}
    </TableCell>
  );
};

export default React.memo(Header);
