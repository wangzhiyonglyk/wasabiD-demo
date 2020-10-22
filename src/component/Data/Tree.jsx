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
        let  newData = this.setidAndText(this.props.data);//对数据进行处理
        this.state = {
            name: this.props.name,
            text: this.props.text,
            id: this.props.id,
            data: newData,
            rawData:unit.clone(this.props.data)//原始数据

        }
        //单击与双击需要改变样式
        this.onClick = this.onClick.bind(this);
        this.onDoubleClick=this.onDoubleClick.bind(this);
      
        //因为有些节点没有父节点，在移除时需要树组件配合
        this.onRemoveForParent=this.onRemoveForParent.bind(this);
        /**
         * 其他事件则自行定义就可以了
         */
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.url) {
            if (nextProps.url != this.props.url) {
                this.loadData(nextProps.url, nextProps.params);
            }
            else if (this.showUpdate(nextProps.params, this.props.params)) {//如果不相同则更新
                this.loadData(nextProps.url, nextProps.params);
            }

        } else if (this.showUpdate(nextProps.data,this.state.rawData)) {
            let  newData = this.setidAndText(nextProps.data);//对数据进行处理
            this.setState({
                data:newData,
                rawData:nextProps.data
            })
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

        realData = this.setidAndText(realData);
        
        this.setState({
            data: realData,
        })
    }
    setidAndText(data) {//遍历设置text，id的值
        let realData = unit.clone(data);//
        if (realData instanceof Array) {
            for (let i = 0; i < realData.length; i++) {
                realData[i].text = realData[i][this.props.textField ? this.props.textField : "text"];
                realData[i].id = realData[i][this.props.idField ? this.props.idField : "id"];
                if (realData[i].children) {
                    realData[i].children = this.setidAndText(realData[i].children);
                }
            }

        }
        if(this.props.simpleData){//简单的json数据格式
            realData=unit.toTreeData(realData);//转成树结构
        }

        return realData;
    }
    loadError(message) {//查询失败
        console.log("treepicker-error", message);
        Message.error(message);
    }
    /**
     * 单击事件
     * @param {*} id 值
     * @param {*} text 文本
   
     * @param {*} children 子节点
     */
    onClick(id, text, children) {
        this.setState({
            id: id,
            text: text
        })
        this.props.onClick && this.props.onClick(id, text,children,this.props.name);
    }
    /**
     * 双击事件
     * @param {*} id 
     * @param {*} text 
     * @param {*} children 
     */
    onDoubleClick(id,text,children){
        this.props.onDoubleClick && this.props.onDoubleClick(id, text,children,this.props.name);
    }

    /**
     * 返回树的数据
     */
    getData(){
        let data=[];
        for(let ref in this.refs){
            if(ref.indexOf("nodetree")>-1){
                data.push(this.refs[ref].getData());
            }
        }
        return data;
    }
    /**
     * 返回原始数据
     */
    getRawData(){
        return this.state.rawData;
    }

    /**
     * 返回勾选的数据
     */
    getChecked(){
        let data=[];
        for(let ref in this.refs){
            if(ref.indexOf("nodetree")>-1){
                data=[].concat(data, this.refs[ref].getChecked());
            }
        }
        return data;
    }

    /**
   * 由节点的父组件处理删除
   * @param {*} childIndex 
   */
    onRemoveForParent(childid, childText, subChildren) {
        let children = unit.clone(this.state.data);
        let childIndex = null;
        for (let i = 0; i < children.length; i++) {
            if (children[i].id == childid) {
                childIndex = i; break;
            }
        }
        if (childIndex != null) {
            children.splice(childIndex, 1);
            this.setState({
                data: children
            })
        }

        this.props.onRemove && this.props.onRemove(this.state.id, childText, subChildren);
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
                nodeControl.push(<TreeNode ref={"nodetree"+item.id+index} parentRemoveChild={this.onRemoveForParent.bind(this)} 
                key={"nodetree"+item.id} 
                {...this.props}
                   {...item}
                   data={this.state.rawData}
                 isParent={isParent} selectid={this.state.id} 
                 /** 其他事件不需要绑定，因为父组件设定 */
                    onClick={this.onClick}
                    onDoubleClick={this.onDoubleClick}
                    />);
            });
        }
        return <ul className="wasabi-tree clearfix">
            {nodeControl}
        </ul>
    }
}

Tree.propTypes = {
    name: PropTypes.string,//树名称
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),//选中的id值
    text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),//选中的标题
    idField: PropTypes.string,//数据字段值名称
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
    renameAble: PropTypes.bool,//是否允许重命名
    editAble:PropTypes.bool,//是否允许编辑
    removeAble: PropTypes.bool,//是否允许移除
   
    //after事件
    onClick: PropTypes.func,//单击的事件
    onDoubleClick:PropTypes.func,//双击事件
    onCheck: PropTypes.func,//勾选/取消勾选事件
    onCollapse: PropTypes.func,//折叠事件
    onExpand: PropTypes.func,//展开事件
    onRename: PropTypes.func,//重命名事件
    onEdit: PropTypes.func,//编辑事件
    onRemove: PropTypes.func,//删除事件
    onRightClick: PropTypes.func,//右键菜单
    onDrag: PropTypes.func,//拖动事件
    onDrop: PropTypes.func,//停靠事件
    onAsyncSuccess: PropTypes.func,//异步回调事件

    //before 事件
    beforeDrag:PropTypes.func,//拖动前事件
    beforeDrop:PropTypes.func,//停靠前事件
    beforeRemove: PropTypes.func,//删除前事件
    beforeRename: PropTypes.func,//重命名前事件
    beforeRightClick: PropTypes.func,//鼠标右键前事件
}
Tree.defaultProps = {
    name: null,
    text: null,
    id: null,
    idField: "id",
    textField: "text",
    url: null,
    params: null,
    dataSource: "data",
    data: [],
    simpleData: false,
    checkAble: false,
    checkStyle: "checkbox",
    checkType: { "y": "ps", "n": "ps" },//默认勾选/取消勾选都影响父子节点，todo 暂时还没完成
    radioType: "all",//todo 
    renameAble: false,
    editAble:false,
    removeAble: false,
  
   
    //after事件
    onClick: null,
    onDoubleClick:null,
    onCheck: null,
    onCollapse: null,
    onExpand: null,
    onRename: null,
    onEdit:null,
    onRemove: null,
    onRightClick: null,
    onDrag: null,
    onDrop: null,
    onAsyncSuccess: null,

    //before 事件
    beforeDrag:null,
    beforeDrop:null,
    beforeRemove: null,
    beforeRename: null,
    beforeRightClick: null,
}
export default Tree;