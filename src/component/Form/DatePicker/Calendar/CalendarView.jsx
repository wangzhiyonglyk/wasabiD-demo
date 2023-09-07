/*create by wangzhiyonglyk
//date:2016-04-25
//edit 2016-09-27 重写
//date:2021-05-10 日期组件更名为日历（Calendar）组件作为独立组件，单独导出，其他日期组件全部放在日期选择组件中
date:2022--09-19 
重新改造日历组件  优化代码，
1.  拆分日历，将此组件只作日期组件的视图
2.增加 下拉日期中最大日期与最小日期的功能
2023-08-30 修复日历组件的bug，简化代码
后期可能要独立为日历组件
//desc:日历组件
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import lang from "../../../Lang/language.js";
import "./calendar.css";
import func from "../../../libs/func/index.js";
import Msg from "../../../Info/Msg";
/**
 * 年份视图
 * @param {*} param0
 * @returns
 */
function YearView({
  yearArr,
  year,
  tempyear,
  min,
  max,
  isRange,
  yearRangeType,
  rangeBegin,
  rangeEnd,
  yearViewVisible,
  yearInputClick,
  yearonBlur,
  yearOKHandler,
  yearOnChange,
  changeYearHandler,
  yearPreNext,
}) {
  let yearControl = [];
  yearArr.forEach((item) => {
    let className;
    if (isRange) {
      // 注意了这里判断范围方式与月，日不同
      className =
        "yearspan" +
        (item === rangeBegin * 1 ? " begin" : "") +
        (item === rangeEnd * 1 ? " end" : "") +
        (rangeBegin != null &&
        rangeBegin != null &&
        item > rangeBegin * 1 &&
        item < rangeEnd * 1
          ? " rangespan"
          : "");
    } else {
      className = item === year * 1 ? "yearspan chosed" : "yearspan";
    }
    yearControl.push(
      <div
        key={item}
        className={className + (item < min || item > max ? " disabled" : "")}
        onClick={
          item < min || item > max ? null : changeYearHandler.bind(this, item)
        }
      >
        {item}
      </div>
    );
  });
  return (
    <div
      className="wasabi-calendar-year"
      style={{ display: yearViewVisible ? "flex" : "none" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          textAlign: "center",
          marginBottom: 10,
          width: "100%",
        }}
      >
        <i
          className="icon-angle-double-left"
          onClick={yearPreNext.bind(this, 0)}
          style={{
            opacity: !yearRangeType || yearRangeType === "first" ? 1 : 0,
            pointerEvents:
              !yearRangeType || yearRangeType === "first" ? null : "none",
          }}
        ></i>
        <input
          type="text"
          value={tempyear || ""}
          name="year"
          onClick={yearInputClick}
          onBlur={yearonBlur}
          onKeyUp={yearOKHandler}
          title="回车确认"
          onChange={yearOnChange}
        ></input>
        <i
          className="icon-angle-double-right"
          onClick={yearPreNext.bind(this, 1)}
          style={{
            opacity: !yearRangeType || yearRangeType === "second" ? 1 : 0,
            pointerEvents:
              !yearRangeType || yearRangeType === "second" ? null : "none",
          }}
        ></i>
      </div>
      {yearControl}
    </div>
  );
}
/**
 * 月份视图
 * @param {*} param0
 * @returns
 */
function MonthView({
  year,
  month,
  isRange,
  min,
  max,
  rangeBegin,
  rangeEnd,
  monthViewVisible,
  changeMonthHandler,
}) {
  let control = [];
  for (let i = 1; i <= 12; i++) {
    // 得到日期
    let date = func.dateformat(new Date(year, i - 1), "yyyy-MM");

    let className;
    if (isRange) {
      className =
        "monthspan " +
        (i === rangeBegin * 1 ? " begin" : "") +
        (i === rangeEnd * 1 ? " end" : "") +
        (rangeBegin != null &&
        rangeEnd != null &&
        i > rangeBegin * 1 &&
        i < rangeEnd * 1
          ? " rangespan"
          : "");
    } else {
      className = "monthspan " + (month === i ? "chosed" : "");
    }
    control.push(
      <div
        key={i}
        className={className + (date < min || date > max ? " disabled" : "")}
        onClick={
          date < min || date > max ? null : changeMonthHandler.bind(this, i)
        }
      >
        {i < 10 ? "0" + i : i}
      </div>
    );
  }
  return (
    <div
      className="wasabi-calendar-month"
      style={{ display: monthViewVisible ? "flex" : "none" }}
    >
      {control}
    </div>
  );
}
/**
 * 周视图
 * @param {*} param0
 * @returns
 */
function WeekView({ visible }) {
  return (
    <div className="weekul" style={{ display: visible ? "block" : "none" }}>
      <div key={lang.cn.SUN} className="weekspan">
        {lang.cn.SUN}
      </div>
      <div key={lang.cn.MON} className="weekspan">
        {lang.cn.MON}
      </div>
      <div key={lang.cn.TUE} className="weekspan">
        {lang.cn.TUE}
      </div>
      <div key={lang.cn.WED} className="weekspan">
        {lang.cn.WED}
      </div>
      <div key={lang.cn.THU} className="weekspan">
        {lang.cn.THU}
      </div>
      <div key={lang.cn.FRI} className="weekspan">
        {lang.cn.FRI}
      </div>
      <div key={lang.cn.SAT} className="weekspan">
        {lang.cn.SAT}
      </div>
    </div>
  );
}

/**
 * 日视图
 * @param {*} param0
 * @returns
 */
function DayView({
  year,
  month,
  day,
  max,
  min,
  visible,
  isRange,
  rangeBegin,
  rangeEnd,
  dayHandler,
}) {
  let preMonthWeekDays = [],
    thisMonthDays = [];
  //总天数
  const daytotal = new Date(year, month, 0).getDate();
  //头一天星期几
  const FirstDayWeek = new Date(year, month - 1, 1).getDay();
  for (let i = 0; i < FirstDayWeek; i++) {
    preMonthWeekDays[i] = i;
  }
  for (let i = 0; i < daytotal; i++) {
    thisMonthDays[i] = i + 1;
  }
  let preMonthWeekDaysNodes = preMonthWeekDays.map(function (item, i) {
    return <div className="datespan" key={i}></div>;
  });
  //有日期格式的日期
  let thisMonthDaysNodes = thisMonthDays.map((item, index) => {
    let chosed = false; //当前日期是否被选中
    if (isRange) {
      if (
        rangeBegin != null &&
        rangeEnd != null &&
        rangeBegin <= item &&
        rangeEnd >= item
      ) {
        chosed = true;
      }
    } else if (day === item) {
      chosed = true;
    }
    let dayClassName = "datespan";
    if (item === rangeBegin && item !== rangeEnd) {
      dayClassName = "datespan begin rangespan";
    } else if (item !== rangeBegin && item === rangeEnd) {
      dayClassName = "datespan end rangespan";
    } else {
      dayClassName = "datespan  " + (chosed && isRange ? "rangespan" : "");
    }
    let date = func.dateformat(
      new Date(year + "/" + month + "/" + item),
      "yyyy-MM-dd"
    );
    return (
      <div
        className={dayClassName + (date < min || date > max ? " disabled" : "")}
        key={"dateitem" + index}
        onClick={date < min || date > max ? null : dayHandler.bind(this, item)}
      >
        <div className={"radius " + (chosed && !isRange ? "chosed" : "")}>
          {item}
        </div>
      </div>
    );
  });
  return (
    <div className="dayul" style={{ display: visible ? "flex" : "none" }}>
      {preMonthWeekDaysNodes} {thisMonthDaysNodes}
    </div>
  );
}

/**
 * 日历头部视图
 * @param {*} param0
 * @returns
 */
function CalendarHeader({ type, year, month, choseYear, choseMonth }) {
  //如果是年份，或者是年月范围两种情况就不显示头部
  return type === "year" ? null : (
    <div className="wasabi-calendar-header">
      <div style={{ display: "inline", marginRight: 8 }} onClick={choseYear}>
        <span>{year}.</span>
      </div>
      {type === "year" || type === "month" ? null : (
        <div style={{ display: "inline" }} onClick={choseMonth}>
          <span>{month * 1 < 10 ? "0" + month * 1 : month}.</span>
        </div>
      )}
    </div>
  );
}

/***
 * 日历视图
 */
class CalendarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPropsValue: null, //保留原来的值,方便父组件强制更新
      tempyear: null, //年份输入框值
      oldPropsYearArr: null, //旧可的选择的年值
      yearArr: [], //当前可选年份
      year: null, //年，
      month: null, //月
      day: null, //日
      yearViewVisible: this.props.type === "year" ? true : false, //选择年份
      monthViewVisible: this.props.type === "month" ? true : false, //选择月份
    };
    this.setValue = this.setValue.bind(this);
    this.choseYear = this.choseYear.bind(this);
    this.yearInputClick = this.yearInputClick.bind(this);
    this.yearOnChange = this.yearOnChange.bind(this);
    this.yearOKHandler = this.yearOKHandler.bind(this);
    this.yearonBlur = this.yearonBlur.bind(this);
    this.changeYearHandler = this.changeYearHandler.bind(this);
    this.choseMonth = this.choseMonth.bind(this);
    this.changeMonthHandler = this.changeMonthHandler.bind(this);
    this.dayHandler = this.dayHandler.bind(this);
    this.yearPreNext = this.yearPreNext.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    let newState = {};

    let newValue =
      (props.year || "") + "-" + (props.month || "") + "-" + (props.day || "");
    if (newValue !== state.oldPropsValue) {
      let date = new Date();
      newState.year = props.year ? props.year * 1 : date.getFullYear();
      newState.tempyear = newState.year;
      newState.month = props.month ? props.month * 1 : date.getMonth() + 1;
      newState.day = props.day * 1;
      newState.oldPropsValue = newValue;
    }

    if (func.diff(state.oldPropsYearArr, props.yearArr)) {
      let yearArr = [];
      if (!props.yearArr) {
        // 没有传
        yearArr = [];
        for (let i = newState.year * 1 - 8; i < newState.year * 1 + 7; i++) {
          yearArr.push(i);
        }
      } else {
        yearArr = props.yearArr;
      }
      newState.yearArr = yearArr;
      newState.oldPropsYearArr = props.yearArr;
      newState.tempyear = yearArr[Math.ceil(yearArr.length / 2)];
    }

    return newState;
  }

  /**
   *为了保持表单特性，方便父组件调用，设置值
   * @param {*} year
   * @param {*} month
   * @param {*} day
   */
  setValue(year, month, day) {
    let date = new Date();
    year = year ? year : date.getFullYear();
    month = month ? month : date.getMonth() + 1;
    day = day ? day : date.getDate();
    this.setState({
      year: year,
      month: month,
      day: day,
    });
  }

  /**
   * 获取值
   */
  getValue() {
    return func.dateformat(
      new Date(this.state.year, this.state.month - 1, this.state.day),
      "yyyy-MM-dd"
    );
  }
  /**
   * 选择年份
   */
  choseYear() {
    this.setState({
      yearViewVisible: !this.state.yearViewVisible,
      monthViewVisible:
        this.props.type === "month" ? this.state.yearViewVisible : false,
    });
  }
  yearInputClick(event) {
    event.target.select();
  }
  /**
   * 年份的onchange事件
   * @param {*} event
   */
  yearOnChange(event) {
    this.setState({
      tempyear: event.target.value.toString(),
    });
  }
  /**
   * 年份回车事件
   * @param {*} event
   */
  yearOKHandler(event) {
    if (event.keyCode === 13) {
      this.yearonBlur(event); //共用函数
    }
  }
  /**
   * 年份失去焦点，确认事件
   * @param {*} event
   */
  yearonBlur(event) {
    let year = event.target.value.trim() << 0; //转成数字
    year < 1900 || year > 9999
      ? Msg.error("不是有效年份")
      : this.changeYearHandler(year);
  }
  /**
   * 年份改变事件
   * @param {*} value
   */
  changeYearHandler(value) {
    if (this.props.type === "year" && this.props.onSelect) {
      this.props.onSelect(value, value, this.props.name);
    } else {
      this.setState(
        {
          yearViewVisible: this.props.type === "year" ? true : false,
          monthViewVisible: this.props.type !== "year" ? true : false,
          year: value,
          tempyear: value,
          day: null, //清空，防止没有
        },
        () => {
          //向上传
          this.props.updateYearAndMonth && this.props.updateYearAndMonth(value);
        }
      );
    }
  }
  /**
   * 年份箭头
   * @param {*} type
   */
  yearPreNext(type) {
    if (this.props.type === "year" && this.props.updateYear) {
      this.props.updateYear(type);
    } else {
      let len = 15;
      let yearArr = [];
      let begin =
        type === 0
          ? this.state.yearArr[0] - len
          : this.state.yearArr[this.state.yearArr.length - 1] + 1;
      for (let i = begin; i < begin + len; i++) {
        yearArr.push(i);
      }
      this.setState({
        yearArr: yearArr,
        tempyear: yearArr[7],
        rangeBegin: null,
        rangeEnd: null,
      });
    }
  }
  /**
   * 选择月份
   */
  choseMonth() {
    this.setState({
      yearViewVisible: false,
      monthViewVisible: !this.state.monthViewVisible,
    });
  }

  /**
   * 月份点击事件
   * @param {*} value
   */
  changeMonthHandler(value) {
    this.setState(
      {
        month: value,
        monthViewVisible: this.props.type === "month" ? true : false,
        day: null,
      },
      () => {
        //向上传，用于范围组件
        this.props.updateYearAndMonth &&
          this.props.updateYearAndMonth(this.state.year, value);
        let valuestr =
          this.state.year +
          "-" +
          (value < 10 ? "0" + value.toString() : value.toString());
        this.props.type === "month" &&
          this.props.onSelect &&
          this.props.onSelect(valuestr, valuestr, this.props.name);
      }
    );
  }

  /**
   * 日点击事件
   * @param {*} day
   * @param {*} event
   */
  dayHandler(day, event) {
    event && event.stopPropagation(); //阻止冒泡，防止下拉时注册的全局事件找不到父节点
    this.setState({
      day: day,
    });
    if (this.props.onSelect) {
      let value =
        this.state.year +
        "-" +
        (this.state.month < 10
          ? "0" + this.state.month.toString()
          : this.state.month.toString()) +
        "-" +
        (day < 10 ? "0" + day.toString() : day);

      this.props.onSelect(value, value, this.props.name);
    }
  }

  /**
   * 渲染年
   * @returns
   */
  renderYear() {
    const yearProps = {
      yearArr: this.state.yearArr,
      year: this.state.year,
      min: this.props.min,
      max: this.props.max,
      isRange: this.props.isRange,
      yearRangeType: this.props.yearRangeType,
      rangeBegin: this.props.rangeBegin,
      rangeEnd: this.props.rangeEnd,
      tempyear: this.state.tempyear,
      yearViewVisible: this.state.yearViewVisible,
      yearInputClick: this.yearInputClick,
      yearonBlur: this.yearonBlur,
      yearOKHandler: this.yearOKHandler,
      yearOnChange: this.yearOnChange,
      changeYearHandler: this.changeYearHandler,
      yearPreNext: this.yearPreNext,
    };

    return (
      <div className="wasabi-calendar-body">
        <YearView {...yearProps}></YearView>
      </div>
    );
  }
  /**
   * 渲染月
   * @returns
   */
  renderMonth() {
    if (this.props.type !== "year") {
      return (
        <MonthView
          isRange={this.props.isRange}
          rangeBegin={this.props.rangeBegin}
          rangeEnd={this.props.rangeEnd}
          year={this.state.year}
          month={this.state.month}
          monthViewVisible={this.state.monthViewVisible}
          changeMonthHandler={this.changeMonthHandler}
        ></MonthView>
      );
    } else {
      return null;
    }
  }

  /**
   * 渲染日部分
   * @returns
   */
  renderDate() {
    if (this.props.type === "date") {
      const dayViewVisible =
        !this.state.monthViewVisible && !this.state.yearViewVisible;
      const dayProps = {
        year: this.state.year,
        month: this.state.month,
        day: this.state.day,
        min: this.props.min,
        max: this.props.max,
        visible: dayViewVisible,
        isRange: this.props.isRange,
        rangeBegin: this.props.rangeBegin,
        rangeEnd: this.props.rangeEnd,
        dayHandler: this.dayHandler,
      };

      return (
        <React.Fragment>
          <WeekView visible={dayViewVisible}></WeekView>
          <DayView {...dayProps}></DayView>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div
        className={"wasabi-calendar " + (this.props.className ?? "")}
        style={this.props.style}
      >
        <CalendarHeader
          type={this.props.type}
          year={this.state.year}
          month={this.state.month}
          choseYear={this.choseYear}
          choseMonth={this.choseMonth}
        ></CalendarHeader>
        <div className="wasabi-calendar-body">
          {this.renderYear()}
          {this.renderMonth()}
          {this.renderDate()}
        </div>
      </div>
    );
  }
}

CalendarView.propTypes = {
  name: PropTypes.string, //字段名称，对应于表单
  type: PropTypes.oneOf(["date", "month", "year"]), //日历类型
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //年
  month: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //月
  day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //日

  /**
   * 三个作为日期范围组件时的属性
   *
   */
  isRange: PropTypes.bool, //是否为范围选择
  rangeBegin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //日期范围选择时结束值 只有日
  rangeEnd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //日期范围选择时结果值
  yearRangeType: PropTypes.oneOf(["first", "second"]), //是第几个,用于年份范围 因为年份范围，两个面板是联动的
  yearArr: PropTypes.array, // 用于年份范围 因为年份范围，两个面板是联动的
  updateYear: PropTypes.func, // 用于年份范围 因为年份范围，两个面板是联动的
  updateYearAndMonth: PropTypes.func, // 年份或月份改变时，更新用于，日期范围，日期时间范围，月份范围
  onSelect: PropTypes.func, //选择后的事件
};

CalendarView.defaultProps = {
  type: "date",
};
export default CalendarView;
