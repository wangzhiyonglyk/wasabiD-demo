/*
 create by 王志勇
 date:2016-06-12
 desc:日期范围选择控件
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import CalendarView from "./Calendar/CalendarView";
import Time from "./Time.jsx";
import DateRangeHoc from "./DateRangeHoc";
import func from "../../libs/func";
class DateTimeRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPropsValue:
        (this.props.firstTime || "") + (this.props.secondTime || ""),
      firstTime:
        this.props.firstTime || func.dateformat(new Date(), "HH:mm:") + "00",
      secondTime:
        this.props.secondTime || func.dateformat(new Date(), "HH:mm:") + "59",
      showfirstTime: false,
      showsecondTime: false,
    };
    this.onSelectHandler = this.onSelectHandler.bind(this);
    this.beginTimeHandler = this.beginTimeHandler.bind(this);
    this.endTimeHandler = this.endTimeHandler.bind(this);
    this.firstTimeShowHandler = this.firstTimeShowHandler.bind(this);
    this.secondTimeShowHandler = this.secondTimeShowHandler.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (
      (props.firstTime || "") + (props.secondTime || "") !==
      state.oldPropsValue
    ) {
      return {
        firstTime: props.firstTime,
        secondTime: props.secondTime,
      };
    }
    return null;
  }
  onSelectHandler() {
    let firstDate, secondDate;
    if (this.state.first_min !== "") {
      firstDate =
        this.props.firstYear +
        "-" +
        (this.state.firstMonth.toString().length == 1
          ? "0" + this.props.firstMonth
          : this.props.firstMonth) +
        "-" +
        (this.state.first_min.toString().length == 1
          ? "0" + this.props.first_min
          : this.props.first_min);
    } else if (this.state.second_min !== "") {
      firstDate =
        this.props.secondYear +
        "-" +
        (this.state.secondMonth.toString().length == 1
          ? "0" + this.props.secondMonth
          : this.props.secondMonth) +
        "-" +
        (this.state.second_min.toString().length == 1
          ? "0" + this.props.second_min
          : this.props.second_min);
    }

    if (this.state.second_max !== "") {
      secondDate =
        this.props.secondYear +
        "-" +
        (this.state.secondMonth.toString().length == 1
          ? "0" + this.props.secondMonth
          : this.props.secondMonth) +
        "-" +
        (this.state.second_max.toString().length == 1
          ? "0" + this.props.second_max
          : this.props.second_max);
    } else if (this.state.first_max !== "") {
      secondDate =
        this.props.firstYear +
        "-" +
        (this.state.firstMonth.toString().length == 1
          ? "0" + this.props.firstMonth
          : this.props.firstMonth) +
        "-" +
        (this.state.first_max.toString().length == 1
          ? "0" + this.props.first_max
          : this.props.first_max);
    }
    if (firstDate && secondDate) {
      if (this.props.onSelect) {
        let firstTime = " " + this.state.firstTime;
        let secondTime = " " + this.props.secondTime;
        this.props.onSelect(
          firstDate + firstTime + "," + secondDate + secondTime,
          firstDate + firstTime + "," + secondDate + secondTime,
          this.props.name
        );
      }
    }
  }
  beginTimeHandler(time) {
    this.setState({
      firstTime: time,
      showfirstTime: false,
    });
    this.props.beginTimeHandler && this.props.beginTimeHandler(time);
  }
  endTimeHandler(time) {
    this.setState({
      secondTime: time,
      showsecondTime: false,
    });
    this.props.endTimeHandler && this.props.endTimeHandler(time);
  }
  firstTimeShowHandler() {
    this.setState({
      showfirstTime: true,
    });
  }
  secondTimeShowHandler() {
    this.setState({
      showsecondTime: true,
    });
  }
  onClick(type) {
    let secondDate = new Date();
    let firstDate;
    switch (type) {
      case 1:
        firstDate = func.getNextDay(secondDate, -1);
        break;
      case 2:
        firstDate = func.getNextDay(secondDate, -7);
        break;
      case 3:
        firstDate = func.getNextMonth(secondDate, -1);
        break;
      case 4:
        firstDate = func.getNextMonth(secondDate, -3);
        break;
      case 5:
        firstDate = func.getNextYear(secondDate, -1);
        break;
      default:
        break;
    }

    let value =
      func.dateformat(firstDate, "yyyy-MM-dd") +
      " " +
      this.state.firstTime +
      "," +
      func.dateformat(secondDate, "yyyy-MM-dd") +
      " " +
      this.state.secondTime;
    this.props.onSelect && this.props.onSelect(value, value, this.props.name);
  }
  render() {
    return (
      <React.Fragment>
        <div className="wasabi-date-qick">
          <a key="1" onClick={this.onClick.bind(this, 1)}>
            最近一天
          </a>
          <a key="2" onClick={this.onClick.bind(this, 2)}>
            最近一周
          </a>
          <a key="3" onClick={this.onClick.bind(this, 3)}>
            最近一月
          </a>
          <a key="4" onClick={this.onClick.bind(this, 4)}>
            最近三个月
          </a>
          <a key="5" onClick={this.onClick.bind(this, 5)}>
            {" "}
            最近一年
          </a>
        </div>
        <div className="ok" style={{ height: 40 }}>
          <div style={{ position: "absolute", width: 290, zIndex: 3 }}>
            <input
              className=" wasabi-input timeinput"
              value={this.state.firstTime}
              onClick={this.firstTimeShowHandler.bind(this)}
              onChange={() => {}}
            ></input>

            <div
              style={{
                display: this.state.showfirstTime ? "inline-block" : "none",
              }}
            >
              <Time
                name="begin"
                type="time"
                key="begin"
                onSelect={this.beginTimeHandler.bind(this)}
                attachSecond={this.props.attachSecond}
                value={this.state.firstTime}
              ></Time>
            </div>
          </div>
          <div style={{ position: "absolute", right: 0, zIndex: 3 }}>
            <input
              className=" wasabi-input timeinput"
              value={this.state.secondTime}
              onClick={this.secondTimeShowHandler.bind(this)}
              onChange={() => {}}
            ></input>

            <div
              style={{
                display: this.state.showsecondTime ? "inline-block" : "none",
              }}
            >
              <Time
                name="end"
                type="time"
                key="end"
                onSelect={this.endTimeHandler.bind(this)}
                attachSecond={this.props.attachSecond}
                value={this.state.secondTime}
                secondRange={true}
              ></Time>
            </div>
          </div>
        </div>
        <CalendarView
          isRange={true}
          year={this.props.firstYear}
          month={this.props.firstMonth}
          day={this.props.firstDay}
          rangeBegin={this.props.firstRangeBegin}
          rangeEnd={this.props.firstRangeEnd}
          onSelect={this.props.firstHandler}
          updateYearAndMonth={this.props.firstMonthHandler}
        ></CalendarView>

        <CalendarView
          isRange={true}
          year={this.props.secondYear}
          month={this.props.secondMonth}
          day={this.props.secondDay}
          rangeBegin={this.props.secondRangeBegin}
          rangeEnd={this.props.secondRangeEnd}
          onSelect={this.props.secondHandler}
          updateYearAndMonth={this.props.secondMonthHandler}
        ></CalendarView>
      </React.Fragment>
    );
  }
}
DateTimeRange.propTypes = {
  name: PropTypes.string, //名称
  firstDate: PropTypes.string, //第一个日期
  firstTime: PropTypes.string, //第一个时间
  secondDate: PropTypes.string, //第二个日期
  secondTime: PropTypes.string, //第二个时间
  attachSecond: PropTypes.bool, //是否带上秒

  onSelect: PropTypes.func, //确定事件
};
DateTimeRange.defaultProps = {
  attachSecond: true,
};

export default DateRangeHoc(DateTimeRange);
