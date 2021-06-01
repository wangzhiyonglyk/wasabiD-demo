//create by wangzhiyong
//date:2016-07-22
//desc:独立的筛选框
import React, { Component } from "react";
import PropTypes from "prop-types";
import BaseInput from "../BaseInput"
import("./search.css");
class Search extends React.PureComponent {
    constructor(props) {
        super(props);
        this.input=React.createRef();
        this.state={
            value:this.props.value
        }
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }
    onSearch(event) {//开始查询
            this.props.onSearch && this.props.onSearch(this.input.current.getValue(), this.props.name,event);
    }
    onKeyUp(event){
        if(event.keyCode===13){
            this.props.onSearch&&this.props.onSearch(this.input.current.getValue(), this.props.name,event);
        }
    }
    setValue(value){
        this.setState({
            value:value
        })
    }
    getValue(){
        return this.state.value
    }
    
    render() {
        return <div className={"wasabi-searchbox " + this.props.className} style={this.props.style}>
           <BaseInput   {...this.props}
            ref={this.input} 
            value={this.state.value||""}
           onKeyUp={this.onKeyUp}></BaseInput>
            <i className=" icon-search" onClick={this.onSearch}></i>
        </div>
    }
};

Search.propTypes = {
    name: PropTypes.string,//表单名称，
    title: PropTypes.string,//提示信息
    placeholder: PropTypes.string,//输入框提示信息
    style: PropTypes.object,//
    className: PropTypes.string,
    onSearch: PropTypes.func,//查询事件

};
Search.defaultProps = {
    name: "",
    title: null,
    className: "",
    style: {},
    onSearch: null,


};
export default Search;