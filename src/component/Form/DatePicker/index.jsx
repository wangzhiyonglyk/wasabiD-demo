/**
 * Created by wangzhiyonglyk on 2016-04-26
 * desc:通用下拉日期,时间组件
 * date:2021-05-10 将日期组件全部合并到一个文件夹中，
 * date:2022-09-22 增加年，年月组件，并且完善组件，但是设计上仍然有点繁，后期再想办法改进
 */
import React, { Component } from "react";
import CalendarView from "./Calendar/CalendarView";
import DateInput from "./DateInput";
import DateRangeInput from "./DateRangeInput";
import DateTime from "./DateTime.jsx";
import YearRange from "./YearRange";
import MonthRange from "./MonthRange";
import DateRange from "./DateRange.jsx";
import DateTimeRange from "./DateTimeRange.jsx";
import Time from "./Time";
import TimeRange from "./TimeRange";
import regs from "../../libs/regs.js";
import ValidateHoc from "../ValidateHoc";
import func from "../../libs/func";
import propTypes from "../propsConfig/propTypes.js";
import dom from "../../libs/dom";
import { setDropcontainterPosition } from "../propsConfig/public.js";

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      pickerid: func.uuid(),
      oldPropsValue: null, //保留原来的值
      value: "",
      text: "",
    };
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.splitDate = this.splitDate.bind(this);
    this.splitDateTime = this.splitDateTime.bind(this);
    this.showPicker = this.showPicker.bind(this);
    this.hidePicker = this.hidePicker.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onClear = this.onClear.bind(this);
    this.renderDate = this.renderDate.bind(this);
    this.renderDateRange = this.renderDateRange.bind(this);
    this.renderDateTime = this.renderDateTime.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.renderTimeRange = this.renderTimeRange.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.oldPropsValue) {
      return {
        value: props.value,
        oldPropsValue: props.value,
      };
    }
    return null;
  }
  componentDidUpdate() {
    //
    dom.scrollVisible(document.getElementById(this.state.pickerid)); //上在滚动条的情况下自动上浮
  }
  /**
   * 获取值
   * @returns
   */
  getValue() {
    let value = this.state.value ? this.state.value : "";
    if (this.props.type == "date" && value && this.props.attachTime) {
      value = value + " " + func.dateformat(new Date(), "HH:mm:ss");
    } else if (this.props.type == "time" && value && this.props.attachSecond) {
      value = value.split(":").length == 2 ? value + ":00" : value;
    } else if (
      this.props.type == "timerange" &&
      value &&
      this.props.attachSecond
    ) {
      value = value.split(",");
      value[0] = value[0].split(":").length == 2 ? value[0] + ":00" : value[0];
      value[1] = value[1].split(":").length == 2 ? value[1] + ":59" : value[1];
      value = value.join(",");
    } else if (
      this.props.type == "daterange" &&
      value &&
      this.props.attachTime
    ) {
      value = value.split(",");
      value[0] = value[0] + " 00:00:00";
      value[1] = value[1] + " 23:59:59";
      value = value.join(",");
    } else if (
      this.props.type == "datetimerange" &&
      value &&
      this.props.attachSecond
    ) {
      value = value.split(",");
      value[0] =
        value[0].split(" ").length == 1
          ? value[0] + " 00:00:00"
          : value[0].split(" ")[1].split(":").length == 2
          ? value[0] + ":00"
          : value[0];
      value[0] =
        value[1].split(" ").length == 1
          ? value[0] + " 23:59:59"
          : value[1].split(" ")[1].split(":").length == 2
          ? value[1] + ":59"
          : value[1];
      value = value.join(",");
    }
    return value;
  }
  /**
   * 设置值
   * @param {*} value
   */
  setValue(value) {
    this.setState({
      value: value,
      text: value,
    });
    this.props.validate && this.props.validate(value);
  }

  focus() {
    try {
      this.input.current.focus();
    } catch (e) {
      console.log(e);
    }
  }

  onBlur(event) {
    this.props.validate && this.props.validate(this.state.value);
    //在此处处理失去焦点事件
    this.props.onBlur &&
      this.props.onBlur(
        this.state.value,
        this.state.text,
        this.props.name,
        event
      );
  }

  /**
   *
   * @param {*} value 值
   * @param {*} text 文本值
   * @param {*} name 名称
   * @param {*} hide 多余的参数是否隐藏
   */
  onSelect(value, text, name, hide = true) {
    //选中事件
    //防止异步取值时，出问题，
    this.state.value = value.toString();
    this.setState({
      show: !hide,
      value: value.toString(),
      text: value.toString(),
    });
    value = this.getValue(); //用于添加附加时间
    this.props.validate && this.props.validate(value);
    this.props.onSelect &&
      this.props.onSelect(value, text, name || this.props.name);
  }
  /**
   *清除数据
   */
  onClear() {
    this.setState({
      value: "",
      text: "",
    });
    this.props.onSelect && this.props.onSelect("", "", this.props.name);
  }
  /**
   * 拆分日期格式
   * @param {*} datestr
   * @returns
   */
  splitDate(datestr) {
    // 两者都是正确的
    if (regs.datetime.test(datestr) || regs.date.test(datestr)) {
      datestr = datestr.split(" ")[0];
      return {
        year: datestr.split("-")[0] * 1,
        month: datestr.split("-")[1] * 1,
        day: datestr.split("-")[2] * 1,
      };
    }
    return null;
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
      if (splitdate && splitdate !== "") {
        returnvalue = {
          year: splitdate.split("-")[0] * 1,
          month: splitdate.split("-")[1] * 1,
          day: splitdate.split("-")[2] * 1,
          time: datetime.split(" ")[1],
        };
      }
    }
    return returnvalue;
  }
  /**
   * 显示下拉
   * @param {*} e
   * @returns
   */
  showPicker(show = true) {
    //显示选择
    if (this.props.readOnly || this.state.show) {
      //只读不显示
      return;
    } else {
      this.setState({
        show: show,
      });
    }
    document.addEventListener("click", this.hidePicker);
    setDropcontainterPosition(this.input.current.input.current);
  }

  /**
   * 隐藏下拉框
   * @param {*} event
   */
  hidePicker(event) {
    if (this.props.readOnly || !this.state.show) {
      //只读不显示
      return;
    }
    if (
      !dom.isDescendant(
        document.getElementById(this.props.containerid),
        event.target
      )
    ) {
      this.setState({
        show: false,
      });

      try {
        document.removeEventListener("click", this.hidePicker);
        this.props.validate && this.props.validate(this.state.value);
      } catch (e) {}
    }
  }

  /**
   * 渲染年组件
   * @returns
   */
  renderYear() {
    let year = regs.year.test(this.state.value) ? this.state.value * 1 : null;
    return (
      <CalendarView
        name={this.props.name}
        type={this.props.type}
        year={year}
        min={this.props.min}
        max={this.props.max}
        onSelect={this.onSelect}
      ></CalendarView>
    );
  }
  /**
   * 渲染年月组件
   * @returns
   */
  renderMonth() {
    let year;
    let month;
    if (regs.month.test(this.state.value)) {
      let arr = this.state.value.toString().split("-");
      year = arr[0] * 1;
      month = arr[1] * 1;
    }

    return (
      <CalendarView
        name={this.props.name}
        type={this.props.type}
        year={year}
        month={month}
        min={this.props.min}
        max={this.props.max}
        onSelect={this.onSelect}
      ></CalendarView>
    );
  }
  /**
   * 渲染时间
   * @returns
   */
  renderTime() {
    let hour;
    let minute;
    if (regs.time.test(this.state.value)) {
      hour = this.state.value.split(":")[0];
      minute = this.state.value.split(":")[1];
    }
    // todo 时间选择的禁用状态，暂时不处理，只在表单验证中处理
    return (
      <Time
        ref="combobox"
        name={this.props.name}
        hour={hour}
        minute={minute}
        min={this.props.min}
        max={this.props.max}
        onSelect={this.onSelect}
        attachSecond={this.props.attachSecond}
      ></Time>
    );
  }
  /**
   * 渲染日期
   * @returns
   */
  renderDate() {
    let dateobj = this.splitDate(this.state.value);
    return (
      <CalendarView
        name={this.props.name}
        type={this.props.type}
        {...dateobj}
        min={this.props.min}
        max={this.props.max}
        onSelect={this.onSelect}
      ></CalendarView>
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
        {...dateobj}
        name={this.props.name}
        min={this.props.min}
        max={this.props.max}
        onSelect={this.onSelect}
      ></DateTime>
    );
  }
  /**
   * 渲染年份范围
   */
  renderYearRange() {
    let firstYear = null;
    let secondYear = null;
    if (regs.yearrange.test(this.state.value)) {
      let arr = this.state.value.split(",");
      firstYear = regs.year.test(arr[0]) ? arr[0] * 1 : null;
      secondYear = arr.length === 2 && regs.year.test(arr[1]) ? arr[1] : null;
    }

    return (
      <YearRange
        name={this.props.name}
        firstYear={firstYear}
        secondYear={secondYear}
        min={this.props.min}
        max={this.props.max}
        onSelect={this.onSelect}
      ></YearRange>
    );
  }
  /**
   * 渲染年月范围
   */
  renderMonthRange() {
    let firstYear = null;
    let secondYear = null;
    let firstMonth = null;
    let secondMonth = null;
    if (regs.monthrange.test(this.state.value)) {
      let value = this.state.value ?? "";
      let firstDate = value.split(",")[0] || "";
      let secondDate = value.split(",")[1] || "";
      firstYear = firstDate.split("-")[0];
      firstMonth = firstDate.split("-")[1] || "";
      secondYear = secondDate.split("-")[0];
      secondMonth = secondDate.split("-")[1] || "";
    }

    return (
      <MonthRange
        name={this.props.name}
        firstYear={firstYear}
        secondYear={secondYear}
        firstMonth={firstMonth}
        secondMonth={secondMonth}
        min={this.props.min}
        max={this.props.max}
        onSelect={this.onSelect}
      ></MonthRange>
    );
  }
  /**
   * 时间范围
   * @returns
   */
  renderTimeRange() {
    let firstTime = null;
    let secondTime = null;
    if (regs.timerange.test(this.state.value)) {
      firstTime = this.state.value.split(",")[0];
      secondTime = this.state.value.split(",")[1];
    }
    return (
      <TimeRange
        name={this.props.name}
        firstTime={firstTime}
        secondTime={secondTime}
        min={this.props.min}
        max={this.props.max}
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
        type={this.props.type}
        name={this.props.name}
        firstDate={firstDate}
        secondDate={secondDate}
        min={this.props.min}
        max={this.props.max}
        range={this.props.range}
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
        type={this.props.type}
        name={this.props.name}
        firstDate={firstDate}
        firstTime={firstTime}
        secondDate={secondDate}
        secondTime={secondTime}
        min={this.props.min}
        max={this.props.max}
        onSelect={this.onSelect}
      ></DateTimeRange>
    );
  }

  render() {
    let control = null;
    let controlDropClassName = "";
    let placeholder = this.props.placeholder;
    let { type } = this.props;

    switch (type) {
      case "year":
        control = this.renderYear();
        controlDropClassName = "date";
        placeholder = placeholder || "0000";
        break;
      case "month":
        control = this.renderMonth();
        controlDropClassName = "date";
        placeholder = placeholder || "0000-00";
        break;
      case "time":
        control = this.renderTime();
        controlDropClassName = "time";
        placeholder = placeholder || "00:00";
        break;
      case "date":
        control = this.renderDate();
        controlDropClassName = "date";
        placeholder = placeholder || "0000-00-00";
        break;
      case "datetime":
        control = this.renderDateTime();
        controlDropClassName = "datetime";
        placeholder = placeholder || "0000-00-00 00:00";
        break;
      case "yearrange":
        control = this.renderYearRange();
        controlDropClassName = "monthrange";
        placeholder = placeholder || "0000";
        break;

      case "monthrange":
        control = this.renderMonthRange();
        controlDropClassName = "monthrange";
        placeholder = placeholder || "0000-00";
        break;
      case "timerange":
        control = this.renderTimeRange();
        controlDropClassName = "timerange";
        placeholder = placeholder || "00:00";
        break;

      case "daterange":
        control = this.renderDateRange();
        controlDropClassName = "daterange";
        placeholder = placeholder || "0000-00-00";
        break;
      case "datetimerange":
        control = this.renderDateTimeRange();
        controlDropClassName = "datetimerange";
        placeholder = placeholder || "0000-00-00 00:00";
        break;
      default:
        control = this.renderDate();
        controlDropClassName = "date";
        placeholder = placeholder || "0000-00-00";
        break;
    }
    let inputprops = {
      type: type,
      title: this.props.title,
      name: this.props.name,
      placeholder: placeholder,
      value: this.state.value || "",
      show:this.state.show,
      showPicker: this.showPicker, //用于输入框单击时弹出选择框
      onFocus: this.props.onFocus,
      onClick: this.props.onClick,
      onDoubleClick: this.props.onDoubleClick,
      onKeyUp: this.props.onKeyUp,
      onChange: this.setValue,
      onBlur: this.onBlur,
      onClear: this.onClear,
      validate: this.props.validate,
    };
    return (
      <div className="combobox">
        {type.indexOf("range") > -1 ? (
          <DateRangeInput {...inputprops} ref={this.input}></DateRangeInput>
        ) : (
          <DateInput {...inputprops} ref={this.input}></DateInput>
        )}
        <div
          id={this.state.pickerid}
          className={"dropcontainter " + controlDropClassName + " "}
          style={{
            display: this.state.show == true ? "flex" : "none",
          }}
        >
          {control}
        </div>
        {this.props.children}
      </div>
    );
  }
}
DatePicker.propTypes = propTypes;
DatePicker.defaultProps = { type: "date" };
export default ValidateHoc(DatePicker);
