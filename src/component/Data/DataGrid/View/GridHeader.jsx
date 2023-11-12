/**
 * 拆分datagrid,表头组件
 * 2021-05-28
 * 2022-01-08 解决ref报错的bug
 */
/**
 * :[[
    {name:'itemid',label:'Item ID',rowSpan:2,width:80,sortAble:true},
    {name:'productid',label:'Product ID',rowSpan:2,width:80,sortAble:true},
    {label:'Item Details',colSpan:4}
],[ 
    {name:'listprice',label:'List Price',width:80,align:'right',sortAble:true},
    {name:'unitcost',label:'Unit Cost',width:80,align:'right',sortAble:true},
    {name:'attr1',label:'Attribute',width:100},
    {name:'status',label:'Status',width:60}
]]
 */
import React from "react";

import { TableCell, TableHead, TableRow } from "../../Table";
import CheckBox from "../../../Form/CheckBox";
import config from "../config";
import func from "../../../libs/func";
import Header from "./Header";
import dom from "../../../libs/dom";
class GridHeader extends React.Component {
  constructor(props) {
    super(props);

    this.setOrderAndSelectAndDetailHeader =
      this.setOrderAndSelectAndDetailHeader.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  /**
   * 表头的鼠标监听事件
   * @param {*} event
   */
  onMouseMove(event) {
    try {
      let headerNode;
      if (event.target.tagName !== "TH") {
        let headerNode = dom.findAncestorByClasss(
          event.target,
          "wasabi-table-cell"
        );
        headerNode = headerNode.parentNode;
      } else {
        headerNode = event.target;
      }
      let clientX = event && event.clientX;
      let position = headerNode.getBoundingClientRect();
      let leftPosition = position.left + position.width;
      if (leftPosition - clientX <= 5) {
        event.target.style.cursor = "ew-resize";
      } else {
        event.target.style.cursor = "pointer";
      }
    } catch (e) {}
  }
  onMouseDown(headerColumnIndex, event) {
    if (event.target.style.cursor === "ew-resize") {
      let offsetX = event && event.nativeEvent && event.nativeEvent.offsetX;
      //满足拖动条件，回传父组件处理
      this.props.onHeaderMouseDown &&
        this.props.onHeaderMouseDown(
          offsetX <= 2 ? headerColumnIndex - 1 : headerColumnIndex,
          event
        );
    }
  }

  /**
   * 设置表头的详情，序号，选择列
   */
  setOrderAndSelectAndDetailHeader(rowSpan = 1) {
    let stickyLeft = 0;
    let control = [];
    //处理详情列
    if (this.props.detailAble) {
      control.push(
        <TableCell
          rowSpan={rowSpan}
          key="headerdetail"
          position="header"
          className="wasabi-detail-column"
          style={{
            position: "sticky",
            left: stickyLeft,
            zIndex: 1,
          }}
        ></TableCell>
      );
      stickyLeft += config.detailWidth;
    }
    //处理序号列
    if (this.props.rowNumber) {
      control.push(
        <TableCell
          rowSpan={rowSpan}
          key="headerorder"
          position="header"
          className="wasabi-order-column"
          style={{
            position: "sticky",
            left: stickyLeft,
            zIndex: 1,
          }}
        >
          序号
        </TableCell>
      );
      stickyLeft += config.rowNumberWidth;
    }
    //处理选择列
    if (this.props.selectAble) {
      let props = {
        //设置checkbox的属性
        value: this.props.isCheckAll == true ? "yes" : null, //判断当前页是否选中
        data: [{ value: "yes", text: "" }],
        onSelect: this.props.onCheckedAll,
        name: "datagrid-check-all",
        rnd: func.uuid(), //加个随机数，保证每次重新渲染，否则会报 ref错误，原因不详
      };
      control.push(
        <TableCell
          rowSpan={rowSpan}
          key="headercheckbox"
          position="header"
          className="wasabi-select-column"
          style={{
            position: "sticky",
            left: stickyLeft,
            zIndex: 1,
          }}
        >
          {this.props.singleSelect ? null : <CheckBox {...props}></CheckBox>}
        </TableCell>
      );
      stickyLeft += config.selectWidth;
    }

    return control;
  }

  render() {
    if (
      !(this.props.headers instanceof Array) ||
      this.props.headers.length === 0
    ) {
      //格式不正确，或者数据为空
      return null;
    }
    let headerControl = [];
    let maxRowSpan = 1; // 得到表头行数
    let trcontrol = [];

    //处理表头
    this.props.headers.map((trheader, headerRowIndex) => {
      if (trheader instanceof Array) {
        maxRowSpan = this.props.headers.length; //多行时
        trheader.map((header, headerColumnIndex) => {
          trcontrol.push(
            <Header
              key={headerRowIndex + "-" + headerColumnIndex}
              {...header}
              headerRowIndex={headerRowIndex}
              headerColumnIndex={headerColumnIndex}
              sortName={this.props.sortName}
              sortOrder={this.props.sortOrder}
              onSort={this.props.onSort}
              filterOpen={this.props.filterOpen}
              onMouseMove={this.onMouseMove}
              onMouseDown={this.onMouseDown}
            ></Header>
          );
        });
        headerControl.push(trcontrol);
        trcontrol = []; //清空
      } else {
        //表头只有一行,headerRowIndex就是列号
        let headerColumnIndex = headerRowIndex;
        trcontrol.push(
          <Header
            key={"0-" + headerColumnIndex}
            {...trheader}
             // 拖动功能，如果列有值则取列值，否则取组件的值,只有单行列头可以拖动
             draggAble={(trheader.draggAble??"")!==""?trheader.draggAble: this.props.draggAble}
            headerRowIndex={0}
            headerColumnIndex={headerColumnIndex}
            sortName={this.props.sortName}
            sortOrder={this.props.sortOrder}
            onSort={this.props.onSort}
            filterOpen={this.props.filterOpen}
            onMouseMove={this.onMouseMove}
            onMouseDown={this.onMouseDown}
            onChangeHeaderOrder={this.props.onChangeHeaderOrder}
          ></Header>
        );
      }
    });
    if (trcontrol.length > 0) {
      headerControl.push(trcontrol); //说明只有一行
    }
    if (this.props.headers && this.props.headers.length > 0) {
      //设置表头的详情，序号，选择列,空白列

      let control = this.setOrderAndSelectAndDetailHeader(maxRowSpan);

      headerControl[0] = [].concat(control, headerControl[0]);
    }
    return (
      <TableHead
        style={{
          display: this.props.hide ? "none" : null,
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        {headerControl &&
          headerControl.map((tritem, rowindex) => {
            return <TableRow key={rowindex}>{tritem}</TableRow>;
          })}
      </TableHead>
    );
  }
}

export default GridHeader;
