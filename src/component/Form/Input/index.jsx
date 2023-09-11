/*
 create by wangzhiyonglyk
 date:2016-03-02 后开始独立改造
 2017-08-14改造
 desc:表单组件窗口
 2022-09-17 改造表单组件，去掉不必要的组件，完善组件的属性
 2022-09-20 简化表述
 */

import React from "react";
import Radio from "../Radio/index.jsx";
import CheckBox from "../CheckBox/index.jsx";
import CheckButton from "../CheckButton";
import Switch from "../Switch";
import ComboBox from "../ComboBox";
import Text from "../Text";
import Password from "../Password/index.jsx";
import Rate from "../Rate";
import Avatar from "../Avatar/index.jsx";
import Upload from "../Upload/index.jsx";

import "./input.css";
class Input extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  validate() {
    //用于Form调用验证
    return this.inputRef.current.validate && this.inputRef.current.validate();
  }
  getValue() {
    //用于调用获取值
    return (
      (this.inputRef.current.getValue && this.inputRef.current.getValue()) || ""
    );
  }
  setValue(value) {
    //用于设置值
    this.inputRef.current.setValue && this.inputRef.current.setValue(value);
  }
  focus() {
    try {
      this.inputRef?.current?.focus();
    } catch (e) {
      console.log("focus", e);
    }
  }
  /**
   * 重新查询数据，用于下拉框中的
   * @param {*} params
   * @param {*} url
   */
  reload(params, url) {
    try {
      this.inputRef?.current?.reload(params, url);
    } catch (e) {
      console.log("reload", e);
    }
  }
  renderText() {
    //普通文本框
    if (this.props.type === "strongPassword") {
      // 强密码输入框
      <Password ref={this.inputRef} {...this.props}>
        {this.props.children}
      </Password>;
    } else {
      return (
        <Text ref={this.inputRef} {...this.props}>
          {this.props.children}
        </Text>
      );
    }
  }
  renderRate() {
    //评分
    return <Rate ref={this.inputRef} {...this.props}></Rate>;
  }
  renderUnInput(type) {
    //非输入框组件
    let control; //组件
    let props = { ...this.props }; ////原有的属性
    switch (type) {
      case "radio":
        control = <Radio ref={this.inputRef} {...props}></Radio>;
        break;
      case "checkbox":
        control = <CheckBox ref={this.inputRef} {...props}></CheckBox>;
        break;
      case "checkbutton":
        control = <CheckButton ref={this.inputRef} {...props}></CheckButton>;
        break;
      case "switch":
        control = <Switch ref={this.inputRef} {...props}></Switch>;
        break;

      case "avatar":
      case "image":
        control = <Avatar ref={this.inputRef} {...props}></Avatar>;
        break;
      case "file":
        control = <Upload ref={this.inputRef} {...props}></Upload>;
        break;
      default: //
        control = <ComboBox ref={this.inputRef} {...props}></ComboBox>;
        break;
    }

    return control;
  }

  render() {
    let type = this.props.type;
    let texts = [
      "text",
      "email",
      "url",
      "number",
      "integer",
      "alpha",
      "alphanum",
      "mobile",
      "idcard",
      "password",
      "strongPassword",
      "textarea",
    ];
    if (texts.includes(type)) {
      //这几种类型统一为text
      return this.renderText();
    } else if (type == "rate") {
      return this.renderRate();
    } else {
      //输入文本输入框类型
      return this.renderUnInput(type);
    }
  }
}
Input.defaultProps = {
  type: "text",
};
export default Input;
