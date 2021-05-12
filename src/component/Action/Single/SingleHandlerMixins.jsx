/*
create by wangzhiyong
date:2016-10-30
desc:单页面应用的事件处理模型
 * edit 2021-01-15
 */

import Msg from "../../Info/Msg.jsx";
import unit from "../../libs/func.js"
import FetchModel from '../../Model/FetchModel.js';
let SingleHandlerMixins = {
  /**
   * 自定义按钮组事件
   * @param {*} name 
   */
  btnHandler(name) {
    this.props.btnHandler && this.props.btnHandler(name);
  },

  /**
 * 筛选查询
 * @param {*} params 
 */
  filterHandler: function (params) {
    params = { ...this.state.params, ...params };
    this.datagrid.current.reload(params);
  },
  /**
   * 滑动面板的提交事件
   */
  panelSubmitHandler() {

    if (this.state.opType == "edit") {
      if (this.form.current.validate()) {
        this.updateHandler(this.form.current.getData());
      }

    }
    else if (this.state.opType == "add") {
      if (this.form.current.validate()) {
        this.addHandler(this.form.current.getData());
      }
    }
  },


  /**
   * 以下是增删改的事件
   */


  /**
  * 打开新增面板
  */
  addOpen: function () {

    this.slide.current.open(this.props.title + "-新增");
    this.state.opType != "add" ? this.form.current.clearData() : void (0);
    this.form.current.setDisabled(false);
    this.setState({
      opType: 'add',
      submitButton: [
        {
            name: "wasabi-save",
            title: "提交",
            size:"small",
            iconCls: "icon-save"
        }
    ],
    });
  },
  /**
   * 新增事件
   * @param {*} model 
   */
  addHandler: function (model) {
    //新增事件
    if (this.props.addUrl) {
      let fetchModel = new FetchModel(
        this.props.addUrl,
        this.opSuccess,
        model,
        this.fetchErrorHandler
      );
      unit.fetch.post(fetchModel);
    }
    else {
      Msg.error("您没有设置新增接口");
    }


  },

  /**
   * 打开编辑
   * @param {*} rowData 
   * @param {*} rowIndex 
   */
  openEdit(rowData, rowIndex) {
    this.slide.current.open(this.props.title + "-编辑");
    this.form.current.setData(rowData);
    this.form.current.setDisabled(false);
    this.setState({
      opType: 'edit',
      submitButton: [
        {
            name: "wasabi-save",
            title: "提交",
            size:"small",
            iconCls: "icon-save"
        }
    ],
    });
  },

  /**
   * 更新处理
   * @param {*} model 
   */
  updateHandler(model) {

    if (this.props.updateUrl) {
      let fetchModel = new FetchModel(
        this.props.updateUrl,
        this.opSuccess,
        model,
        this.fetchErrorHandler
      );
      unit.fetch.post(fetchModel);
    }
    else {
      Msg.error("您没有设置更新接口");
    }
  },

  /**
   * 操作成功
   * @param {*} result 
   */
  opSuccess: function (result) {
    if (result.statusCode == 200) {
      this.slide.current.close();
      this.datagrid.current.reload(); //刷新列表
      this.form.current.clearData();
    }

  },
  /**
    * 删除事件
    * @param {*} rowData 
    * @param {*} rowIndex 
    */
  deleteHandler: function (rowData, rowIndex) {
    //删除事件
    Msg.confirm('确定删除这条记录吗?', () => {
      if (this.props.deleteUrl) {
        let params={};
        params[this.props.key]=rowData[this.props.key];
        let fetchModel = new FetchModel(
          this.props.deleteUrl,
          this.opSuccess,
          params,
          this.fetchErrorHandler
        );
        unit.fetch.get(fetchModel);
      }
      else{
        Msg.error("您没有设置删除接口");
      }

    });
  },
  deleteSuccess: function (result) {
    //删除成功
    this.datagrid.current.reload(); //刷新列表
  },

  /**
   * 查看详情
   * @param {*} rowData 
   * @param {*} rowIndex 
   */
  openDetail(rowData, rowIndex) {
    this.slide.current.open(this.props.title + "-详情");
    this.form.current.setData(rowData);
    this.form.current.setDisabled(true);
    this.setState({
      opType: 'read',
      submitButton: [
        
    ],
    });
  },



  fetchErrorHandler: function (errorCode, errorMssage) {
    //统一错误处理
    console.log(errorCode, errorMssage);
    Msg.error('操作失败，原因' + errorMssage);
  }
};

export default SingleHandlerMixins;