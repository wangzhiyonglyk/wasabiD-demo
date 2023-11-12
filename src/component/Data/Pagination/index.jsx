/**
 * 分页组件
 * create by wangzhiyonglyk
 * date:2021-04,从datagrid独立出来
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./pagination.css";
import func from "../../libs/func/index.js";
import pageSizeList from "./pageSizeList.js";
import regs from "../../libs/regs";

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldProps: func.clone(this.props),
      total: this.props.total, //总记录数
      pageTotal: this.props.pageTotal, //当前页数据量
      pageSize: this.props.pageSize, //分页大小，
      pageIndex: this.props.pageIndex, //分页号
    };
    this.paginationHandler = this.paginationHandler.bind(this);
    this.prePaginationHandler = this.prePaginationHandler.bind(this);
    this.nextPaginationHandler = this.nextPaginationHandler.bind(this);
    this.nextPaginationHandler = this.nextPaginationHandler.bind(this);
    this.pageSizeHandler = this.pageSizeHandler.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (func.diff(props, state.oldProps)) {
      return {
        oldProps: func.clone(props),
        total: props.total,
        pageTotal: props.pageTotal,
        pageSize: props.pageSize,
        pageIndex: props.pageIndex,
      };
    }
    return null;
  }
  /**
   * 页号改变
   * @param {*} pageIndex
   */
  paginationHandler(pageIndex) {
    //分页处理函数
    if (pageIndex == this.state.pageIndex) {
      //当前页,不处理
      return;
    } else {
      //跳转到指定页
      this.props.onChange &&
        this.props.onChange(pageIndex, this.state.pageSize);
    }
  }
  /**
   * 上一页数据
   */
  prePaginationHandler() {
    if (this.state.pageIndex == 1) {
    } else {
      this.props.onChange &&
        this.props.onChange(this.state.pageIndex - 1, this.state.pageSize);
    }
  }
  /**
   * 下一页
   */
  nextPaginationHandler() {
    let pageAll = Math.ceil(this.state.total / this.state.pageSize); //共多少页

    if (this.state.pageIndex < pageAll) {
      this.props.onChange &&
        this.props.onChange(this.state.pageIndex + 1, this.state.pageSize);
    }
  }
  /**
   * 页号大小改变
   * @param {*} event
   */
  pageSizeHandler(event) {
    this.props.onChange && this.props.onChange(1, event.target.value * 1);
  }

  /**
   * 跳转至某页
   * @param {*} event
   */
  onKeyUp(event) {
    if (event.keyCode === 13 && regs.integer.test(event.target.value.trim())) {
      let pageAll = Math.ceil(this.state.total / this.state.pageSize); //共多少页
      let pageIndex = event.target.value.trim() * 1;
      if (pageIndex >= 1 && pageIndex <= pageAll) {
        this.props.onChange &&
          this.props.onChange(pageIndex, this.state.pageSize);
      }
    }
  }

  /**
   * 渲染总记录数
   */
  renderTotal() {
    //渲染总记录数，当前记录的下标
    let beginOrderNumber = 1;
    let endOrderNumber = 0; //数据开始序号与结束序号
    let total = this.state.total || 0; //总记录数
    let pageTotal = 1; //共多少页
    if (this.props.pagination) {
      //有分页,计算当前页序号
      pageTotal = parseInt(this.state.total / this.state.pageSize); //
      pageTotal =
        this.state.total % this.state.pageSize > 0 ? pageTotal + 1 : pageTotal; //求余后得到最终总页数
      beginOrderNumber = this.state.pageSize * (this.state.pageIndex - 1) + 1;
      endOrderNumber =
        this.state.pageSize * (this.state.pageIndex - 1) + this.state.pageTotal;
    } else {
      //无分页
      endOrderNumber = this.state.pageTotal;
    }
    return (
      <div key="pagination-info" className="pagination-info">
        显示&nbsp;{beginOrderNumber} &nbsp;至&nbsp; {endOrderNumber}
        &nbsp;项&nbsp;共&nbsp; {total} &nbsp;项记录
        <div
          style={{ display: this.props.pagination ? "inline-block" : "none" }}
        >
          每页&nbsp;
          <select
            className="pagination-select"
            value={this.state.pageSize}
            onChange={this.pageSizeHandler}
          >
            {pageSizeList.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          &nbsp;条&nbsp;&nbsp;
          {
            <i
              title="刷新"
            
              className="icon-refresh"
              onClick={this.props.reload}
            ></i>
          }
          &nbsp;&nbsp;
          {this.props.exportAble ? (
       
          <i
            title="导出"
           
            className="icon-excel"
            onClick={this.props.export}
          ></i>
          ) : null}
        </div>
      </div>
    );
  }
  /**
   * 分页
   */
  renderPagination() {
    //显示分页控件
    let paginationto = (
      <div key="pagination-to" className="pagination-to">
        跳转至<input onKeyUp={this.onKeyUp}></input>页
      </div>
    );
    let paginationComponent = [];
    if (this.props.pagination) {
      let pageAll = parseInt(this.state.total / this.state.pageSize); //共多少页
      if (this.state.total % this.state.pageSize > 0) {
        pageAll++; //求余后得到最终总页数
      }
      if (pageAll == 0) {
        //数据为空，直接返回
        return null;
      }

      if (pageAll > 7) {
        //大于7页，
        let pageComponent = []; //分页组件
        let firstIndex = 0; //第一个显示哪一页
        let lastIndex = 0; //最后一个显示哪一页
        let predisabledli = (
          <li key="predis" className="paginate-button disabled">
            <a>...</a>
          </li>
        ); //多余的分页标记
        let lastdisabledli = (
          <li key="lastdis" className="paginate-button disabled">
            <a>...</a>
          </li>
        ); //多余的分页标记
        if (this.state.pageIndex >= 4 && this.state.pageIndex <= pageAll - 3) {
          //当前页号处于中间位置
          firstIndex = this.state.pageIndex - 2;
          lastIndex = this.state.pageIndex + 2;
        } else {
          //非中间位置
          if (this.state.pageIndex < 4) {
            //靠前的位置
            firstIndex = 2;
            lastIndex = 6;
            predisabledli = null; //设置为空
          } else {
            //靠后的位置
            if (this.state.pageIndex > pageAll - 3) {
              firstIndex = pageAll - 5;
              lastIndex = pageAll - 1;
              lastdisabledli = null; //设置为空
            }
          }
        }
        for (let i = firstIndex; i <= lastIndex; i++) {
          pageComponent.push(
            <li
              key={"li" + i}
              onClick={this.paginationHandler.bind(this, i)}
              className={
                "paginate-button " +
                (this.state.pageIndex * 1 == i ? "active" : "")
              }
            >
              {i}
            </li>
          );
        }
        pageComponent.unshift(predisabledli);
        pageComponent.push(lastdisabledli);

        paginationComponent.push(
          <div key="pagination-number" className="pagination-number">
            <ul className="pagination">
              <li
                key={"lipre"}
                className="paginate-button pre "
                onClick={this.prePaginationHandler}
              >
                {"<"}
              </li>
              <li
                key={"lifirst"}
                onClick={this.paginationHandler.bind(this, 1)}
                className={
                  "paginate-button  " +
                  (this.state.pageIndex * 1 == 1 ? "active" : "")
                }
              >
                {1}
              </li>
              {pageComponent}

              <li
                key="lilast"
                onClick={this.paginationHandler.bind(this, pageAll)}
                className={
                  "paginate-button  " +
                  (this.state.pageIndex * 1 == pageAll ? "active" : "")
                }
              >
                {pageAll}
              </li>
              <li
                key="linext"
                className="paginate-button next"
                onClick={this.nextPaginationHandler}
              >
                {">"}
              </li>
            </ul>
            {paginationto}
          </div>
        );
      } else {
        //小于7页直接显示

        let pagearr = [];

        for (let i = 0; i < pageAll; i++) {
          let control = (
            <li
              key={"li" + i}
              className={
                "paginate-button " +
                (this.state.pageIndex * 1 == i * 1 + 1 ? "active" : "")
              }
            >
              <a onClick={this.paginationHandler.bind(this, i + 1)}>{i + 1}</a>
            </li>
          );
          pagearr.push(control);
        }
        paginationComponent.push(
          <div key="pagination-number" className="pagination-number">
            <ul className="pagination">
              <li
                key={"lipre"}
                className="paginate-button pre "
                onClick={this.prePaginationHandler}
              >
                {"<"}
              </li>
              {pagearr}
              <li
                key="linext"
                className="paginate-button next"
                onClick={this.nextPaginationHandler}
              >
                {">"}
              </li>
            </ul>
            {paginationto}
          </div>
        );
      }
    }

    return paginationComponent;
  }

  render() {
    return (
      <div className="wasabi-pagination ">
        {this.renderTotal()}
        {this.renderPagination()}
      </div>
    );
  }
}
Pagination.propTypes = {
  pagination: PropTypes.bool, //是否分页
  pageIndex: PropTypes.number, //页号
  pageSize: PropTypes.number, //页大小
  pageTotal: PropTypes.number, //当前数据量
  total: PropTypes.number, //总记录数
  onChange: PropTypes.func, //回调函数
};
Pagination.defaultProps = {
  pagination: true,
  pageIndex: 1,
  pageSize: 20,
  pageTotal: 0,
  total: 0,
};

export default Pagination;
