/**
 * create by wangzhiyonglyk
 * date:2020-12-20
 * desc 给父组件加的
 */

import func from "../../../libs/func/index.js";
import excel from "../../../libs/excel";
export default {
  /**
   * 获取当行的key
   * @param {*} rowIndex 行号
   */
  getKey: function (rowIndex, rowData = null) {
    let key;
    try {
      rowData = rowData
        ? rowData
        : this.state.data && this.state.data[rowIndex];

      if (rowIndex === null && rowIndex === undefined) {
        console.log(new Error("rowIndex 值传错"));
      } else {
        key =
          rowData[this.props.priKey || "id"] ??
        rowIndex.toString();
      }
    } catch (e) {
      rowIndex.toString();
    }

    return key + "";
  },

  /**
   * 设置焦点行
   * @param {*} key
   */
  setFocus(key) {
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i][this.props.priKey || "id"] === key) {
        this.setState({
          focusIndex: i,
        });
        break;
      }
    }
  },

  /**
   *获取焦点行下标
   */
  getFocusIndex: function () {
    //只读函数,用于父组件获取数据

    return this.state.focusIndex;
  },
  /**
   * 获取焦点行数据
   */
  getFocusRowData() {
    this.getRowData();
  },
  /**
   * 获取指定行数据
   * @param {*} index
   */
  getRowData: function (index) {
    return (
      this.state.data && this.state.data[index || this.state.focusIndex || 0]
    );
  },
  /**
   * 获取勾选的数据
   */
  getChecked: function () {
    //获取选中的行数据
    var data = [];
    for (let value of this.state.checkedData.values()) {
      data.push(value);
    }
    return data;
  },
  /**
   * 获取数据
   * @returns 
   */
  getData: function () {
    return this.state.data;
  },
  /**
   * 获取表头
   * @returns 
   */
  getHeaders: function () {
    return this.state.headers;
  },
  /**
   * 设置勾选的值
   * @param {*} key
   * @param {*} checked
   */
  setChecked: function (key, checked) {
    let rowIndex;
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i][this.props.priKey || "id"] == key) {
        rowIndex = i;
        break;
      }
    }
    if (checked) {
      this.onChecked(rowIndex, key); //勾选，
    } else {
      this.onChecked(rowIndex, null); //取消勾选
    }
  },

  /**
   * 清除勾选
   */
  clearChecked: function () {
    this.onCheckedAll("no");
  },
  /**
   * 添加一行
   * @param {*} rowData 数据
   * @param {*} editAble 添加后是否处理可编辑状态
   */
  addRow: function (rowData = null, editAble = false) {
    //
    let newData = this.state.data;
    newData.push(rowData || {});
    let addData = this.state.addData || [];
    this.state.addData.set(this.getKey(newData.length - 1), rowData); //添加到脏数据里
    this.setState(
      {
        data: newData,
        total: this.state.total + 1,
        addData: addData,
        editAble: editAble || this.state.editAble,
        editIndex: editAble
          ? (newData.length - 1).toString() + "-0"
          : this.state.editIndex,
      },
      () => {
        this.focusCell(this.state.data.length - 1, 0);
      }
    );
  },
  /**
   * 删除某一行
   * @param {*} rowIndex
   */
  deleteRow: function (rowIndex) {
    //删除指定行数据
    //todo这里没处理当前页全部删除的情况
    let deleteData = this.state.deleteData || [];
    deleteData.push(data.splice(rowIndex, 1));
    let checkedData = this.state.checkedData;
    checkedData.delete(this.getKey(rowIndex));
    this.setState({
      data: data,
      total: this.state.total - 1,
      deleteData: deleteData,
      checkedData,
      isCheckedAll: this.checkCurrentPageCheckedAll(checkedData),
    });
  },
  /**
   *  更新某一行数据
   * @param {*} rowIndex 行号
   * @param {*} rowData 数据
   * @param {*} editAble 是否可编辑
   */
  updateRow: function (rowIndex, rowData, editAble = false) {
    if (rowData && typeof rowData === "object") {
      this.state.updateData.set(this.getKey(rowIndex), rowData); //更新某一行
      if (rowIndex >= 0 && rowIndex < this.state.data.length) {
        let newData = this.state.newData;
        if (rowData && typeof rowData === "object") {
          //如果有值，则取新值
          newData[rowIndex] = rowData;
        }
        this.setState(
          {
            data: newData,
            updateData: this.state.updateData,
            editAble: editAble || this.state.editAble,
            editIndex: editAble ? rowIndex + "-0" : this.state.editIndex,
          },
          () => {
            this.focusCell(rowIndex, 0);
          }
        );
      }
    }
  },

  /**
   * 获取新增的数据
   * @returns
   */
  getAddData: function () {
    //获取新增数据
    let addData = [];
    for (let value of this.state.addData.values()) {
      addData.push(value);
    }
    return addData;
  },
  /**
   * 获取更新的数据
   * @returns
   */
  getUpdateData: function () {
    this.setState({
      editIndex: null, //
    });
    let updateData = [];
    for (let value of this.state.updateData.values()) {
      updateData.push(value);
    }
    return updateData;
  },
  /**
   * 获取删除的数据
   * @returns
   */
  getDeleteData: function () {
    //获取被删除的数据
    return this.state.deleteData;
  },

  /**
   * 清除脏数据
   */
  clearDirtyData: function () {
    //
    this.setState({
      addData: new Map(),
      updateData: new Map(),
      deleteData: [],
    });
  },

  /**
   * 清空数据
   */
  clearData: function () {
    //清空数据
    this.setState({
      rawData: [],
      visibleData: [],
      data: [],
      params: [],
      pageIndex: 1,
    });
  },

  /**
   * 设置数据
   * @param {*} data
   */
  setData: function (data) {
    this.setState(
      {
        loading: true,
        rawData: data,
        pageIndex: 1, // 回到第一页
      },
      () => {
        this.loadData();
      }
    );
  },
  /**
   * 更新方法
   * @param {*} params
   * @param {*} url
   */
  reload: function (params = null, url = "") {
    //重新查询数据,
    url = url || this.state.url; //得到旧的url
    if (url) {
      params = params === undefined ? this.state.params : params; //如果不传则用旧的
      //查询条件发生改变，查询第一页
      let pageIndex = func.diff(params, this.state.params)
        ? 1
        : this.state.pageIndex;
      this.loadData(
        url,
        this.state.pageSize,
        pageIndex,
        this.state.sortName,
        this.state.sortOrder,
        params
      );
    }
  },

  /**
   * 导出

   * @param {*} title 导出标题
   */
  export(title) {
    title =
      title ||
      this.props.title ||
      "grid-" + func.dateformat(new Date(), "yyyy-MM-dd");

    excel.tableExportExcel(this.state.realTableId, title);
  },
};
