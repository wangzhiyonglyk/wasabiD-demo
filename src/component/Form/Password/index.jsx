/**强密码组件， */
import React from "react";
import BaseInput from "../BaseInput";
import ValidateHoc from "../ValidateHoc";
import propTypes from "../propsConfig/propTypes.js";

class Password extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.state = {
      oldPropsValue: null,
      value: this.props.value || "",
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.oldPropsValue) {
      //就是说原来的初始值发生改变了，说明父组件要更新值
      return {
        value: props.value || "",
        oldPropsValue: props.value,
      };
    }
    return null;
  }
  getValue() {
    return this.state.value;
  }
  setValue(value) {
    this.setState({
      value: value,
    });
  }
  /**
   * change
   * @param {*} value
   */
  onChange(event) {
    let currentValue = event.target.value;
    let tempValue;
    if (event.target.selectionStart === currentValue.length) {
      let add = currentValue.length > this.state.value.length; // 是添加还是删除
      tempValue = add
        ? this.state.value + currentValue.slice(this.state.value.length)
        : this.state.value.slice(0, currentValue.length);
      this.setState({
        value: tempValue,
      });
      this.props.onChange &&
        this.props.onChange(tempValue, this.props.name, event);
    } else {
      //禁止从中间删除
    }
  }
  /************以下事件都是为了防止密码的输入出问题 ***********/
  onKeyUp(event) {
    //禁止移动光标
    if (event.keyCode >= 35 && event.keyCode <= 40) {
      //控制光标位置
      event.target.selectionStart = event.target.value.length;
    }
    this.props.onKeyUp && this.props.onKeyUp(event);
  }
  /**
   * //验证密码强度
   * @param {*} event
   */
  onBlur(event) {
    this.props.validate && this.props.validate(this.state.value);
    this.props.onBlur && this.props.onBlur(event);
  }

  /**
   * 设置焦点
   * @param {*} event
   */
  focus() {
    //全部选中
    try {
      this.inputRef.current.focus();
      this.inputRef.current.selectionStart = this.inputRef.current.value.length;
    } catch (e) {
      console.oog("error", e);
    }
  }
  /**
   * 焦点事件
   */
  onFocus(event) {
    //全部选中
    event.target.selectionStart = event.target.value.length;
    this.props.onClick && this.props.onFocus(event);
  }
  /**
   *  //控制光标位置
   * @param {*} event
   */
  onClick(event) {
    //全部选中
    event.target.selectionStart = event.target.value.length;
    this.props.onClick && this.props.onClick(event);
  }
  /**
   * 防止选择部分，然后滑出，再删除
   * @param {*} event
   */
  onMouseOut() {
    this.inputRef.current.selectionStart = this.state.value.length;
  }
  /**
   * 粘贴处理,禁止粘贴
   * @param {*} event
   */
  onPaste(event) {
    event.preventDefault(); //阻止默认事件
    this.props.onPaste && this.props.onPaste(event);
  }

  render() {
    return (
      <React.Fragment>
        <BaseInput
          title={this.props.title}
          name={this.props.name}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
          ref={this.inputRef}
          value={this.state.value.replace(/./g, "*")}
          onFocus={this.onFocus}
          onClick={this.onClick}
          onDoubleClick={this.props.onDoubleClick}
          onBlur={this.onBlur}
          onPaste={this.onPaste}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          onMouseOut={this.onMouseOut}
        ></BaseInput>
        {this.props.children}
      </React.Fragment>
    );
  }
}
Password.propTypes = propTypes;
Password.defaultProps = { type: "password" };
export default ValidateHoc(Password);
