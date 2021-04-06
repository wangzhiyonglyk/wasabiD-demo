/*
 create by wangzhiyong
 date:2016-04-05后开始独立改造
 2017-08-14改造
 desc:表单组件窗口
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import Radio from "./Radio.jsx";
import CheckBox from "./CheckBox.jsx";
import CheckButton from "./CheckButton.jsx";
import SwitchButton from "./SwitchButton.jsx";
import ComboBox from "./ComboBox.jsx";
import Text from "./Text.jsx";
import None from "./None.jsx";
import props from "./config/propType.js";
import config from "./config/inputConfig.js"
import defaultProps from "./config/defaultProps.js";
import Rate from "./Rate"
import("../Sass/Form/Input.css");
class Input extends Component {

constructor(props)
{
    super(props);
}
    validate(value) {//用于Form调用验证
        return this.refs.input.validate();
    }
    getValue() {//用于调用获取值
        return this.refs.input.getValue();
    }
    setValue(value) {//用于设置值
        this.refs.input.setValue(value);
    }
    renderText() {//普通文本框
        return <Text ref="input" {...this.props} >{this.props.children}</Text>
    }
    renderRate(){
             //评分
            return <Rate ref="input" {...this.props} ></Rate>
          
    }
    renderUnInput(type) {//非输入框组件
        let control;//组件
        let props = { ...this.props }////原有的属性

        if (type == "none") {//空占位组件
            control = <None ref="input" {...props} ></None>
        }
        else if (type == "radio") {//单选按钮组
            control = <Radio ref="input" {...props} ></Radio>
        }
        else if (type == "checkbox") {//多选择按钮组
            control = <CheckBox ref="input" {...props}  ></CheckBox>
        }
        else if (type == "checkbutton") {//多选择按钮组
            control = <CheckButton ref="input" {...props}  ></CheckButton>
        }
        else if (type == "switch") {//开关
            control = <SwitchButton ref="input"  {...props} ></SwitchButton>
        }

        else if (type == "muti" || type == "select" || type == "datetime" || type == "time" ||type=="timerange"|| type == "date" || type == "daterange" || type == "datetimerange" || type == "picker" || type == "treepicker") {//下拉组件
            control = <ComboBox ref="input" {...props} ></ComboBox>
        }



        return control;
    }
    reload(params,url){
        this.refs.input.reload&& this.refs.input.reload(params,url);
    }
    render() {

        if (this.props.type == "text" || this.props.type == "email"
            || this.props.type == "url" || this.props.type == "number"
            || this.props.type == "integer" || this.props.type == "alpha"
            || this.props.type == "alphanum" || this.props.type == "mobile"
            || this.props.type == "idcard"
            || this.props.type == "password"
            || this.props.type == "textarea") {//这几种类型统一为text

            return this.renderText();
        }
        else if(this.props.type=="rate"){
            return this.renderRate();
        }

        else {//输入文本输入框类型

            return this.renderUnInput(this.props.type);
        }


        return null;

    }
}
Input.propTypes = Object.assign( props,{ type: PropTypes.oneOf(config) });
Input.defaultProps = Object.assign({ type: "text" }, defaultProps);
  export default Input;