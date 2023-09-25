/**
 * create by wangzhiyonglyk
 * date:2021-06-12
 * desc:日期范围的输入框再次分离
 */
import React from "react";
import PropTypes from "prop-types";
import DateInput from "./DateInput";
import regs from "../../libs/regs";
class DateRangeInput extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.fristinput = React.createRef();
    this.secondinput = React.createRef();
    this.firstValue = "";
    this.secondValue = "";
    this.state = {
      value: "",
      oldPropsValue: null,
    };

    this.onChange = this.onChange.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.oldPropsValue) {
      //父组件强行更新了
      return {
        value: props.value || "",
        oldPropsValue: props.value,
      };
    }
    return null;
  }
  /**
   * 输入的框改变
   * @param {*} index
   * @param {*} value
   */
  onChange(index, value, event) {
    const type = (this.props.type ?? "").replace("range", "");

    if (index === 1) {
      //第一个输入框
      this.firstValue = value;
      if (
        regs[type].test(this.firstValue) &&
        value.length == event.target.selectionStart
      ) {
        //合法的值，并且光标在最后
        try {
          this.secondinput.current.focus(); //第二输入框获取得焦点
        } catch (e) {
          console.log("secondinput", e);
        }
      }
    } else {
      this.secondValue = value;
    }
    this.props.onChange &&
      this.props.onChange(this.firstValue + "," + this.secondValue);
  }
  focus() {
    this.fristinput.current.focus();
  }
  render() {
    const { value } = this.props;
    const valueArr = value ? value.split(",") : ["", ""];

    return (
      <div
        style={{ position: "relative", display: "flex" }}
        className={"daterangeinput " + (this.props.show ? "focus" : "")}
        ref={this.input}
      >
        <DateInput
          ref={this.fristinput}
          key="1"
          {...this.props}
          type={(this.props.type ?? "").replace("range", "")}
          value={valueArr[0]}
          onChange={this.onChange.bind(this, 1)}
        ></DateInput>
        <span style={{ lineHeight: "40px", marginRight: 10 }}>至</span>
        <DateInput
          ref={this.secondinput}
          key="2"
          {...this.props}
          type={(this.props.type ?? "").replace("range", "")}
          value={valueArr[1]}
          onChange={this.onChange.bind(this, 2)}
        ></DateInput>
      </div>
    );
  }
}
DateRangeInput.propTypes = {
  onClear: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};

export default DateRangeInput;
