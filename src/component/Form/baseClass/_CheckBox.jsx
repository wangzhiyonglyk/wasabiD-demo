/**
 * Created by zhiyongwang on 2020-11-08
 * 将复选框与复选按钮抽离公共组件
 * 复选框集合组件
 */
import React, { Component } from "react";
import validation from "../../Lang/validation.js";
import propType from "../config/propType.js";
import defaultProps from "../config/defaultProps.js";

import _ComboBox from "./_ComboBox.jsx";

export default function(WrappedComponent){

    class _CheckBox extends Component {
        constructor(props) {
            super(props);
            this.state = {
                text: this.props.text,
                value: this.props.value,
                oldPropsValue:this.props.value,//保存初始化的值
                validateClass: "",//验证的样式
                inValidateShow: "none",//提示信息是否显示
                inValidateText: validation["required"],//提示信息
            }
            this.onSelect = this.onSelect.bind(this);
        }
        static getDerivedStateFromProps(nextProps, prevState) {
            if (nextProps.value != prevState.oldPropsValue) {//父组件强行更新了            
                return {
                    value: nextProps.value,
                    text: nextProps.text,
                    oldPropsValue:nextProps.value
                }
            }
            return null;
        }
    
        onSelect(value, text, row ) {//选中事件
            let newvalue = ""; let newtext = "";
            if(this.props.type=="radio"){
                newvalue=value;
                newtext=text;
            }   
            else{
                if (this.props.readOnly) {
                    return;
                }            
                let oldvalue = "";
                let oldtext = "";
                if (!this.state.value) {//没有选择任何项
                }
                else {
                    oldvalue = this.state.value.toString();
                }
                if (!this.state.text) {//没有选择任何项
                }
                else {
                    oldtext = this.state.text.toString();
                }
                if (("," + oldvalue).indexOf("," + value) > -1) {
                    //取消选中
                    if (oldvalue.indexOf("," + value) > -1) {//说明不是第一个
                        newvalue = (oldvalue).replace("," + value, "");
                        newtext = (oldtext).replace("," + text, "");
                    }
                    else if (oldvalue.indexOf(value + ",") > -1) {//第一个
                        newvalue = (oldvalue).replace(value + ",", "");
                        newtext = (oldtext).replace(text + ",", "");
                    }
                    else if (oldvalue.indexOf(value) > -1) {//只有一个
                        newvalue = (oldvalue).replace(value, "");
                        newtext = (oldtext).replace(text, "");
                    }
        
                }
                else {//选中
        
                    newvalue = oldvalue === "" ? value : oldvalue + "," + value;
                    newtext = oldvalue === "" ? text : oldtext + "," + text;
                }
            }          
            this.props.onSelect&& this.props.onSelect(newvalue, newtext, this.props.name, row);
           
        }
        render() {
            return <WrappedComponent {...this.props} {...this.state} onSelect={this.onSelect}></WrappedComponent>
        }
    
    }
    _CheckBox.propTypes = propType;  
    _CheckBox.defaultProps = Object.assign({}, defaultProps, { type: "checkbox" });   
    return _ComboBox (_CheckBox);;
}

