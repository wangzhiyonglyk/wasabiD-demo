/**
 * Created by jiaxuanliang
 * date:2016-04-05后开始独立改造
 * edit by wangzy
 * date:2016-04-26
 * desc:重命名为SwitchButton 并将完善
 */

import React, { Component } from "react";
import  Label from "../Info/Label.jsx";
import propType from "./config/propType.js";
import defaultProps from "./config/defaultProps.js";

import '../Sass/Form/SwitchButton.css';
class  SwitchButton extends Component{
  constructor(props)
  {
      super(props);
      this.state={
      
        value:this.props.value===""?0:this.props.value,//用于回传给表单组件
        text:this.props.value===""?"false":"true",
       
      }
  }

    validate()
    {
      return true;
    }
      getValue () {//获取值
        return this.state.value;
    }
    setValue(value){//设置值
        this.setState({
            value:value,
        })
    }
    handleClick(){
        if(this.props.readOnly)
        {
            return ;
        }
        this.setState({
            value:this.state.value==1?0:1,
            text:this.state.value==1?"false":"true",
        });

        if(this.props.onSelect!=null)
        {//返回给comboBox组件
            this.props.onSelect(this.state.value==1?0:1,this.state.value==1?"false":"true",this.props.name);
        }

    }
    render(){
        var inputType="text";
        if(this.props.type=="password") {
            inputType = "password";
        }
        var componentClassName=  "wasabi-form-group ";//组件的基本样式
       
        var className = "syncbtn "+this.props.className;
        if(this.state.value==1){
            className+="checktrue";
        }else{
            className += "checkfalse";
        }

        if(this.props.readOnly)
        {
            className+=" disabled";
        }
        let style=this.props.style?JSON.parse(JSON.stringify(this.props.style)):{};
        if(this.props.hide){
            style.display="none";
        }else{
            style.display="flex";
        }

        return (
        <div className={componentClassName+this.state.validateClass}  style={style}>
            <Label name={this.props.label} readOnly={this.props.readOnly||this.props.disabled} ref="label" style={this.props.labelStyle} hide={this.props.hide} required={this.props.required}></Label>
            <div className={ "wasabi-form-group-body"} style={{width:!this.props.label?"100%":null}}>
                <div style={this.props.style} className={className} onClick={this.handleClick}>
                    <div className={"slideblock "}></div>
                </div>
                <small className={"wasabi-help-block "} style={{display:(this.state.inValidateText&&this.state.inValidateText!="")?this.state.inValidateShow:"none"}}><div className="text">{this.state.inValidateText}</div></small>
            </div>
        </div>

        )
    }
}

SwitchButton. propTypes=propType;
SwitchButton.defaultProp=Object.assign(defaultProps,{type:"switch"});
export default SwitchButton;