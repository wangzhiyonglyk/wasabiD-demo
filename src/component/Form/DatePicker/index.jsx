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
import propTypes from "../config/propTypes.js";
import defaultProps from "../config/defaultProps.js";
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
    if (document.getElementById(this.state.pickerid).getBoundingClientRect().right > window.screen.availWidth) {
      document.getElementById(this.state.pickerid).style.right = "0px";
    }
  }
  getValue() {
    let value = this.state.value ? this.state.value : "";
    if (this.props.type == "date" && value && this.props.attachTime) {
      value = value + " " + func.dateformat(new Date(), "HH:mm:ss");
    }
    else if (this.props.type == "daterange" && value && this.props.attachTime) {
      value = value.split(",");
      value[0] = value[0] + " 00:00:00";
      value[1] = value[1] + " 23:59:59";
      value = value.join(",");
    }
    return value;
  }
  setValue(value) {
    if (value && this.props.validate && this.props.validate(value)) {
      if (this.props.type == "daterange" && value.indexOf(" ") > -1) {
        //包含了时间

        value = value.split(",");
        value[0] = value[0].split(" ")[0];
        value[1] = value[1].split(" ")[0];
        value = value.join(",");
      }
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

  splitDate(datestr) {
    //拆分日期格式

    if (
      datestr &&
      datestr.indexOf(" ") > -1 &&
      regs.datetime.test(datestr)
    ) {
      //有时间

      datestr = datestr.split(" ")[0];
      var returnvalue = {
        year: datestr.split("-")[0] * 1,
        month: datestr.split("-")[1] * 1,
        day: datestr.split("-")[2] * 1
      };
      return returnvalue;
    } else if (regs.date.test(datestr)) {
      var returnvalue = {
        year: datestr.split("-")[0] * 1,
        month: datestr.split("-")[1] * 1,
        day: datestr.split("-")[2] * 1
      };
      return returnvalue;
    } else {
      return "";
    }
  }
  splitDateTime(datetime) {
    //

    if (
      datetime &&
      regs.datetime.test(datetime) &&
      datetime.indexOf(" ") > -1
    ) {
      //如果不为空
      var splitdate = datetime.split(" ")[0];
      if (splitdate && splitdate != "") {
        var returnvalue = {
          year: splitdate.split("-")[0] * 1,
          month: splitdate.split("-")[1] * 1,
          day: splitdate.split("-")[2] * 1,
          time: datetime.split(" ")[1]
        };
        return returnvalue;
      } else {
        return "";
      }
    } else {
      return "";
    }

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
        this.props.validate&&this.props.validate(this.state.value);
        //在此处处理失去焦点事件
        this.props.onBlur && this.props.onBlur(this.state.value, this.state.text, this.props.name);
      }
      catch (e) {

      }
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
    this.state.text = text;

    this.setState({
      show: !hide,
      value: value,
      text: text
    });
    this.input.current.setValue(value);
    this.props.onSelect && this.props.onSelect(value, text, this.props.name, null);
  }

  /**
     * 输入框
     * @param {*} value 
     */
  onChange(value) {
    if (regs[this.props.type || "date"].test(value)) {
      this.setValue(value);
      this.props.onSelect && this.props.onSelect(value, value, this.props.name);
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
    this.input.setValue("");
    this.props.onSelect && this.props.onSelect("", "", this.props.name);
  }

  renderDate() {
    var dateobj = this.splitDate(this.state.value);
    if (this.state.value && this.state.value.indexOf(" ") > -1) {
      //说明有时间
      dateobj = this.splitDateTime(this.state.value);
    }
    return (
      <Calendar
        ref='combobox'
        name={this.props.name}
        showTime={false}
        {...dateobj}
        onSelect={this.onSelect}
      ></Calendar>
    );
  }
  renderTime() {
    return (
      <Time
        ref='combobox'
        name={this.props.name}
        value={this.state.value}
        onSelect={this.onSelect}
        allMinute={this.props.allMinute}
        attachSecond={this.props.attachSecond}
      ></Time>
    );
  }
  renderDateTime() {
    let dateobj = this.splitDateTime(this.state.value);
    dateobj = dateobj || {};
    return (
      <DateTime
        ref='combobox'
        {...dateobj}
        name={this.props.name}
        showTime={true}
        onSelect={this.onSelect}
      ></DateTime>
    );
  }
  renderDateTimeRange() {
    var firstDate = null;
    var secondDate = null;
    var firstTime = null;
    var secondTime = null;
    if (this.state.value != null && this.state.value != "") {
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
  renderDateRange() {
    var firstDate = null;
    var secondDate = null;
    if (this.state.value != null && this.state.value != "") {
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
  renderTimeRange() {
    return (
      <TimeRange
        ref='combobox'
        type={this.props.type}
        name={this.props.name}
        value={this.state.value}
        onSelect={this.onSelect}
        allMinute={this.props.allMinute}
        attachSecond={this.props.attachSecond}
      ></TimeRange>
    );
  }

  /** focus */
  onFocus(e) {

    const rangeX = document.getElementsByClassName("dropcontainter range ");
    if (rangeX && rangeX.length > 0) {
      setTimeout(() => {
        if (this.getElementLeft(rangeX[0]) < 0) {
          this.setState({
            rangeCount: 0
          });
        }
        if (
          this.getElementLeft(rangeX[0]) > 10 &&
          this.getElementLeft(rangeX[0]) < 100
        ) {
          this.setState({
            rangeCount: "-30%"
          });
        }
        if (this.getElementLeft(rangeX[0]) > 300) {
          this.setState({
            rangeCount: "-85%"
          });
        }
      }, 150);
    }
  }

  getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }

    return actualLeft;
  }

  render() {
    let control = null;
    let controlDropClassName = "";
    switch (this.props.type) {
      case "date":
        control = this.renderDate();
        controlDropClassName = "date";
        break;
      case "time":
        control = this.renderTime();
        controlDropClassName = "time";
        break;
      case "timerange":

        control = this.renderTimeRange();
        controlDropClassName = "timerange";
        break;
      case "datetime":
        control = this.renderDateTime();
        controlDropClassName = "datetime";
        break;
      case "daterange":
        control = this.renderDateRange();
        controlDropClassName = "daterange";
        break;
      case "datetimerange":
        control = this.renderDateTimeRange();
        controlDropClassName = "datetimerange";
        break;
      default:
        control = this.renderDate();
        controlDropClassName = "date";
        break;

    }
    return <div className='combobox' id={this.state.pickerid}>
      <DateInput
        {...this.props}
        ref={this.input}
        value={this.state.value||""}
        onChange={this.onChange.bind(this)}
        onClick={this.showPicker.bind(this)}
        onClear={this.onClear.bind(this)}
      > </DateInput>
      <div className={"dropcontainter " + controlDropClassName + " "}
        style={{
          display: this.state.show == true ? "block" : "none",
        }}>
        {control}
      </div>
      {this.props.children}
    </div>
  }
}
DatePicker.propTypes = propTypes;
DatePicker.defaultProps = Object.assign({}, defaultProps, { type: "datetime" });
export default validateHoc(DatePicker);
