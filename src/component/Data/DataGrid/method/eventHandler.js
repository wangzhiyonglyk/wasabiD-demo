/**
 * Created by wangzhiyonglyk on 2016/10/25.
 * edit by wangzhiyonglyk 2020-05-09 修复分页的问题
 * 将DataGrid拆分,基本处理事件存在这里
 * 2023-09-18 重新设计事件体系
 */
import React from "react";
import func from "../../../libs/func/index.js";

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
            this.pageSize,
            rowData,
            i
          );
          let key = this.getKey(rowIndex, rowData);
          checkedData.set(key, data[i]); //添加
        }

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
   * @param {*} event
   */
  onClick: function (rowData, rowIndex, columnIndex) {
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
    this.props.onClick && this.props.onClick(rowData, rowIndex, columnIndex); //
  },
  /**
   * 双击事件
   * @param {*} rowData 行数据
   * @param {*} rowIndex 行号
   * @param {*} columnIndex 列号
   * @param {*} event
   */
  onDoubleClick: function (rowData, rowIndex, columnIndex) {
    this.props.onDoubleClick &&
      this.props.onDoubleClick(rowData, rowIndex, columnIndex);
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
      if (this.state.url) {
        this.loadData(
          this.state.url,
          pageSize,
          pageIndex,
          this.state.sortName,
          this.state.sortOrder,
          this.state.params
        );
      } else {
        let visibleData = this.state.data.slice(
          (pageIndex - 1) * pageSize,
          pageIndex * pageSize
        );
        this.setState({
          pageIndex,
          pageSize,
          visibleData: visibleData,
        });
      }
    }
  },

  /**
   * 排序事件
   * @param {*} sortName
   * @param {*} sortOrder
   */
  onSort: function (sortName, sortOrder) {
    //直接调用加载数据事件
    if (this.state.url) {
      this.loadData(
        this.state.url,
        this.state.pageSize,
        1,
        sortName,
        sortOrder
      );
    } else {
      // 本地排序
      this.state.data.sort((newItem, oldItem) => {
        if (sortOrder === "asc") {
          return newItem[sortName] > oldItem[sortName] ? 1 : -1;
        } else {
          return newItem[sortName] < oldItem[sortName] ? 1 : -1;
        }
      });
      let visibleData = this.state.visibleData;
      // 如果有分页则重新切割
      if (this.props.pagination) {
        visibleData = this.state.data.slice(
          (this.state.pageIndex - 1) * this.state.pageSize,
          this.state.pageIndex * this.state.pageSize
        );
      } else if (this.state.data.length < config.minDataTotal) {
        // 不分页，又不用做虚拟列表
        visibleData = this.state.data;
      }

      this.setState({
        sortName: sortName,
        sortOrder: sortOrder,
        data: this.state.data,
        visibleData,
        //分页或小于配置值则不设置，其他则重新设置虚拟列表
        needVirtualHandler: this.props.pagination
          ? null
          : this.state.data?.length < config.minDataTotal
          ? null
          : true,
        // 分页则重置，因为当前页数据变了
        checkedData: this.props.pagination ? new Map() : this.state.checkedData,
        isCheckedAll: this.props.pagination ? false : this.state.isCheckedAll,
      });
    }
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
   * @param {*} columnIndex 真正的列序号
   * @param {*} headerRowIndex 表头的行号
   * @param {*} headerColumnIndex 表头的列号
   * @param {func} callBack 自定义的回调函数
   * @param {*} value 值
   * @param {*} text 文本值
   * @param {*} name 对字段名
   */
  tableCellEditHandler: function (rowIndex, callBack, value, text, name) {
    //编辑时单元格内的表单onchange的监听事件
    if (this.state.addData.has(rowIndex)) {
      //说明是属于新增的
      this.state.addData.set(this.getKey(rowIndex), this.state.data[rowIndex]);
    } else {
      //属于修改的
      this.state.updateData.set(
        this.getKey(rowIndex),
        this.state.data[rowIndex]
      );
    }
    let data = this.state.data;
    data[rowIndex][name] = value;
    this.setState({
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
