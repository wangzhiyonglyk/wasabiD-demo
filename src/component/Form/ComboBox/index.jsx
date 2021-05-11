/**
 * Created by zhiyongwang on 2016-04-26
 * desc:下拉框容器
 *
 */
 import React, { Component } from "react";
 import DatePicker from "../DatePicker";
 import Picker from "../Picker";
 import Select from "../Select";
 import TreePicker from "../TreePicker";
 import propTypes from "../config/propTypes.js";
 import defaultProps from "../config/defaultProps.js";
 import("./combobox.css");
 class ComboBox extends Component {
     constructor(props) {
         super(props);
         this.state = {
 
         }
     }
     validate() {//用于Form调用验证
         return this.refs.combobox.validate();
     }
     getValue() {//用于调用获取值
         return this.refs.combobox.getValue();
     }
     setValue(value) {//用于调用设置值
         this.refs.combobox.setValue(value);
     }
     /**
     * 重新查询数据
     * @param {*} params 
     * @param {*} url 
     */
     reload(params, url) {
         this.refs.combobox.reload && this.refs.combobox.reload(params, url);
     }
 
     changeHandler(event) {
     }
     renderSelect() {//普通下拉框        
         return <Select ref="combobox" {...this.props}  ></Select>
     }
     renderPicker() {//下拉面板
         return <Picker ref="combobox"{...this.props}></Picker>
     }
     renderDatePicker() {
         return <DatePicker ref="combobox" {...this.props}></DatePicker>
     }
     renderTreePicker() {
         return <TreePicker ref="combobox" {...this.props}></TreePicker>;
     }
 
     render() {
 
         let control = null;
         switch (this.props.type) {
             case "select":
                 control = this.renderSelect();
                 break;
             case "picker":
                 control = this.renderPicker();
                 break;
             case "gridpicker":
                 control = this.renderGridPicker();
                 break;
             case "treepicker":
                 control = this.renderTreePicker();
                 break;
             case "date":
                 control = this.renderDatePicker();
                 break;
             case "timerange":
                 control = this.renderDatePicker();
                 break;
             case "time":
                 control = this.renderDatePicker();
                 break;
             case "datetime":
                 control = this.renderDatePicker();
 
                 break;
             case "daterange":
                 control = this.renderDatePicker();
                 break;
             case "datetimerange":
                 control = this.renderDatePicker();
                 break;
             case "panelpicker":
                 control = this.renderPanelPicker();
                 break;
         }
         return control;
     }
 }
 
 ComboBox.propTypes =propTypes;
 ComboBox.defaultProps =  Object.assign({}, defaultProps, { type: "select" });;
 export default ComboBox;