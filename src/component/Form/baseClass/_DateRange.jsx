/*
create by wangzy
date:2016-05-20
desc:日期范围选择控件
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import propsTran from "../../libs/propsTran";
export default function (WrappedComponent) {
    class _DateRange extends Component {

        constructor(props) {
            super(props)
            this.state = propsTran.setDateRangeDefaultState(props);
            this.firstMonthHandler = this.firstMonthHandler.bind(this);
            this.secondMonthHandler = this.secondMonthHandler.bind(this);
            this.firstHandler = this.firstHandler.bind(this);
            this.secondHandler = this.secondHandler.bind(this);
            this.beginTimeHandler=this.beginTimeHandler.bind(this);
            this.endTimeHandler=this.endTimeHandler.bind(this);
            this.onSelectHandler = this.onSelectHandler.bind(this);
            this.cancelHandler = this.cancelHandler.bind(this);
        }

        static getDerivedStateFromProps(nextProps, prevState) {
           
            if ((nextProps.firstDate || "") +(nextProps.firstTime||"")+ (nextProps.secondDate || "")+(nextProps.secondTime||"") != prevState.oldPropsValue) {
                return propsTran.setDateRangeDefaultState(nextProps);
            }
            return null;

        }
        firstMonthHandler(year, month) {
           
            this.setState({
                first_year: year,
                first_month: month,
                first_day: null,
                first_rangeBegin:null,
                first_rangeEnd: null
            })
        }
        secondMonthHandler(year, month) {
            this.setState({
                second_year: year,
                second_month: month,
                second_day: null,
                second_rangeBegin: null,
                second_rangeEnd: null,
            })
        }
        firstHandler(value) {//第一个日期选择事件
            if (value && value.indexOf(" ") > -1) {//有时间
                value = value.split(" ")[0];
            }
            let newState = {
                first_year: value.split("-")[0] * 1,
                first_month: value.split("-")[1] * 1,
                first_day: value.split("-")[2] * 1,
            };
            let first_rangeBegin = this.state.first_rangeBegin;
            let first_rangeEnd = this.state.first_rangeEnd;
            let second_rangeBegin = this.state.second_rangeBegin;
            let second_rangeEnd = this.state.second_rangeEnd;
            if (!first_rangeBegin) {//第一个日期的开始日期日期为空
                newState.first_rangeBegin = newState.first_day;
                if (second_rangeBegin && second_rangeEnd) {//第二个日期的日期不为空
                    //清空
                    newState.second_rangeBegin = null;
                    newState.second_rangeEnd = null;
                    newState.second_day = null;
                }
                else if (second_rangeBegin) {//第二个日期的开始日期不为空
                    newState.first_rangeEnd = 31;
                    newState.second_rangeEnd = second_rangeBegin;
                    newState.second_rangeBegin = 1;
                }
            }
            else {//不为空
                //清空第二个日期
                newState.second_rangeBegin = null;
                newState.second_rangeEnd = null;
                newState.second_day = null;
                if (first_rangeEnd) {//第一个日期的结束日期也不为空或者第二个日期的开始日期不为空，初始化开始日期
                    newState.first_rangeBegin = newState.first_day;
                    newState.first_rangeEnd = null;
                }
                else {

                    if (newState.first_day * 1 < first_rangeBegin * 1) {//选择的日期比第二个日期的开始日期还要小，对换
                        newState.first_rangeBegin = newState.first_day;
                        newState.first_rangeEnd = first_rangeBegin;
                    }
                    else {
                        newState.first_rangeEnd = newState.first_day; //第二次点击
                    }

                }

            }

            /*判断与后面一个的复合情况*/
            this.setState(newState, () => {
                this.onSelectHandler(this.props.type=="daterange"?true:false);
            });
        }
        secondHandler(value) {//第二个日期的选择事件
            if (value && value.indexOf(" ") > -1) {//有时间
                value = value.split(" ")[0];
            }
            let newState = {
                second_year: value.split("-")[0] * 1,
                second_month: value.split("-")[1] * 1,
                second_day: value.split("-")[2] * 1,
            };
            let first_rangeBegin = this.state.first_rangeBegin;
            let first_rangeEnd = this.state.first_rangeEnd;
            let second_rangeBegin = this.state.second_rangeBegin;
            let second_rangeEnd = this.state.second_rangeEnd;
            if (!second_rangeBegin) {//第二个日期的开始日期为空
                newState.second_rangeBegin = newState.second_day;
                if (first_rangeBegin && first_rangeEnd) {  //第一日期的结束日期不为空
                    newState.first_rangeBegin = null;
                    newState.first_rangeEnd = null;
                    newState.first_day = null;
                }
                else if (first_rangeBegin) {
                    //第一个日期的开始日期不为空
                    newState.first_rangeEnd = 31;
                    newState.second_rangeBegin = 1;
                    newState.second_rangeEnd = newState.second_day;
                }
            }
            else {
                //清空第一个日期
                newState.first_rangeBegin = null;
                newState.first_rangeEnd = null;
                newState.first_day = null;
                if (second_rangeEnd) {//第二个日期的结束日期不为空
                    newState.second_rangeBegin = newState.second_day;
                    newState.second_rangeEnd = null;
                }
                else {
                    if (newState.second_day * 1 < second_rangeBegin * 1) {//选择的日期比第二个日期的开始日期还要小，对换
                        newState.second_rangeBegin = newState.second_day;
                        newState.second_rangeEnd = second_rangeBegin;
                    }
                    else {
                        newState.second_rangeEnd = newState.second_day;;
                    }

                }
            }
            /*判断与后面一个的复合情况*/
            this.setState(newState,()=>{
                this.onSelectHandler(this.props.type=="daterange"?true:false);
            });        
        }
        beginTimeHandler(time){//第一个时间选择  
            this.setState({
                firstTime: time,
             
            },()=>{
                this.onSelectHandler(false);
            })
          
        }
        endTimeHandler(time) {//第二时间选择
            this.state.secondTime=time;
            this.setState({
                secondTime: time,
            
            },()=>{
                this.onSelectHandler(true);
            })
           
        }
        onSelectHandler(hide) {
            let firstDate, secondDate;
            if (this.state.first_rangeBegin) {
                firstDate = this.state.first_year + "-" + (this.state.first_month.toString().length == 1 ? "0" + this.state.first_month : this.state.first_month) + "-" + (this.state.first_rangeBegin.toString().length == 1 ? "0" + this.state.first_rangeBegin : this.state.first_rangeBegin);
            }
            else if (this.state.second_rangeBegin) {
                firstDate = this.state.second_year + "-" + (this.state.second_month.toString().length == 1 ? "0" + this.state.second_month : this.state.second_month) + "-" + (this.state.second_rangeBegin.toString().length == 1 ? "0" + this.state.second_rangeBegin : this.state.second_rangeBegin);
            }
            if (this.state.second_rangeEnd) {
                secondDate = this.state.second_year + "-" + (this.state.second_month.toString().length == 1 ? "0" + this.state.second_month : this.state.second_month) + "-" + (this.state.second_rangeEnd.toString().length == 1 ? "0" + this.state.second_rangeEnd : this.state.second_rangeEnd);
            }
            else if (this.state.first_rangeEnd) {
                secondDate = this.state.first_year + "-" + (this.state.first_month.toString().length == 1 ? "0" + this.state.first_month : this.state.first_month) + "-" + (this.state.first_rangeEnd.toString().length == 1 ? "0" + this.state.first_rangeEnd : this.state.first_rangeEnd);
            }
            if (this.props.onSelect) {
                if (firstDate && secondDate) {
                    firstDate=firstDate +(this.state.firstTime?" "+this.state.firstTime:"");
                    secondDate=secondDate +(this.state.secondTime?" "+this.state.secondTime:"");
                    this.props.onSelect(firstDate+","+secondDate, firstDate + "," + secondDate, this.props.name, hide);
                }
            }
        }
        cancelHandler() {
            this.setState({
                firstDate: "",
                secondDate: "",
                firstTime:"",
                secondTime:""
            })
            this.props.onSelect && this.props.onSelect("", "", this.props.name, null);
        }
        render() {

            return <WrappedComponent {...this.props} {...this.state}
                firstHandler={this.firstHandler}
                secondHandler={this.secondHandler}
                firstMonthHandler={this.firstMonthHandler}
                secondMonthHandler={this.secondMonthHandler}
                beginTimeHandler={this.beginTimeHandler}
                endTimeHandler={this.endTimeHandler}
            ></WrappedComponent>
        }
    }
    _DateRange.propTypes = {
        name: PropTypes.string,//名称
        firstDate: PropTypes.string,//第一个日期
        secondDate: PropTypes.string,//第二个日期
        firstTime: PropTypes.string,//第一个时间
        secondTime: PropTypes.string,//第二个时间
        attachSecond: PropTypes.bool,//是否带上秒
        allMinute: PropTypes.bool,//是否显示全部分钟
        onSelect: PropTypes.func,//确定事件
    };
    _DateRange.defaultProps = {
        name: "",
        firstDate: "",
        secondDate: "",
        firstTime: "",
        secondTime: "",
        attachSecond:true,
        allMinute:false,
        onSelect: null,//

    };
    return _DateRange;
}
