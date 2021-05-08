//create by wangzhiyong
//date:2016-07-22
//desc:独立的筛选框
import React, { Component } from "react";
import PropTypes from "prop-types";
import BaseInput from "../BaseInput"
import("./search.css");
class SearchBox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.input=React.createRef();
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }
    onSearch(event) {//开始查询
        if (this.props.onSearch != null) {
            this.props.onSearch(this.input.current.getValue(), this.props.name,event);
        }
    }
    onKeyUp(event){
        if(event.keyCode===13){
            this.props.onEnter&&this.props.onEnter(this.input.current.getValue(), this.props.name,event);
        }
    }
    setValue(value){
        this.input.current.setValue(value);
    }
    getValue(){
        return this.input.current.getValue();
    }
    
    render() {
        return <div className={"wasabi-searchbox " + this.props.className} style={this.props.style}>
           <BaseInput   {...this.props} ref={this.input}  onKeyUp={this.onKeyUp}></BaseInput>
            <i className=" icon-search" onClick={this.onSearch}></i>
        </div>
    }
};

SearchBox.propTypes = {
    name: PropTypes.string,//表单名称，
    title: PropTypes.string,//提示信息
    placeholder: PropTypes.string,//输入框提示信息
    style: PropTypes.object,//
    className: PropTypes.string,
    onSearch: PropTypes.func,//查询事件

};
SearchBox.defaultProps = {
    name: "",
    title: null,
    className: "",
    style: {},
    onSearch: null,


};
export default SearchBox;