//creete by wangzhiyong
//date:2016-08-02
//edit by wangzhiyong 2020-10-18 todo blur事件要改
//desc 将输入框从Input中独立出来
import React, { Component } from "react";
import Label from "../../Info/Label";
import Msg from "../../Info/Msg.jsx";
import FetchModel from "../../Model/FetchModel.js";
import api from "wasabi-api"
import propTypes from "../config/propTypes.js";
import defaultProps from "../config/defaultProps.js";
class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPropsValue: this.props.value,//保存用于匹配
            value: this.props.value || "",

        }
        this.onChange = this.onChange.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.focusHandler = this.focusHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.validateHandler = this.validateHandler.bind(this);
        this.validateHandlerSuccess = this.validateHandlerSuccess.bind(this);;
        this.validateHandlerError = this.validateHandlerError.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        if (props.value != state.oldPropsValue) {
            //就是说原来的初始值发生改变了，说明父组件要更新值
            return {
                value: props.value || "",
                oldPropsValue: props.value
            }
        }
        return null;
    }
    onChange(event) {
        let value = event.target.value.toString();//除去空格
        let isvalidate = true;
        if (this.props.type == "number" || this.props.type == "integer") {
            /**
        * 数字与整数要先验证，
        * 验证时，当一个字符是+,或者-是被认为是正确，不能使用正则验证,否则通不过，但失去焦点则可以使用正则
        */
            isvalidate = (value == "+" || value == "-") || this.props.validate && this.props.validate(value);
        }
        else {
            isvalidate = this.props.validate && this.props.validate(value);
        }
        this.state.value = event.target.value;
        this.setState({
            value: event.target.value,
        })
        this.props.onChange && this.props.onChange(value, value, this.props.name);//自定义的改变事件

    }
    keyDownHandler(event) {

        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }

    }
    keyUpHandler(event) {
        if (event.keyCode == 13) {
            if (this.props.validateUrl) {
                this.validateHandler(event.target.value);
            }
        }

        if (this.props.onKeyUp) {
            this.props.onKeyUp(event);
        }
    }
    focusHandler() {//焦点事件
        if (this.props.onFocus != null) {
            this.props.onFocus();
        }
    }
    blurHandler(event) {
        let isvalidate = false;
        if (this.props.validateUrl) {//后台验证
            isvalidate = this.validateHandler(event.target.value);
        }
        else {//普通验证
            isvalidate = this.validate(this.state.value);
        }
        this.props.onBlur && this.props.onBlur(event.target.value, event.target.value, event);
    }
    clickHandler(event) {//单击事件
        this.props.onClick && this.props.onClick(value, text, this.props.name, event);
    }

    getValue() {//获取值
        return this.state.value;
    }
    setValue(value) {//设置值
        this.setState({
            value: value,
        })
    }

    render() {
        let inputType = this.props.type == "password" || this.props.type == "textarea" ? this.props.type : "text";//统一使用text，否则在验证失效，没有onchange事件，拿不到值，则无法执行自定义验证事件
        let inputProps =
        {
            name:this.props.name,
            title:this.props.title,
            placeholder:this.props.placeholder,
            readOnly:this.props.readOnly,
            required:this.props.required,
            className: "wasabi-input  ",//去掉className
            rows: this.props.rows,//textarea
            style: { resize: this.props.resize ? "vertical" : null },//textarea 只能向下切换
        }//文本框的属性
        let control = null;
        if (inputType != "textarea") {//普通输入框
            control = <input type={inputType}   {...inputProps} onClick={this.clickHandler}
                onChange={this.onChange} onKeyDown={this.keyDownHandler}
                onKeyUp={this.keyUpHandler} onFocus={this.focusHandler}
                onBlur={this.blurHandler}
                value={ this.state.value||""}></input>;
        }
        else {
           
            control = <textarea  style={{ resize: "none" }} {...inputProps} onClick={this.clickHandler}
                onChange={this.onChange} onKeyDown={this.keyDownHandler}
                onKeyUp={this.keyUpHandler} onFocus={this.focusHandler}
                onBlur={this.blurHandler}
                value={ this.state.value||""}></textarea>;
        }
        return <React.Fragment>  {control} {this.props.children} </React.Fragment>
    }
}
Text.propTypes = propTypes;

Text.defaultProps = Object.assign({}, defaultProps, { type: "password" });;

export default Text;