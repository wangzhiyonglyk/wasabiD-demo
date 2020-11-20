/*
 create by wangzy
 date:2016-05-20
 edit 2019-12-18
 desc:将日期控件表体全独立出来
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Lang from "../Lang/language.js";

import Msg from "../Info/Msg.jsx";

require("../Sass/Form/DateTime.css");
class CalendarBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldYear:this.props.year,
            tempyear:this.props.year
        };
        this.getMonthDays=this.getMonthDays.bind(this);
        this.getFirstDayWeek=this.getFirstDayWeek.bind(this);
        this.dayHandler=this.dayHandler.bind(this);       
        this.yearOnChange=this.yearOnChange.bind(this);
        this.changeYearHandler=this.changeYearHandler.bind(this);
        this.changeMonthHandler=this.changeMonthHandler.bind(this);
        this.yearOKHandler=this.yearOKHandler.bind(this);
        this.yearonBlur=this.yearonBlur.bind(this);
    }
    /**
     * 
     * @param {*} nextProps 
     * @param {*} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.year!=prevState.oldYear){
            return {
                year:nextProps.year,
                oldYear:nextProps.year,
                tempyear:nextProps.year
            }
        }
       return null;
    }
 
   
    dayHandler(day,e) {
        this.setState({
            day: day
        })
       this.props.dayHandler&& this.props.dayHandler(day); // 执行父组件回调函数，改变父组件状态值
    }
    yearOnChange(event) {
        this.setState({
            tempyear: event.target.value.toString().trim(),
        })
    }
    changeYearHandler(value) {
       
        if (this.props.changeYearHandler) {
            this.props.changeYearHandler(value);
        }
    }
    changeMonthHandler(value) {
        if (this.props.changeMonthHandler) {
            this.props.changeMonthHandler(value);
        }
    }
    yearOKHandler(event) {
        if (event.keyCode == 13) {
            this.yearonBlur(event);//共用函数
        }
    }
    yearonBlur(event) {
        let year = event.target.value << 0;//转成数字
        year < 1900 || year > 9999 ? Msg.error("不是有效年份") : this.changeYearHandler(year);
    }
    getMonthDays() {
        //根据月份获取当月总天数
        return new Date(this.props.year, this.props.month, 0).getDate();
    }
    getFirstDayWeek() {
        //获取当月第一天是星期几
        return new Date(this.props.year, this.props.month - 1, 1).getDay();
    }
    render() {
     

        var preMonthWeekDays = [], thisMonthDays = [];
        var getDays = this.getMonthDays(), FirstDayWeek = this.getFirstDayWeek();
        for (var i = 0; i < FirstDayWeek; i++) {
            preMonthWeekDays[i] = i;
        }
        for (var i = 0; i < getDays; i++) {
            thisMonthDays[i] = (i + 1);
        }
        var preMonthWeekDaysNodes = preMonthWeekDays.map(function (item, i) {
            return <div className="datespan" key={i}></div>
        })
        var thisMonthDaysNodes = thisMonthDays.map((item, index) => {
            let choseed = false;//当前日期是否被选中
            if (this.props.isRange) {
                if (this.props.rangeBegin && this.props.rangeEnd && this.props.rangeBegin <= item && this.props.rangeEnd >= item) {
                    choseed = true;
                }
            }
            else if (this.props.day == item) {
                choseed = true;
            }
            var control = null;
            if (item == this.props.rangeBegin &&(!this.props.rangeEnd|| item == this.props.rangeEnd)) {
                control = <div className={"datespan "} key={"li2" + index} onClick={this.dayHandler.bind(this, item)}><div className="onlyradius">{item}</div></div>;
            }
            else if (item == this.props.rangeBegin) {
                control = <div className={"datespan begin"} key={"li2" + index} onClick={this.dayHandler.bind(this, item)}>
                    <div className="blank"><div className="radius">{item}</div></div></div>;
            }
            else if (item == this.props.rangeEnd) {
                control = <div className={"datespan end"} key={"li2" + index} onClick={this.dayHandler.bind(this, item)}>
                    <div className="blank"><div className="radius">{item}</div></div></div>;
            }
            else if (choseed) {
                if (this.props.isRange) {
                    control = <div className={"datespan chosed"} key={"li2" + index} onClick={this.dayHandler.bind(this, item)}>{item}</div>;

                }
                else {
                    control = <div className={"datespan "} key={"li2" + index} onClick={this.dayHandler.bind(this, item)}><div className="onlyradius">{item}</div></div>;

                }
            }
            else {

                control = <div className={"datespan "} key={"li2" + index} onClick={this.dayHandler.bind(this, item)}><div className="radius">{item}</div></div>;
            }
            return control;
        })

        var yearControl = [];
        for (var index = this.props.year * 1 - 7; index <= this.props.year * 1 + 4; index++) {
            if (index == this.props.year * 1) {
                yearControl.push(<div className="datespan chosed" onClick={this.changeYearHandler.bind(this, index)} key={"year" + index}>{index}</div>);
            }
            else {
                yearControl.push(<div className="datespan" onClick={this.changeYearHandler.bind(this, index)} key={"year" + index}>{index}</div>);
            }

        }
        return (
            <div className="wasabi-datetime-body">
                <div className="weekul" style={{ display: (!this.props.changeMonth && !this.props.changeYear) ? "block" : "none" }}>
                    <div className="weekspan">{Lang.cn.SUN}</div>
                    <div className="weekspan">{Lang.cn.MON}</div>
                    <div className="weekspan">{Lang.cn.TUE}</div>
                    <div className="weekspan">{Lang.cn.WED}</div>
                    <div className="weekspan">{Lang.cn.THU}</div>
                    <div className="weekspan">{Lang.cn.FRI}</div>
                    <div className="weekspan">{Lang.cn.SAT}</div>
                </div>
                <div className="dayul" style={{ display: (!this.props.changeMonth && !this.props.changeYear) ? "block" : "none" }}>{preMonthWeekDaysNodes} {thisMonthDaysNodes}</div>
                <div className="wasabi-datetime-month" style={{ display: this.props.changeMonth ? "block" : "none" }}>

                    <div className={"datespan " + ((this.props.month == 1) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 1)}>一月</div>
                    <div className={"datespan " + ((this.props.month == 2) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 2)}>二月</div>
                    <div className={"datespan " + ((this.props.month == 3) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 3)}  >三月</div>
                    <div className={"datespan " + ((this.props.month == 4) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 4)}>四月</div>
                    <div className={"datespan " + ((this.props.month == 5) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 5)}>五月</div>
                    <div className={"datespan " + ((this.props.month == 6) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 6)}>六月</div>
                    <div className={"datespan " + ((this.props.month == 7) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 7)}>七月</div>
                    <div className={"datespan " + ((this.props.month == 8) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 8)}>八月</div>
                    <div className={"datespan " + ((this.props.month == 9) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 9)}>九月</div>
                    <div className={"datespan " + ((this.props.month == 10) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 10)}>十月</div>
                    <div className={"datespan " + ((this.props.month == 11) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 11)}>十一月</div>
                    <div className={"datespan " + ((this.props.month == 12) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 12)}>十二月</div>
                </div>
                <div className="wasabi-datetime-year" style={{ display: this.props.changeYear ? "block" : "none" }}>
                    <div style={{ display: "block", textAlign: "center", marginBottom: 10 }}>
                    <input type="text" value={this.state.tempyear} name="year" onBlur={this.yearonBlur}
                     onKeyUp={this.yearOKHandler} style={{ width: 60, height: 30, paddingLeft: 5 }} 
                     title="回车确认" onChange={this.yearOnChange}></input></div>
                    {yearControl}</div>
            </div>
        )
    }
}

CalendarBody.propTypes = {
    year:PropTypes.oneOfType( [ PropTypes.number,PropTypes.string]),//年
    month: PropTypes.oneOfType( [ PropTypes.number,PropTypes.string]),//月
    day: PropTypes.oneOfType( [ PropTypes.number,PropTypes.string]),//日
    isRange: PropTypes.bool,//是否为范围选择
    rangeBegin: PropTypes.oneOfType( [ PropTypes.number,PropTypes.string]),//日期范围选择时开始值
    rangeEnd:  PropTypes.oneOfType( [ PropTypes.number,PropTypes.string]),//日期范围选择时结束值
    dayHandler: PropTypes.func,//选择后的事件
    changeYear: PropTypes.bool,
    changeMonth: PropTypes.bool,
    changeYearHandler: PropTypes.func,
    changeMonthHandler: PropTypes.func,
    min: PropTypes.oneOfType( [ PropTypes.number,PropTypes.string]),
    max :PropTypes.oneOfType( [ PropTypes.number,PropTypes.string])
};

CalendarBody.defaultProps = {
    year: new Date().getFullYear
};
export default CalendarBody;