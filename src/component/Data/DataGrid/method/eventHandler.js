/**
 * Created by wangzhiyonglyk on 2016/10/25.
 * edit by wangzhiyonglyk 2020-05-09 修复分页的问题
 * 将DataGrid拆分,基本处理事件存在这里
 * 2023-09-18 重新设计事件体系
 */
import React from "react";
import func from "../../../libs/func/index.js";
import { changeRangeType } from "../../../Form/propsConfig/propTypes.js"

import { checkCurrentPageCheckedAll, getRealRowIndex } from "./datafunc.js";
export default {
  /**
   * 勾选事件
   * @param {*} rowIndex 行号
   * @param {*} value 勾选框的值
   * @param {*} key key值，这个是为了setChecked调用而加的参数，暂时这么设计
   * @
   */
  onChecked: function (rowIndex, value) {
    //选中事件
    let key = this.getKey(rowIndex); //拿key值，防止0为值的情况
    let checkedData = this.state.checkedData; //已经选中的行

    if (this.props.singleSelect == true) {
      //单选则清空
      checkedData = new Map(); //单选先清空之前的选择
    }
    if ((value ?? "").toString()) {
      //防止value为0这种情况 选择
      checkedData.set(key, this.state.data[rowIndex]);
    } else {
      // 取消选择
      checkedData.delete(key);
    }
    this.setState({
      checkedData: checkedData,
      isCheckedAll: checkCurrentPageCheckedAll(checkedData),
    });
    if (typeof this.props.onChecked === "function") {
      var result = [];
      for (let value of checkedData.values()) {
        result.push(value);
      }
      this.props.onChecked(result); //用于返回
    }
  },

  /**
   * 全选按钮的单击事件
   * @param {*} value
   */
  onCheckedAll: function (value) {
    if (value === "yes") {
      if (this.state.visibleData.length > 0) {
        //分页取可见数据，不分页取当前数据
        let data = this.props.pagination
          ? this.state.visibleData
          : this.state.data;
        let length = data.length;
        let checkedData = new Map();

        for (let i = 0; i < length; i++) {
          let rowData = data[i];
          // 真正的行号
          let rowIndex = getRealRowIndex(
            this.props.pagination,
            this.state.pageIndex,
            this.state.pageSize,
            rowData,
            i
          );
          let key = this.getKey(rowIndex, rowData);
          checkedData.set(key, data[i]); //添加
        }
        this.setState({
          checkedData: checkedData,
          isCheckedAll: true,
        });

        if (typeof this.props.onChecked === "function") {
          //执行父组件的onchecked事件
          var result = [];
          for (let value of checkedData.values()) {
            result.push(value);
          }
          this.props.onChecked(result);
        }
      }
    } else {
      this.setState({
        checkedData: new Map(),
        isCheckedAll: false,
      });
    }
  },
  /**
   * 单元格单击事件
   * @param {*} rowData 行数据
   * @param {*} rowIndex 行号
   * @param {*} columnIndex 列号
    * @param {*} label 标题 多元素时有效
   * @param {*} event 事件源
   */
  onClick: function (rowData, rowIndex, columnIndex, label, event) {

    this.setState({
      focusIndex: rowIndex,
      focusColumnIndex: columnIndex,
    });
    if (this.props.focusSelected == true) {
      // 允许选择勾
      let key = this.getKey(rowIndex); //获取关键字
      if (this.state.checkedData.has(key)) {
        this.onChecked(rowIndex, "");
      } else {
        this.onChecked(rowIndex, key);
      }
    }
    if (this.state.editAble) {
      //允许编辑表格
      this.setState({
        editIndex: rowIndex + "-" + columnIndex,
      });
    }
    this.props.onClick && this.props.onClick(rowData, rowIndex, columnIndex, label, event); //
  },
  /**
   * 双击事件
   * @param {*} rowData 行数据
   * @param {*} rowIndex 行号
   * @param {*} columnIndex 列号
   * @param {*} event
   */
  onDoubleClick: function (rowData, rowIndex, columnIndex, label, event) {
    this.props.onDoubleClick &&
      this.props.onDoubleClick(rowData, rowIndex, columnIndex, label, event);
  },

  /**
   * 页号,与大小改变
   * @param {*} pageIndex
   */
  paginationHandler: function (pageIndex, pageSize) {
    //分页处理函数
    if (pageIndex == this.state.pageIndex && pageSize == this.state.pageSize) {
      //当前页,不处理
      return;
    } else {
      //跳转到指定页
      this.loadData(this.state.url, pageSize, pageIndex);
    }
  },

  /**
   * 排序事件
   * @param {*} sortName
   * @param {*} sortOrder
   */
  onSort: function (sortName, sortOrder) {
    //直接调用加载数据事件
    this.loadData(this.state.url, this.state.pageSize, 1, sortName, sortOrder);
  },
  /**
   *
   * @param {*} headerRowIndex
   * @param {*} headerColumnIndex
   */
  onFilter: function (headerRowIndex, headerColumnIndex, value, text) {
    let headers = this.state.headers;
    let header;
    if (Array.isArray(headers[0])) {
      header = headers[headerRowIndex][headerColumnIndex];
    } else {
      header = headers[headerColumnIndex];
    }
    header.filterValue = value;
    header.filterText = text;
    if (changeRangeType.includes(header.editor.type) > -1) {
      header.filterText = text.replace(",", "至");
    }
    let filters = { ...this.state.filters } || {};
    filters[header.name || header.label] = {
      value,
      text,
      name: header.name || header.label,
      type: header?.editor?.type || "text",
    };

    //查询数据
    this.loadData(
      this.state.url,
      this.state.pageSize,
      1,
      this.state.sortName,
      this.state.sortOrder,
      this.state.params,
      filters
    );
  },
  /**
   * 调整列的顺序
   * @param {*} dragHeaderColumnIndex 
   * @param {*} dropHeaderColumnIndex 
   */
  onChangeHeaderOrder: function (dragHeaderColumnIndex, dropHeaderColumnIndex) {
    let headers = this.state.headers;
    let drag = headers[dragHeaderColumnIndex];
    if (dragHeaderColumnIndex < dropHeaderColumnIndex) {
      // 向后插入
      // 先插入，再删除,因为删除的下标不会发生改变
      headers.splice(dropHeaderColumnIndex, 0, drag);
      headers.splice(dragHeaderColumnIndex, 1)
    }
    else if (dragHeaderColumnIndex > dropHeaderColumnIndex) {
      // 向前插入
      headers.splice(dropHeaderColumnIndex, 0, drag);
      //  先插入，再删除，删除下标加1
      headers.splice(dragHeaderColumnIndex + 1, 1)
    }
    else {
      // 相等不处理
      return;
    }
    this.setState({
      headers: headers
    })
  },
  /**
   * 添加一条
   */
  onAdd() {
    let rowData = {};
    for (let i = 0; i < this.state.headers.length; i++) {
      rowData[this.state.headers[i].name] = "";
    }
    this.addRow(rowData, true); //添加的是空数据，允许编辑
  },
  /**
   * 保存
   */
  onSave() {
    this.setState({
      editIndex: null,
    });
    let addData = this.getAddData();
    let updateData = this.getUpdateData();
    let deleteData = this.getDeleteData();
    console.log({
      addData: addData,
      updateData,
      deleteData,
    });
    this.props.onSave &&
      this.props.onSave({
        addData: addData,
        updateData,
        deleteData,
      });
  },
  /**
   * 点击弹出详情
   * @param {*} rowData
   * @param {*} rowIndex
   */
  onDetail: function (rowData, rowIndex) {
    //执行显示详情功能
    const key = this.getKey(rowIndex); //获取关键值
    if (key == this.state.detailIndex) {
      this.setState({
        detailIndex: null,
        detailView: null,
      });
    } else {
      if (this.props.onDetail ?? "") {
        const detail = this.props.onDetail(rowData, rowIndex);
        if (!detail) {
          this.setState({
            detailIndex: null, //方便下次操作
            detailView: null,
          });
        } else {
          let colSpan = this.columnSum + 1; //总列数+1,因为本身存在详情列

          if (this.props.selectAble) {
            colSpan++;
          }
          if (this.props.rowNumber) {
            colSpan++;
          }

          this.setState({
            detailIndex: key,
            detailView: (
              <tr key={key + "-detail"}>
                <td colSpan={colSpan}>
                  <div className="wasabi-detail">{detail}</div>
                </td>
              </tr>
            ),
          });
        }
      }
    }
  },

  /**
   * 单元格编辑事件
   * @param {*} rowIndex 行的序号
   * @param {*} visibleDataIndex 可见数据中的行序号
   * @param {func} callBack 自定义的回调函数
   * @param {*} value 值
   * @param {*} text 文本值
   * @param {*} name 对字段名
   */
  tableCellEditHandler: function (
    rowIndex,
    visibleDataIndex,
    callBack,
    value,
    text,
    name
  ) {
    //编辑时单元格内的表单onchange的监听事件
    let key = this.getKey(rowIndex);
    if (this.state.addData.has(key)) {
      //说明是属于新增的
      this.state.addData.set(key, this.state.data[rowIndex]);
    } else {
      //属于修改的
      this.state.updateData.set(key, this.state.data[rowIndex]);
    }

    let data = this.state.data;
    data[rowIndex][name] = value;
    let visibleData = this.state.visibleData;
    visibleData[visibleDataIndex][name] = value;

    this.setState({
      visibleData,
      data: data,
      addData: this.state.addData,
      updateData: this.state.updateData,
    });
    //自定义的回调函数
    if (callBack && typeof callBack == "function") {
      callBack(value, text, name);
    }
  },
};
