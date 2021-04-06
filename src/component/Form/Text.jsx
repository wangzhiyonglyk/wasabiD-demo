//creete by wangzhiyong
//date:2016-08-02
//edit by wangzhiyong 2020-10-18 todo blur事件要改
//desc 将输入框从Input中独立出来
import React, { Component } from "react";
import PropTypes from "prop-types";
import validation from "../Lang/validation.js";
import validate from "../Mixins/validate.js";
import Label from "../Info/Label.jsx";
import Msg from "../Info/Msg.jsx";
import FetchModel from "../Model/FetchModel.js";
import func from "../libs/func.js";
import props from "./config/propType.js";
import mixins from '../Mixins/mixins';
import config from "./config/textConfig.js";
import defaultProps from "./config/defaultProps.js";
import("../Sass/Form/Input.css");

class Text extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldPropsValue: this.props.value,//保存用于匹配
            value: this.props.value,
            text: this.props.text,
            validateClass: "",//验证的样式
            inValidateShow: "none",//提示信息是否显示
            inValidateText: validation["required"],//提示信息
            validateState: null,//是否正在验证
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
                value: props.value,
                oldPropsValue: props.value
            }
        }
        return null;
    }
    onChange(event) {
        let value = event.target.value.toString().trim();//除去空格
        let isvalidate = true;
        if (this.props.type == "number" || this.props.type == "integer") {
            /**
        * 数字与整数要先验证，
        * 验证时，当一个字符是+,或者-是被认为是正确，不能使用正则验证,否则通不过，但失去焦点则可以使用正则
        */
            isvalidate = (value == "+" || value == "-") || this.validate(value);
        }
        else {
            isvalidate = this.validate(value);
        }

        if (isvalidate) {
            this.state.value = event.target.value.trim();
            this.state.text = event.target.value.trim();
            this.setState({
                value: event.target.value.trim(),
                text: event.target.value.trim(),
            })
            this.props.onChange && this.props.onChange(value, value, this.props.name);//自定义的改变事件
        }
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
        // if(!isvalidate){
        //     this.refs.input.focus();
        //     this.refs.input.select();
        // }
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
    validateHandler(value) {//后台请求验证
        this.setState({
            validateState: "validing",//正在验证
        })
        let type = this.props.httpType ? this.props.httpType : "POST";
        type = type.toUpperCase();
        let fetchmodel = new FetchModel(this.props.validateUrl, this.validateHandlerSuccess, { key: value });
        fetchmodel.headers = this.props.httpHeaders;
        if (this.props.contentType) {
            //如果传contentType值则采用传入的械
            //否则默认

            fetchmodel.contentType = this.props.contentType;
            fetchmodel.data = fetchmodel.contentType == "application/json" ? JSON.stringify(fetchmodel.data) : fetchmodel.data;
        }
        type == "POST" ? func.fetch.post(fetchmodel) : func.fetch.get(fetchmodel);

        console.log("text-validing:", fetchmodel);

    }
    validateHandlerSuccess() {//后台请求验证成功
        this.setState({
            validateState: "valid",//验证成功
        })
    }
    validateHandlerError(message) {//后台请求验证失败
        Msg.error(message);
        this.setState({
            validateState: "invalid",//验证失败
        })
    }

    render() {
        let componentClassName = "wasabi-form-group " + (this.props.className || "") + " ";//组件的基本样式
        let style = this.props.style ? JSON.parse(JSON.stringify(this.props.style)) : {};
        if (this.props.hide) {
            style.display = "none";
        } else {
            style.display = "flex";
        }
        let inputType = this.props.type == "password" || this.props.type == "textarea" ? this.props.type : "text";//统一使用text，否则在验证失效，没有onchange事件，拿不到值，则无法执行自定义验证事件
        let inputProps =
        {
            readOnly: this.props.readOnly == true ? "readOnly" : null,
            id: this.props.id ? this.props.id : null,
            name: this.props.name,
            placeholder: (this.props.placeholder === "" || this.props.placeholder == null) ? this.props.required ? "必填项" : "" : this.props.placeholder,
            className: "wasabi-form-control  ",
            rows: this.props.rows,//textarea
            cols: this.props.cols,
            style: { resize: this.props.resize ? "vertical" : null },//只能向下切换
            title: this.props.title,

        }//文本框的属性
        let control = null;
        if (inputType != "textarea") {//普通输入框
            control = <input ref="input" type={inputType}   {...inputProps} onClick={this.clickHandler}
                onChange={this.onChange} onKeyDown={this.keyDownHandler}
                onKeyUp={this.keyUpHandler} onFocus={this.focusHandler}
                onBlur={this.blurHandler}
                value={(this.state.value == null || this.state.value == undefined) ? "" : this.state.value}></input>;
        }
        else {
            //textarea 不支持null值
            let value = this.state.value;
            if (value == null || value == undefined) {
                value = "";
            }
            control = <textarea ref="input" style={{ resize: "none" }} {...inputProps} onClick={this.clickHandler}
                onChange={this.onChange} onKeyDown={this.keyDownHandler}
                onKeyUp={this.keyUpHandler} onFocus={this.focusHandler}
                onBlur={this.blurHandler}
                value={(this.state.value == null || this.state.value == undefined) ? "" : this.state.value}></textarea>;
        }
        return (<div className={componentClassName + " " + this.state.validateClass} onPaste={this.onPaste} style={style}>
            <Label ref="label" readOnly={this.props.readOnly || this.props.disabled} style={this.props.labelStyle} help={this.props.help} required={this.props.required}>{this.props.label}</Label>
            <div className={"wasabi-form-group-body "} >
                {control}
                {this.props.children}
                <i className={this.state.validateState} style={{ display: (this.state.validateState ? "block" : "none") }} ></i>
                <small className={"wasabi-help-block "} style={{ display: (this.state.inValidateText && this.state.inValidateText != "") ? this.state.inValidateShow : "none" }}>
                    {this.state.inValidateText}</small>
            </div>
        </div>
        )
    }
}

Text.propTypes = Object.assign({ type: PropTypes.oneOf(config) }, props);

Text.defaultProps = Object.assign({}, defaultProps, { type: "text" });;
Text = mixins(Text, [validate])
export default Text;