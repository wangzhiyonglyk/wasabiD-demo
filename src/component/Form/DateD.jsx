//create by wangzhiyong
//date:2016-04-25
//edit 2016-09-27重写
//desc:日期组件，
import React, { Component } from "react";
import PropTypes from "prop-types";

import CalendarHeader from "./CalendarHeader.jsx";
import CalendarBody from "./CalendarBody.jsx";

import("../Sass/Form/DateTime.css");
class DateD extends Component {
    constructor(props) {
        super(props)
        let newDate = new Date();
        let year =newDate.getFullYear();
        let month = newDate.getMonth()+1;

        this.state = {
            oldPropsValue: (this.props.year || "") + "-"+(this.props.month || "") + "-" + (this.props.day || ""),//保留原来的值,方便父组件强制更新
            year: this.props.year ? this.props.year : year,
            month: this.props.month ? this.props.month : month,
            day: this.props.day || "",
            changeYear: false,//选择年份
            changeMonth: false,//选择月份
        }
        this.updateYearAndMonth = this.updateYearAndMonth.bind(this);
        this.dayHandler = this.dayHandler.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        this.changeYearHandler = this.changeYearHandler.bind(this);
        this.changeMonthHandler = this.changeMonthHandler.bind(this);
    }
   
    static getDerivedStateFromProps(props, state) {
        let newState = {};
        if ((props.year || "") + "-"+(props.month || "") + "-" + (props.day || "") != state.oldPropsValue) {
            newState.year = props.year ? props.year : state.year;
            newState.month = props.month ? props.month : state.month;
            newState.day = props.day;
            newState.oldPropsValue=(props.year || "") + "-"+(props.month || "") + "-" + (props.day || "");
            return newState;
        }
        return null;
    }

    updateYearAndMonth(filterYear, filterMonth) {
        this.setState({
            year: filterYear,
            month: filterMonth,
            day: null,//清空

        });
        if (this.props.updateYearAndMonth != null) {
            this.props.updateYearAndMonth(filterYear, filterMonth);
        }
    }
    dayHandler(day,event) {
        event&& event.stopPropagation();//阻止冒泡，防止下拉时注册的全局事件找不到父节点
        this.setState({
            day: day,

        })
        if (this.props.onSelect) {
            let value = this.state.year + "-" + (this.state.month.toString().length == 1 ? "0" + this.state.month.toString() : this.state.month)
                + "-" + (day < 10 ? "0" + day.toString() : day);

            this.props.onSelect(value, value, this.props.name);
        }

    }
    
    changeYear() {
        this.setState({
            changeYear: !this.state.changeYear,
            changeMonth: false,
        })

    }
    changeMonth() {
        this.setState({
            changeYear: false,
            changeMonth: !this.state.changeMonth,
        })
    }
    changeYearHandler(value) {

        this.setState({
            year: value,
            changeYear: false,
            changeMonth: false,
            day: null,//清空
          

        })
        if (this.props.updateYearAndMonth != null) {
            this.props.updateYearAndMonth(value, this.state.month);
        }
    }
    changeMonthHandler(value) {
        this.setState({
            month: value,
            changeYear: false,
            changeMonth: false,
            day: null,//清空
           
        })
        if (this.props.updateYearAndMonth != null) {
            this.props.updateYearAndMonth(this.state.year, value);
        }
    }

    render() {

        return (
            <div className="wasabi-datetime"  >
                <CalendarHeader
                    year={this.state.year}
                    month={this.state.month}
                    updateFilter={this.updateYearAndMonth}
                    changeYear={this.changeYear}
                    changeMonth={this.changeMonth}
                />

                <CalendarBody
                    year={this.state.year}
                    month={this.state.month}
                    day={this.state.day}
                    isRange={this.props.isRange}
                    rangeBegin={this.props.rangeBegin}
                    rangeEnd={this.props.rangeEnd}
                    dayHandler={this.dayHandler}
                    changeYear={this.state.changeYear}
                    changeMonth={this.state.changeMonth}
                    changeYearHandler={this.changeYearHandler}
                    changeMonthHandler={this.changeMonthHandler}
                />
            </div>
        )
    }
}
DateD.propTypes = {
    name: PropTypes.string,//字段名称，对应于表单
    year: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),//年
    month: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),//月
    day: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),//日
    isRange: PropTypes.bool,//是否为范围选择
   // 日期范围选择时开始值
   rangeBegin: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),//日期范围选择时开始值
    rangeEnd: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),//日期范围选择时结果值
    onSelect: PropTypes.func,//选择后的事件


};
DateD.defaultProps = {
    year: null,
    month: null,
    day: null,
    isRange: false,///默认否
    rangeBegin: null,//默认为空，日期范围选择时开始值
    rangeEnd: null,//默认为空，日期范围选择时结果值

};
export default DateD;