/**
 * Created by zhiyongwang on 2020-11-06
 * 添加类型按钮的筛选框
 * 
 */

import React, { Component } from "react";

import Label from "../Info/Label.jsx";

import _CheckBox from "./baseClass/_CheckBox.jsx";

class CheckButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        if (!props) {
            return null;
        }
        let componentClassName = "wasabi-form-group "+(this.props.className||"");//组件的基本样式 
        let control = null;

        if (this.props.data instanceof Array) {
    
            control = this.props.data.map((child, i) => {
                let checked = false;
                if ((this.props.value != null && this.props.value != undefined) && (("," + this.props.value.toString()).indexOf("," + child[this.props.valueField ? this.props.valueField : "value"]) > -1)) {
                    checked = true;
                }
                return <Button className={child.className} style={child.style} theme={checked ? this.props.theme|| "primary" : "default"} key={i}
                     onClick={ this.props.readOnly?()=>{}:this.props.onSelect.bind(this, child.value, child.text, child)}
                >{child.text}</Button>
            });

        }
        let style = this.props.style ? JSON.parse(JSON.stringify(this.props.style)) : {};
        if (this.props.hide) {
            style.display = "none";
        } else {
            style.display = "flex";
        }
        return (

            <div className={componentClassName + this.props.validateClass} style={style}>
                <Label ref="label" readOnly={this.props.readOnly||this.props.disabled} style={this.props.labelStyle} help={this.props.help} required={this.props.required}>{this.props.label}</Label>
                <div className={"wasabi-form-group-body"} style={{ minWidth: 0, width: !this.props.label ? "100%" : null }}>
                    <ul className="wasabi-checkul" style={{ marginTop: 6 }}>
                        {
                            control
                        }
                    </ul>
                    <small className={"wasabi-help-block "} style={{ display: (this.props.inValidateText && this.props.inValidateText != "") ?
                     this.props.inValidateShow : "none" }}>{this.props.inValidateText}</small>
                </div>
            </div>

        )
    }
}

export default _CheckBox(CheckButton)
