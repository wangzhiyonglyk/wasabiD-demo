//create by wangzy
//date:2016-07-22
//desc:独立的筛选框
import React, { Component } from "react";
import PropTypes from "prop-types";

import("../Sass/Form/SearchBox.css");
class SearchBox extends Component {

    constructor(props) {
        super(props);
        this.state = {

            filterValue: "",//筛选框的值
        }
        this.onKeyUp = this.onKeyUp.bind(this);
        this.beginSearch = this.beginSearch.bind(this);
        this.clearData = this.clearData.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onKeyUp(event) {//回车查询
        if (event.keyCode == 13) {
            this.beginSearch();
        }
    }

    beginSearch() {//开始查询

        if (this.props.onSearch != null) {
            this.props.onSearch(filterValue, this.props.name);
        }

    }
    clearData() {
        this.setState({
            filterValue: "",

        })
    }
    onChange(event) {


        this.setState({
            filterValue: event.target.value.toString().trim()
        })
    }
    render() {
        return <div className={"wasabi-searchbox " + this.props.className} style={this.props.style}><input type="text" title={this.props.title} placeholder={this.props.placeholder} onKeyUp={this.onKeyUp} value={this.state.filterValue} onChange={this.onChange} />
            <i className=" icon-search" onClick={this.beginSearch}></i>
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