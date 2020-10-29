/*
 create by wangzy
 date:2016-06-12
 desc:时间选择组件 TODO 需要重新改造
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Time from "./Time"
import("../Sass/Form/DateTime.css");
class TimeRange extends Component {
    constructor(props) {
        super(props);
        this.state = this.setValue(this.props.value);
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);
      
        this.firstHandler = this.firstHandler.bind(this);
        this.secondHandler = this.secondHandler.bind(this);

    }


    getValue() {//获取值
       return this.state.firstTime+","+this.state.secondTime
    }
    setValue(value) {//设置值 
       let state={};
       state. firstTime="";
       state. secondTime="";
        if(value&&value.indexOf(",")>-1){
            value=value.split(",");
            state. firstTime=value[0];
            state.secondTime=value[1];
        }
        else{
            state. firstTime=value;
        }
        if(  state.firstTime){
           
            state.firstTime = this.formatValue(state.firstTime);
          
            let hour =state. firstTime.split(":")[0] * 1;
            let minute = state.firstTime.split(":")[1] * 1;
          let  second = this.props.hideSecond ? "" :state. firstTime.split(":").length == 3 ?state. firstTime.split(":")[2] * 1 : "00";
                state.first_hour= hour,
                state.first_minute= minute,
                state.first_second= second
            
        }
        if(state.secondTime){

            state.secondTime = this.formatValue(secondTime);
           
            let hour = state.secondTime.split(":")[0] * 1;
            let minute = state.secondTime.split(":")[1] * 1;
         let   second = this.props.hideSecond ? "" : state.secondTime.split(":").length == 3 ? state.secondTime.split(":")[2] * 1 : "00";
                state.second_hour= hour,
                state.second_minute= minute,
                state.second_second= second
            
        }
        console.log(state)
        return state;
        
    }
    
    /**
     * 开始时间
     * @param {*} value 
     */
    firstHandler(value) {

        this.setState({
            firstTime: value,
        
        }, () => {
            if (this.props.onSelect != null&&this.state.secondTime) {
                
                this.props.onSelect(this.getValue(), this.getValue(),this.props.name, null);
            }
        })

    }
    /**
     * 结束时间
     * @param {*} value 
     */
    secondHandler(value) {

        this.setState({
            secondTime: value,
          
        }, () => {
            if (this.props.onSelect != null) {
                this.props.onSelect(this.getValue(), this.getValue(),this.props.name, null);
            }

        })

    }

    /**
     * 格式化值
     * @param {*} value 
     */
    formatValue(value) {
        if (this.props.hideSecond) {
            value = value.split(":").length == 3 ? value.substring(0, value.lastIndexOf(":")) : value
        }
        return value;
    }
   

    render() {

        return <div className="wasabi-time-container">
            <span>开始时间：</span><Time key="begin" 
            hour={this.state.first_hour} second={this.state.first_second}  minute={this.state.first_minute} hideSecond={this.props.hideSecond}
            onSelect={this.firstHandler.bind(this)}
            ></Time>
             <span>结束时间：</span><Time key="end" 
              onSelect={this.secondHandler.bind(this)}
             hour={this.state.second_hour} second={this.state.second_second}  minute={this.state.second_minute} hideSecond={this.props.hideSecond}></Time> 
        </div>
    }
}

TimeRange.propTypes = {
    name: PropTypes.string,//表单字段名称
    firstTime:PropTypes.string,//第一个时间
    secondTime:PropTypes.string,//第二个时间
    hideSecond:PropTypes.bool,//隐藏秒
};
TimeRange.defaultProps = () => {
    var date = new Date();
    return {
        hour: date.getHours(),
        firstTime: "",
        secondTime: "",
        hideSecond: false,
    }
};
export default TimeRange;