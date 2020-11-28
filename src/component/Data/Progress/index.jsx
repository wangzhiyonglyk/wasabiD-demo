/*
 create by wangzhiyong
 date:2020-11-29
 desc 进度条组件重新开发
 */
import React from "react";
import PropTypes from "prop-types";
import LineProgress from "./lineProgress"
import CircleProgress from "./CircleProgress"
import ("./index.css")
class Progress extends React.Component{
  
    constructor(props){
        super(props)
    }
    setValue(value){
         this.refs.p.setValue(value);
    }
    getValue(){
        return this.refs.p.getValue();
    }
    render(){
        if(this.props.type=="circle"){
            return <CircleProgress ref="p" {...this.props}></CircleProgress>
        }
        else{
            return <LineProgress ref="p" {...this.props}></LineProgress>
        }
    }
}
export default Progress;