//create by wangzhiyong
//date:2016-04-25
//desc:日期时间组件，

import React, { Component } from "react";
import PropTypes from "prop-types";
import Time from "./Time.jsx";
import CalendarHeader from "./CalendarHeader.jsx";
import CalendarBody from "./CalendarBody.jsx";
import validate from "../Mixins/validate.js";
import Msg from '../Info/Msg'
import mixins from '../Mixins/mixins'
import func from '../libs/func'
import("../Sass/Form/DateTime.css");
class DateTime extends Component {
    constructor(props) {
        super(props);
        let newDate = new Date();
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        this.state = {
            oldPropsValue: (this.props.year || "") + "-" + (this.props.month || "") + "-" + (this.props.day || "") + " " + (this.props.time || ""),//保留原来的值,方便父组件强制更新
            year: this.props.year ? this.props.year : year * 1,
            month: this.props.month ? this.props.month : month * 1,
            day: this.props.day ? this.props.day : newDate.getDate(),
            time: this.props.time ? this.props.time :this.props.attachSecond? func.dateformat(newDate, 'HH:mm:')+"00":func.dateformat(newDate, 'HH:mm'),
            changeYear: false,//选择年份
            changeMonth: false,//选择月份
        }
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.updateYearAndMonth = this.updateYearAndMonth.bind(this);
        this.dayHandler = this.dayHandler.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        this.changeYearHandler = this.changeYearHandler.bind(this);
        this.changeMonthHandler = this.changeMonthHandler.bind(this);
     
    }
    static getDerivedStateFromProps(props, state) {
        let newState = {};
        if ((props.year || "") + "-" + (props.month || "") + "-" + (props.day || "") + " " + (props.time || "") != state.oldPropsValue) {
            newState.year = props.year ? props.year : state.year;
            newState.month = props.month ? props.month : state.month;
            newState.day = props.day||state.day;
            newState.time = props.time||state.time;
            newState.oldPropsValue = (props.year || "") + "-" + (props.month || "") + "-" + (props.day || "") + " " + (props.time || "");
            return newState;
        }
        return null;
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
    updateYearAndMonth(filterYear, filterMonth) {
        this.setState({
            year: filterYear,
            month: filterMonth,
            day: null,//清空
            min: null,
            max: null,
        });

        if (this.props.updateYearAndMonth != null) {
            this.props.updateYearAndMonth(filterYear, filterMonth);
        }
    }
    dayHandler(day) {
        this.state.day=day;
       this.setState({
            day: day,
        })
        this.onSelect && this.onSelect(false)

    }
    onSelect(hide) {

        if (this.state.year && this.state.month && this.state.day) {
            let value = this.state.year + "-" + (this.state.month.toString().length == 1 ? "0" + this.state.month.toString() : this.state.month)
                + "-" + (this.state.day < 10 ? "0" + this.state.day.toString() : this.state.day.toString());
            this.props.onSelect && this.props.onSelect(value + " " + this.state.time, value + " " + this.state.time, this.props.name,hide)
        } else {
            Msg.alert("请选择日期");
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
            min: null,
            max: null,
        })
    }
    changeMonthHandler(value) {
        this.setState({
            month: value,
            changeYear: false,
            changeMonth: false,
            day: null,//清空
            min: null,
            max: null,
        })
    }
    timeHandler() {
        this.setState({
            showTime: true,
        })
    }
    timeOnChange(value) {
        this.setState({
            time: value,
            showTime: false
        }, () => {
            this.onSelect(true);
        })

    }
    render() {

        return (
            <div className={this.props.className + " "} ref="picker" style={this.props.style}>
                <div style={{ position: "relative", height: 32 }}>
                    <input className=" wasabi-form-control timeinput"
                        value={this.state.time} onClick={this.timeHandler.bind(this)} onChange={() => { }}></input>

                    <div style={{ display: this.state.showTime ? "inline-block" : "none" ,zIndex:1}}><Time onSelect={this.timeOnChange.bind(this)}
                        ref="time" type="time" key="end" value={this.state.time}  attachSecond={this.props.attachSecond} allMinute={this.props.allMinute}></Time></div>
                </div>
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
                        dayHandler={this.dayHandler}
                        changeYear={this.state.changeYear}
                        changeMonth={this.state.changeMonth}
                        changeYearHandler={this.changeYearHandler}
                        changeMonthHandler={this.changeMonthHandler}
                    />
                </div>
            </div>
        )
    }
}
DateTime.propTypes = {
    name: PropTypes.string,//字段名称，对应于表单
    year: PropTypes.number,//年
    month: PropTypes.number,//月
    day: PropTypes.number,//日
    time: PropTypes.string,//时间
    attachSecond: PropTypes.bool,//是否带上秒
    allMinute: PropTypes.bool,//是否显示全部分钟
    onSelect: PropTypes.func,//选择后的事件

}
DateTime.defaultProps =
{
    className: "",
    type: "datetime",
    year: null,
    month: null,
    day: null,
    time: null,
    attachSecond: true,
    allMinute:false,
    onSelect:null
};

export default mixins(DateTime, [validate]);