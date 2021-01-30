/*
 create by wangzhiyong
 date:2016-10-30
 desc:单页面应用的事件处理模型
 */

let React = require('react');
import LinkButton from "../../Buttons/LinkButton"
let PageModelMixins = {

  /**
   * 初始化一些状态值
   * @param {*} props 
   */
  initState(props) {
    let newState = {};
    newState.headers = this.initHeaders(props);
    newState.filterModel = this.initFilterModel(props);
    return newState;
  },
  /***
   * 初始化筛选栏
   */
  initFilterModel(props) {
    let filterModel = [];
    if (props.model && props.model instanceof Array) {
      for (let i = 0; i < props.model.length; i++) {
        if (props.model[i].filterAble) {
          filterModel.push({
            ...props.model[i],
            required:false,
            readOnly: false,
            disabled: false,
          })
        }
      }
    }
    return filterModel;
  },
  /**
   * 初始化表头
   */
  initHeaders: function (props) {

    let headers = [];
    if (props.model && props.model instanceof Array) {
      for (let i = 0; i < props.model.length; i++) {
        if (props.model[i].headerAble) {
          headers.push({
            name: props.model[i].name,
            label: props.model[i].label,
            content: props.model[i].headerContent || null,
            sortAble: props.model[i].sortAble,
          })
        }
      }
      headers.push({
        name: "op",
        label: "操作",
        content: (rowData, rowIndex) => {
          return <div>
            <LinkButton key="1" iconCls="icon-search" title="查看" onClick={this.detailHandler.bind(this, rowData, rowIndex)} >查看</LinkButton>
            <LinkButton key="2" iconCls="icon-edit" title="编辑" onClick={this.editHandler.bind(this, rowData, rowIndex)} >编辑</LinkButton>
            <LinkButton key="2" iconCls="icon-remove" title="删除" onClick={this.deleteHandler.bind(this, rowData, rowIndex)} >删除</LinkButton>

          </div>
        }
      })
    }
    return headers;

  },


};
export default PageModelMixins;
