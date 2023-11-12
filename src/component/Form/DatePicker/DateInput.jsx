/**
 * create by wangzhiyonglyk
 * date:2021-04-20
 * desc:为了日期组件定制的输入框，独立出来
 */
import React from "react";

import BaseInput from "../BaseInput";
import func from "../../libs/func";
import regs from "../../libs/regs";

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      value: "",
      oldPropsValue: null,
    };
    this.onChange = this.onChange.bind(this);
    this.inputFormatter = this.inputFormatter.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.dateFormatterCheck = this.dateFormatterCheck.bind(this);
    this.timeFormatterCheck = this.timeFormatterCheck.bind(this);
    this.monthFormatterCheck = this.monthFormatterCheck.bind(this);
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
   * 输入框
   * @param {*} value
   */
  onChange(event) {
    
    let lastKey = event.target.value.slice(-1);
     let regs=/^[0-9]{1,1}$/
    if ( event.target.value===""||regs.test(lastKey)) {
      // 只能输入数字
      let value = this.inputFormatter(event);
      if (value !== false) {
        //输入合法
        this.setState(
          {
            value: value,
          },
          () => {
           
            this.props.onChange && this.props.onChange(value, event);
          }
        );
      }
    }
    }
   
  /**
   * 格式化输入
   * @param {*} value
   * @returns
   */
  inputFormatter(event) {
    let value = event.target.value;
    let reg;
    /**
     * 先判断输入的长度是否有效
     * 
     * 然后再判断两种情况，1.顺序输入，2.插入输入
     * 1.顺序输入，先判断有效性，无效,则不改变
     * 2.顺序输入，有效判断是否要加-或：
     * 3.插入输入时，判断对应的段是否有效，无效则光标选择，不禁止输入，因为禁止输入后光标会跳转末尾
     */
    let lengths = {
      year: 4,
      month: 7,
      time: 5,
      date: 10,
      datetime: 16,
      yearrange: 4,
      monthrange: 7,
      timerange: 5,
      daterange: 10,
      datetimerange:16,
    }
    if (value) {
      if (value.length > lengths[this.props.type]) {
        return false;
      }
      switch (this.props.type) {
        case "time":
        case "timerange":
          reg = /^\d{1,2}$|^\d{2}:?$|^\d{2}:([0-5]|[0-5]\d)$/;
          if (
            value.length == event.target.selectionStart &&
            reg.test(value) !== true
          ) {
            //末尾输入，格式不正确，
            return false;
          } else {
            value = this.timeFormatterCheck(value, event);
          }
          break;
        case "month":
          reg = /^\d{1,4}-?$|^\d{4}-(0[1-9]*|1[0-2]*)$/;
          if (
            value.length == event.target.selectionStart &&
            reg.test(value) !== true
          ) {
            return false;
          } else {
            value = this.monthFormatterCheck(value, event);
          }
          break;
        case "date":
        case "daterange":
          reg =
            /^\d{1,4}-?$|^\d{4}-(0[1-9]*|1[0-2]*)-?$|^\d{4}-(0[1-9]|1[0-2])-(0[1-9]*|[1-2][0-9]*|3[0-1]*)$/;
          if (
            value.length == event.target.selectionStart &&
            reg.test(value) !== true
          ) {
            //末尾输入，格式不正确
            return false;
          } else {
            value = this.dateFormatterCheck(value, event);
          }
          break;
        case "datetime":
        case "datetimerange":
          //这里的正则，时间后面的输入只做了简单验证，否则太长了，通过时间控制输入来处理
          reg =
            /^\d{1,4}-?$|^\d{4}-(0[1-9]*|1[0-2]*)-?$|^\d{4}-(0[1-9]|1[0-2])-(0[1-9]*|[1-2][0-9]*|3[0-1]*)$|^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s?[\d:]*$/;
          if (
            value.length == event.target.selectionStart &&
            reg.test(value) !== true
          ) {
            //末尾输入，格式不正确
            return false;
          } else {
            value = this.dateFormatterCheck(value, event);// 处理日期输入的光标问题
            if (
              value.length == 10 &&
              /^\d{4,4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/.test(value)
            ) {
              //有效的日期
              value = value + " ";
            } else if (value.length >= 11) {
              // 后面有时间了
              value = this.timeFormatterCheck(value, event, 11);
            }
          }
          break;
        default:
          break;
      }
    }

    return value;
  }

  /**
   * 验证年月输入光标处理
   * @param {*} value
   * @param {*} event
   * @returns
   */
  monthFormatterCheck(value, event) {
    if (value && event.target.selectionStart === 4) {
      //年输入完成,年不用验证正确性
      if (value.length == 4) {
        //后面没有值
        value = value + "-";
        event.target.selectionStart = value.length;
      } else {
        //后面有值
        event.target.selectionStart = 5;
        event.target.selectionEnd = 7;
      }
    }
    return value;
  }
  /**
   * 验证日期输入光标处理
   * @param {*} value
   * @param {*} event
   * @returns
   */
  dateFormatterCheck(value, event) {
    if (value && event.target.selectionStart === 4) {
      //年输入完成,年不用验证正确性
      if (value.length == 4) {
        //后面没有值
        value = value + "-";
        event.target.selectionStart = value.length;
      } else {
        //后面有值
        event.target.selectionStart = 5;
        event.target.selectionEnd = 7;
      }
    } else if (value.indexOf("-") > -1 && event.target.selectionStart == 7) {
      //月输入完成
      if (value.split("-")[1] * 1 > 12) {
        //输入不正确
        event.target.selectionStart = 5;
        event.target.selectionEnd = 7;
      } else {
        if (value.length === 7) {
          value = value + "-";
          event.target.selectionStart = value.length;
        } else {
          //后面有日
          event.target.selectionStart = 8;
          event.target.selectionEnd = 10;
        }
      }
    } else if (value.length === 10) {
      //全部输入完成，正则这里没有处理这个情况，因为太长了
      let month = value.split("-")[1] * 1;
      let day = value.split("-")[2] * 1;
      //判断闰年，与大小月
      if (month === 2) {
        //2月

        if (func.isLeapYear(new Date(value.split("-")[0])) && day > 29) {
          //不正确
          event.target.selectionStart = 8;
          event.target.selectionEnd = 10;
        } else if (
          !func.isLeapYear(new Date(value.split("-")[0])) &&
          day > 28
        ) {
          //不正确
          event.target.selectionStart = 8;
          event.target.selectionEnd = 10;
        }
      } else if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) > -1 && day > 31) {
        //不正确
        event.target.selectionStart = 8;
        event.target.selectionEnd = 10;
      } else if (day > 30) {
        //不正确
        event.target.selectionStart = 8;
        event.target.selectionEnd = 10;
      }
    }
    return value;
  }

  /**
   * 验证时间输入光标处理
   * @param {*} value 值
   * @param {*} event
   * @param {*} beginIndex 开始位置，用于日期时间格式时
   * @returns
   */
  timeFormatterCheck(value, event, beginIndex = 0) {  
    if (value && event.target.selectionStart === beginIndex + 2) {
      //时输入完时
      const hour = value.slice(beginIndex + 0, beginIndex + 2);
      if (/^(20|21|22|23|[0-1]\d{0,1})$/.test(hour) !== true) {
        //输入不正确
        event.target.selectionStart = 0 + beginIndex;
        event.target.selectionEnd = 2 + beginIndex;
      } else {
        //正确
        if (value.length === 2 + beginIndex) {
          //后面没值
          value = value + ":";
          event.target.selectionStart = value.length;
        } else {
          //后面有值
          event.target.selectionStart = 3 + beginIndex;
          event.target.selectionEnd = 5 + beginIndex;
        }
      }
    } else if (value && event.target.selectionStart === beginIndex + 5) {
      //分输入完时
      const minute = value.slice(beginIndex + 3, beginIndex + 5);
      if (/^[0-5]\d$/.test(minute) !== true) {
        //输入不正确
        event.target.selectionStart = 3 + beginIndex;
        event.target.selectionEnd = 5 + beginIndex;
      }
    } else if (value && event.target.selectionStart === 10 && beginIndex === 11) {
      //专门用于日期时间，日期输入完成，后面有时间
      if (regs.datetime.test(value)) {
        //后面格式正确
        event.target.selectionStart = 11
        event.target.selectionEnd = 13;
      }
      
    }
   
    return value;
  }
  /**
   * 控制光标
   */
  onClick(event) {
    switch (this.props.type) {
      case "year":
        event.target.selectionStart = 0;
        event.target.selectionEnd = 4;
        break;
      case "month":
        if (event.target.selectionStart <= 4) {
          event.target.selectionStart = 0;
          event.target.selectionEnd = 4;
        } else if (event.target.selectionStart <= 7) {
          event.target.selectionStart = 5;
          event.target.selectionEnd = 7;
        }
        break;
      case "time":
        if (event.target.selectionStart <= 2) {
          event.target.selectionStart = 0;
          event.target.selectionEnd = 2;
        } else if (event.target.selectionStart > 2) {
          event.target.selectionStart = 3;
          event.target.selectionEnd = 5;
        }
        break;
      case "date":
        if (event.target.selectionStart <= 4) {
          event.target.selectionStart = 0;
          event.target.selectionEnd = 4;
        } else if (event.target.selectionStart <= 7) {
          event.target.selectionStart = 5;
          event.target.selectionEnd = 7;
        } else if (event.target.selectionStart > 7) {
          event.target.selectionStart = 8;
          event.target.selectionEnd = 10;
        }
        break;
      case "datetime":
        if (event.target.selectionStart <= 4) {
          event.target.selectionStart = 0;
          event.target.selectionEnd = 4;
        } else if (event.target.selectionStart <= 7) {
          event.target.selectionStart = 5;
          event.target.selectionEnd = 7;
        } else if (event.target.selectionStart <= 10) {
          event.target.selectionStart = 8;
          event.target.selectionEnd = 10;
        } else if (event.target.selectionStart <= 14) {
          event.target.selectionStart = 11;
          event.target.selectionEnd = 13;
        } else if (event.target.selectionStart <= 17) {
          event.target.selectionStart = 14;
          event.target.selectionEnd = 16;
        } else if (event.target.selectionStart > 17) {
          event.target.selectionStart = 17;
          event.target.selectionEnd = 19;
        }
      default:
        break;
    }
    this.props.showPicker && this.props.showPicker();
    this.props.onClick && this.props.onClick(event);
  }
  onDoubleClick(event) {
    this.props.onDoubleClick && this.props.onDoubleClick(event);
  }
  focus() {
    try {
      this.input.current.focus();
    } catch (e) {
      console.log("e", e);
    }
  }
  /**
   * 得到焦点
   */
  onFocus(event) {
    switch (this.props.type) {
      case "time":
        event.target.selectionStart = 0;
        event.target.selectionEnd = 2;
        break;
      case "year":
      case "month":
      case "date":
      case "datetime":
        event.target.selectionStart = 0;
        event.target.selectionEnd = 4;
      default:
        break;
    }
    this.props.onFocus && this.props.onFocus(event);
  }
  /**
   * 失去焦点
   * @param {*} event
   */
  onBlur(event) {
    this.props.onBlur && this.props.onBlur(event);
  }

  render() {
    return (
      <React.Fragment>
        <i
          className={"combobox-clear icon-clear"}
          onClick={this.props.onClear}
          style={{
            display: this.props.readOnly
              ? "none"
              : this.props.value
              ? "inline"
              : "none",
          }}
        ></i>
        {this.props.isfirst ? null : <i
          className={"comboxbox-icon icon-calendar  "}
          onClick={this.props.showPicker}
        ></i>}
        <BaseInput
          ref={this.input}
          name={this.props.name}
          title={this.props.title}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
          required={this.props.required}
          value={this.state.value}
          onFocus={this.onFocus}
          onClick={this.onClick}
          onDoubleClick={this.onDoubleClick}
          onKeyUp={this.props.onKeyUp}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </React.Fragment>
    );
  }
}
export default DateInput;
