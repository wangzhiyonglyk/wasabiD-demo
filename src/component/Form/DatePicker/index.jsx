/**
 * Created by zhiyongwang on 2016-04-26
 * desc:通用下拉日期,时间组件
 * date:2021-05-10 将日期组件全部合并到一个文件夹中，
 * todo 需要继续优化
 */
import React, { Component } from "react";
import Calendar from "./Calendar";
import DateInput from "./DateInput"
import DateTime from "./DateTime.jsx";
import DateRange from "./DateRange.jsx";
import DateTimeRange from "./DateTimeRange.jsx";
import Time from "./Time";
import TimeRange from "./TimeRange";
import regs from "../../Lang/regs.js";
import validateHoc from "../validateHoc"
import func from "../../libs/func"
import propTypes from "../../propsConfig/propTypes.js";

import dom from "../../libs/dom"
class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      pickerid: func.uuid(),
      rangeCount: "-150%", // 时间选择框的位置
      oldPropsValue: "",//保留原来的值
      value: "",
      text: "",
    };
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.splitDate = this.splitDate.bind(this);
    this.splitDateTime = this.splitDateTime.bind(this);
    this.showPicker = this.showPicker.bind(this);
    this.hidePicker = this.hidePicker.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onChange = this.onChange.bind(this);

    this.renderDate = this.renderDate.bind(this);
    this.renderDateRange = this.renderDateRange.bind(this);
    this.renderDateTime = this.renderDateTime.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.renderTimeRange = this.renderTimeRange.bind(this);
    this.autoForMat = this.autoForMat.bind(this);
    this.inputClick = this.inputClick.bind(this);
    this.inputFocus = this.inputFocus.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.value != state.oldPropsValue) {
      return {
        value: props.value,
        oldPropsValue: props.value
      }
    }
    return null;
  }
  componentDidUpdate() {
    //
    dom.scrollVisible(document.getElementById(this.state.pickerid));//是加上多余被挡的
  }
  /**
   * 获取值
   * @returns 
   */
  getValue() {
    let value = this.state.value ? this.state.value : "";
    if (this.props.type == "date" && value && this.props.attachTime) {
      value = value + " " + func.dateformat(new Date(), "HH:mm:ss");
    }
    else if (this.props.type == "time" && value && this.props.attachSecond) {
      value = value.split(":").length == 2 ? value + ":00" : value;
    }
    else if (this.props.type == "timerange" && value && this.props.attachSecond) {
      value = value.split(",");
      value[0] = value[0].split(":").length == 2 ? value[0] + ":00" : value[0];
      value[1] = value[1].split(":").length == 2 ? value[1] + ":59" : value[1];
      value = value.join(",");
    }
    else if (this.props.type == "daterange" && value && this.props.attachTime) {
      value = value.split(",");
      value[0] = value[0] + " 00:00:00";
      value[1] = value[1] + " 23:59:59";
      value = value.join(",");
      console.log("daterange", value)
    }
    else if (this.props.type == "datetimerange" && value && this.props.attachSecond) {
      value = value.split(",");
      value[0] = value[0].split(" ").length == 1 ? value[0] + " 00:00:00" : value[0].split(" ")[1].split(":").length == 2 ? value[0] + ":00" : value[0];
      value[0] = value[1].split(" ").length == 1 ? value[0] + " 23:59:59" : value[1].split(" ")[1].split(":").length == 2 ? value[1] + ":59" : value[1];
      value = value.join(",");
    }
    return value;
  }
  /**
   * 设置值
   * @param {*} value 
   */
  setValue(value) {
    if (value && this.props.validate && this.props.validate(value)) {
      this.setState({
        value: value,
        text: value
      });
    } else {
      this.setState({
        value: "",
        text: ""
      });
    }
  }

  /**
  * 
  * @param {*} value 
  * @param {*} text 
  * @param {*} name 
  * @param {*} hide 是否隐藏，用于范围 todo
  */
  onSelect(value, text, name, hide = true) {
    //选中事件
    //防止异步取值
    this.state.value = value;
    this.setState({
      show: !hide,
      value: value,
      text: value
    });
    value = this.getValue();//用于添加附加时间
    this.props.onSelect && this.props.onSelect(value, value, this.props.name, null);
  }

  /**
     * 输入框
     * @param {*} value 
     */
   onChange(event) {
    let value = this.autoForMat(event);
    if (value !== false) {
      this.setState({
        value: value,
        text: value
      }, () => {
        let value = this.getValue();//用于添加附加时间
        if (this.props.validate && this.props.validate(value)) {//数据有效值
          this.props.onSelect && this.props.onSelect(value, value, this.props.name, null);
        }
      });
    } else {
   
    }


  }
  /**
   * 格式化输入
   * @param {*} value 
   * @returns 
   */
  autoForMat(event) {
    let value = event.target.value;
    let reg;
    /**
     * 先两种情况，1.顺序输入，2.插入输入
     * 1.顺序输入，先判断有效性，无效,则不改变
     * 2.顺序输入，有效判断是否要加-或：
     * 3.插入输入时，判断对应的段是否有效，无效则光标选择，不禁止输入，因为禁止输入后光标会跳转末尾
     */
    switch (this.props.type) {
      case "time":
        reg = /^\d{1,2}$|^\d{2,2}:?$|^\d{2,2}:([0-5]|[0-5]\d)$/;
        if (value.length == event.target.selectionStart && reg.test(value) != true) {//值的输入不合法
          //末尾输入，格式不正确，
          return false;
        }
        else if (value && event.target.selectionStart === 2) {//时输入完时
          let hour = value.slice(0, 2);
          if ( /^(20|21|22|23|[0-1]\d)$/.test(hour) !== true) {
            //输入不正确
            event.target.selectionStart = 0;
            event.target.selectionEnd = 2;
          }
          else {
            //正确
            if (value.length === 2) {//后面没值
              value = value + ":";
              event.target.selectionStart = value.length;
            }
            else {
              event.target.selectionStart = 3;
              event.target.selectionEnd = 5;
            }
          }
        }
      


        break;
      case "date":
        reg =/^\d{1,4}-?$|^\d{4,4}-(0[1-9]*|1[0-2]*)-?$|^\d{4,4}-(0[1-9]|1[0-2])-(0[1-9]*|[1-2][0-9]*|3[0-1]*)$/;
        if (value.length == event.target.selectionStart&&reg.test(value)!=true) {
          //末尾输入，格式不正确
          return false;
        }
        else if (value && event.target.selectionStart === 4) {//年输入完成,年不用验证正确性
          if (/^[\d-]*$/.test(value)) {
            if (value.length == 4) {
              //后面没有值
              value = value + "-";
              event.target.selectionStart = value.length;
            }
            else {
              //后面有值
              event.target.selectionStart = 5;
              event.target.selectionEnd = 7;
            }
          }
          else {
            event.target.selectionStart = 0;
            event.target.selectionEnd = 2;
          }


        }
        else if (value.indexOf("-") > -1 && event.target.selectionStart == 7) {//月输入完成
          if (value.split("-")[1] * 1 > 12) {//输入不正确
            event.target.selectionStart = 5;
            event.target.selectionEnd = 7;
          }
          else {
            if (value.length === 7) {
              value = value + "-";
              event.target.selectionStart = value.length;
            }
            else {
              //后面有日
              event.target.selectionStart = 8;
              event.target.selectionEnd = 10;
            }

          }
        }
        else if (value.length === 10) {
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
            }
            else if (!func.isLeapYear(new Date(value.split("-")[0])) && day > 28) {//不正确     
              event.target.selectionStart = 8;
              event.target.selectionEnd = 10;
            }
          }
          else if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) > -1 && day > 31) {//不正确
            event.target.selectionStart = 8;
            event.target.selectionEnd = 10;
          }
          else if (day > 30) {//不正确
            event.target.selectionStart = 8;
            event.target.selectionEnd = 10;
          }


        }
      default:
        break;
    }
    return value;
  }
  /**
   * 控制光标
   */
  inputClick(event) {
    switch (this.props.type) {
      case "time":
        if (event.target.selectionStart <= 2) {
          event.target.selectionStart = 0;
          event.target.selectionEnd = 2;

        }
        else if (event.target.selectionStart > 2) {
          event.target.selectionStart = 3;
          event.target.selectionEnd = 5;
        }
        break;
      case "date":
        if (event.target.selectionStart <= 4) {
          event.target.selectionStart = 0;
          event.target.selectionEnd = 4;

        }
        else if (event.target.selectionStart <= 7) {
          event.target.selectionStart = 5;
          event.target.selectionEnd = 7
        }
        else if (event.target.selectionStart > 7) {
          event.target.selectionStart = 8;
          event.target.selectionEnd = 10;
        }
        break;
      default:
        break;

    }
  }
  /**
   * 得到焦点
   */
  inputFocus(event) {
    switch (this.props.type) {
      case "time":
        event.target.selectionStart = 0;
        event.target.selectionEnd = 2;
        break;
      case "date":
        event.target.selectionStart = 0;
        event.target.selectionEnd = 4;
      default:
        break;


    }
  }
  /**
   *清除数据
   */
  onClear() {
    this.setState({
      value: "",
      text: ""
    });
    this.props.onSelect && this.props.onSelect("", "", this.props.name);
  }

  splitDate(datestr) {
    //拆分日期格式
    let returnvalue = {};
    if (regs.datetime.test(datestr)) {
      //有时间
      datestr = datestr.split(" ")[0];
      returnvalue = {
        year: datestr.split("-")[0] * 1,
        month: datestr.split("-")[1] * 1,
        day: datestr.split("-")[2] * 1
      };

    } else if (regs.date.test(datestr)) {//只有日期
      returnvalue = {
        year: datestr.split("-")[0] * 1,
        month: datestr.split("-")[1] * 1,
        day: datestr.split("-")[2] * 1
      };

    }
    return returnvalue
  }
  /**
   * 将日期拆分为年，月，日，时间
   * @param {*} datetime 
   * @returns 
   */
  splitDateTime(datetime) {
    let returnvalue = {};
    if (regs.datetime.test(datetime)) {
      //如果不为空
      var splitdate = datetime.split(" ")[0];
      if (splitdate && splitdate != "") {
        returnvalue = {
          year: splitdate.split("-")[0] * 1,
          month: splitdate.split("-")[1] * 1,
          day: splitdate.split("-")[2] * 1,
          time: datetime.split(" ")[1]
        };

      }
    }
    return returnvalue;
  }
  showPicker(e) {

    //显示选择
    if (this.props.readOnly) {
      //只读不显示
      return;
    } else {
      this.setState({
        show: true
      });



    }
    document.addEventListener("click", this.hidePicker)
  }

  /**
   * 隐藏下拉框
   * @param {*} event 
   */
  hidePicker(event) {
    if (!dom.isDescendant(document.getElementById(this.props.containerid), event.target)) {
      this.setState({
        show: false
      });

      try {

        document.removeEventListener("click", this.hidePicker);
        this.props.validate && this.props.validate(this.state.value);
        //在此处处理失去焦点事件
        this.props.onBlur && this.props.onBlur(this.state.value, this.state.text, this.props.name);
      }
      catch (e) {

      }
    }
  }

  /**
   * 渲染日期
   * @returns 
   */
  renderDate() {
    let dateobj = this.splitDate(this.state.value);
    return (
      <Calendar
        ref='combobox'
        name={this.props.name}
        {...dateobj}
        onSelect={this.onSelect}
      ></Calendar>
    );
  }
  /**
   * 渲染时间
   * @returns 
   */
  renderTime() {
    let hour; let minute;
    if (regs.time.test(this.state.value)) {
      hour = this.state.value.split(":")[0] * 1;
      minute = this.state.value.split(":")[1] * 1;
    }
    return (
      <Time
        ref='combobox'
        name={this.props.name}
        hour={hour}
        minute={minute}
        onSelect={this.onSelect}
        attachSecond={false}//不传下去
      ></Time>
    );
  }

  /**
   * 渲染日期时间
   * @returns 
   */
  renderDateTime() {
    let dateobj = this.splitDateTime(this.state.value);
    dateobj = dateobj || {};
    return (
      <DateTime
        ref='combobox'
        {...dateobj}
        name={this.props.name}
        onSelect={this.onSelect}
      ></DateTime>
    );
  }
  /**
   * 时间范围
   * @returns 
   */
  renderTimeRange() {
    return (
      <TimeRange
        ref='combobox'
        type={this.props.type}
        name={this.props.name}
        value={this.state.value}
        onSelect={this.onSelect}
        attachSecond={this.props.attachSecond}
      ></TimeRange>
    );
  }

  /**
   * 渲染日期范围
   * @returns 
   */
  renderDateRange() {
    var firstDate = null;
    var secondDate = null;
    if (regs.daterange.test(this.state.value)) {
      //传入一到两个值
      var dateArray = this.state.value.split(",");
      if (dateArray.length > 0) {
        firstDate = dateArray[0];
      }
      if (dateArray.length >= 2) {
        secondDate = dateArray[1];
      }
    }
    return (
      <DateRange
        ref='combobox'
        type={this.props.type}
        name={this.props.name}
        firstDate={firstDate}
        secondDate={secondDate}
        onSelect={this.onSelect}
      ></DateRange>
    );
  }
  /**
   * 渲染日期时间范围
   * @returns 
   */
  renderDateTimeRange() {
    var firstDate = null;
    var secondDate = null;
    var firstTime = null;
    var secondTime = null;
    if (regs.datetimerange.test(this.state.value)) {
      //传入一到两个值
      var dateArray = this.state.value.split(",");
      if (dateArray.length > 0) {
        if (dateArray[0].indexOf(" ") > -1) {
          //有时间
          firstDate = dateArray[0].split(" ")[0];
          firstTime = dateArray[0].split(" ")[1];
        } else {
          firstDate = dateArray[0];
        }
      }
      if (dateArray.length >= 2) {
        if (dateArray[1].indexOf(" ") > -1) {
          //有时间
          secondDate = dateArray[1].split(" ")[0];
          secondTime = dateArray[1].split(" ")[1];
        } else {
          secondDate = dateArray[1];
        }
      }
    }
    return (
      <DateTimeRange
        ref='combobox'
        type={this.props.type}
        name={this.props.name}
        firstDate={firstDate}
        firstTime={firstTime}
        secondDate={secondDate}
        secondTime={secondTime}
        onSelect={this.onSelect}
      ></DateTimeRange>
    );
  }

  render() {
    let control = null;
    let controlDropClassName = "";
    let placeholder=this.props.placeholder;
    switch (this.props.type) {
      case "date":
        control = this.renderDate();
        controlDropClassName = "date";
        placeholder=placeholder||"0000-00-00";
        break;
      case "time":
        control = this.renderTime();
        controlDropClassName = "time";
        placeholder=placeholder||"00:00";
        break;
      case "timerange":

        control = this.renderTimeRange();
        controlDropClassName = "timerange";
        placeholder=placeholder||"00:00,00:00";
        break;
      case "datetime":
        control = this.renderDateTime();
        controlDropClassName = "datetime";
        placeholder=placeholder||"0000-00-00 00:00";
        break;
      case "daterange":
        control = this.renderDateRange();
        controlDropClassName = "daterange";
        placeholder=placeholder||"0000-00-00,0000-00-00";
        break;
      case "datetimerange":
        control = this.renderDateTimeRange();
        controlDropClassName = "datetimerange";
        break;
      default:
        control = this.renderDate();
        controlDropClassName = "date";
        placeholder=placeholder||"0000-00-00";
        break;

    }
    return <div className='combobox' >
      <DateInput
        {...this.props}
        ref={this.input}
        value={this.state.value || ""}
        placeholder={placeholder}  
        onChange={this.onChange.bind(this)}
        onClick={this.showPicker.bind(this)}
        onClear={this.onClear.bind(this)}
        inputClick={this.inputClick.bind(this)}
        inputFocus={this.inputFocus.bind(this)}
      > </DateInput>
      <div id={this.state.pickerid} className={"dropcontainter " + controlDropClassName + " "}
        style={{display: this.state.show == true ? "flex" : "none", flexWrap: "wrap"}}>
        {control}
      </div>
      {this.props.children}
    </div>
  }
}
DatePicker.propTypes = propTypes;
DatePicker.defaultProps = { type: "datetime" };
export default validateHoc(DatePicker);
