//create by wangzhiyong
//date:2016-04-05后开始独立改造
//edit date:2020-04-05
//desc:表单组件
import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "../Buttons/Button.jsx";
import { func } from "../index.js";
if (React.version <= "17.0.0") {
    console.warn("请将react升级到了17+版本");
}
import("../Sass/Form/Form.css");
class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled:this.props.disabled,
            rawDisabled:this.props.disabled
        }
        this.validate = this.validate.bind(this);
        this.getData = this.getData.bind(this);
        this.setData = this.setData.bind(this);
        this.clearData = this.clearData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if(props.disabled!=state.rawDisabled){
            return {
                rawDisabled:props.disabled,
                disabled: props.disabled,
            }
        }
        return null;
       
    }
    validate() {

        let isva = true;
        for (let v in this.refs) {

            if (isva) {//如果验证是正确的，继续获取值
                isva = this.refs[v].validate ? this.refs[v].validate() : isva;
            }
            else {//如果前一个验证失败，则验证不拿值
                this.refs[v].validate ? this.refs[v].validate() : void (0);
            }

        }
        return isva;
    }
    getData() {
        var data = {}
        for (let v in this.refs) {
            if (this.refs[v].props.name && this.refs[v].getValue) {//说明是表单控件
                if (this.refs[v].props.name.indexOf(",") > -1) {//含有多个字段
                    var nameSplit = this.refs[v].props.name.split(",");
                    if (this.refs[v].getValue()) {
                        var valueSplit = this.refs[v].getValue().split(",");
                        for (let index = 0; index < nameSplit.length; index++) {
                            if (index < valueSplit.length) {
                                data[nameSplit[index]] = valueSplit[index];
                            }
                        }

                    }
                    else {
                        for (let index = 0; index < nameSplit.length; index++) {
                            data[nameSplit[index]] = "";
                        }
                    }
                }
                else {
                    data[this.refs[v].props.name] = this.refs[v].getValue();
                }
            }
            else if (this.refs[v].getData) {//布局组件或者表单组件
                data = Object.assign(data, this.refs[v].getData())
            }


        }
        return data;
    }
    setData(data) {//设置值,data是对象

        if (!data) {
            return;
        }
        for (let v in this.refs) {
            if (this.refs[v].props.name && data[this.refs[v].props.name] != null && data[this.refs[v].props.name] != undefined) {
                this.refs[v].setValue && this.refs[v].setValue(data[this.refs[v].props.name]);
            }
            else if (this.refs[v].setData) {//表单或者布局组件
                this.refs[v].setData(data);
            }
        }
    }
    clearData() {
        for (let v in this.refs) {
            this.refs[v].setValue && this.refs[v].setValue("");
            this.refs[v].clearData && this.refs[v].clearData();
        }
    }

    onSubmit() {
        //提交 数据
        var data = {};//各个字段对应的值
        let isva = true;
        for (let v in this.refs) {
            //如果没有验证方法说明不是表单控件，保留原来的值
            if (isva) {//如果验证是正确的，继续获取值
                isva = this.refs[v].validate ? this.refs[v].validate() : isva;
            }
            else {//如果前一个验证失败，则验证不拿值
                this.refs[v].validate ? this.refs[v].validate() : void (0);
            }

            if (this.refs[v].props.name && this.refs[v].getValue) {//说明是表单控件

                if (this.refs[v].props.name.indexOf(",") > -1) {//含有多个字段
                    var nameSplit = this.refs[v].props.name.split(",");
                    let value = this.refs[v].getValue();
                    if (value) {
                        var valueSplit = value.split(",");
                        for (let index = 0; index < valueSplit.length; index++)//有可能分离的值比字段少
                        {
                            if (index < valueSplit.length) {
                                data[nameSplit[index]] = valueSplit[index];

                            }
                        }

                    }
                    else {
                        for (let index = 0; index < nameSplit.length; index++) {
                            data[nameSplit[index]] = "";

                        }
                    }
                }
                else {
                    data[this.refs[v].props.name] = this.refs[v].getValue();
                }
            } else if (this.refs[v].getData) {//布局组件或者表单组件
                data = Object.assign(data, this.refs[v].getData())
            }
        }
        if (isva) {
            if (this.props.onSubmit) {
                this.props.onSubmit(data);
            }
            else {
                return data;
            }

        }
    }
    setDisabled(disabled){
        this.setState({
            disabled:!!disabled
        })
    }

    /**
     * 得到表单中标签的最大宽度，方便对齐
     */
    computerLabelWidth(){
        let maxWidth=0;//得到最大宽度
        React.Children.map(this.props.children, (child,index)=>{

            if(child&&child.props&&child.props.label){
                let labelStyle=func.clone(child.labelStyle)||{};
                if(labelStyle&&labelStyle.width){
                    //如果设置宽度，则不参与计算
                }else{
                    let width=func.charWidth(child.props.label);
              
                    maxWidth=maxWidth<width?width:maxWidth;
                }
               
            }
        })
        return maxWidth;
    }
    render() {
        let maxWidth=this.computerLabelWidth();
        return (
            <div className={"wasabi-form  clearfix " + " " + this.props.className} style={this.props.style}>
                <div className={"form-body clearfix "} cols={this.props.cols}>

                    {
                        React.Children.map(this.props.children, (child, index) => {

                            if(child){
                                if (typeof child.type !== "function") {//非react组件
                                    return child;
                                } else {
                                        let labelStyle=func.clone(child.labelStyle)||{};
                                       
                                         if(labelStyle.width&&labelStyle.width.indexOf("%")<=-1&&parseFloat(labelStyle.width)<maxWidth){
                                            labelStyle.width=maxWidth;
                                        }
                                        else if(!labelStyle.width){
                                            labelStyle.width=maxWidth;
                                        }
                                     
                                        return React.cloneElement(child,
                                         { labelStyle:labelStyle,disabled: this.state.disabled ? this.state.disabled : child.props.disabled, readOnly: this.state.disabled ? this.state.disabled : child.props.readOnly, key: index, ref: child.ref ? child.ref : index })
                                }
                            }
                            else{
                                return null;
                            }
                         

                        })
                    }
                </div>
                <div className="form-submit clearfix" style={{ display: this.props.submitHide ? "none" : null }}  >
                    <Button theme={this.props.submitTheme} onClick={this.onSubmit} title={this.props.submitTitle} style={{ display: this.props.submitHide ? "none" : null }} disabled={this.props.disabled}  >
                    </Button>

                </div>
            </div>
        )
    }
}

Form.propTypes = {
    style: PropTypes.object,//样式
    className: PropTypes.string,//自定义样式
    disabled: PropTypes.bool,//是否只读
    submitTitle: PropTypes.string,
    submitHide: PropTypes.bool,
    submitTheme: PropTypes.string,
    onSubmit: PropTypes.func,//提交成功后的回调事件
    cols: PropTypes.number//一行几列
};
Form.defaultProps = {
    style: {},
    className: "",
    disabled: false,
    submitTitle: "提交",//查询按钮的标题
    submitHide: true,//是否隐藏按钮
    submitTheme: "primary",//主题
    onSubmit: null,//提交成功后的回调事 
    cols: 3,//默认3个
};
export default Form;