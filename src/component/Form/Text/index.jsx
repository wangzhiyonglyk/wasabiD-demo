//creete by wangzhiyong
//date:2016-08-02
//edit by wangzhiyong 2020-10-18 todo blur事件要改
//desc 将输入框从Input中独立出来
import React, { Component } from "react";
import propTypes from "../../propsConfig/propTypes.js";
import defaultProps from "../../propsConfig/defaultProps.js";
import SelectbleList from "../Select/SelectbleList"
//hoc
import loadDataHoc from "../../loadDataHoc";
import validateHoc from "../validateHoc"
import dom from "../../libs/dom"
import "../Select/select.css"
class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
            oldPropsValue: "",//保存用于匹配
            value: this.props.value || "",
            show:false,
        }
        this.onChange = this.onChange.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.focusHandler = this.focusHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.search = this.search.bind(this);
        this.hidePicker=this.hidePicker.bind(this)

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
    
      /**
     * 隐藏下拉框
     * @param {*} event 
     */
       hidePicker(event) {
           console.log("even")
        if (event.target&&!dom.isDescendant(document.getElementById(this.props.containerid), event.target)) {
            this.setState({
                show: false
            });

            try {

                document.removeEventListener("click", this.hidePicker,fal);
             
            }
            catch (e) {

            }
        }
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

        if ((this.props.type == "number" || this.props.type == "integer")) {
            if (isvalidate) {
                this.state.value = event.target.value;
                this.setState({
                    value: event.target.value,
                })
                this.props.onChange && this.props.onChange(value, value, this.props.name);//自定义的改变事件   
            }

        }
        else {
            this.state.value = event.target.value;
            this.setState({
                value: event.target.value,
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
        if (event.keyCode === 13) {
            this.search();
        }
        if (this.props.onKeyUp) {
            this.props.onKeyUp(event);
        }
    }
    search() {
        if (this.props.url) {
            let params = {};
            params[this.props.priKey || this.props.name] = this.state.value;
            this.props.reload && this.props.reload(params)
            this.setState({
                show:true
            })
        }
        else{
            this.props.onSearch&&this.props.onSearch(this.state.value);
        }

    }
    focusHandler() {//焦点事件
        if (this.props.onFocus != null) {
            this.props.onFocus();
        }
    }
    blurHandler(event) {
        this.props.validate && this.props.validate(this.state.value);
        this.props.onBlur && this.props.onBlur(event.target.value, event.target.value, event);
    }
    clickHandler(event) {//单击事件
        this.props.onClick && this.props.onClick(event.target.value, event.target.value, event);
    }

    getValue() {//获取值
        return this.state.value;
    }
    setValue(value) {//设置值
        this.setState({
            value: value,
            show:false,
        })
        this.props.validate && this.props.validate(value);
    }
    onSelect(value, text) {
        this.setValue(value)
        this.props.onChange && this.props.onChange(value, value, this.props.name);
    }

    render() {
        let inputType = this.props.type == "password" || this.props.type == "textarea" ? this.props.type : "text";//统一使用text，否则在验证失效，没有onchange事件，拿不到值，则无法执行自定义验证事件
        let inputProps =
        {
            name: this.props.name,
            title: this.props.title,
            placeholder: this.props.placeholder,
            readOnly: this.props.readOnly,
            required: this.props.required,
            className: "wasabi-input  ",//去掉className
            rows: this.props.rows,//textarea
            style: { resize: this.props.resize ? "vertical" : "none", height: this.props.type == "textarea" ? "100%" : null },//textarea 只能向下切换
        }//文本框的属性
        let control = null;
        if (inputType != "textarea") {//普通输入框
            control = <input type={inputType}   {...inputProps} onClick={this.clickHandler}
                onChange={this.onChange} onKeyDown={this.keyDownHandler}
                onKeyUp={this.keyUpHandler} onFocus={this.focusHandler}
                onBlur={this.blurHandler}
                value={this.state.value || ""} autoComplete="off"></input>;
        }
        else {

            control = <textarea  {...inputProps} onClick={this.clickHandler}
                onChange={this.onChange} onKeyDown={this.keyDownHandler}
                onKeyUp={this.keyUpHandler} onFocus={this.focusHandler}
                onBlur={this.blurHandler}
                value={this.state.value || ""} autoComplete="off"></textarea>;
        }
        return <React.Fragment>  {control}
            {this.props.url ||this.props.onSearch? <i className=" icon-search" onClick={this.search} style={{ cursor:"pointer", position: "absolute", right: 10, top: 15, color: "var(--primary-color" }} onClick={this.onSearch}></i> : null}
            {this.props.children}
            <div className="wasabi-select">  <SelectbleList
                show={this.state.show}
                value={this.state.value}
                data={this.props.data}
                onSelect={this.onSelect.bind(this)}

            ></SelectbleList> </div>
        </React.Fragment>
    }
}
Text.propTypes = propTypes;

Text.defaultProps = Object.assign({}, defaultProps, { type: "password" });;

export default validateHoc(loadDataHoc(Text, "text"));