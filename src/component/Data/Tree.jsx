/*
create by wangzhiyong
 date:2016-07
create by wangzhiyong 创建树组件
 edit 2020-10 参照ztree改造
 desc:树下拉选择
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Msg from "../Info/Msg";
import TreeNode from "./TreeNode.jsx";
import func from "../libs/func.js";
import propsTran from "../libs/propsTran";
import loadDataHoc from "../loadDataHoc"
require("../Sass/Data/Tree.css");
class Tree extends Component {
    constructor(props) {
        super(props);
        this.treeNodesRef = [];
        this.state = {
            rawData: [],
            data: [],
            clickId: "",//单击的id
            value: "",//勾选的值
            oldPropsValue: "",
            text: "",
            idField: this.props.idField,
            textField: this.props.textField,

        }
        //单击与双击需要改变样式
        this.onClick = this.onClick.bind(this);
        this.onradioChecked = this.onradioChecked.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onChecked = this.onChecked.bind(this)
        this.getChecked=this.getChecked.bind(this);
        this.setClickNode=this.setClickNode.bind(this);
        this.expandHandler=this.expandHandler.bind(this)
        //因为第一级节点没有父节点，在移除时需要树组件配合
        this.parentRemoveChild = this.parentRemoveChild.bind(this);

        /**
         * 其他事件则自行定义就可以了
         */
    }
    static getDerivedStateFromProps(props, state) {
        let newState = {};
        if (props.data && props.data instanceof Array && func.diff(props.data, state.rawData)) {
            /**
             * 因为此组件需要对数据进行增删改
             * 其他组件统一交由loadDataHoc处理了
             */
            newState.rawData = (props.data);
            newState.data = func.clone(props.data);

        }
        if (props.value != state.oldPropsValue) {//父组件强行更新了值            
            return {
                value: props.value || "",
                text: propsTran.processText(props.value, newState.data || props.data).join(","),
                oldPropsValue: props.value
            }
        }

        return newState;
    }
    onChecked(checked, id, text, children, row) {
        this.props.onChecked && this.props.onChecked(checked, id, text, children, row, this.props.name);
    }
    /**
   * 返回勾选的数据
   */
    getChecked() {
        let data = [];
        for (let i = 0; i < this.treeNodesRef.length; i++) {
            let cref = this.treeNodesRef[i].current;
            if (cref) {
                data = [].concat(data, cref.getNodeChecked());
            }
        }
        return data;
    }
    /**
         * 为了给交叉表与树表格内部使用的单击事件
         * @param {*} id 
         */
    setClickNode(id) {
        this.setState({
            clickId: id,

        }, () => {

        })


    }

    /**
     * 单击事件
     * @param {*} id 值
     * @param {*} text 文本
     * @param {*} children 子节点
     */
    onClick(id, text, children, row) {
        if (this.props.isPivot) {
            setTimeout(() => {
                this.setState({
                    clickId: id,
                })
            }, 20);
        } else {
            this.setState({
                clickId: id,
            })
        }
        this.props.onClick && this.props.onClick(id, text, children, row, this.props.name);

    }

    /**
     * 单选按钮 radioType="all"
     * @param {*} id 
     * @param {*} text 
     * @param {*} children 
     */
    onradioChecked(id, text, children, row) {
        this.setState({
            value: id,
            text: text
        }, () => {

            if (this.state.data && this.state.data instanceof Array && this.state.data.length > 0) {
                for (let i = 0; i < this.treeNodesRef.length; i++) {
                    let cref = this.treeNodesRef[i].current;
                    if (cref) {
                        cref.setNodeSelfRadioChecked(false, { id: id, text: text });//改变一级子节点
                        cref.setChildrenRadioChecked(false, { id: id, text: text });//改变子孙节点
                    }
                }
            }
            setTimeout(() => {
                this.onChecked(true, id, text, children, row);
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
    onDoubleClick(id, text, children, row) {
        this.props.onDoubleClick && this.props.onDoubleClick(id, text, children, row, this.props.name);
    }


    /**
     * 树展开与折叠事件
     * @param {*} open 是否展开
     * @param {*} id id,
     * @param {*} text 文本
     * @param {*} children  子节点
     */
    expandHandler(open, id, text, children) {
        this.props.expandHandler && this.props.expandHandler(open, id, text, children)
    }

    /**
   * 由节点的父组件处理删除与移动时的删除
   * @param {*} childIndex 
   */
    parentRemoveChild(childid, childText, subChildren, row) {
        Msg.confirm("您确定删除[" + childText + "]吗？", () => {
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

            this.props.onRemove && this.props.onRemove(childid, childText, subChildren, row);
        })

    }
    shouldComponentUpdate(nextProps, nextState) {
        if (func.diffOrder(nextProps, this.props)) {
            return true;
        }
        if (func.diff(nextState, this.state)) {
            return true;
        }
        return false;
    }
    render() {
        this.treeNodesRef = [];//清空
        let nodeControl = [];
        if (this.state.data instanceof Array) {
            this.state.data.map((item, index) => {
                let isParent = false;//是否为父节点
                if (item.isParent == true || (item.children instanceof Array && item.children.length > 0)) {//如果明确规定了，或者子节点不为空，则设置为父节点
                    isParent = true;
                }
                //通过输入框的值与自身的勾选情况综合判断
                let ref=React.createRef();
                this.treeNodesRef.push(ref);
                let inputValue =this.props.inputValue? this.props.inputValue.toString().split(","):[];
                let checked = inputValue.indexOf((item.id||"").toString()) > -1 ? true : item.checked;
                nodeControl.push(<TreeNode ref={ref}
                    key={"treenode-" + item[this.props.idField] + "-" + index}
                    {...this.props}
                    {...item}
                    inputValue={this.props.inputValue||""}
                    checked={checked}
                    id={item[this.props.idField]}
                    text={item[this.props.textField]}
                    isParent={isParent}
                    clickId={this.state.clickId}
                    /** 其他事件不需要绑定，因为父组件设定 */
                    onClick={this.onClick}
                    onradioChecked={this.onradioChecked}
                    onDoubleClick={this.onDoubleClick}
                    onChecked={this.onChecked}
                    parentRemoveChild={this.parentRemoveChild.bind(this)}
                />);
            });
        }
        return <ul className={"wasabi-tree clearfix " + this.props.className} style={this.props.style}>
            {nodeControl}
        </ul>
    }
}
Tree.propTypes = {
    name: PropTypes.string,//树名称
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),//选中的id值
    text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),//选中的标题
    idField: PropTypes.string,//数据字段值名称
    parentField: PropTypes.string,//数据字段父节点名称
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
    isPivot: PropTypes.bool
}
Tree.defaultProps = {
    style: {},
    className: "",
    name: null,
    value: null,
    text: null,
    idField: "id",
    parentField: "pId",
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
    isPivot: false,
}
export default loadDataHoc(Tree, "tree");