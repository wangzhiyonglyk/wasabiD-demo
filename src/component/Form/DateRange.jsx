/*
create by wangzy
date:2016-05-20
desc:日期范围选择控件
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

import regs from "../Lang/regs.js";
import DateD from "./DateD.jsx";
import Button from "../Buttons/Button.jsx";

import validate from "../Mixins/validate.js";
import propsTran from "../libs/propsTran";
class DateRange extends Component {

    constructor(props) {
        super(props)
        this.state = propsTran.setDateRangeDefaultState(props);
       
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.firstMonthHandler = this.firstMonthHandler.bind(this);
        this.secondMonthHandler = this.secondMonthHandler.bind(this);
        this.firstHandler = this.firstHandler.bind(this);
        this.secondHandler = this.secondHandler.bind(this);
        this.onSelectHandler = this.onSelectHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
    }
    //todo 
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     this.setDefaultState(nextProps);
    // }
   
    static getDerivedStateFromProps(nextProps, prevState) {
        
        return propsTran.setDateRangeDefaultState(nextProps);
    }
    setValue(value) {
        if (this.validate(value)) {
            this.setState({
                value: value
            })
        }
    }
    getValue() {

        return this.state.value;
    }
    validate(value) {

        return validate.call(this, value)
    }
    firstMonthHandler(year, month) {
        this.setState({
            first_year: year,
            first_month: month,
            first_day: "",
            first_min: "",
            first_max: "",
        })
    }
    secondMonthHandler(year, month) {
        this.setState({
            second_year: year,
            second_month: month,
            second_day: "",
            second_min: "",
            second_max: "",
        })
    }
    firstHandler(value) {//开始日期选择事件
        if (value && value.indexOf(" ") > -1) {//有时间
            value = value.split(" ")[0];
        }
        var min_day = this.state.first_min;
        var max_day = this.state.first_max;
        /*单向选择判断*/
        if ((!min_day && !max_day) || min_day != max_day) {
            //都为空，或者已经选择过了，重新选择
            min_day = value.split("-")[2] * 1;
            max_day = value.split("-")[2] * 1;
        }
        else if (min_day == max_day) {
            //已经选择了一个
            if (min_day < value.split("-")[2] * 1) {
                //比最小值大
                max_day = value.split("-")[2] * 1;
            }
            else {//比最小值小，调换
                max_day = min_day;
                min_day = value.split("-")[2] * 1;

            }
        }
        /*单向选择判断*/

        /*判断与第二个日期的复合情况*/
        var second_min = this.state.second_min;
        var second_max = this.state.second_max;
        if (min_day == max_day) {//第一个日期只选择了一个
            if (this.state.beign_min != this.state.first_max) {//第一个日期之前已经选择过了属于重新选择，第二个日期清空
                second_min = second_max = "";
            }
            else {
                //第一个日期之前没有选择过不属于重新选择
                if (second_min) {//第二个日期框有选择
                    second_min = 1;//设置第二个日期中的开始日期为1
                    max_day = 31;//设置第一个日期中的结束日期为最大
                }
            }

        }
        else {//第一个日期中的开始日期与日期不相同，第二个日期默认清空
            second_min = "";
            second_min = "";
        }
        /*判断与后面一个的复合情况*/
        this.setState({
            first_year: value.split("-")[0] * 1,
            first_month: value.split("-")[1] * 1,
            first_day: value.split("-")[2] * 1,
            first_min: min_day,
            first_max: max_day,
            second_min: second_min,
            second_max: second_max,
        });
    }
    secondHandler(value) {//结束日期选择事
        if (value && value.indexOf(" ") > -1) {//有时间
            value = value.split(" ")[0];
        }
        var min_day = this.state.second_min;
        var max_day = this.state.second_max;
        /*单向选择判断*/
        if ((!min_day && !max_day) || min_day != max_day) {
            //都为空，或者已经选择过了，重新选择
            min_day = value.split("-")[2] * 1;
            max_day = value.split("-")[2] * 1;
        }
        else if (min_day == max_day) {
            //已经选择了一个
            if (min_day < value.split("-")[2] * 1) {
                //比最小值大
                max_day = value.split("-")[2] * 1;
            }
            else {//比最小值小，调换
                max_day = min_day;
                min_day = value.split("-")[2] * 1;

            }
        }
        /*单向选择判断*/

        /*判断与第一个的复合情况*/
        var first_min = this.state.first_min;
        var first_max = this.state.first_max;
        if (min_day == max_day) {//第二个日期只选择了一个
            if (this.state.second_min != this.state.second_max) {//第二个日期之前已经选择过了属于重新选择，第一个日期清空
                first_min = first_max = "";

            } else {  //第二个日期之前没有选择过不属于重新选择
                if (first_min) {//第一个日期框有选择
                    first_max = 31;//设置第一个日期 的结束日期为最大
                    min_day = 1;//设置第二个日期 的开始日期为最为1
                }
            }
        }
        else {//第二个日期中的开始日期与日期不相同，第一个日期默认清空
            first_min = "";
            first_max = "";
        }
        this.setState({
            second_year: value.split("-")[0] * 1,
            second_month: value.split("-")[1] * 1,
            second_day: value.split("-")[2] * 1,
            second_min: min_day,
            second_max: max_day,
            first_min: first_min,
            first_max: first_max,
        });
    }
    onSelectHandler() {
        var firstDate, secondDate;
        if (this.state.first_min != "") {
            firstDate = this.state.first_year + "-" + (this.state.first_month.toString().length == 1 ? "0" + this.state.first_month : this.state.first_month) + "-" + (this.state.first_min.toString().length == 1 ? "0" + this.state.first_min : this.state.first_min);
        }
        else if (this.state.second_min != "") {
            firstDate = this.state.second_year + "-" + (this.state.second_month.toString().length == 1 ? "0" + this.state.second_month : this.state.second_month) + "-" + (this.state.second_min.toString().length == 1 ? "0" + this.state.second_min : this.state.second_min);
        }

        if (this.state.second_max != "") {
            secondDate = this.state.second_year + "-" + (this.state.second_month.toString().length == 1 ? "0" + this.state.second_month : this.state.second_month) + "-" + (this.state.second_max.toString().length == 1 ? "0" + this.state.second_max : this.state.second_max);
        }
        else if (this.state.first_max != "") {
            secondDate = this.state.first_year + "-" + (this.state.first_month.toString().length == 1 ? "0" + this.state.first_month : this.state.first_month) + "-" + (this.state.first_max.toString().length == 1 ? "0" + this.state.first_max : this.state.first_max);
        }

        if (this.props.onSelect != "") {

            if (firstDate && secondDate) {

                this.props.onSelect(firstDate + "," + secondDate, firstDate + "," + secondDate, this.props.name);
            }

        }

    }
    cancelHandler() {
        this.setState({
            value: "",
            text: "",
        })
        this.props.onSelect && this.props.onSelect("", "", this.props.name, null);

    }

    render() {
      
        return (<div >
            <div className="ok">
                <Button title="确定" name="ok" size="small" theme="primary" onClick={this.onSelectHandler}></Button>
                <Button title="取消" name="cancel" size="small" theme="cancel" onClick={this.cancelHandler}></Button>
            </div>
            <DateD isRange={true} year={this.state.first_year} month={this.state.first_month} day={this.state.first_day}
                min={this.state.first_min} max={this.state.first_max}
                onSelect={this.firstHandler}
                updateYearAndMonth={this.firstMonthHandler}
            ></DateD>
            <DateD isRange={true} year={this.state.second_year} month={this.state.second_month} day={this.state.second_day}
                min={this.state.second_min} max={this.state.second_max}
                onSelect={this.secondHandler}
                updateYearAndMonth={this.secondMonthHandler}
            ></DateD>

        </div>)
    }
}
DateRange.propTypes = {
    name: PropTypes.string,//名称
    firstDate: PropTypes.string,//第一个日期
    secondDate: PropTypes.string,//第二个日期
    onSelect: PropTypes.func,//确定事件
    time: PropTypes.string,
    timeEnd: PropTypes.string,
};
DateRange.defaultProps = {

    name: "",
    firstDate: "",
    secondDate: "",
    onSelect: "",//

};
export default DateRange;
