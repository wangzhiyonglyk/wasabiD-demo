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
        static getDerivedStateFromProps(props, state) {
            if (props.value != state.oldPropsValue) {//父组件强行更新了            
                return {
                    value: props.value,
                    text: props.text,
                    oldPropsValue:props.value
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
                let oldvalue = this.state.value||""
                let oldtext = this.state.text||"";
              
                if (("," + oldvalue+",").indexOf("," + value+",") > -1) {//取消选中
                    oldvalue = this.state.value.toString().split(',');
                    oldtext = this.state.text.toString().split(',');
                    oldvalue.splice(oldvalue.indexOf(value.toString()), 1);
                    oldtext.splice(oldvalue.indexOf(value.toString()), 1);
                    newvalue = oldvalue.join(',');
                    newtext = oldtext.join(',');
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

