//create by wangzhiyong
//date:2016-04-25
//edit 2016-09-27重写
//desc:日期组件，
import React, { Component } from "react";
import PropTypes from "prop-types";
import lang from "../../Lang/language.js";
import utils from "../../libs/func"
import("./Calendar.css");
class Calendar extends Component {
    constructor(props) {
        super(props)
        let newDate = new Date();
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();
        this.state = {
            oldPropsValue: (this.props.year || "") + "-" + (this.props.month || "") + "-" + (this.props.day || ""),//保留原来的值,方便父组件强制更新
            tempyear: year,//年份输入框值
            year: this.props.year ? this.props.year : year,//年，
            month: this.props.month ? this.props.month : month,//月
            day: this.props.day || day,//日
            showChangeYear: false,//选择年份
            showChangeMonth: false,//选择月份
        }
        this.setValue=this.setValue.bind(this)
        this.choseYear = this.choseYear.bind(this);
        this.yearClick = this.yearClick.bind(this);
        this.yearOnChange = this.yearOnChange.bind(this);
        this.yearOKHandler = this.yearOKHandler.bind(this);
        this.yearonBlur = this.yearonBlur.bind(this);
        this.changeYearHandler = this.changeYearHandler.bind(this);
        this.choseMonth = this.choseMonth.bind(this);
        this.changeMonthHandler = this.changeMonthHandler.bind(this);
        this.dayHandler = this.dayHandler.bind(this);
        this.getMonthDays = this.getMonthDays.bind(this);
        this.getFirstDayWeek = this.getFirstDayWeek.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        let newState = {};
        if ((props.year || "") + "-" + (props.month || "") + "-" + (props.day || "") !== state.oldPropsValue) {
            newState.year = props.year ? props.year : state.year;
            newState.month = props.month ? props.month : state.month;
            newState.day = props.day;
            newState.oldPropsValue = (props.year || "") + "-" + (props.month || "") + "-" + (props.day || "");
            return newState;
        }
        return null;
    }

    /**
     * 设置值
     * @param {*} year 
     * @param {*} month 
     * @param {*} day 
     */
    setValue(year, month, day) {
        let date = new Date();
        year = year ? year : date.getFullYear();
        month = month ? month : date.getMonth() + 1;
        day = day ? day : date.getDate();
            this.setState({
                year: year,
                month: month,
                day: day

            })
    }
    /**
   * 选择年份
   */
    choseYear() {
        this.setState({
            showChangeYear: !this.state.showChangeYear,
            showChangeMonth: false,
        })

    }
    yearClick(event) {
        event.target.select();
    }
    /**
     * 年份的onchange事件
     * @param {*} event 
     */
    yearOnChange(event) {
        this.setState({
            tempyear: event.target.value.toString().trim(),
        })
    }
    /**
     * 年份回车事件
     * @param {*} event 
     */
    yearOKHandler(event) {
        if (event.keyCode === 13) {
            this.yearonBlur(event);//共用函数
        }
    }
    /**
     * 年份失去焦点，确认事件
     * @param {*} event 
     */
    yearonBlur(event) {
        let year = event.target.value.trim() << 0;//转成数字
        year < 1900 || year > 9999 ? Msg.error("不是有效年份") : this.changeYearHandler(year);
    }
    /**
     * 年份改变事件
     * @param {*} value 
     */
    changeYearHandler(value) {
        this.setState({
            showChangeYear: false,
            year: value,
            day: 1,//日归一
        }, () => {
            if (this.props.onSelect) {
                let value = this.state.year + "-" + (this.state.month.toString().length === 1 ? "0" + this.state.month.toString() : this.state.month)
                    + "-" + (this.state.day < 10 ? "0" + this.state.day.toString() : this.state.day);

                this.props.onSelect(value, value, this.props.name);
            }

        })

    }
    /**
     * 选择月份
     */
    choseMonth() {
        this.setState({
            showChangeYear: false,
            showChangeMonth: !this.state.showChangeMonth,
        })
    }

    /**
   * 月份点击事件
   * @param {*} value 
   */
    changeMonthHandler(value) {
        this.setState({
            month: value,
            showChangeYear: false,
            showChangeMonth: false,
            day: 1,//日归一

        }, () => {
            if (this.props.onSelect) {
                let value = this.state.year + "-" + (this.state.month.toString().length === 1 ? "0" + this.state.month.toString() : this.state.month)
                    + "-" + (this.state.day < 10 ? "0" + this.state.day.toString() : this.state.day);

                this.props.onSelect(value, value, this.props.name);
            }
        })



    }

    /**
     * 日点击事件
     * @param {*} day 
     * @param {*} event 
     */
    dayHandler(day, event) {
        event && event.stopPropagation();//阻止冒泡，防止下拉时注册的全局事件找不到父节点
        this.setState({
            day: day,

        })
        if (this.props.onSelect) {
            let value = this.state.year + "-" + (this.state.month.toString().length === 1 ? "0" + this.state.month.toString() : this.state.month)
                + "-" + (day < 10 ? "0" + day.toString() : day);

            this.props.onSelect(value, value, this.props.name);
        }

    }
    /**
     * 根据月份获取当月总天数
     * @returns 
     */
    getMonthDays() {
        //
        return new Date(this.state.year, this.state.month, 0).getDate();
    }
    /**
     * 获取当月第一天是星期几
     * @returns 
     */
    getFirstDayWeek() {
        //
        return new Date(this.state.year, this.state.month - 1, 1).getDay();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (utils.diffOrder(nextProps, this.props)) {
            return true;
        }
        if (utils.diffOrder(nextState, this.state)) {
            return true;
        }
        return false;
    }

    /**
     * 渲染上一部分
     * @returns 
     */
    renderHeader() {
        return <div className="wasabi-datetime-header">
            <div className="header-text" ><div  style={{ display:"inline", marginRight: 8 }} onClick={this.choseYear}>
                <span>{this.state.year}</span>.</div>
                <div   style={{ display:"inline"}} onClick={this.choseMonth}><span>{lang.cn.Month[this.state.month - 1]}</span>.</div></div>
            {/* <a className=" triangle-left icon-arrow-left" onClick={this.handleLeftClick}></a>
            <a className="triangle-right icon-arrow-right" onClick={this.handleRightClick}></a> */}
        </div>

    }

    /**
     * 渲染下一部分
     * @returns 
     */
    renderBody() {
        let preMonthWeekDays = [], thisMonthDays = [];
        let getDays = this.getMonthDays(), FirstDayWeek = this.getFirstDayWeek();
        for (let i = 0; i < FirstDayWeek; i++) {
            preMonthWeekDays[i] = i;
        }
        for (let i = 0; i < getDays; i++) {
            thisMonthDays[i] = (i + 1);
        }
        let preMonthWeekDaysNodes = preMonthWeekDays.map(function (item, i) {
            return <div className="datespan" key={i}></div>
        })
        let thisMonthDaysNodes = thisMonthDays.map((item, index) => {
            let choseed = false;//当前日期是否被选中
            if (this.props.isRange) {
                if (this.props.rangeBegin && this.props.rangeEnd && this.props.rangeBegin <= item && this.props.rangeEnd >= item) {
                    choseed = true;
                }
            }
            else if (this.state.day === item) {
                choseed = true;
            }
            let control = null;
            if (item === this.props.rangeBegin && (!this.props.rangeEnd || item === this.props.rangeEnd)) {
                control = <div className={"datespan "} key={"li2" + index} onClick={this.dayHandler.bind(this, item)}><div className="onlyradius">{item}</div></div>;
            }
            else if (item === this.props.rangeBegin) {
                control = <div className={"datespan begin"} key={"li2" + index} onClick={this.dayHandler.bind(this, item)}>
                    <div className="blank"><div className="radius">{item}</div></div></div>;
            }
            else if (item === this.props.rangeEnd) {
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

        let yearControl = [];
        for (let index = this.state.year * 1 - 7; index <= this.state.year * 1 + 4; index++) {
            if (index === this.state.year * 1) {
                yearControl.push(<div className="datespan chosed" onClick={this.changeYearHandler.bind(this, index)} key={"year" + index}>{index}</div>);
            }
            else {
                yearControl.push(<div className="datespan" onClick={this.changeYearHandler.bind(this, index)} key={"year" + index}>{index}</div>);
            }

        }
        return (
            <div className="wasabi-datetime-body">
                <div className="weekul" style={{ display: (!this.state.showChangeMonth && !this.props.showChangeYear) ? "block" : "none" }}>
                    <div className="weekspan">{lang.cn.SUN}</div>
                    <div className="weekspan">{lang.cn.MON}</div>
                    <div className="weekspan">{lang.cn.TUE}</div>
                    <div className="weekspan">{lang.cn.WED}</div>
                    <div className="weekspan">{lang.cn.THU}</div>
                    <div className="weekspan">{lang.cn.FRI}</div>
                    <div className="weekspan">{lang.cn.SAT}</div>
                </div>
                <div className="dayul" style={{ display: (!this.state.showChangeMonth && !this.state.showChangeYear) ? "block" : "none" }}>{preMonthWeekDaysNodes} {thisMonthDaysNodes}</div>
                <div className="wasabi-datetime-month" style={{ display: this.state.showChangeMonth ? "block" : "none" }}>

                    <div className={"datespan " + ((this.state.month === 1) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 1)}>{lang.cn.Month[0]}</div>
                    <div className={"datespan " + ((this.state.month === 2) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 2)}>{lang.cn.Month[1]}</div>
                    <div className={"datespan " + ((this.state.month === 3) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 3)}  >{lang.cn.Month[2]}</div>
                    <div className={"datespan " + ((this.state.month === 4) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 4)}>{lang.cn.Month[3]}</div>
                    <div className={"datespan " + ((this.state.month === 5) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 5)}>{lang.cn.Month[4]}</div>
                    <div className={"datespan " + ((this.state.month === 6) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 6)}>{lang.cn.Month[5]}</div>
                    <div className={"datespan " + ((this.state.month === 7) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 7)}>{lang.cn.Month[6]}</div>
                    <div className={"datespan " + ((this.state.month === 8) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 8)}>{lang.cn.Month[7]}</div>
                    <div className={"datespan " + ((this.state.month === 9) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 9)}>{lang.cn.Month[8]}</div>
                    <div className={"datespan " + ((this.state.month === 10) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 10)}>{lang.cn.Month[9]}</div>
                    <div className={"datespan " + ((this.state.month === 11) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 11)}>{lang.cn.Month[10]}</div>
                    <div className={"datespan " + ((this.state.month === 12) ? "chosed" : "")} onClick={this.changeMonthHandler.bind(this, 12)}>{lang.cn.Month[11]}</div>
                </div>
                <div className="wasabi-datetime-year" style={{ display: this.state.showChangeYear ? "block" : "none" }}>
                    <div style={{ display: "block", textAlign: "center", marginBottom: 10 }}>
                        <input type="text" value={this.state.tempyear} name="year" onClick={this.yearClick} onBlur={this.yearonBlur}
                            onKeyUp={this.yearOKHandler} style={{ width: 60, height: 30, paddingLeft: 5 }}
                            title="回车确认" onChange={this.yearOnChange}></input></div>
                    {yearControl}</div>
            </div>
        )

    }
    render() {

        return (
            <div className="wasabi-datetime"  >
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        )
    }
}
Calendar.propTypes = {
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
Calendar.defaultProps = {
    year: null,
    month: null,
    day: null,
    isRange: false,///默认否
    rangeBegin: null,//默认为空，日期范围选择时开始值
    rangeEnd: null,//默认为空，日期范围选择时结果值

};
export default Calendar;