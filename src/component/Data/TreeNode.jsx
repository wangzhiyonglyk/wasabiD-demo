/*
 create by wangzhiyong
 date:2016-12-13
 desc:树节点组件
 */
import React, { Children, Component } from "react";
import PropTypes from "prop-types";
import Input from "../Form/Input"
import unit from "../libs/unit"
class TreeNode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            edit: false,//是否处理编辑状态
            half: false,//是否半选
            nodeid: Math.random().toString(36).slice(-8) + 'node' + unit.dateformat(new Date(), 'yyyyMMddHHmmss'),
            textid: Math.random().toString(36).slice(-8) + 'text' + unit.dateformat(new Date(), 'yyyyMMddHHmmss'),
            children: unit.clone(this.props.children)
        }
        this.onClick = this.onClick.bind(this);
        this.showHandler = this.showHandler.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.half) {
            this.setState({
                checked: nextProps.checked
            })
        }

    }
    componentDidUpdate() {
        try {
            if (this.moveAdd !== false && this.moveAdd == this.state.value && this.state.children && this.state.children.length > 0) {

              

            }
        }
        catch (e) {
            console.error(e);
        }
    }
    showHandler() {
        this.setState({
            open: !this.state.open
        })
    }
    onClick(value, text, property) {
        this.props.onClick && this.props.onClick(value, text, property)

    }
    onDoubleClick(value, text, property) {
        this.props.onDoubleClick && this.props.onDoubleClick(value, text, property)
    }
    /**
     * change事件
     * @param {*} value 
     */
    onChange(value) {

    }
    /**
     * 失去焦点
     * @param {*} value 
     */
    onBlur(value) {
        let oldText = this.state.text;
        this.setState({
            text: value.trim(),
            edit: false,
        }, this.onRename(oldText, value.trim()))
    }
    /**
     * 重命名时键盘事件
     * @param {*} event 
     */
    onKeyUp(event) {
        let oldText = this.state.text;
        if (event.keyCode == 13) {
            this.setState({
                edit: false,
                text: event.target.value.trim()
            }, this.onRename(oldText, event.target.value.trim()))
        }

    }
    /**
     * 勾选动作
     * @param {*} value 
     */
    onChecked(value) {

        this.setState({
            checked: value == this.state.value,
            half: false
        },
            () => {
                this.props.treeProps.onChecked && this.props.treeProps.onChecked(value == this.state.value, this.state.value, this.state.text, this.state.property, this.state.children)
                let checked = this.props.getBrotherChecked && this.props.getBrotherChecked();

                if (checked && checked.num && checked.length == checked.num) {//全部勾选
                    this.props.setParentChecked && this.props.setParentChecked(true);
                }
                else if (checked && checked.num == 0) {//全部没有勾选
                    this.props.setParentChecked && this.props.setParentChecked(false);
                }
                else if (checked && checked.length != checked.num) {//部分勾选
                    //半选/todo
                    this.props.setParentChecked && this.props.setParentChecked("half");
                }

            }
        );

    }

    /**
     * 重命名
     * @param {*} oldText 
     * @param {*} newText 
     */
    onRename(oldText, newText) {
        this.props.treeProps.onRename && this.props.treeProps.onRename(this.state.value, oldText, newText, this.state.property, this.state.children);
    }
    /**
     * 由节点的父组件处理删除
     * @param {*} childIndex 
     */
    onRemoveForParent(childValue, childText, property, subChildren) {
        let children = unit.clone(this.state.children);
        let childIndex = null;
        for (let i = 0; i < children.length; i++) {
            if (children[i].value == childValue) {
                childIndex = i; break;
            }
        }
        if (childIndex != null) {
            children.splice(childIndex, 1);
            this.setState({
                children: children
            })
        }

        this.props.treeProps.onRemove && this.props.treeProps.onRemove(childValue, childText, property, subChildren);
    }
    /**
     * 重命名之前
     */
    beforeRename() {
        let edit = true;
        if (this.props.treeProps && this.props.treeProps.beforeRename) {
            edit = this.props.treeProps.beforeRename && this.props.treeProps.beforeRename(this.state.value, this.state.text, this.state.property, this.state.children);
        }

        if (edit) {
            this.setState({
                edit: edit
            }, () => {
                let input = document.getElementById(this.state.textid);
                input.focus();
                input.select();
            })
        }
    }
    /**
     * 删除之前
     */
    beforeRemove(index) {
        let remove = true;
        if (this.props.treeProps && this.props.treeProps.beforeRemove) {
            remove = this.props.treeProps.beforeRemove && this.props.treeProps.beforeRemove(this.state.value, this.state.text, this.state.property, this.state.children);
        }

        if (remove) {
            this.props.parentRemoveChild && this.props.parentRemoveChild(this.state.value, this.state.text, this.state.property, this.state.children)
        }
    }
    //设置勾选情况
    setChecked(checked) {

        if (checked != "half") {
            this.setState({
                checked: checked,
                half: false
            })
        }
        else {
            this.setState({
                half: checked == "half",
                checked: false,
            })
        }

    }
    /**
     * 获取勾选情况
     */

    getChecked() {
        return this.state.checked;
    }

    /**
     * 获取子节点的勾选情况
     */
    getchildChecked() {
        let checked = {
            length: 0,
            num: 0
        }
        if (this.state.children && this.state.children instanceof Array) {
            for (let ref in this.refs) {
                if (ref.indexOf("child") > -1) {
                    checked.length++
                    if (this.refs[ref].getChecked()) {
                        checked.num++
                    }

                }
            }
        }
        return checked;
    }
    /**
     * 鼠标经过事件
     */
    onMouseOver(event) {
        event.stopPropagation();//阻止冒泡
        console.log(this.state.value, this.state.text);
    }

    /**
     * 拖动事件
     */
    onDragStart(event) {
        let obj = unit.clone(this.state);
        window.localStorage.setItem("treenode", JSON.stringify(obj));

    }
    /**
     * 拖动结束。todo 要优化
     */
    onDragEnd(event) {
        event.preventDefault()
        event.stopPropagation();
        this.props.parentRemoveChild && this.props.parentRemoveChild(this.state.value, this.state.text, this.state.property, this.state.children)
    }
    /**
     * 停靠事件
     */
    onDragOver(event) {
        event.preventDefault()
        event.stopPropagation();

        document.getElementById(this.state.nodeid).style.borderTop = "1px solid red";
    }
    /**
     * 离开事件
     * @param {} event 
     */
    onDragLeave(event) {
        event.preventDefault()
        event.stopPropagation();
        document.getElementById(this.state.nodeid).style.borderTop = "none";
    }
    /**
     * 停靠组件的事件
     */
    onDrop(event) {
        event.preventDefault();
        event.stopPropagation();

        let node = JSON.parse(window.localStorage.getItem("treenode"));

        if ((node.value == this.state.value && node.text == this.state.text) || (node.parent && node.parent.value == this.state.value && node.parent.text == this.state.text)) {
            //相同，不处理
        }
        else {
            let children = unit.clone(this.state.children) || [];
            children.push(node); //不能前插
            this.moveAdd = this.state.value;//标记前插入了     
            this.setState({
                children: children,
                isParent: true,
                open: true
            })
        }
        document.getElementById(this.state.nodeid).style.borderTop = "none";
        window.localStorage.removeItem("treenode")

    }
    /**
     * 拖动后父节点删除
     */
    onDragForParent(childValue, childText, property, subChildren) {
        this.onRemoveForParent(childValue, childText, property, subChildren)

    }
    render() {
        let nodeControl = [];
        let tip = this.state.tip ? this.state.tip : this.state.text;//提示信息
        if (this.state.children instanceof Array) {
            this.state.children.map((item, index) => {
                console.log("item", item);
                let isParent = false;//是否为父节点
                if (item.isParent == true || (item.children instanceof Array && item.children.length > 0)) {//如果明确规定了，或者子节点不为空，则设置为父节点
                    isParent = true;
                }
                else {

                }
                //父节点

                let parent = { value: this.state.value, text: this.state.text, children: this.state.children };
                nodeControl.push(<TreeNode
                    key={item.value}
                    parentRemoveChild={this.onRemoveForParent.bind(this)} setParentChecked={this.setChecked.bind(this)} getBrotherChecked={this.getchildChecked.bind(this)}
                    ref={"child" + index}
                    {...item}
                    half={this.state.half}
                    checked={this.state.checked}
                    treeProps={this.props.treeProps} isParent={isParent} parent={parent}
                    onClick={this.props.onClick} key={index} selectValue={this.props.selectValue} />);
            });
        }
        let iconCls = this.state.iconCls;//默认图标图标
        if (this.state.isParent) {//如果是父节点
            if (this.state.open) {//打开状态，
                iconCls = this.state.iconOpen ? this.state.iconOpen : this.state.iconCls;//没有则用默认图标
            }
            else {//关闭状态
                iconCls = this.state.iconClose ? this.state.iconClose : this.state.iconCls;///没有则用默认图标

            }
        }
        else {

        }

        //节点元素
        let nodeEement = [<Input key="1" forceChange={true} type={this.props.treeProps.checkStyle || "checkbox"}
            hide={this.props.checkAble ? false : this.props.treeProps.checkAble ? false : true}
            half={this.state.half}
            name={this.props.name}
            value={this.state.checked ? this.state.value : null} data={[{ value: this.state.value }]} onSelect={this.onChecked.bind(this)}></Input>,
        <span key="2" draggable={this.props.dragAble} onDragEnd={this.onDragEnd.bind(this)} onDragStart={this.onDragStart.bind(this)} onClick={this.onClick.bind(this, this.state.value, this.state.text, this.state.property)}>   <i key="2" className={iconCls} style={{ marginRight: 3 }} onClick={this.onClick.bind(this, this.state.value, this.state.text, this.state.property)}></i>{this.state.text}&nbsp;&nbsp;</span>
        ]
        //判断是否可以拖动

        return <li ref="node" style={{ display: this.state.hide ? "none" : "block" }} onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)} onDragLeave={this.onDragLeave.bind(this)} >

            <div id={this.state.nodeid} className={this.props.selectValue == this.state.value ? "selected" : ""} >
                <i className={this.state.open ? "icon-drop" : "icon-zright"} style={{ opacity: this.state.isParent ? 1 : 0 }} onClick={this.showHandler}></i>
                <a href={this.state.href} title={tip} onDoubleClick={this.onDoubleClick.bind(this, this.state.value, this.state.text, this.state.property)}  >
                    {this.state.edit ? <Input type="text" id={this.state.textid} required={true} onBlur={this.onBlur.bind(this)} onKeyUp={this.onKeyUp.bind(this)}
                        name={"key" + this.state.value} value={this.state.text} onChange={this.onChange.bind(this)}></Input> : nodeEement}
                </a>
                {
                    !this.state.edit && this.props.treeProps.editAble ? <i key="edit" className={"icon-edit"} title="编辑" onClick={this.beforeRename.bind(this)} style={{ fontSize: 12, transform: "translateY(1px)" }}></i> : null
                }
                {
                    !this.state.edit && this.props.treeProps.removeAble ? <i key="delete" className={"icon-remove"} title="删除" onClick={this.beforeRemove.bind(this)} style={{ fontSize: 13, transform: "translateY(2px)" }}></i> : null
                }
            </div>
            {

            }

            {
                nodeControl.length > 0 ? <ul className={this.state.open ? "clearfix show" : "clearfix "}>
                    {nodeControl}
                </ul> : null
            }

        </li>
    }
}
TreeNode.propTypes = {
    isParent: PropTypes.bool,//是否是父节点
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,//值
    text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,//标题
    tip: PropTypes.string,//提示信息
    iconCls: PropTypes.string,//默认图标
    iconClose: PropTypes.string,//[父节点]关闭图标
    iconOpen: PropTypes.string,//[父节点]打开图标
    open: PropTypes.bool,//是否处于打开状态
    checked: PropTypes.bool,//是否被勾选
    checkAble: PropTypes.bool,//是否允许勾选
    dragAble: PropTypes.bool,//是否允许拖动，
    dropAble: PropTypes.bool,//是否允许停靠
    href: PropTypes.string,//节点的链接
    hide: PropTypes.bool,//是否隐藏
    property: PropTypes.any,//其他数据
    children: PropTypes.array,//子节点


    //after事件
    onClick: PropTypes.func,//选中后的事件
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
    beforeRemove: PropTypes.func,//删除前事件
    beforeRename: PropTypes.func,//重命名前事件
    beforeRightClick: PropTypes.func,//鼠标右键前事件

};
TreeNode.defaultProps = {
    isParent: false,
    value: null,
    text: null,
    tip: null,
    iconCls: "icon-txt",
    iconClose: "icon-folder",
    iconOpen: "icon-open-folder",
    open: false,
    checked: false,
    checkAble: false,
    dragAble: false,
    dropAble: false,
    href: null,
    hide: null,
    property: null,
    children: [],

    //after事件
    onClick: null,
    onCheck: null,
    onCollapse: null,
    onExpand: null,
    onRename: null,
    onRemove: null,
    onRightClick: null,
    onDrag: null,
    onDrop: null,
    onAsyncSuccess: null,

    //before 事件
    beforeRemove: null,
    beforeRename: null,
    beforeRightClick: null,

};
export default TreeNode;