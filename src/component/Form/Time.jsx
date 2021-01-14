/*
 create by wangzhiyong
 date:2016-06-12
 desc:时间选择组件 TODO 需要重新改造
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import("../Sass/Form/DateTime.css");
class Time extends Component {
    constructor(props) {
        super(props);
        this.state = this.setInitValue(this.props);
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setInitValue = this.setInitValue.bind(this);
        this.hourHandler = this.hourHandler.bind(this);
        this.minuteHandler = this.minuteHandler.bind(this);

    }
    getValue() {//获取值
        let value = (this.state.hour * 1 >= 10 ? this.state.hour : "0" + this.state.hour) + ":" + (this.state.minute * 1 >= 10 ? this.state.minute : "0" + this.state.minute)
            + (!this.props.attachSecond  ? "" : this.props.secondRange?":59":":00");
        return value;
    }
    setValue(value) {//设置值 
        if (value&&value.split(":").length>=2) {
            let hour = value.split(":")[0] * 1;
            let minute = value.split(":")[1] * 1;
          
            this.setState({
                hour: hour,
                minute: minute,
              
            })
        }
        else {
            this.setState({
                hour:null,
                minute:null,
            })
        }

    }
    setInitValue(props) {
        let date = new Date();
        let hour = props.hour ? props.hour : date.getHours();
        let minute = props.minute? props.minute : date.getMinutes();
      
        return {
            hour:  hour,
            minute:  minute,
            showMinute: false,
           
        }

    }
    /**
     * 时单击
     * @param {*} value 
     */
    hourHandler(value) {

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
            showMinute: false
        }, () => {
            if (this.props.onSelect != null) {
              let value=this.getValue();
                this.props.onSelect(value, value, this.props.name,value);
            }

        })

    }

   
    renderHour() {
        let hourControl = [];
        for (let i = 0; i < 24; i++) {
            if (this.state.hour == i) {
                hourControl.push(<li key={i} ><span onClick={this.hourHandler.bind(this, i)}  className={"hour " + (this.state.hour == i ? "active" : "")}>{i < 10 ? "0" + i : i}</span>
                    {<ul className={"second-container "+(this.props.allMinute?"all":"")} style={{ display: this.state.showMinute ? "block" : "none" }}><p>分钟</p>{this.rendMinute()}</ul>}
                </li>)
            }
            else {
                hourControl.push(<li key={i} >
                    <span onClick={this.hourHandler.bind(this, i)} className={"hour " + (this.state.hour == i ? "active" : "")}>{i < 10 ? "0" + i : i}</span></li>)
            }


        }
        return hourControl;
    }
    rendMinute() {
        let minuteControl = [];
        let step=this.props.allMinute?1:5;
        for (let i = 0; i <= 59; i += step) {
            minuteControl.push(<li key={i} >
                <span onClick={this.minuteHandler.bind(this, i)} className={"hour " + (this.state.minute == i ? "active" : "")}>{i < 10 ? "0" + i : i}</span></li>)
        }
        //追加59
        step==5? minuteControl.push( <li key={59} ><span onClick={this.minuteHandler.bind(this,59)} className={"hour " + (this.state.minute == 59 ? "active" : "")}>59</span></li>):void(0);
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
    attachSecond: PropTypes.bool,//是否带上秒
    allMinute: PropTypes.bool,//是否显示全部分钟
};
Time.defaultProps = () => {
    let date = new Date();
    return {
        hour: date.getHours(),
        minute: date.getMinutes(),
        attachSecond: true,
        allMinute:false,
    }
};
export default Time;