/**
 *Created by wangzhiyonglyk on 2016-03-02
 * desc:列表组件,由此组件开始独立重构所有组件,不再依赖
 * wasabi框架的第一个组件
 * 2016-06-09后开始调整整个样式
 * 2017-01-04 注意了,这里渲染分页与复制的CopyDataGrid不一样，因为CopyDataGrid宽度比较小可能放不下
 *2017-09-30 将固定表头功能先隐藏掉
 *2020-11月 统一修改bug
 2020-12-19开始 重新扩展表格功能，扩展表头，表尾 固定表头，拖动列，固定列，高度，宽表的适应，编辑，粘贴，导入excel等功能 将表格拆分更细
 desc 简单表头，与复杂表头是为了处理兼容性问题
 2021-05-28 创建table组件， 重新改造datagrid，将view,event,data分离，组件单一责任原则
 2021-09-06 修复列拖动改变宽度的问题
 固定列，复杂表头仍然有bug，需要检查
  2021-11-28 重新实现紧凑宽度，调整宽度，固定表头，固定列等功能，优化渲染，列不再换行
  2021-12-28 增加虚拟列表功能
  2022-01-07 重新设计虚拟列表的实现方式，采用onScroll,配置虚拟列表开关，目前是通过数据量的大小（500），这样可能适应于treegrid,pivot，又可以适应小数据量情况
  2022-01-07 调整表格的宽度与高度等样式bug
   2022-01-07 解决因虚拟列表导致固定列的效果失败的bug，减少onScroll事件重复渲染的次数
    2022-08-09 调整因为虚拟列表的bug
      2022-09-15 完善表单事件与方法，
      202-09-15 重构整个表格
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * 公共方法
 */
import func from "../../libs/func/index.js";

import mixins from "../../Mixins/mixins";

/**
 * 事件处理
 */
import loadData from "./method/loadData.js";
import virtualHandler from "./method/virtualHandler.js";
import eventHandler from "./method/eventHandler.js";
import staticMethod from "./method/staticMethod";
import pasteExtend from "./method/pasteExtend.js";
import Grid from "./View";
import { setHeaderEditor } from "./method/datafunc";

import config from "./config.js"; // 基本配置

/**
 * 样式
 */
import "./datagrid.css";
import "./datagridetail.css";

class DataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerid: func.uuid(), //表格容器
      divideid: func.uuid(), //分隔线
      tableHeaderId: func.uuid(), //表头table
      realTableId: func.uuid(), //真实table
      url: null,
      rawUrl: null,
      params: null, //参数
      rawParams: null, //保留旧的，用于对比
      pageIndex: this.props.pageIndex, //页号
      pageSize: this.props.pageSize, //分页大小
      sortName: this.props.sortName, //排序名称
      sortOrder: this.props.sortOrder, //排序方式

      /************以下这几个字段在 getDerivedStateFromProps 处理逻辑，这样提升性能 */

      rawHeaders: null, //原有默认列保存起来，用于更新判断
      headers: [], //页面中的headers
      rawData: null, // 原始数据
      data: [], //当前的数据
      visibleData: [], //可见的数据

      /************以上这几个字段在 getDerivedStateFromProps 处理逻辑，这样提升性能 */
      checkedData: new Map(), //勾选的数据
      isCheckedAll: false, // 是否已经全选
      focusIndex: null, // 焦点行
      detailView: null, //详情行,
      detailIndex: null, //显示详情的行下标
      total: 0, //总记录数
      loading: false, //显示正在加载图示
      footer: {}, //页脚
      rawFooter: null, // 原始数据
      updateUrl: this.props.updateUrl, // 更新的接口
      editAble:
        this.props.editAble || this.props.addAble || this.props.importAble, //如果允许添加或者导入，自然就允许编辑
      editIndex: null, //当前处理编辑的列
      filters: {}, // 筛选条件
      addData: new Map(), //新增的数据,因为有可能新增一个空的，然后再修改
      updateData: new Map(), //被修改过的数据，因为要判断曾经是否修改
      deleteData: [], //删除的数据
      urlLoadData: false, //有url，标记是否需要向后台请求数据
      needVirtualHandler: null, //是否需要重置虚拟列表的配置,null标记为没有虚拟列表,true 需要进行虚拟列表配置，false表示配置完成
    };
    //绑定事件
    let baseCtors = [
      loadData,
      virtualHandler,
      eventHandler,
      staticMethod,
      pasteExtend,
    ];
    baseCtors.forEach((baseCtor) => {
      Object.getOwnPropertyNames(baseCtor).forEach((name) => {
        if (typeof baseCtor[name] == "function") {
          this[name] = this[name].bind(this);
        }
      });
    });
  }
  static getDerivedStateFromProps(props, state) {
    let newState = {}; //新的状态值
    // 处理Headers,因为交叉表的表头是后期传入的
    {
      if (func.diff(props.headers, state.rawHeaders)) {
        //有改变则更新headers等
        newState.rawHeaders = props.headers;
        newState.headers = setHeaderEditor(func.clone(props.headers)); // 深复制，这里后期再考虑
      }
    }

    /**
     * 处理数据
     */
    if (props.data && props.data !== state.rawData) {
      //如果传了固定数据,并且数据改变,浅比较
      newState.rawData = props.data; //保留原始数据，用于筛选
      newState.data = props.data; // 数据不作复制
      // 总记录数
      newState.total = props?.total || props?.data?.length || 0;

      /**** 处理数据与可见数据*****/

      //数据比较大且不分页则执行虚拟列表
      newState.needVirtualHandler =
        props.pagination !== true && props.data?.length > config.minDataTotal
          ? true
          : null;

      if (newState.needVirtualHandler) {
        // 虚拟列表模式
        newState.visibleData = [];
      } else {
        // 处理当前的数据
        try {
          //分页情况下，如果数据超过每页个数，则进行切割
          let pageSize = state.pageSize || 20;
          let pageIndex = state.pageIndex || 1;
          if (props.pagination) {
            // 超过当前页，则进行切割
            newState.visibleData =
              props.data.length > pageSize
                ? props.data.slice(
                    (pageIndex - 1) * pageSize,
                    pageIndex * pageSize
                  )
                : props.data;
          } else {
            newState.visibleData = props.data;
          }
        } catch (e) {
          newState.visibleData = props.data;
        }
      }
    }
    /**处理请求 */
    if (
      props.url &&
      (props.url !== state.rawUrl || func.diff(props.params, state.rawParams))
    ) {
      //没有传数据， 有 url或者参数有变
      newState.urlLoadData = true; //重新加载数据
      newState.url = props.url;
      newState.rawUrl = props.url;
      newState.rawParams = func.clone(props.params);
      newState.params = func.clone(props.params);
    }

    /**
     * 处理页脚
     */
    if (func.diff(props.footer, state.rawFooter)) {
      newState.rawFooter = props.footer;
      newState.footer = func.clone(props.footer);
    }
    return newState;
  }
  /**
   * 更新函数
   */
  componentDidUpdate() {
    this.handlerGridVisibleData();
  }
  componentDidMount() {
    this.handlerGridVisibleData();
  }

  render() {
    return (
      <Grid
        {...this.props}
        {...this.state}
        headerWidth={this.headerWidth}
        onCheckedAll={this.onCheckedAll}
        getKey={this.getKey}
        onClick={this.onClick}
        onDoubleClick={this.onDoubleClick}
        onChecked={this.onChecked}
        tableCellEditHandler={this.tableCellEditHandler}
        onSort={this.onSort}
        onFilter={this.onFilter}
        onDetail={this.onDetail}
        paginationHandler={this.paginationHandler}
        exportAble={this.props.exportAble}
        reload={this.reload}
        export={this.export}
        onAdd={this.onAdd}
        onSave={this.onSave}
        onVirtualScroll={this.onVirtualScroll}
      ></Grid>
    );
  }
}

DataGrid.propTypes = {
  /**
   * 表格常用属性设置
   */

  style: PropTypes.object, //样式对象
  className: PropTypes.string, //样式
  selectAble: PropTypes.bool, // 是否显示选择，默认值 false
  singleSelect: PropTypes.bool, //是否为单选,默认值为 false
  detailAble: PropTypes.bool, //是否显示详情,默认值 false
  rowNumber: PropTypes.bool, //是否显示行号,true
  focusAble: PropTypes.bool, //是否显示焦点行，默认值 true
  borderAble: PropTypes.bool, //是否显示表格边框，默认值 false
  addAble: PropTypes.bool, //是否允许添加
  editAble: PropTypes.bool, //是否允许编辑
  importAble: PropTypes.bool, //是否允许导入
  focusSelected: PropTypes.bool, //选择行的时候是否同时选中,false
  exportAble: PropTypes.bool, //是否允许导出
  footerAble: PropTypes.bool, // 是否有页脚
  compactCol: PropTypes.number, // 表格紧凑的
  rowAllowChecked: PropTypes.func, // 行是否可以选择，函数
  /**
   * 分页
   */
  pagination: PropTypes.bool, //是否分页,默认值 true
  pagePosition: PropTypes.oneOf(["top", "bottom", "both"]), //分页栏的位置
  pageIndex: PropTypes.number, //当前页号
  pageSize: PropTypes.number, //分页大小，默认30
  sortName: PropTypes.string, //默认排序字段,
  sortOrder: PropTypes.oneOf(["asc", "desc"]), //默认排序方式,默认asc,

  /**
   * 数据设置
   */
  priKey: PropTypes.string, //key值字段,
  title: PropTypes.string, // 表格标题，用于导出
  headers: PropTypes.array, //表头设置
  footer: PropTypes.object, //页脚,
  total: PropTypes.number, // 总条目数，有url没用，默认为data.length
  data: PropTypes.array, //当前页数据（json）

  /**
   * ajax请求参数
   */
  url: PropTypes.string, //ajax地址
  updateUrl: PropTypes.string, //列更新的地址
  httpType: PropTypes.string, //请求类型
  contentType: PropTypes.string, //请求的参数传递类型
  httpHeaders: PropTypes.object, //请求的头部
  params: PropTypes.object, //查询条件

  /**
   * 数据源
   */
  dataSource: PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源
  footerSource: PropTypes.string, //页脚数据源,
  totalSource: PropTypes.string, //ajax的返回的数据源中哪个属性作为总记录数源

  /**
   * 事件
   */
  onClick: PropTypes.func, //单击事件
  onDoubleClick: PropTypes.func, //双击事件
  onChecked: PropTypes.func, //监听表格中某一行被选中/取消
  onUpdate: PropTypes.func, //手动更新事件，父组件一定要有返回值,返回新数据
  onDetail: PropTypes.func, //展示详情的函数，父组件一定要有返回值,返回详情组件
  onSave: PropTypes.func, //保存事件
  loadSuccess: PropTypes.func, //异步加载数据后，对数据进行进一步加工
};
DataGrid.defaultProps = {
  /**
   * 表格常用属性设置
   */

  focusSelected: false,
  exportAble: true,
  borderAble: true,
  compactCol: 10,
  /**
   * 分页
   */
  pagePosition: "bottom", //默认分页在底部
  pagination: true,
  pageIndex: 1,
  pageSize: 20,
  sortName: "id",
  sortOrder: "desc",

  /**
   * 数据设置
   */
  priKey: "id",
  headers: [],
  fixedHeaders: [],
  total: 0,
  /**
   * ajax请求参数
   */

  httpType: "POST",
  contentType: "application/x-www-form-urlencoded",

  /**
   * 数据源
   */
  dataSource: "data", //
  footerSource: "footer", //页脚数据源
  totalSource: "total", //
};
mixins(DataGrid, [
  loadData,
  virtualHandler,
  eventHandler,
  staticMethod,
  pasteExtend,
]);

export default DataGrid;
