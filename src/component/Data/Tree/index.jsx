/*
create by wangzhiyong
 date:2016-07
create by wangzhiyong 创建树组件
 edit 2020-10 参照ztree改造
 2021-06-16 重新优化
 desc:树下拉选择
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Msg from "../../Info/Msg";
import TreeNode from "./TreeNode.jsx";
import func from "../../libs/func.js";
import loadDataHoc from "../../loadDataHoc"
import treeFunc from "./treeFunc";
import("./tree.css")

class Tree extends Component {
    constructor(props) {
        super(props);
        this.treeNodesRef = [];
        this.state = {
            rawData: [],
            data: [],
            clickId: "",//单击的id
        }
        //单击与双击需要改变样式
        this.onClick = this.onClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onChecked = this.onChecked.bind(this)
        this.getChecked = this.getChecked.bind(this);
        this.clearChecked = this.clearChecked.bind(this);
        this.setClickNode = this.setClickNode.bind(this);
        this.onExpand = this.onExpand.bind(this)
        this.onRename = this.onRename.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onDrop = this.onDrop.bind(this)
    }
    //todo
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
        return newState;
    }
    /**
     * 节点勾选
     * @param {*} id 
     * @param {*} text 
     * @param {*} row 
     * @param {*} checkValue 
     */
    onChecked(id, text, row, checkValue) {

        let path = row._path;
        let checked = (id + "") === (checkValue + "")
        let data = treeFunc.setChecked(this.state.data, path, checked, this.props.checkType);
        this.setState({
            data: data
        })
        this.props.onChecked && this.props.onChecked(checked, id, text, row);
    }


    /**
    * 返回勾选的数据
    */
    getChecked() {
        return treeFunc.getChecked(this.state.data);
    }

    /**
    * 清除勾选
    */
    clearChecked() {
        let data = treeFunc.clearChecked(this.state.data);
        this.setState({
            data: data
        })
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
     * @param {*} row 
     */
    onClick(id, text, row) {
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
     * 双击事件
     * @param {*} id 
     * @param {*} text 
     * @param {*} children 
     */
    onDoubleClick(id, text, row) {
        this.props.onDoubleClick && this.props.onDoubleClick(id, text, row);
    }
    /**
     * 树展开与折叠事件
     * @param {*} open 是否展开
     * @param {*} id id,
     * @param {*} text 文本
     * @param {*} children  子节点
     */
    onExpand(open, id, text, row) {
        this.props.onExpand && this.props.onExpand(open, id, text, row)
    }

    /**
     * 重命名
     * @param {*} id 
     * @param {*} text 
     * @param {*} row 
     * @param {*} newText 
     */
    onRename(id, text, row, newText) {
        let data = treeFunc.renameNode(this.state.data, row, newText);
        this.setState({
            data: data
        })
        this.props.onRename && this.props.onRename(id, text, row, newText);
    }
    /**
    * 处理删除与移动时的删除
    * @param {*}
    */
    onRemove(id, text, row) {
        Msg.confirm("您确定删除[" + text + "]吗？", () => {
            let data = treeFunc.removeNode(this.state.data, row._path);
            this.setState({
                data: data
            })
            this.props.onRemove && this.props.onRemove(id, text, row);
        })

    }
    /**
     * 停靠事件
     * @param {*} dragNode 移动节点
     * @param {*} dropNode 停靠节点
     * @param {*} dragType 停靠方式
     */
    onDrop(dragNode, dropNode, dragType) {
        let data = [];
        if (dragType == "in") {
            data = treeFunc.moveInNode(this.state.data, dragNode, dropNode);
        }
        else if (dragType == "before") {
            data = treeFunc.moveBeforeNode(this.state.data, dragNode, dropNode);
        }
        else if (dragType == "after") {
            data = treeFunc.moveAterNode(this.state.data, dragNode, dropNode);
        }
        this.setState({
            data: data
        })
    }

    render() {
        this.treeNodesRef = [];//清空
        let nodeControl = [];
        //全局属性
        const { checkAble, checkStyle, renameAble, removeAble } = this.props;
        //得到传下去的属性
        const treeProps = { checkAble, checkStyle, renameAble, removeAble, clickId: this.state.clickId };
        //全局事件
        const treeEvents = {
            onClick: this.onClick,
            onDoubleClick: this.onDoubleClick,
            onChecked: this.onChecked,
            onRemove: this.onRemove,
            onExpand: this.onExpand,
            onRename: this.onRename,

            beforeDrag: this.props.beforeDrag,
            onDrop: this.onDrop
        }
        if (this.state.data instanceof Array) {
            this.state.data.map((item, index) => {
                let isParent = false;//是否为父节点
                if (item.isParent == true || (item.children instanceof Array && item.children.length > 0)) {//如果明确规定了，或者子节点不为空，则设置为父节点
                    isParent = true;
                }
                //通过输入框的值与自身的勾选情况综合判断
                let ref = React.createRef();
                this.treeNodesRef.push(ref);
                nodeControl.push(<TreeNode ref={ref}
                    key={"treenode-" + item.id + "-" + index}
                    {
                    ...treeProps
                    }
                    {...item}
                    isParent={isParent}
                    {
                    ...treeEvents
                    }


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
    removeAble: PropTypes.bool,//是否允许移除

    //after事件
    onClick: PropTypes.func,//单击的事件
    onDoubleClick: PropTypes.func,//双击事件
    onCheck: PropTypes.func,//勾选/取消勾选事件
    onCollapse: PropTypes.func,//折叠事件
    onExpand: PropTypes.func,//展开事件
    onRename: PropTypes.func,//重命名事件
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
    idField: "id",
    parentField: "pId",
    textField: "text",
    dataSource: "data",
    simpleData: true,//默认为真
    checkAble: true,
    checkStyle: "checkbox",
    checkType: { "y": "ps", "n": "ps" },//默认勾选/取消勾选都影响父子节点，todo 暂时还没完成
    radioType: "all",//todo 



}
export default loadDataHoc(Tree, "tree");