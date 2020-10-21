/*
 create by wangzy
 date:2016-06-12
 desc:时间选择组件 TODO 需要重新改造
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { bind } from "file-loader";

import("../Sass/Form/DateTime.css");
class Time extends Component {
    constructor(props) {
        super(props);
        this.state = this.setInitValue(this.props);
    this.getValue=this.getValue.bind(this);
    this.setValue=this.setValue.bind(this);
    this.setInitValue=this.setInitValue.bind(this);
    this.hourHandler=this.hourHandler.bind(this);
    this.minuteHandler=this.minuteHandler.bind(this);
    
    }

    
    getValue() {//获取值
        let value =(this.state.hour>=10?this.state.hour:"0"+this.state.hour)+":"+(this.state.minute>=10?this.state.minute:"0"+this.state.minute)
        +(this.props.hideSecond?"":":"+(this.state.second>=10?this.state.second:"0"+this.state.second));
        return value;
    }
    setValue(value) {//设置值 
        value=this.formatValue(value);
        if(value){
            let hour=value.split(":")[0]*1;
            let minute=value.split(":")[1]*1;
            this.second=this.props.hideSecond?"":value.split(":").length==3?value.split(":")[2]*1:"00";
            this.setState({
                hour:hour,
                minute:minute,
                second:second
            })
        }
        else{
            this.setState({
                hour:"",
                minute:"",
                second:""
            })
        }
      
    }
    setInitValue(props) {
        var date = new Date();

        var hour = props.hour != null && props.hour != undefined ? props.hour : date.getHours();
        var minute = props.minute != null && props.minute != undefined ? props.minute : date.getMinutes();
        var second = props.second != null && props.second != undefined ? props.second : date.getSeconds();
        return {
            hour: (hour < 10) ? "0" + hour : hour,
            minute: (minute < 10) ? "0" + minute : minute,
            second: (second < 10) ? "0" + second : second,
            showMinute:false,
        }

    }
    /**
     * 时单击
     * @param {*} value 
     */
    hourHandler(value, ) {
      
        this.setState({
            hour: value,
            showMinute:true
        })
       
    }
    /**
     * 分单击
     * @param {*} value 
     */
    minuteHandler(value) {
      
        this.setState({
            minute: value,
            showMinute:false
        })
        if (this.props.onSelect != null) {
            //todo 太麻烦，后期改
            value=this.formatValue((this.state.hour<10?"0"+this.state.hour:this.state.hour)+ ":" +(value<10?"0"+value:value)+ ":00")
            this.props.onSelect(value, value, this.props.name, null);
        }

    }
  
    /**
     * 格式化值
     * @param {*} value 
     */
    formatValue(value){
       if(this.props.hideSecond){
           value=value.split(":").length==3?value.substring(0,value.lastIndexOf(":")):value
       }
       return value;
    }
    renderHour(){
        let hourControl=[];
        for(let i=0;i<24;i++){
          
            if(this.state.hour==i){
                hourControl.push(<li key={i} ><span className={"hour "+ (this.state.hour==i?"active":"")}>{i<10?"0"+i:i}</span>
                {<ul className="time-container" style={{display:this.state.showMinute?"block":"none"}}><p>分钟</p>{this.rendMinute()}</ul>}
                </li>)
            }
            else{
                hourControl.push(<li key={i} ><span onClick={this.hourHandler.bind(this,i)} className={"hour "+ (this.state.hour==i?"active":"")}>{i<10?"0"+i:i}</span></li>)
            }
           
            
        }
        return hourControl;
    }
    rendMinute(){
        let minuteControl=[];
        for(let i=0;i<=59;i+=5){
            minuteControl.push(<li key={i} className={"hour "+ (this.state.minute==i?"active":"")} onClick={this.minuteHandler.bind(this,i)}>{i<10?"0"+i:i}</li>)
        }
        return minuteControl;
    }
    render() {

   return <div className="wasabi-time-container">
       <ul>
       <p>小时</p>
       {
         this.renderHour()
       }
       </ul>
   </div>
    }
}

Time.propTypes = {
    name: PropTypes.string,//表单字段名称
    hour: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),//小时
    minute: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),//分钟
    second: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //秒
    hideSecond:PropTypes.bool,//是否隐藏秒

};
Time.defaultProps = () => {
    var date = new Date();
    return {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        hideSecond:false
    }
};
export default Time;