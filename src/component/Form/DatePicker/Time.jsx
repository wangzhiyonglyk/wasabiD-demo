import React from "react";
import PropTypes from "prop-types";
import func from "../../libs/func";
import regs from "../../libs/regs";
import "./Calendar/calendar.css";

class Time extends React.Component {
  constructor(props) {
    super(props);
    let hourAm = [];
    for (let i = 0; i < 12; i++) {
      hourAm.push(i);
    }
    let hourPm = [];
    for (let i = 12; i < 24; i++) {
      hourPm.push(i);
    }

    let minuteArr = [];
    for (let i = 1; i < 60; i++) {
      minuteArr.push(i);
    }
    minuteArr.push(0); //0放在最后，因为要隔5个拉长一点

    this.state = {
      oldPropsValue: null,
      hourVisible: true,
      hourAm: hourAm,
      hourPm: hourPm,
      minuteArr: minuteArr,
      hour: null,
      minute: null,
    };
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.hourClick = this.hourClick.bind(this);
    this.minuteClick = this.minuteClick.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (
      func.diff(
        (props.hour || "") + "-" + (props.minute || ""),
        state.oldPropsValue
      )
    ) {
      let date = new Date();
      let hour = props.hour ?? date.getHours();
      let minute = props.minute ?? date.getMinutes();
      return {
        oldPropsValue: (props.hour || "") + "-" + (props.minute || ""),
        hour: hour * 1 < 10 ? "0" + hour * 1 : hour,
        minute: minute * 1 < 10 ? "0" + minute * 1 : minute,
      };
    }

    return null;
  }
  getValue() {
    //获取值
    let value =
      (this.state.hour * 1 >= 10
        ? this.state.hour
        : "0" + this.state.hour * 1) +
      ":" +
      (this.state.minute * 1 >= 10
        ? this.state.minute
        : "0" + this.state.minute * 1);

    return value;
  }
  setValue(value) {
    //设置值
    if (regs.time.test(value)) {
      let hour = value.split(":")[0] * 1;
      let minute = value.split(":")[1] * 1;

      this.setState({
        hour: hour,
        minute: minute,
      });
    } else {
      this.setState({
        hour: null,
        minute: null,
      });
    }
  }

  hourClick(value) {
    this.setState({
      hour: value * 1,
      hourVisible: false,
    });
  }

  minuteClick(value) {
    value = value * 1;
    this.setState(
      {
        minute: value,
        hourVisible: true,
      },
      () => {
        let value = this.getValue();
        this.props.onSelect &&
          this.props.onSelect(value, value, this.props.name);
      }
    );
  }

  render() {
    let arotate = -90; //角度
    let spanrotate = 90;
    return (
      <div className="wasabi-time">
        <div key="1" className="wasabi-time-circle">
          <div
            key="1"
            style={{ display: this.state.hourVisible ? "block" : "none" }}
            className="wasabi-time-circle-hour"
          >
            {this.state.hourAm.map((item, index) => {
              return (
                <a
                  title={item}
                  key={item}
                  onClick={this.hourClick.bind(this, item)}
                  className={
                    "hour " + (item * 1 == this.state.hour ? "active" : "")
                  }
                  style={{
                    transform:
                      "rotate(" +
                      (arotate + index * 30).toString() +
                      "deg) translate(92px)",
                  }}
                >
                  <span
                    style={{
                      transform:
                        "rotate(" +
                        (spanrotate + index * -30).toString() +
                        "deg)",
                    }}
                  >
                    {item < 10 ? "0" + item : item}
                  </span>
                </a>
              );
            })}
            {this.state.hourPm.map((item, index) => {
              return (
                <a
                  title={item}
                  key={item}
                  onClick={this.hourClick.bind(this, item)}
                  className={
                    "hour " + (item * 1 == this.state.hour ? "active" : "")
                  }
                  style={{
                    transform:
                      "rotate(" +
                      (arotate + index * 30).toString() +
                      "deg) translate(62px)",
                  }}
                >
                  <span
                    style={{
                      transform:
                        "rotate(" +
                        (spanrotate + index * -30).toString() +
                        "deg)",
                    }}
                  >
                    {item}
                  </span>
                </a>
              );
            })}
            <span
              className="a-line"
              style={{
                transform:
                  "rotate(" +
                  (arotate + this.state.hour * 30).toString() +
                  "deg)",
                width: this.state.hour < 13 ? 78 : 48,
              }}
            ></span>
          </div>
          <div
            key="2"
            style={{ display: this.state.hourVisible ? "none" : "block" }}
            className="wasabi-time-circle-minute"
          >
            {this.state.minuteArr.map((item, index) => {
              return (
                <a
                  title={item}
                  key={item}
                  onClick={this.minuteClick.bind(this, item)}
                  className={
                    "minute " + (item * 1 == this.state.minute ? "active" : "")
                  }
                  style={{
                    transform:
                      "rotate(" +
                      (arotate + item * 6).toString() +
                      "deg) translate(82px)",
                  }}
                >
                  <span
                    style={{
                      transform:
                        "rotate(" +
                        (spanrotate + item * -6).toString() +
                        "deg)",
                    }}
                  >
                    {item < 10 ? "0" + item : item}
                  </span>
                </a>
              );
            })}
            <span
              className="a-line"
              style={{
                transform:
                  "rotate(" +
                  (arotate + this.state.minute * 6).toString() +
                  "deg)",
              }}
            ></span>
          </div>
        </div>
      </div>
    );
  }
}
Time.propTypes = {
  name: PropTypes.string, //表单字段名称
  hour: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //小时
  minute: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //分钟
};

export default Time;
