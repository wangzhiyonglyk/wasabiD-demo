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
import Rate from "../Rate";
import "./input.css";
class Input extends React.PureComponent {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  validate() {
    //用于Form调用验证
    return this.input.current.validate && this.input.current.validate();
  }
  getValue() {
    //用于调用获取值
    return (this.input.current.getValue && this.input.current.getValue()) || "";
  }
  setValue(value) {
    //用于设置值
    this.input.current.setValue && this.input.current.setValue(value);
  }
  /**
   * 重新查询数据，用于下拉框中的
   * @param {*} params
   * @param {*} url
   */
  reload(params, url) {
    this.input.current.reload && this.input.current.reload(params, url);
  }
  renderText() {
    //普通文本框
    return (
      <Text ref={this.input} {...this.props}>
        {this.props.children}
      </Text>
    );
  }
  renderRate() {
    //评分
    return <Rate ref={this.input} {...this.props}></Rate>;
  }
  renderUnInput(type) {
    //非输入框组件
    let control; //组件
    let props = { ...this.props }; ////原有的属性
    switch (type) {
      case "radio":
        control = <Radio ref={this.input} {...props}></Radio>;
        break;
      case "checkbox":
        control = <CheckBox ref={this.input} {...props}></CheckBox>;
        break;
      case "checkbutton":
        control = <CheckButton ref={this.input} {...props}></CheckButton>;
        break;
      case "switch":
        control = <Switch ref={this.input} {...props}></Switch>;
        break;
      default: //
        control = <ComboBox ref={this.input} {...props}></ComboBox>;
        break;
    }

    return control;
  }

  render() {
    let type = this.props.type;
    if (
      type == "text" ||
      type == "email" ||
      type == "url" ||
      type == "number" ||
      type == "integer" ||
      type == "alpha" ||
      type == "alphanum" ||
      type == "mobile" ||
      type == "idcard" ||
      type == "password" ||
      type == "textarea"
    ) {
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
