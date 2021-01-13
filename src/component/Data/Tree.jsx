/*
create by wangzy
 date:2016-07
create by wangzhiyong 创建树组件
 edit 2020-10 参照ztree改造
 desc:树下拉选择
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Msg from "../Info/Msg";
import FetchModel from "../Model/FetchModel";
import TreeNode from "./TreeNode.jsx";
import func from "../libs/func.js";
import diff from "../libs/diff.js";
import propsTran from "../libs/propsTran";
require("../Sass/Data/Tree.css");
class Tree extends Component {
    constructor(props) {
        super(props);
        let result = propsTran.setComboxValueAndText("tree", this.props.inputValue, this.props.data, this.props.idField, this.props.textField);//对数据进行处理
        let newData=result.data||[];
        if(this.props.simpleData){
            newData=func.toTreeData(result.data,this.props.idField||"id",this.props.parentField||"pId",this.props.textField)
        }
        this.state = {
            url: this.props.url,
            name: this.props.name,
            value: this.props.value,
            text: result.text,
            selectid: "",
            data: newData,//处理后数据
            rawData: func.clone(this.props.data),//原始数据，
            reloadData: false,
            idField: this.props.idField,
            textField: this.props.textField,
            simpleData: this.props.simpleData,//保留设置
        }
        //单击与双击需要改变样式
        this.onClick = this.onClick.bind(this);
        this.onradioChecked = this.onradioChecked.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onChecked=this.onChecked.bind(this)
        //因为第一级节点没有父节点，在移除时需要树组件配合
        this.parentRemoveChild = this.parentRemoveChild.bind(this);

        /**
         * 其他事件则自行定义就可以了
         */
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let newState = {};
        if (nextProps.url && nextProps.params &&
            diff(nextProps.params, prevState.params)) {//如果有url
            newState = {
                reloadData: true,
                url: nextProps.url,
                params: nextProps.params,
            }
        }
        if (nextProps.data && nextProps.data instanceof Array && diff(nextProps.data, prevState.rawData)) {
            //如果传了死数据
            newState.rawData = nextProps.data;
            let result= propsTran.setComboxValueAndText("tree", nextProps.inputValue, nextProps.data, nextProps.idField, nextProps.textField);
            if(nextProps.simpleData){
                newState.data=func.toTreeData(result.data,nextProps.idField,nextProps.parentField,nextProps.textField)
            
            }
            else {
                newState.data=func.clone(nextProps.data);
            }
            newState.text=result.text;
        }
        
        if (func.isEmptyObject(newState)) {
            return null;
        }
        else {
            return newState;
        }

    }
    componentDidUpdate() {
        if (this.state.reloadData) {
            this.setState({
                realData: false
            })
            this.loadData(this.state.url, this.state.params);
        }
    }
    componentDidMount() {
        this.loadData(this.state.url, this.state.params);
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
            type == "POST" ? func.fetch.post(fetchmodel) : func.fetch.get(fetchmodel);
            console.log("tree-fetch", fetchmodel);
        }

    }
    loadSuccess(data) {//数据加载成功
        var realData = data;
        if (this.props.dataSource == null) {
        }
        else {
            realData = func.getSource(data, this.props.dataSource);
        }

        realData = propsTran.setTreeidAndText(realData);

        this.setState({
            data: realData,
        })
    }

    loadError(message) {//查询失败
        console.log("treepicker-error", message);
        Msg.error(message);
    }
    /**
     * 单击事件
     * @param {*} id 值
     * @param {*} text 文本
   
     * @param {*} children 子节点
     */
    onClick(id, text, children) {
        if(this.props.isPivot){
            setTimeout(() => {
                this.setState({
                    id: id,
                    selectid:id,
                    text: text
                })
            }, 20);
        }else{
            this.setState({
                id: id,
                selectid:id,
                text: text
            })
        }
        this.props.onClick && this.props.onClick(id, text, children, this.props.name);

    }
    setClickNode(id){
        let rawData=this.state.rawData;
        let text="";
        for(let i=0;i<rawData.length;i++){
            if(id==rawData.id){
                text=rawData.text;
                break;
            }
        }
        this.setState({
            id: id,
            selectid:id,
            text: text
        })
      
      
    }
    /**
     * 单选按钮 radioType="all"
     * @param {*} id 
     * @param {*} text 
     * @param {*} children 
     */
    onradioChecked(id, text, children,row) {
        this.setState({
            id: id,
            text: text
        }, () => {

            if (this.state.data && this.state.data instanceof Array && this.state.data.length > 0) {
                for (let ref in this.refs) {
                    if (ref.indexOf("treenode-") > -1) {
                        //     

                        this.refs[ref].setNodeSelfChecked(false, { id: id, text: text });//改变子节点
                        this.refs[ref].setChildrenChecked(false, { id: id, text: text });//改变子孙节点
                    }
                }
            }
            setTimeout(() => {
                this.onChecked(true, id, text, children,row);
            }, 200);
            //只有一个单选

        })

    }
    /**
     * 双击事件
     * @param {*} id 
     * @param {*} text 
     * @param {*} children 
     */
    onDoubleClick(id, text, children) {
        this.props.onDoubleClick && this.props.onDoubleClick(id, text, children, this.props.name);
    }
    onChecked(checked, id, text, children,row) {
        this.props.onChecked && this.props.onChecked(checked, id, text, children,row, this.props.name);
    }
    /**
     * 返回树的数据
     */
    getData() {
        let data = [];
        for (let ref in this.refs) {
            if (ref.indexOf("nodetree") > -1) {
                data.push(this.refs[ref].getNodeData());
            }
        }
        return data;
    }
    /**
     * 返回原始数据
     */
    getRawData() {
        return this.state.rawData;
    }

    /**
     * 返回勾选的数据
     */
    getChecked() {
        let data = [];
        for (let ref in this.refs) {
            if (ref.indexOf("treenode-") > -1) {
                data = [].concat(data, this.refs[ref].getNodeChecked());
            }
        }
        return data;
    }
    /**
     * 
     * @param {*} checked 
     */
    setChecked(checked) {
        //todo 
    }

    /**
   * 由节点的父组件处理删除与移动时的删除
   * @param {*} childIndex 
   */
    parentRemoveChild(childid, childText, subChildren) {
        Msg.confirm("确定删除节点吗？",()=>{
            let children = func.clone(this.state.data);
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
    
            this.props.onRemove && this.props.onRemove(childid, childText, subChildren);
        })
      
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
                nodeControl.push(<TreeNode ref={"treenode-" + item.id+"-" + index} 
                    key={"treenode-" + item.id+"-"+index}
                    {...this.props}
                    {...item}
                    half={(this.props.checkType && this.props.checkType.y.indexOf("p") > -1 && ((this.state.checkValue || item.checkValue) == "half"))}
                    checked={this.props.inputValue ? ("," + this.props.inputValue + ",").indexOf("," + item.id + ",") > -1 ? true : false : item.checked}
                    data={this.state.rawData}
                    isParent={isParent} selectid={this.state.selectid}
                    /** 其他事件不需要绑定，因为父组件设定 */
                    onClick={this.onClick}
                    onradioChecked={this.onradioChecked}
                    onDoubleClick={this.onDoubleClick}
                    onChecked={this.onChecked}
                    parentRemoveChild={this.parentRemoveChild.bind(this)}
                />);
            });
        }
        return <ul className={"wasabi-tree clearfix " +this.props.className} style={this.props.style}>
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
    editAble: PropTypes.bool,//是否允许编辑
    removeAble: PropTypes.bool,//是否允许移除

    //after事件
    onClick: PropTypes.func,//单击的事件
    onDoubleClick: PropTypes.func,//双击事件
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
    beforeDrag: PropTypes.func,//拖动前事件
    beforeDrop: PropTypes.func,//停靠前事件
    beforeRemove: PropTypes.func,//删除前事件
    beforeRename: PropTypes.func,//重命名前事件
    beforeRightClick: PropTypes.func,//鼠标右键前事件
    /**
     * pivot 专门为交叉提供的属性
     */
    isPivot:PropTypes.bool
}
Tree.defaultProps = {
    style:{},
    className:"",
    name: null,
    text: null,
    id: null,
    idField: "id",
    textField: "text",
    url: null,
    params: null,
    dataSource: "data",
    data: [],
    simpleData: true,//默认为真
    checkAble: false,
    checkStyle: "checkbox",
    checkType: { "y": "ps", "n": "ps" },//默认勾选/取消勾选都影响父子节点，todo 暂时还没完成
    radioType: "all",//todo 
    renameAble: false,
    editAble: false,
    removeAble: false,


    //after事件
    onClick: null,
    onDoubleClick: null,
    onCheck: null,
    onCollapse: null,
    onExpand: null,
    onRename: null,
    onEdit: null,
    onRemove: null,
    onRightClick: null,
    onDrag: null,
    onDrop: null,
    onAsyncSuccess: null,

    //before 事件
    beforeDrag: null,
    beforeDrop: null,
    beforeRemove: null,
    beforeRename: null,
    beforeRightClick: null,

     /**
     * pivot 专门为交叉提供的属性
     */
    isPivot:false,
}
export default Tree;