/*
create by wangzhiyonglyk
date:2016-05-20
desc:日期范围/[日期时间范围]选择控件 todo 这里要改,太复杂了
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import propsTran from "../../libs/propsTran";
export default function (WrappedComponent) {
  class DateRangeHoc extends Component {
    constructor(props) {
      super(props);

      this.state = propsTran.setDateRangeDefaultState(props); //初始化状态值
      this.firstMonthHandler = this.firstMonthHandler.bind(this);
      this.secondMonthHandler = this.secondMonthHandler.bind(this);
      this.firstHandler = this.firstHandler.bind(this);
      this.secondHandler = this.secondHandler.bind(this);
      this.beginTimeHandler = this.beginTimeHandler.bind(this);
      this.endTimeHandler = this.endTimeHandler.bind(this);
      this.onSelect = this.onSelect.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
      if (
        (props.firstDate || "") +
          (props.firstTime || "") +
          (props.secondDate || "") +
          (props.secondTime || "") !==
        state.oldPropsValue
      ) {
        return propsTran.setDateRangeDefaultState(props);
      }
      return null;
    }

    /**
     * 第一个日期的年与月选择事件
     * @param {*} year
     * @param {*} month
     */
    firstMonthHandler(year, month) {
      let newDate = new Date(year, month, 1);
      let oldDate = new Date(
        this.state.secondYear,
        this.state.secondMonth - 1,
        1
      );
      if (oldDate > newDate) {
        newDate = oldDate;
      }
      this.setState({
        firstYear: year,
        firstMonth: month,
        secondYear: newDate.getFullYear(),
        secondMonth: newDate.getMonth() + 1,
        firstDay: null,
        secondDay: null,
        firstRangeBegin: null,
        firstRangeEnd: null,
        secondRangeBegin: null,
        secondRangeEnd: null,
      });
    }
    /**
     * 第二个日期的年与月选择事件
     * @param {*} year
     * @param {*} month
     */
    secondMonthHandler(year, month) {
      let newDate = new Date(year, month - 2, 1);
      let oldDate = new Date(
        this.state.firstYear,
        this.state.firstMonth - 1,
        1
      );
      if (oldDate < newDate) {
        newDate = oldDate;
      }

      this.setState({
        firstYear: newDate.getFullYear(),
        firstMonth: newDate.getMonth() + 1,
        secondYear: year,
        secondMonth: month,
        firstDay: null,
        secondDay: null,
        firstRangeBegin: null,
        firstRangeEnd: null,
        secondRangeBegin: null,
        secondRangeEnd: null,
      });
    }
    /**
     * 第一个日期选择事件
     * @param {*} value 值
     */
    firstHandler(value) {
      //
      if (value && value.indexOf(" ") > -1) {
        //有时间
        value = value.split(" ")[0];
      }
      let newState = {
        firstYear: value.split("-")[0] * 1,
        firstMonth: value.split("-")[1] * 1,
        firstDay: value.split("-")[2] * 1,
      };
      let firstRangeBegin = this.state.firstRangeBegin;
      let firstRangeEnd = this.state.firstRangeEnd;
      let secondRangeBegin = this.state.secondRangeBegin;
      let secondRangeEnd = this.state.secondRangeEnd;
      if (!firstRangeBegin) {
        //第一个日期的开始日期日期为空
        newState.firstRangeBegin = newState.firstDay;
        if (secondRangeBegin && secondRangeEnd) {
          //第二个日期的日期不为空
          //清空
          newState.secondRangeBegin = null;
          newState.secondRangeEnd = null;
          newState.secondDay = null;
        } else if (secondRangeBegin) {
          //第二个日期的开始日期不为空
          newState.firstRangeEnd = 32;
          newState.secondRangeEnd = secondRangeBegin;
          newState.secondRangeBegin = -1;
        }
      } else {
        //不为空
        //清空第二个日期
        newState.secondRangeBegin = null;
        newState.secondRangeEnd = null;
        newState.secondDay = null;
        if (firstRangeEnd) {
          //第一个日期的结束日期也不为空或者第二个日期的开始日期不为空，初始化开始日期
          newState.firstRangeBegin = newState.firstDay;
          newState.firstRangeEnd = null;
        } else {
          if (newState.firstDay * 1 < firstRangeBegin * 1) {
            //选择的日期比第二个日期的开始日期还要小，对换
            newState.firstRangeBegin = newState.firstDay;
            newState.firstRangeEnd = firstRangeBegin;
          } else {
            newState.firstRangeEnd = newState.firstDay; //第二次点击
          }
        }
      }

      /*判断与后面一个的复合情况*/
      this.setState(newState, () => {
        this.onSelect();
      });
    }
    /**
     * 第二个日期的选择事件
     * @param {*} value
     */
    secondHandler(value) {
      //
      if (value && value.indexOf(" ") > -1) {
        //有时间
        value = value.split(" ")[0];
      }
      let newState = {
        secondYear: value.split("-")[0] * 1,
        secondMonth: value.split("-")[1] * 1,
        secondDay: value.split("-")[2] * 1,
      };
      let firstRangeBegin = this.state.firstRangeBegin;
      let firstRangeEnd = this.state.firstRangeEnd;
      let secondRangeBegin = this.state.secondRangeBegin;
      let secondRangeEnd = this.state.secondRangeEnd;
      if (!secondRangeBegin) {
        //第二个日期的开始日期为空
        newState.secondRangeBegin = newState.secondDay;
        if (firstRangeBegin && firstRangeEnd) {
          //第一日期的结束日期不为空
          newState.firstRangeBegin = null;
          newState.firstRangeEnd = null;
          newState.firstDay = null;
        } else if (firstRangeBegin) {
          //第一个日期的开始日期不为空
          newState.firstRangeEnd = 32;
          newState.secondRangeBegin = -1;
          newState.secondRangeEnd = newState.secondDay;
        }
      } else {
        //清空第一个日期
        newState.firstRangeBegin = null;
        newState.firstRangeEnd = null;
        newState.firstDay = null;
        if (secondRangeEnd) {
          //第二个日期的结束日期不为空
          newState.secondRangeBegin = newState.secondDay;
          newState.secondRangeEnd = null;
        } else {
          if (newState.secondDay * 1 < secondRangeBegin * 1) {
            //选择的日期比第二个日期的开始日期还要小，对换
            newState.secondRangeBegin = newState.secondDay;
            newState.secondRangeEnd = secondRangeBegin;
          } else {
            newState.secondRangeEnd = newState.secondDay;
          }
        }
      }
      /*判断与后面一个的复合情况*/
      this.setState(newState, () => {
        this.onSelect();
      });
    }
    /**
     * 第一个时间选择
     * @param {*} time
     */
    beginTimeHandler(time) {
      //
      this.setState(
        {
          firstTime: time,
        },
        () => {
          this.onSelect();
        }
      );
    }
    /**
     * 第二个时间选择
     * @param {*} time
     */
    endTimeHandler(time) {
      //
      this.state.secondTime = time;
      this.setState(
        {
          secondTime: time,
        },
        () => {
          this.onSelect();
        }
      );
    }
    /**
     * 值确认事件
     */
    onSelect(hide) {
      let firstDate, secondDate;
      if (this.state.firstRangeBegin) {
        firstDate =
          this.state.firstYear +
          "-" +
          (this.state.firstMonth.toString().length == 1
            ? "0" + this.state.firstMonth
            : this.state.firstMonth) +
          "-" +
          (this.state.firstRangeBegin.toString().length == 1
            ? "0" + this.state.firstRangeBegin
            : this.state.firstRangeBegin);
      } else if (this.state.secondRangeBegin) {
        firstDate =
          this.state.secondYear +
          "-" +
          (this.state.secondMonth.toString().length == 1
            ? "0" + this.state.secondMonth
            : this.state.secondMonth) +
          "-" +
          (this.state.secondRangeBegin.toString().length == 1
            ? "0" + this.state.secondRangeBegin
            : this.state.secondRangeBegin);
      }
      if (this.state.secondRangeEnd) {
        secondDate =
          this.state.secondYear +
          "-" +
          (this.state.secondMonth.toString().length == 1
            ? "0" + this.state.secondMonth
            : this.state.secondMonth) +
          "-" +
          (this.state.secondRangeEnd.toString().length == 1
            ? "0" + this.state.secondRangeEnd
            : this.state.secondRangeEnd);
      } else if (this.state.firstRangeEnd) {
        secondDate =
          this.state.firstYear +
          "-" +
          (this.state.firstMonth.toString().length == 1
            ? "0" + this.state.firstMonth
            : this.state.firstMonth) +
          "-" +
          (this.state.firstRangeEnd.toString().length == 1
            ? "0" + this.state.firstRangeEnd
            : this.state.firstRangeEnd);
      }
      if (this.props.onSelect) {
        if (firstDate && secondDate) {
          firstDate =
            firstDate +
            (this.state.firstTime ? " " + this.state.firstTime : "");
          secondDate =
            secondDate +
            (this.state.secondTime ? " " + this.state.secondTime : "");
          this.props.onSelect(
            firstDate + "," + secondDate,
            firstDate + "," + secondDate,
            this.props.name,
            hide
          );
        }
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          firstHandler={this.firstHandler}
          secondHandler={this.secondHandler}
          firstMonthHandler={this.firstMonthHandler}
          secondMonthHandler={this.secondMonthHandler}
          beginTimeHandler={this.beginTimeHandler}
          endTimeHandler={this.endTimeHandler}
        ></WrappedComponent>
      );
    }
  }
  DateRangeHoc.propTypes = {
    name: PropTypes.string, //名称
    firstDate: PropTypes.string, //第一个日期
    secondDate: PropTypes.string, //第二个日期
    firstTime: PropTypes.string, //第一个时间
    secondTime: PropTypes.string, //第二个时间
    attachSecond: PropTypes.bool, //是否带上秒
    onSelect: PropTypes.func, //确定事件
  };
  DateRangeHoc.defaultProps = {
    attachSecond: true,
  };
  return DateRangeHoc;
}
