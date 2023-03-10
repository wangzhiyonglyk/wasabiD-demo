//creete by wangzhiyong
//date:2016-08-02
//edit by wangzhiyong 2020-10-18 todo blur事件要改
//desc 将输入框从Input中独立出来
//2022-01-11 将 tree组件独立出来
import React, { Component } from "react";
import "./input.css";
class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPropsValue: null, //保存用于匹配
      value: this.props.value || "",
    };
    this.onChange = this.onChange.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
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
    //获取值
    return this.state.value;
  }
  setValue(value) {
    //设置值
    this.setState({
      value: value,
      show: false,
    });
  }

  onChange(event) {
    let value = event.target.value.toString();
    this.setValue(value);
    this.props.onChange && this.props.onChange(value, value, this.props.name); //自定义的改变事件
  }

  keyUpHandler(event) {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  }

  blurHandler(event) {
    this.props.validate && this.props.validate(this.state.value);
    this.props.onBlur &&
      this.props.onBlur(event.target.value, event.target.value, event);
  }

  render() {
    return (
      <React.Fragment>
        <div className={"wasabi-form-group " + (this.props.className || "")}>
          {" "}
          <div
            className={
              "wasabi-form-group-body" +
              (this.props.readOnly || this.props.disabled ? " readOnly" : "")
            }
          >
            <input
              id={this.props.id}
              type={this.props.type}
              name={this.props.name}
              readOnly={this.props.readOnly}
              className={"wasabi-input "}
              onChange={this.onChange}
              onKeyUp={this.keyUpHandler}
              onBlur={this.blurHandler}
              value={this.state.value || ""}
              autoComplete="off"
            ></input>
            {this.props.children}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Text;
