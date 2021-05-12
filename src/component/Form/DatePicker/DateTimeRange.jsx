/*
 create by wangzhiyong
 date:2016-06-12
 desc:日期范围选择控件
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Calendar from "./Calendar";
import Time from "./Time.jsx";
import DateRangeHoc from "./DateRangeHoc"
import func from "../../libs/func"
class DateTimeRange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPropsValue: (this.props.firstTime || "") + (this.props.secondTime || ""),
            firstTime: this.props.firstTime || func.dateformat(new Date(), "HH:mm:")+"00",
            secondTime: this.props.secondTime || func.dateformat(new Date(), "HH:mm:")+"59",
            showfirstTime: false,
            showsecondTime: false,
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (((props.firstTime || "") + (props.secondTime || "")) != state.oldPropsValue) {
            return {
                firstTime: props.firstTime,
                secondTime: props.secondTime,
            }
        }
        return null;
    }
    onSelectHandler() {
        let firstDate, secondDate;
        if (this.state.first_min != "") {
            firstDate = this.props.first_year + "-" + (this.state.first_month.toString().length == 1 ? "0" + this.props.first_month : this.props.first_month) + "-" + (this.state.first_min.toString().length == 1 ? "0" + this.props.first_min : this.props.first_min);
        }
        else if (this.state.second_min != "") {
            firstDate = this.props.second_year + "-" + (this.state.second_month.toString().length == 1 ? "0" + this.props.second_month : this.props.second_month) + "-" + (this.state.second_min.toString().length == 1 ? "0" + this.props.second_min : this.props.second_min);
        }

        if (this.state.second_max != "") {
            secondDate = this.props.second_year + "-" + (this.state.second_month.toString().length == 1 ? "0" + this.props.second_month : this.props.second_month) + "-" + (this.state.second_max.toString().length == 1 ? "0" + this.props.second_max : this.props.second_max);
        }
        else if (this.state.first_max != "") {
            secondDate = this.props.first_year + "-" + (this.state.first_month.toString().length == 1 ? "0" + this.props.first_month : this.props.first_month) + "-" + (this.state.first_max.toString().length == 1 ? "0" + this.props.first_max : this.props.first_max);
        }
        if (firstDate && secondDate) {
            if (this.props.onSelect) {
                let firstTime = " " + this.state.firstTime;
                let secondTime = " " + this.props.secondTime;
                this.props.onSelect(firstDate + firstTime + "," + secondDate + secondTime, firstDate + firstTime + "," + secondDate + secondTime, this.props.name);
            }
        }
    }
    beginTimeHandler(time) {
        this.setState({
            firstTime: time,
            showfirstTime: false
        })
        this.props.beginTimeHandler && this.props.beginTimeHandler(time);
    }
    endTimeHandler(time) {
        this.setState({
            secondTime: time,
            showsecondTime: false,
        })
        this.props.endTimeHandler && this.props.endTimeHandler(time);
    }
    firstTimeShowHandler() {
        this.setState({
            showfirstTime: true,
        })
    }
    secondTimeShowHandler() {
        this.setState({
            showsecondTime: true,
        })
    }
    render() {

        return (<div>
            <div className="ok">
                <div style={{ position: "absolute", width: 250 }}>
                    <input className=" wasabi-input timeinput"
                        value={this.state.firstTime} onClick={this.firstTimeShowHandler.bind(this)} onChange={() => { }}></input>

                    <div style={{ display: this.state.showfirstTime ? "inline-block" : "none" }}><Time
                        name="begin" type="time" key="begin"
                        onSelect={this.beginTimeHandler.bind(this)} attachSecond={this.props.attachSecond} allMinute={this.props.allMinute}
                        type="time" key="end" value={this.state.firstTime} ></Time>
                    </div>
                </div>
                <div style={{ position: "absolute", right: 0 }}>
                    <input className=" wasabi-input timeinput"
                        value={this.state.secondTime} onClick={this.secondTimeShowHandler.bind(this)} onChange={() => { }}></input>

                    <div style={{ display: this.state.showsecondTime ? "inline-block" : "none" }}><Time
                        name="begin" type="time" key="begin"
                        onSelect={this.endTimeHandler.bind(this)} attachSecond={this.props.attachSecond} allMinute={this.props.allMinute}
                        type="time" key="end" value={this.state.secondTime} secondRange={true} ></Time>
                    </div>
                </div>

            </div>
            <Calendar isRange={true} year={this.props.first_year} month={this.props.first_month} day={this.props.first_day}
                rangeBegin={this.props.first_rangeBegin} rangeEnd={this.props.first_rangeEnd}
                onSelect={this.props.firstHandler}
                updateYearAndMonth={this.props.firstMonthHandler}
            ></Calendar>
            <Calendar isRange={true} year={this.props.second_year} month={this.props.second_month} day={this.props.second_day}
                rangeBegin={this.props.second_rangeBegin} rangeEnd={this.props.second_rangeEnd}
                onSelect={this.props.secondHandler}
                updateYearAndMonth={this.props.secondMonthHandler}
            ></Calendar>
        </div>)
    }
}
DateTimeRange.propTypes = {
    name: PropTypes.string,//名称
    firstDate: PropTypes.string,//第一个日期
    firstTime: PropTypes.string,//第一个时间
    secondDate: PropTypes.string,//第二个日期
    secondTime: PropTypes.string,//第二个时间
    attachSecond: PropTypes.bool,//是否带上秒
    allMinute: PropTypes.bool,//是否显示全部分钟
    onSelect: PropTypes.func,//确定事件
};
DateTimeRange.defaultProps =
{

    firstDate: "",
    secondDate: "",
    firstTime: "",
    secondTime: "",
    attachSecond: true,
    allMinute: false,
    onSelect: null
};

export default DateRangeHoc(DateTimeRange);
