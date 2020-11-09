/*
create by wangzy
date:2016-05-20
desc:日期范围选择控件
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import DateD from "./DateD.jsx";
import _DateRange from "./baseClass/_DateRange"
class DateRange extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<div >
            <DateD isRange={true} year={this.props.first_year} month={this.props.first_month} day={this.props.first_day}
                rangeBegin={this.props.first_rangeBegin} rangeEnd={this.props.first_rangeEnd}
                onSelect={this.props.firstHandler}
                updateYearAndMonth={this.props.firstMonthHandler}
            ></DateD>
            <DateD isRange={true} year={this.props.second_year} month={this.props.second_month} day={this.props.second_day}
                rangeBegin={this.props.second_rangeBegin} rangeEnd={this.props.second_rangeEnd}
                onSelect={this.props.secondHandler}
                updateYearAndMonth={this.props.secondMonthHandler}
            ></DateD>

        </div>)
    }
}
DateRange.propTypes = {
    name: PropTypes.string,//名称
    firstDate: PropTypes.string,//第一个日期
    secondDate: PropTypes.string,//第二个日期
    onSelect: PropTypes.func,//确定事件
};
DateRange.defaultProps = {
    name: "",
    firstDate: "",
    secondDate: "",
    onSelect: "",//

};
export default _DateRange(DateRange);
