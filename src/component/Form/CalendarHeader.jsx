/*
create by wangzhiyong
date:2016-05-20
desc:将日期控件表头独立出来
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Lang from "../Lang/language.js";

require("../Sass/Form/DateTime.css");
class CalendarHeader  extends Component{
    constructor(props)
    {
        super(props);
        this.state={
          
        }
        this.dealMonthClick=this.dealMonthClick.bind(this);
        this.handleLeftClick=this.handleLeftClick.bind(this);
        this.handleRightClick=this.handleRightClick.bind(this);
        this.changeYear=this.changeYear.bind(this);
        this.changeMonth=this.changeMonth.bind(this);
    }
  

    /*
    * 处理月份变化
    *@param {Number} month 月份变化数1或-1
    *@return
    * */
    dealMonthClick(month){
        let year=this.props.year;
        let m = parseInt(this.props.month,10) + month;
        if( m < 1 ){
            year --;
            m = 12;
        }else if( m > 12 ){
            year ++;
            m = 1;
        }
       
        this.props.updateFilter(year,m);// 执行父组件回调函数，改变父组件状态值
    }
    handleLeftClick(){
        this.dealMonthClick(-1);
    }
    handleRightClick(){
        this.dealMonthClick(1);
    }
    //改变年份
    changeYear () {
        if(this.props.changeYear)
        {
            this.props.changeYear();
        }

    }
    //改变月份
    changeMonth () {
        if(this.props.changeMonth)
        {
            this.props.changeMonth();
        }

    }
    render(){
        return(
            <div className="wasabi-datetime-header">
                <div className="header-text" ><a  style={{marginRight:8}} onClick={this.changeYear}>
                    <span>{this.props.year}</span><i style={{fontSize:12,marginTop:2}} className="icon-arrow-down"></i></a>
                    <a   onClick={this.changeMonth}><span>{Lang.cn.Month[this.props.month-1]}</span><i style={{fontSize:12,marginTop:2}} className="icon-arrow-down"></i></a></div>
                <a   className=" triangle-left icon-arrow-left"    onClick={this.handleLeftClick}>
                </a>
                <a   className="triangle-right icon-arrow-right" onClick={this.handleRightClick}></a>
            </div>
        )
    }
}
export default CalendarHeader;