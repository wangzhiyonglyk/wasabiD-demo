/**
 * Created by zhiyongwang
 * date:2016-04-05后开始独立改造
 * 单选框集合组件
 */
import React, { Component } from "react";
import Label from "../Info/Label.jsx";
import _ComboBox from "./baseClass/_ComboBox.jsx";

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {

        var componentClassName = "wasabi-form-group " + this.props.className;//组件的基本样式 
        var control = null;
        let className = "wasabi-radio-btn " + (this.props.readOnly ? " readOnly" : "");
        if (this.props.data) {
            control = this.props.data.map((child, i) => {
                return (
                    <li key={i}>
                        <div className={className + ((this.props.value == child.value) ? " checkedRadio" : "")}
                            onClick={this.props.onSelect.bind(this, child.value, child.text, child)}><i>
                                {/* <input type="radio" name={this.props.name}
                                   id={this.props.name+child.value}
                                   value={child.value}
                                   onChange={this.changeHandler}>
                            </input> */}
                            </i></div>
                        <div className={"radiotext " + (this.props.readOnly ? " readOnly" : "") + ((this.props.value == child.value) ? " checkedRadio" : "")} onClick={this.props.onSelect.bind(this, child.value, child.text, child)}>{child.text}

                        </div>
                    </li>
                );
            })
        }
        let style = this.props.style ? JSON.parse(JSON.stringify(this.props.style)) : {};

        return (
            <div className={componentClassName + this.state.validateClass} style={style}>
             <Label ref="label" readOnly={this.props.readOnly||this.props.disabled} style={this.props.labelStyle} help={this.props.help} required={this.props.required}>{this.props.label}</Label>
                <div className={"wasabi-form-group-body"} style={{ minWidth: 0, width: !this.props.label ? "100%" : null }}>
                    <ul className="wasabi-checkul">
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

export default _ComboBox(Radio);