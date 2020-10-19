/*
create by wangzhiyong 创建树组件

 */


import React, { Component } from "react";
import PropTypes from "prop-types";

import Message from "../Unit/Message";
import FetchModel from "../Model/FetchModel";
import TreeNode from "./TreeNode.jsx";
import unit from "../libs/unit.js";
import showUpdate from "../Mixins/showUpdate.js";
require("../Sass/Data/Tree.css");
class Tree extends Component {
    constructor(props) {
        super(props);
        var newData = this.setValueAndText(this.props.data);//对数据进行处理
        this.state = {
            name: this.props.name,
            text: this.props.text,
            value: this.props.value,
            data: newData,

        }
        this.onClick = this.onClick.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.url) {
            if (nextProps.url != this.props.url) {
                this.loadData(nextProps.url, nextProps.params);
            }
            else if (this.showUpdate(nextProps.params, this.props.params)) {//如果不相同则更新
                this.loadData(nextProps.url, nextProps.params);
            }

        } else if (nextProps.data && nextProps.data instanceof Array) {//又传了数组

        }

    }
    componentDidMount() {
        this.loadData(this.state.url, this.state.params);
    }
    showUpdate(newParam, oldParam) {
        return showUpdate.call(this, newParam, oldParam);
    }
    loadData(url, params) {
        if (url) {
            let type = this.props.httpType ? this.props.httpType : "POST";
            type = type.toUpperCase();
            var fetchmodel = new FetchModel(url, this.loadSuccess, params, this.loadError);
            fetchmodel.headers = this.props.httpHeaders;
            if (this.props.contentType) {
                //如果传contentType值则采用传入的械
                //否则默认

                fetchmodel.contentType = this.props.contentType;
                fetchmodel.data = fetchmodel.contentType == "application/json" ? JSON.stringify(fetchmodel.data) : fetchmodel.data;
            }
            type == "POST" ? unit.fetch.post(fetchmodel) : unit.fetch.get(fetchmodel);
            console.log("tree-fetch", fetchmodel);
        }

    }
    loadSuccess(data) {//数据加载成功
        var realData = data;
        if (this.props.dataSource == null) {
        }
        else {
            realData = unit.getSource(data, this.props.dataSource);
        }

        realData = this.setValueAndText(realData);
        this.setState({
            data: realData,
        })
    }
    setValueAndText(data) {//遍历设置text，value的值
        let realData = unit.clone(data);//
        if (realData instanceof Array) {
            for (let i = 0; i < realData.length; i++) {
                realData[i].text = realData[i][this.props.textField ? this.props.textField : "text"];
                realData[i].value = realData[i][this.props.valueField ? this.props.valueField : "value"];
                if (realData[i].data) {
                    realData[i].data = this.setValueAndText(realData[i].data);
                }
            }

        }

        return realData;
    }
    loadError(message) {//查询失败
        console.log("treepicker-error", message);
        Message.error(message);
    }
    onClick(value, text, property, children) {
        this.setState({
            value: value,
            text: text
        })

        this.props.onClick && this.props.onClick(value, text, this.props.name, row);
    }
    /**
     * 勾选事件
     * @param {*} checked 
     * @param {*} value 
     * @param {*} text 
     * @param {*} property 
     * @param {*} children 
     */
    onChecked(checked,value, text, property, children) {
        this.props.onChecked&&this.props.onChecked(checked,value, text, property, children);
    }

    /**
   * 由节点的父组件处理删除
   * @param {*} childIndex 
   */
    onRemoveForParent(childValue, childText, property, subChildren) {
        let children = unit.clone(this.state.data);
        let childIndex = null;
        for (let i = 0; i < children.length; i++) {
            if (children[i].value == childValue) {
                childIndex = i; break;
            }
        }
        if (childIndex != null) {
            children.splice(childIndex, 1);
            this.setState({
                data: children
            })
        }

        this.props.onRemove && this.props.onRemove(this.state.value, childText, property, subChildren);
    }

    render() {
        var nodeControl = [];
        if (this.state.data instanceof Array) {
            this.state.data.map((item, index) => {
                let isParent = false;//是否为父节点
                if (item.isParent == true || (item.children instanceof Array && item.children.length > 0)) {//如果明确规定了，或者子节点不为空，则设置为父节点
                    isParent = true;
                }
                else {

                }
                nodeControl.push(<TreeNode parentRemoveChild={this.onRemoveForParent.bind(this)} key={item.value}  {...item} isParent={isParent} selectValue={this.state.value} treeProps={this.props}
                    onClick={this.onClick} />);
            });
        }
        return <ul className="wasabi-tree clearfix">
            {nodeControl}
        </ul>
    }
}

Tree.propTypes = {
    name: PropTypes.string,//树名称
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),//值
    text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),//标题
    valueField: PropTypes.string,//数据字段值名称
    textField: PropTypes.string,//数据字段文本名称
    url: PropTypes.string,//后台查询地址
    params: PropTypes.object,//向后台传输的额外参数
    dataSource: PropTypes.string,//ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源
    data: PropTypes.array,//节点数据
    simpleData: PropTypes.bool,//是否使用简单的数据格式
    checkAble: PropTypes.bool,//是否允许勾选
    checkStyle: PropTypes.oneOf(["checkbox", "radio"]),//单选还是多选
    checkType: PropTypes.object,//勾选对于父子节点的关联关系
    radioType: PropTypes.oneOf(["level", "all"]),//单选时影响的层级
    editAble: PropTypes.bool,//是否允许勾选
    removeAble: PropTypes.bool,//是否允许移除
    onClick: PropTypes.func,//单击事件
    onChecked: PropTypes.func,//勾选事件
}
Tree.defaultProps = {
    name: null,
    text: null,
    value: null,
    valueField: "value",
    textField: "text",
    url: null,
    params: null,
    dataSource: "data",
    data: [],
    simpleData: false,
    checkAble: false,
    checkStyle: "checkbox",
    checkType: { "y": "ps", "n": "ps" },//默认勾选/取消勾选都影响父子节点
    radioType: "all",
    editAble: false,
    removeAble: false,
    onClick: null,
    onChecked: null,
}
export default Tree;