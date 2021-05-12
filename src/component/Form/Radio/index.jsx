/**
 * Created by zhiyongwang
 * date:2016-04-05后开始独立改造
 * 单选框集合组件
 */
import React, { Component } from "react";
import loadDataHoc from "../../loadDataHoc";
import validateHoc from "../validateHoc";
import propsTran from "../../libs/propsTran"
import "./radio.css"
class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            value: "",
            oldPropsValue: "",//保存初始化的值
        }
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onSelect = this.onSelect.bind(this);

    }
    static getDerivedStateFromProps(props, state) {
        if (props.value != state.oldPropsValue) {//父组件强行更新了            
            return {
                value: props.value || "",
                text: propsTran.processText(props.value, props.data).join(","),
                oldPropsValue: props.value
            }
        }
        return null;
    }
    setValue(value) {
        this.setState({
            value: value,
            text: propsTran.processText(value, this.props.data).join(",")
        })
        this.props.validate&&this.props.validate(value);
    }
    getValue() {
        return this.state.value;
    }
    onClear() {
        this.setState({
            value: "",
            text: "",
        })
        this.props.validate&&this.props.validate("");
        this.props.onSelect && this.props.onSelect("", "", this.props.name, {});
    }
    onSelect(value, text, name, row) {
        console.log("value")
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
        this.props.validate&&this.props.validate(value);
        this.props.onSelect && this.props.onSelect(value, text, name, row);
    }
    render() {
        let control = null;
        if (this.props.data && this.props.data instanceof Array) {
            let className = "wasabi-radio-btn " + (this.props.readOnly ? " readOnly" : "");
            control = this.props.data.map((child, i) => {
                return (
                    <li key={i}>
                        <div className={className + ((this.state.value == child.value) ? " checkedRadio" : "")}
                            onClick={this.onSelect.bind(this, child.value, child.text, child)}><i></i></div>
                        <div className={"radiotext " + (this.props.readOnly ? " readOnly" : "") + ((this.state.value == child.value) ? " checkedRadio" : "")} onClick={this.onSelect.bind(this, child.value, child.text, child)}>{child.text}
                        </div>
                    </li>
                );
            })
        }
        return <ul className="wasabi-checkul radio"> {control} {this.props.children}</ul>
    }
}

export default validateHoc(loadDataHoc(Radio, "radio"));