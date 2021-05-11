/**
 * Created by zhiyongwang
 * date:2016-04-05后开始独立改造
 * 单选框集合组件
 */
import React, { Component } from "react";
import Label from "../../Info/Label";
import loadDataHoc from "../loadDataHoc";
import validateHoc from "../validateHoc";
import func from "../../libs/func"
import "./radio.css"
class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            value: "",
            oldPropsValue: "",//保存初始化的值
        }
        this.setValue=this.setValue.bind(this);
        this.getValue=this.getValue.bind(this);
        this.onClear=this.onClear.bind(this);
        this.onSelect = this.onSelect.bind(this);
       
    }
    static getDerivedStateFromProps(props, state) {
        if (props.value != state.oldPropsValue) {//父组件强行更新了            
            return {
                value: props.value,
                text:func.processText(value, props.data).join(","),
                oldPropsValue: props.value
            }
        }
        return null;
    }
    setValue(value) {
        this.setState({
            value: value,
            text: func.processText(value, this.props.data).join(",")
        })
    }
    getValue() {
        return this.state.value;
    }
    onClear() {
        this.setState({
            value: "",
            text: "",
        })
        this.props.onSelect && this.props.onSelect("", "", this.props.name, {});
    }
    onSelect(value, text, name, row) {
        if (this.props.readOnly) {
            return;
        }
        //防止异步取值
        this.state.value = value;
        this.state.text = text;

        //更新
        this.setState({
            value: value,
            text: text,
        })
        this.props.onSelect && this.props.onSelect(value, text, name, row);
    } 
    render() {
        let componentClassName = "wasabi-form-group " + (this.props.className || "");//组件的基本样式 
        let control = null;
        let className = "wasabi-radio-btn " + (this.props.readOnly ? " readOnly" : "");
        if (this.props.data) {
            control = this.props.data.map((child, i) => {
                return (
                    <li key={i}>
                        <div className={className + ((this.state.value == child.value) ? " checkedRadio" : "")}
                            onClick={this.onSelect.bind(this, child.value, child.text, child)}><i>
                                {/* <input type="radio" name={this.props.name}
                                   id={this.props.name+child.value}
                                   value={child.value}
                                   onChange={this.changeHandler}>
                            </input> */}
                            </i></div>
                        <div className={"radiotext " + (this.props.readOnly ? " readOnly" : "") + ((this.state.value == child.value) ? " checkedRadio" : "")} onClick={this.onSelect.bind(this, child.value, child.text, child)}>{child.text}

                        </div>
                    </li>
                );
            })
        }
        let style = this.props.style ? JSON.parse(JSON.stringify(this.props.style)) : {};

        return (
            <div className={componentClassName + " " + this.props.validateClass} style={style}>
                <Label ref="label" readOnly={this.props.readOnly} style={this.props.labelStyle} required={this.props.required}>{this.props.label}</Label>
                <div className={"wasabi-form-group-body"} style={{ minWidth: 0, width: !this.props.label ? "100%" : null }}>
                    <ul className="wasabi-checkul radio">
                        {
                            control
                        }
                    </ul>

                </div>
            </div>

        )
    }
}

export default validateHoc(loadDataHoc(Radio, "radio"));