/**
 * Created by jiaxuanliang
 * date:2016-04-05后开始独立改造
 * edit by wangzhiyong
 * date:2016-04-26
 * desc:重命名为SwitchButton 并将完善
 */

import React, { Component } from "react";
import Label from "../Info/Label.jsx";
import propType from "./config/propType.js";
import defaultProps from "./config/defaultProps.js";

import '../Sass/Form/SwitchButton.css';
class SwitchButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPropsValue: this.props.value,
            checked: this.props.value ? 1 : 0,//用于回传给表单组件
        }
        this.handleClick = this.handleClick.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.value!=prevState.oldPropsValue){
            return {
                checked:nextProps.value?1:0
            }
        }
        return null;
    }
    validate() {
        return true;
    }
    getValue() {//获取值
        return this.state.checked ? 1 : 0;
    }
    setValue(value) {//设置值
        //防止异步取值
        this.state.value=value;
        this.setState({
            value: value,
            checked: this.props.value ? 1 : 0
        })
    }
    handleClick() {
        if (this.props.readOnly) {
            return;
        }
        this.setState({
            checked: !this.state.checked
        });

        if (this.props.onSelect != null) {//返回给comboBox组件
            this.props.onSelect(!this.state.checked,this.state.checked, this.props.name);
        }

    }
    render() {      
        let componentClassName = "wasabi-form-group "+(this.props.className||"");//组件的基本样式 
        let className = "syncbtn " ;
        if (this.state.checked) {
            className += "checktrue";
        } else {
            className += "checkfalse";
        }
        if (this.props.readOnly) {
            className += " disabled";
        }
        let style = this.props.style ? JSON.parse(JSON.stringify(this.props.style)) : {};
        if (this.props.hide) {
            style.display = "none";
        } else {
            style.display = "flex";
        }
        return (
            <div className={componentClassName + " "+this.props.validateClass} style={style}>
                <Label ref="label" readOnly={this.props.readOnly||this.props.disabled} style={this.props.labelStyle} help={this.props.help} required={this.props.required}>{this.props.label}</Label>
                <div className={"wasabi-form-group-body"} style={{ width: !this.props.label ? "100%" : null }}>
                    <div style={this.props.style} className={className} onClick={this.handleClick}>
                        <div className={"slideblock "}></div>
                    </div>
                    <small className={"wasabi-help-block "} style={{ display: (this.state.inValidateText && this.state.inValidateText != "") ? 
                    this.state.inValidateShow : "none" }}>
                        {this.state.inValidateText}
                    </small>
                </div>
            </div>

        )
    }
}

SwitchButton.propTypes = propType;
SwitchButton.defaultProp = Object.assign(defaultProps, { type: "switch" });
export default SwitchButton;