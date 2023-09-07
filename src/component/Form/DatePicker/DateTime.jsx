//create by wangzhiyonglyk
//date:2016-04-25
//desc:日期时间组件

import React, { Component } from "react";
import PropTypes from "prop-types";
import Time from "./Time.jsx";
import Msg from "../../Info/Msg";
import func from "../../libs/func/index.js";
import CalendarView from "./Calendar/CalendarView";
class DateTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPropsValue: "",
      year: null,
      month: null,
      day: null,
      time: null,
      showTime: false,
    };

    this.dateChange = this.dateChange.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    let newValue =
      (props.year || "") +
      "-" +
      (props.month || "") +
      "-" +
      (props.day || "") +
      " " +
      (props.time || "");
    let newState = {};
    if (newValue !== state.oldPropsValue) {
      newState.year = props.year || state.year;
      newState.month = props.month || state.month;
      newState.day = props.day || state.day;
      newState.time = props.time || state.time;
      newState.oldPropsValue = newValue;
      return newState;
    }
    return null;
  }
  dateChange(value) {
    value = value.split("-");
    this.setState({
      year: value[0] * 1,
      month: value[1] * 1,
      day: value[2] * 1,
      showTime: true,
    });
  }

  onSelect() {
    if (this.state.year && this.state.month && this.state.day) {
      let date = new Date(
        this.state.year,
        this.state.month * 1 - 1,
        this.state.day
      );
      date = func.dateformat(date, "yyyy-MM-dd");
      date = date + " " + (this.state.time || "");
      this.props.onSelect && this.props.onSelect(date, date, this.props.name);
    } else {
      Msg.alert("请选择日期");
    }
  }

  timeHandler() {
    console.log("timeHandler");
    this.setState({
      showTime: true,
    });
  }
  timeOnChange(value) {
    this.setState(
      {
        time: value,
        showTime: false,
      },
      () => {
        this.onSelect();
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          <input
            className=" wasabi-input timeinput"
            value={this.state.time || ""}
            onClick={this.timeHandler.bind(this)}
            onChange={() => {}}
          ></input>
          <div
            style={{
              display: this.state.showTime ? "flex" : "none",
            }}
          >
            <Time
              onSelect={this.timeOnChange.bind(this)}
              key="end"
              value={this.state.time}
            
            ></Time>
          </div>
        </React.Fragment>

        {this.state.showTime ? null : (
          <CalendarView
            year={this.state.year}
            month={this.state.month}
            day={this.state.day}
            min={this.props.min}
            max={this.props.max}
            onSelect={this.dateChange}
          ></CalendarView>
        )}
      </React.Fragment>
    );
  }
}
DateTime.propTypes = {
  name: PropTypes.string, //字段名称，对应于表单
  year: PropTypes.number, //年
  month: PropTypes.number, //月
  day: PropTypes.number, //日
  time: PropTypes.string, //时间
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 最小值
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 最大值
  onSelect: PropTypes.func, //选择后的事件
};
export default DateTime;
