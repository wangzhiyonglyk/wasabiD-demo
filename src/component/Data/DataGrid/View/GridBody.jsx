import React, { Component } from "react";

import Input from "../../../Form/Input/index.jsx";
import CheckBox from "../../../Form/CheckBox";
import TableCell from "../../Table/TableCell.jsx";
import TableRow from "../../Table/TableRow.jsx";
import TableBody from "../../Table/TableBody.jsx";
import func from "../../../libs/func/index.js";
import { getRealRowIndex } from "../method/datafunc.js";
import config from "../config.js"; // 配置文件
class GridBody extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getKey = this.getKey.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.onChecked = this.onChecked.bind(this);
    this.tableCellEditHandler = this.tableCellEditHandler.bind(this);
    this.onDetail = this.onDetail.bind(this);
    this.getCellContent = this.getCellContent.bind(this);
    this.setOrderAndSelectAndDetailRow =
      this.setOrderAndSelectAndDetailRow.bind(this);
  }

  /**
   * 获取当行的key
   * @param {*} rowIndex
   */
  getKey(rowIndex) {
    return this.props.getKey(rowIndex);
  }
  /**
   * 单击事件
   * @param {*} rowData 行数据
   * @param {*} rowIndex 行下标
   * @param {*} columnIndex 列下标
   */
  onClick(rowData, rowIndex, columnIndex) {
    this.props.onClick && this.props.onClick(rowData, rowIndex, columnIndex);
  }
  /**
   * 双击事件
   * @param {*} rowData 行数据
   * @param {*} rowIndex 行下标
   * @param {*} columnIndex 列下标
   */
  onDoubleClick(rowData, rowIndex, columnIndex) {
    this.props.onDoubleClick &&
      this.props.onDoubleClick(rowData, rowIndex, columnIndex);
  }
  /**
   * 行勾选
   * @param {*} rowIndex
   * * @param {*} value
   */
  onChecked(rowIndex, value) {
    this.props.onChecked && this.props.onChecked(rowIndex, value);
  }
  /**
   * 单元格编辑事件
   * @param {*} rowIndex 行的序号
   * @param {*} columnIndex 真正的列序号
   * @param {*} headerRowIndex 表头的行号
   * @param {*} headerColumnIndex 表头的列号
   * @param {func} callBack 自定义的回调函数
   * @param {*} value 值
   * @param {*} text 文本值
   * @param {*} name 对字段名
   */
  tableCellEditHandler(rowIndex, callBack, value, text, name) {
    if (name) {
      this.props.tableCellEditHandler &&
        this.props.tableCellEditHandler(rowIndex, callBack, value, text, name);
    }
  }

  /**
   * 详情展开
   * @param {*} rowData 行数据
   * @param {*} rowIndex 行号
   */
  onDetail(rowData, rowIndex) {
    this.props.onDetail && this.props.onDetail(rowData, rowIndex);
  }

  /**
   * 获取某一行单元格内容
   * @param {*} header
   * @param {*} rowData
   * @param {*} rowIndex
   * @returns
   */
  getCellContent(header, rowData, rowIndex) {
    //内容
    let content = header.content;
    if (typeof content === "function") {
      //函数
      try {
        content = content(rowData, rowIndex);
      } catch (e) {
        console.log("生成自定列出错,原因", e.message);
        content = "";
      }
    } else {
      //为空时
      content = rowData[header.name];
    }
    return content === undefined || content === null ? "" : content;
  }
  /**
   * 设置行中的详情，序号，选择列
   * @param {*} rowData 行数据
   * @param {*}  rowIndex 行号
   * @returns
   */
  setOrderAndSelectAndDetailRow(rowData, rowIndex) {
    let stickyLeft = this.props.borderAble ? 1 : 0; //偏移量,表格左边有border
    let control = [];
    let key = this.getKey(rowIndex); //获取这一行的关键值

    //详情列
    if (this.props.detailAble) {
      let iconCls = "icon-arrow-down"; //详情列的图标
      if (this.props.detailIndex == key) {
        iconCls = "icon-arrow-up"; //详情列-展开
      }
      control.push(
        <TableCell
          key={"bodydetail-" + rowIndex.toString()}
          className={" wasabi-detail-column "}
          tdStyle={{
            position: "sticky",
            zIndex: 1,
            left: stickyLeft,
          }}
        >
          {
            <i
              style={{ cursor: "pointer" }}
              title="详情"
              className={iconCls}
              onClick={this.onDetail.bind(this, rowData, rowIndex)}
            ></i>
          }
        </TableCell>
      );
      stickyLeft += config.detailWidth;
    }
    //序号列
    if (this.props.rowNumber) {
      control.push(
        <TableCell
          key={"bodyorder" + rowIndex.toString()}
          className={"wasabi-order-column "}
          tdStyle={{
            position: "sticky",
            zIndex: 1,
            left: stickyLeft,
          }}
        >
          {rowIndex}
        </TableCell>
      );
      stickyLeft += config.rowNumberWidth;
    }
    //选择列
    if (this.props.selectAble) {
      //通过选择的数据信息判断
      let props = {
        value: this.props.checkedData.has(key) == true ? key : null,
        data: [{ value: key, text: "" }],
        onSelect: this.onChecked.bind(this, rowIndex),
        name: key,
      };
      let rowAllowChecked = this.props.rowAllowChecked; //通过自定义函数来判断断行是否可以选择
      if (typeof rowAllowChecked === "function") {
        rowAllowChecked = rowAllowChecked(rowData, rowIndex);
      } else {
        rowAllowChecked = true; //默认有
      }

      //是单选还是多选
      control.push(
        <TableCell
          key={"bodycheckbox" + rowIndex.toString()}
          className={"wasabi-select-column"}
          tdStyle={{
            position: "sticky",
            zIndex: 1,
            left: stickyLeft,
          }}
        >
          {rowAllowChecked ? (
            this.props.singleSelect ? (
              <Radio {...props}></Radio>
            ) : (
              <CheckBox {...props}></CheckBox>
            )
          ) : null}
        </TableCell>
      );
    }
    return control;
  }

  /**
   * 生成单元格
   * @param {*} header 列头数据
   * @param {*} rowData 行数据
   * @param {*} rowIndex 行下标
   * @param {*} columnIndex 列下标
   * @returns
   */
  setCellComponent(header, rowData, rowIndex, columnIndex) {
    //处理数据单元格
    let editAble = this.props.editIndex === rowIndex + "-" + columnIndex;
    return (
      <TableCell
        name={header.name || header.label}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        onClick={this.onClick.bind(this, rowData, rowIndex, columnIndex)}
        onDoubleClick={this.onDoubleClick.bind(
          this,
          rowData,
          rowIndex,
          columnIndex
        )}
        key={"cell-" + rowIndex.toString() + "-" + columnIndex.toString()}
        className={
          (this.props.focusIndex === rowIndex &&
          this.props.focusColumnIndex === columnIndex
            ? " focus "
            : "") + (header.export === false ? "wasabi-noexport" : "")
        } //为了不导出
        tdStyle={{
          textAlign: header.align,
          position: header.sticky ? "sticky" : null,
          zIndex: header.sticky ? 1 : null,
          left: header.sticky === "left" ? "0px" : null,
          right: header.sticky === "right" ? "0px" : null,
        }}
      >
        {editAble ? (
          <Input
            {...header.editor.options}
            type={header.editor.type}
            name={header.name}
            value={rowData[header.name]}
            onChange={this.tableCellEditHandler.bind(
              this,
              rowIndex,
              (header.editor &&
                header.editor.options &&
                header.editor.options.onChange) ||
                null
            )}
            onSelect={this.tableCellEditHandler.bind(
              this,
              rowIndex,
              (header.editor &&
                header.editor.options &&
                header.editor.options.onSelect) ||
                null
            )}
          ></Input>
        ) : (
          this.getCellContent(header, rowData, rowIndex)
        )}
      </TableCell>
    );
  }
  render() {
    //渲染表体
    if (
      !(this.props.data instanceof Array) ||
      !(this.props.headers instanceof Array) ||
      this.props.data.length === 0
    ) {
      return null; //格式不正确，或者数据为空时，不渲染
    }
    let trArr = []; //行数据

    this.props.data.forEach((rowData, index) => {
      if (rowData.hide) {
        return;
      } else {
        // 得到真正的行号,有虚拟列表的行号，取这个，没有再判断分页情况
        let rowIndex = getRealRowIndex(
          this.props.pagination,
          this.props.pageIndex,
          this.props.pageSize,
          rowData,
          index
        );

        let tds = []; //当前的列集合
        let key = this.getKey(rowIndex); //获取这一行的关键值
        //生成数据列
        let columnIndex = 0; //真正的列号
        this.props.headers.forEach((trheader) => {
          if (trheader instanceof Array) {
            trheader.forEach((header) => {
              if (header.colSpan && header.colSpan > 1) {
                //跨几列的不用渲染
                return;
              }
              //处理数据单元格
              tds.push(
                this.setCellComponent(header, rowData, rowIndex, columnIndex)
              );

              columnIndex++; //列下标
            });
          } else {
            //处理数据单元格
            tds.push(
              this.setCellComponent(trheader, rowData, rowIndex, columnIndex)
            );

            columnIndex++; //列下标
          }
        });
        let trClassName = "";
        if (this.props.focusIndex == rowIndex) {
          trClassName += " selected ";
        }
        if (this.props.editIndex === rowIndex) {
          trClassName += " edited ";
        }

        trArr.push(
          <TableRow
            key={"row-" + rowIndex}
            rowIndex={rowIndex}
            className={trClassName}
          >
            {this.setOrderAndSelectAndDetailRow(rowData, rowIndex)}
            {tds}
          </TableRow>
        );
        //展示详情面板

        if (this.props.detailIndex == key) {
          trArr.push(this.props.detailView);
        }
      }
    });

    return <TableBody>{trArr}</TableBody>;
  }
}

export default GridBody;
