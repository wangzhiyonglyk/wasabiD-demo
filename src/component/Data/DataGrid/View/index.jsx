import React from "react";

import GridHeader from "./GridHeader";
import GridBody from "./GridBody";
import GridColGroup from "./GridColGroup";
import Pagination from "../../Pagination";
import GridLoading from "./GridLoading";
import func from "../../../libs/func";
import Table from "../../Table/Table";
import config from "../config";

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onHeaderMouseDown = this.onHeaderMouseDown.bind(this);
    this.onDivideMouseMove = this.onDivideMouseMove.bind(this);
    this.onDivideMouseUp = this.onDivideMouseUp.bind(this);
  }
  /**
   * 表头鼠标按下事件
   * @param {*} headerColumnIndex
   * @param {*} event
   */
  onHeaderMouseDown(headerColumnIndex, event) {
    this.chosedHeaderColumnIndex = headerColumnIndex;
    let container = document.getElementById(this.props.containerid);
    this.left = container.getBoundingClientRect().left; // 得到整个容器左边距
    this.beginLeft = event.clientX; // 标记当前的位置
    container.style.userSelect = "none";
    container.style.cursor = "ew-resize";
    let divide = document.getElementById(this.props.divideid);
    divide.style.display = "block";
    divide.style.cursor = "ew-resize";
    divide.style.left = this.beginLeft - this.left + "px"; //这个位置才是相对容器的位置
    document.addEventListener("mousemove", this.onDivideMouseMove);
    document.addEventListener("mouseup", this.onDivideMouseUp);
  }
  /**
   * 分隔线的拖动事件
   * @param {*} event
   */
  onDivideMouseMove(event) {
    if (this.chosedHeaderColumnIndex !== null) {
      let divide = document.getElementById(this.props.divideid);
      divide.style.left = event.clientX - this.left + "px"; //这个位置才是相对容器的位置
    }
  }
  /**
   * 分隔线的鼠标松开事件
   * @param {*} event
   */
  onDivideMouseUp(event) {
    if (this.chosedHeaderColumnIndex !== null) {
      let chosedHeaderColumnIndex = this.chosedHeaderColumnIndex;
      if (this.props.detailAble) {
        chosedHeaderColumnIndex++;
      }
      if (this.props.rowNumber) {
        chosedHeaderColumnIndex++;
      }
      if (this.props.selectAble) {
        chosedHeaderColumnIndex++;
      }
      try {
        let realTable = document.getElementById(this.props.realTableId);
        let tableHeader = document.getElementById(this.props.tableHeaderId);
        if (realTable && tableHeader) {
          // 宽度差
          let diff = event.clientX - this.beginLeft;
          // 表格当前宽度
          let tableWidth = realTable.getBoundingClientRect().width; //

          // 表头的col
          let tableHeaderCols = tableHeader.children[0].children; // 拿到 colgroup 的cols

          // 表头的th，用于设置固定列的问题
          let tableHeaderths = tableHeader.children[1].children[0].children;

          // 当前列的表头，用于设置固定列的问题
          let currenth = tableHeaderths[chosedHeaderColumnIndex];

          // 表体的第一行
          let realTableFirstTds = realTable?.children[1]?.children[0]?.children;
          // 当前列的宽度,
          let currentColWidth =
            realTableFirstTds[chosedHeaderColumnIndex].getBoundingClientRect()
              .width;

          // 表体的col
          let realTableCols = realTable.children[0].children; // 拿到 colgroup 的cols

          // 表体的行，用于设置固定列的问题
          let realTabletrs = realTable.children[1].children;

          if (realTableFirstTds) {
            // 设置当前列对应的col的宽度,原来的宽度加拖动的宽度差

            // 表头的col
            tableHeaderCols[chosedHeaderColumnIndex].setAttribute(
              "width",
              Math.ceil(currentColWidth + diff)
            );
            // 表体的col
            realTableCols[chosedHeaderColumnIndex].setAttribute(
              "width",
              Math.ceil(currentColWidth + diff)
            );
            //设置表格的宽度
            realTable.style.width = Math.ceil(tableWidth + diff) + "px";
            tableHeader.style.width = Math.ceil(tableWidth + diff) + "px";

            /**************以下是处理固定列的left,right*************** */

            if (currenth.style.position === "sticky" && currenth.right) {
              // 当前列是右边固定,则只改变当前列的right值就可以了
              let stickyRight = parseInt(currenth.right) + diff;
              // 表头
              currenth.right = stickyRight + "px";
              // 表体
              for (let i = 0; i < realTabletrs.length; i++) {
                realTabletrs[i].children[chosedHeaderColumnIndex].style.right =
                  stickyRight + "px";
              }
            } else if (
              currenth.style.position === "sticky" &&
              currenth.style.left
            ) {
              //当前列左边固定，继续看下一列
              for (
                let nextIndex = chosedHeaderColumnIndex + 1;
                nextIndex < tableHeaderths.length;
                nextIndex++
              ) {
                let nextth = tableHeaderths[nextIndex];
                if (nextth.style.position === "sticky" && nextth.style.left) {
                  // 下一列左边固定，则改变
                  let stickyLeft = parseInt(nextth.style.left) + diff;
                  // 表头
                  nextth.style.left = stickyLeft + "px";

                  // 表体
                  for (let j = 0; j < realTabletrs.length; j++) {
                    realTabletrs[j].children[nextIndex].style.left =
                      stickyLeft + "px";
                  }
                } else {
                  break;
                }
              }
            }
          }
        }
      } catch (e) {
        console.log("error", e);
      }
      this.chosedHeaderColumnIndex = null;
      let divide = document.getElementById(this.props.divideid);
      divide.style.display = "none";
      let container = document.getElementById(this.props.containerid);
      container.style.userSelect = null;
      container.style.cursor = "pointer";
      event.target.style.cusor = "pointer";
      document.removeEventListener("mousemove", this.onDivideMouseMove);
      document.removeEventListener("mouseup", this.onDivideMouseUp);
    }
  }
  /**
   *渲染列的样式
   */
  renderColGruop() {
    return (
      <GridColGroup
        headerWidth={this.props.headerWidth}
        containerid={this.props.containerid}
        realTableId={this.props.realTableId}
        tableHeaderId={this.props.tableHeaderId}
        headers={this.props.headers}
        selectAble={this.props.selectAble}
        rowNumber={this.props.rowNumber}
        detailAble={this.props.detailAble}
        perColumnWidth={this.props.perColumnWidth}
      ></GridColGroup>
    );
  }

  /**
   * 处理表头
   */
  renderHeader() {
    return (
      <GridHeader
        headers={this.props.headers}
        headerWidth={this.props.headerWidth}
        borderAble={this.props.borderAble}
        selectAble={this.props.selectAble}
        singleSelect={this.props.singleSelect}
        rowNumber={this.props.rowNumber}
        detailAble={this.props.detailAble}
        sortName={this.props.sortName}
        sortOrder={this.props.sortOrder}
        onCheckedAll={this.props.onCheckedAll}
        isCheckAll={this.props.isCheckAll}
        onHeaderMouseDown={this.onHeaderMouseDown}
        onSort={this.props.onSort}
      ></GridHeader>
    );
  }

  /**
   * 处理表体
   */
  renderBody() {
    return (
      <GridBody
        headerWidth={this.props.headerWidth}
        headers={this.props.headers}
        data={this.props.visibleData}
        borderAble={this.props.borderAble}
        priKey={this.props.priKey}
        checkedData={this.props.checkedData}
        pagination={this.props.pagination}
        pageIndex={this.props.pageIndex}
        pageSize={this.props.pageSize}
        selectAble={this.props.selectAble}
        singleSelect={this.props.singleSelect}
        rowNumber={this.props.rowNumber}
        detailAble={this.props.detailAble}
        editIndex={this.props.editIndex}
        detailIndex={this.props.detailIndex}
        detailView={this.props.detailView}
        focusIndex={this.props.focusIndex}
        focusColumnIndex={this.props.focusColumnIndex}
        rowAllowChecked={this.props.rowAllowChecked}
        getKey={this.props.getKey}
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick}
        onChecked={this.props.onChecked}
        tableCellEditHandler={this.props.tableCellEditHandler}
        onDetail={this.props.onDetail}
      ></GridBody>
    );
  }

  /**
   * 表尾 todo
   */
  renderFooter() {
    return null;
  }
  /**
   * 真实的表格
   */
  renderTable(height) {
    // 是否有数据
    let hasData = this.props?.visibleData?.length > 0 ? true : false;
    let colgroup = this.renderColGruop();
    let headerControl = this.renderHeader();
    return (
      <div
        className="wasabi-table-container"
        key="wasabi-table-container"
        onScroll={this.props.onVirtualScroll}
        id={this.props.containerid}
        style={{ height: height }}
      >
        {/* 表头独立是为了在紧凑表格宽度不够时 更好看一点*/}
        <div className="table-fixedth">
          <Table
            className={
              (this.props.borderAble ? " " : " table-no-bordered ") +
              (this.props.editAble ? " edit " : "")
            }
            id={this.props.tableHeaderId}
          >
            {
              /**colgroup */
              colgroup
            }
            {/* 表头 */}
            {headerControl}
          </Table>
        </div>
        {/* 真实的表格  */}
        {hasData ? (
          <Table
            className={this.props.borderAble ? " " : " table-no-bordered "}
            id={this.props.realTableId}
          >
            {
              /**colgroup */
              colgroup
            }

            {/* 表体 */}
            {this.renderBody()}
            {/* 表尾 todo */}
            {/* <tfoot>{this.renderFooter()}</tfoot> */}
          </Table>
        ) : null}
        <div className="wasabi-virtual-height"></div>

        {/* 拖动列时的分隔线  */}
        <div className="wasabi-grid-divide" id={this.props.divideid}></div>
      </div>
    );
  }

  /**
   * 渲染全部网格组件
   */
  render() {
    let grid = [];
    let style = func.clone(this.props.style) || {};
    let height = style.height || null;
    style.height = null; //清空height,因为height是被单独提取出来用设置表格的高度

    let pagination = this.props.pagination;
    let pagePosition = this.props.pagePosition;
    let pageTotal =
      this.props?.visibleData?.length < this.props.total
        ? this.props.visibleData.length
        : this.state.pageSize;
    /* 头部分页 */
    grid.push(
      pagination && (pagePosition === "top" || pagePosition === "both") ? (
        <Pagination
          key="p1"
          reload={this.props.reload}
          exportAble={this.props.exportAble}
          export={this.props.export}
          onChange={this.props.paginationHandler}
          pageIndex={this.props.pageIndex}
          pageSize={this.props.pageSize}
          pageTotal={pageTotal}
          total={this.props.total}
        ></Pagination>
      ) : null
    );

    /* 真实表格容器 */
    grid.push(this.renderTable(height));

    /* 底部分页 */
    grid.push(
      pagination && (pagePosition === "bottom" || pagePosition === "both") ? (
        <Pagination
          key="p2"
          reload={this.props.reload}
          exportAble={this.props.exportAble}
          export={this.props.export}
          onChange={this.props.paginationHandler}
          pageIndex={this.props.pageIndex}
          pageSize={this.props.pageSize}
          pageTotal={pageTotal}
          total={this.props.total}
        ></Pagination>
      ) : null
    );

    /* 加载动画 */
    grid.push(
      this.props.loading ? <GridLoading key="loading"></GridLoading> : null
    );

    return (
      <div
        className={
          "wasabi-grid " +
          pagePosition +
          (pagination ? " pagination " : "") +
          (this.props.className || "")
        }
        style={style}
      >
        {grid}
      </div>
    );
  }
}

export default Grid;
