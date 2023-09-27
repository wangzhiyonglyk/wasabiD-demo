/**
 * 把表格单元独立出来，方便知道属性
 * 单元格内容渲染逻辑：
 * 1.此列的header中的content是函数时，则以此函数的返回值作为内容
 * 2.此单元格的数据为数组时，循环渲染，多用于操作列
 * 3. 此单元的数据为对象时， 根据样式与文本
 */
import React, { useMemo } from "react";
import { TableCell } from "../../Table";
import Input from "../../../Form/Input/index.jsx";
import func from "../../../libs/func";
const Cell = function ({
  header,
  rowData,
  rowIndex,
  columnIndex,
  focusIndex,
  focusColumnIndex,
  editAble,
  onClick,
  onDoubleClick,
  tableCellEditHandler,
}) {
  const getCellContent = useMemo(() => {
    //内容
    let content = header?.content;
    if (typeof content === "function") {
      //函数
      try {
        content = content(rowData, rowIndex, columnIndex);
      } catch (e) {
        console.log("生成自定列出错,原因", e.message);
        content = "";
      }
    } else {
      //为空时
      if (Array.isArray(rowData[header.name])) {
        return rowData[header.name].map((item, index) => {
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
      } else if (!func.isEmptyObject(rowData[header.name])) {
        // 这个是值是对象
        return (
          <div
            className={
              "wasabi-table-cell-span " + rowData[header.name].className
            }
            style={rowData[header.name].style}
          >
            {rowData[header.name].label}
          </div>
        );
      } else {
        content = rowData[header.name];
      }
    }
    return content ?? "";
  }, [header, rowData, rowIndex]);
  return (
    <TableCell
      name={header.name || header.label}
      rowIndex={rowIndex}
      columnIndex={columnIndex}
      onClick={onClick.bind(this, rowData, rowIndex, columnIndex)}
      onDoubleClick={onDoubleClick.bind(this, rowData, rowIndex, columnIndex)}
      key={"cell-" + rowIndex.toString() + "-" + columnIndex.toString()}
      className={
        (focusIndex === rowIndex && focusColumnIndex === columnIndex
          ? " focus "
          : "") + (header.exportAble === false ? "wasabi-noexport" : "")
      } //为了不导出
      style={{
        textAlign: header.align,
        position: header.sticky ? "sticky" : null,
        zIndex: header.sticky ? 1 : null,
        left: header.sticky === "left" ? "0px" : null,
        right: header.sticky === "right" ? "0px" : null,
      }}
    >
      {/* 为空时，则依据表格的可编，不为空时则依据列表头的 */}
      {(header.editAble ?? true ? editAble : header.editAble) ? (
        <Input
          key="input"
          {...header.editor.options}
          type={header.editor.type}
          name={header.name}
          value={rowData[header.name]}
          onChange={tableCellEditHandler.bind(
            this,
            rowIndex,
            header?.editor?.options?.onChange || null
          )}
          onSelect={tableCellEditHandler.bind(
            this,
            rowIndex,
            header?.editor?.options?.onSelect || null
          )}
        ></Input>
      ) : (
        getCellContent
      )}
    </TableCell>
  );
};
export default React.memo(Cell);
