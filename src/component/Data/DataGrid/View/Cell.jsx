/**
 * 把表格单元独立出来，方便知道属性
 * 单元格内容渲染逻辑：
 * 1.此列的header中的content是函数时，则以此函数的返回值作为内容
 * 2.此单元格的数据为数组时，循环渲染，多用于操作列
 * 3. 此单元的数据为对象时， 根据样式与文本
 *  单元格的数据格式，可以为 string,数组，对象
 *  对象中包含 {
 *    label://文字
 *    className:样式名字
 *    style:样式
 *    editAble:是否可编辑，权限最大
 *    type:// 展示快捷类型组件
 *     options:{  }// 其他配置项
 * }
 */
import React, { useMemo } from "react";
import { TableCell } from "../../Table";
import Input from "../../../Form/Input/index.jsx";
import func from "../../../libs/func";
import Button from "../../../Buttons/Button";
import LinkButton from "../../../Buttons/LinkButton";
import Tag from "../../../Buttons/Tag";
import Badge from "../../../Buttons/Badge";

/**
 * 根据类型渲染
 * @param {*} item 
 * @returns 
 */
const typeRender = function (item,onClick) {
  if (item.type && ["button", "linkbutton", "tag", "badge"].includes(item.type)) {        
    // 有类型
    switch (item.type) {
      case "button":
        return <Button   key={item.label} style={item.style} className={item.className} {...item.options}  onClick={(name,title,event)=>{onClick(rowData, rowIndex, columnIndex, item.label,event)}} >{item.label}</Button>
      case "linkbutton":
        return <LinkButton key={item.label} style={item.style} className={item.className} {...item.options}  onClick={(name,title,event)=>{onClick(rowData, rowIndex, columnIndex, item.label,event)}}>{item.label}</LinkButton>
      case "tag":
        return  <Tag  key={item.label} style={item.style} className={item.className} {...item.options}  onClick={(name,title,event)=>{onClick(rowData, rowIndex, columnIndex, item.label,event)}}>{item.label}</Tag>
      case "badge":
        return <Badge  key={item.label} style={item.style} className={item.className} {...item.options}  onClick={(name,title,event)=>{onClick(rowData, rowIndex, columnIndex, item.label,event)}}>{item.label}</Badge>
    }

  }
  else {
    // 普通文本
    return <div
      key={item.label}
      className={"wasabi-table-cell-span " + item.className}
      style={item.style}
      {...item.options}
    >
      {item.label}
    </div>
  }
}
const Cell = function ({
  header,
  rowData,
  rowIndex,
  visibleDataIndex,// 在可见数据中的行号,用于编辑
  columnIndex,
  isFocus,
  // 当前单元格是否处于编辑
  editAble,
  onClick,
  onDoubleClick,
  onPaste,
  tableCellEditHandler,
}) {
  const cellEditAble = useMemo(() => {
    let reault = true;
    if (typeof rowData[header.name] === "object" && rowData[header.name]?.editAble === false) {
      // 数据中禁止编辑
      reault = false;
    }
    else if (header.editAble === false) {
      // 列禁止编辑
      reault = false;
    }
    else {
      reault = editAble;
    }
    return reault;

  }, [header, editAble, rowData[header.name], rowIndex, columnIndex])
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
      //没有函数的时候
      if (Array.isArray(rowData[header.name])) {
        // 数组类型
        content= rowData[header.name].map((item, index) => {
          if (typeof item === "object" && !func.isEmptyObject(item)) {
            // 是对象
            return typeRender(item,onClick)
          }
          else {
            // 非对象
            return <div
              key={index}
              className={"wasabi-table-cell-span"}
            >
              {item}
            </div>
          }

        });
      } else if (typeof rowData[header.name] === "object" && !func.isEmptyObject(rowData[header.name])) {
        // 这个是值是对象
        content= typeRender( rowData[header.name],onClick)
      } else {
        // 文本的时候，看表头
        if (header.type) {
          // 有格式
          content = typeRender({
            type: header.type,
            options: header.options,
            label: rowData[header.name]
          },onClick)
        }
        else {
          content = rowData[header.name];
        }
       
      }
    }
    return content ?? "";
  }, [header, rowData, rowIndex, columnIndex, onClick]);
  return (
    <TableCell
      name={header.name || header.label}
      rowIndex={rowIndex}
      columnIndex={columnIndex}
      onClick={onClick.bind(this, rowData, rowIndex, columnIndex,"")}
      onDoubleClick={onDoubleClick.bind(this, rowData, rowIndex, columnIndex)}
      key={"cell-" + rowIndex.toString() + "-" + columnIndex.toString()}
      className={
        (isFocus ? " focus " : "") +
        (header.exportAble === false ? "wasabi-noexport" : "")
      } //为了不导出
      style={{
        textAlign: header.align,
        position: header.sticky ? "sticky" : null,
        zIndex: header.sticky ? 1 : null,
        left: header.sticky === "left" ? "0px" : null,
        right: header.sticky === "right" ? "0px" : null,
      }}
    >
      {/*先看单元格是否禁用，再看列，最后再是否处理编辑状态*/}
      {(cellEditAble) ? (
        <Input
          key="input"
          {...header.editor.options}
          type={header.editor.type}
          name={header.name}
          value={rowData[header.name]}
          onChange={tableCellEditHandler.bind(
            this,
            rowIndex,
            visibleDataIndex,
            header?.editor?.options?.onChange || null
          )}
          onPaste={onPaste.bind(this, rowIndex, columnIndex, visibleDataIndex)}
          onSelect={tableCellEditHandler.bind(
            this,
            rowIndex,
            visibleDataIndex,
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
