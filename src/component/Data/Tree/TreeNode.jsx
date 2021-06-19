/*
 create by wangzhiyong
 date:2016-12-13
 desc:树节点组件
 edit 2020-10-24 勾选还是有缺陷
 edit 2021-05-11 勾选优化，todo 还要继续优化
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "../../Form/Input"
import func from "../../libs/func";
import TreeNodeRow from "./TreeNodeRow"
function ChildrenView(props) {
    let nodeControl = [];
    if (props.children && props.children instanceof Array) {
        props.children.map((item, index) => {
            let isParent = false;//是否为父节点
            if (item.isParent == true || (item.children instanceof Array && item.children.length > 0)) {//如果明确规定了，或者子节点不为空，则设置为父节点
                isParent = true;
            }
            nodeControl.push(<TreeNode
                key={index}
                {...props}
                {...item}
                /**
                 * 不管有没有这个属性，都来自自身
                 */
                checked={item.checked||false}
                half={item.half || false}
                draggAble={item.draggAble || false}
                dropAble={item.dropAble || false}
                isParent={isParent}

            />);
        });

    }
    return nodeControl;
}
function NodeView(props) {
    //节点属性
    let row = new TreeNodeRow();//得到无数据
    for (let key in row) {
        row[key] = props[key] != undefined && props[key] != null ? props[key] : row[key];
    }
    //tree的属性
    const { clickId, checkAble, checkStyle, renameAble, removeAble } = props;
    //node的属性
    const { rename } = props;

    //tree的事件
    const { onDoubleClick, onClick, onChecked } = props;
    //node的事件
    const { onNodeDragStart, onNodeDragEnd, onNodeDrop, onNodeDragOver, onNodeDragLeave, onNodeExpand, onBlur, onKeyUp } = props;

    let title = row.title || row.text;//提示信息 
    let iconCls = row.iconCls;//默认图标图标
    if (row.isParent) {//如果是父节点
        if (row.open) {//打开状态，
            iconCls = row.iconOpen ? row.iconOpen : row.iconCls;//没有则用默认图标
        }
        else {//关闭状态
            iconCls = row.iconClose ? row.iconClose : row.iconCls;///没有则用默认图标

        }
    }
    let childrenControl = null;
    if (row.children && row.children.length > 0) {
        childrenControl = <ChildrenView {...props}></ChildrenView>
    }
    //节点元素
    return <li style={{ display: row.hide ? "none" : "block" }} >
        <div id={row.nodeid} className={clickId == row.id ? "treenode-container selected" : "treenode-container"} >
            <i className={row.open ? "icon-arrow-down" : "icon-arrow-right"} style={{ opacity: row.isParent ? 1 : 0, transform: "translateY(11px)" }}
                onClick={onNodeExpand}></i>
            <div className="treenode" title={title}
                onDrop={onNodeDrop}
                onDragOver={onNodeDragOver} onDragLeave={onNodeDragLeave}
                onClick={onClick.bind(this, row.id, row.text, row)}
                onDoubleClick={onDoubleClick.bind(this, row.id, row.text, row)}  >
                {rename ?
                    <Input type="text" id={row.textid} required={true} onKeyUp={onKeyUp} onBlur={onBlur}
                        name={"key" + row.id} value={row.text} ></Input> :
                    <React.Fragment>
                        <Input key="1" type={checkStyle || "checkbox"}
                            hide={checkAble || row.checkAble ? false : true}
                            half={row.half}
                            name={"node" + row.id}
                            value={row.checked ? row.id : ""} data={[{ value: row.id, text: "" }]}
                            onSelect={onChecked.bind(this, row.id, row.text, row)}></Input>
                        <div key="2" draggable={row.draggAble} onDragEnd={onNodeDragEnd} onDragStart={onNodeDragStart}>
                            <i key="3" className={iconCls}
                            ></i>
                            <a href={row.href} className="wasabi-tree-txt">{row.text}&nbsp;&nbsp;</a></div>
                    </React.Fragment>
                }
                {
                    !rename && renameAble ? <i key="edit" className={"icon-edit"} title="重命名" style={{ transform: "translateY(13px)" }} onClick={props.beforeNodeRename} ></i> : null
                }
                {
                    !rename && removeAble ? <i key="delete" className={"icon-delete"} title="删除" style={{ transform: "translateY(13px)" }} onClick={props.beforeNodeRemove} ></i> : null
                }


            </div>

        </div>
        {
            childrenControl ? <ul className={row.open ? "clearfix show" : "clearfix hide "}>
                {childrenControl}
            </ul> : null
        }

    </li>
}
class TreeNode extends Component {
    constructor(props) {
        super(props);
        this.treeNodesRef = [];
        this.state = {
            open: this.props.asyncAble?false: this.props.open,//异步的情况下，默认不打开
            rename: false,//是否处于重命名状态
            nodeid: func.uuid(),
            textid: func.uuid()
        }
        this.onNodeExpand = this.onNodeExpand.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onNodeRename = this.onNodeRename.bind(this);
        this.beforeNodeRename = this.beforeNodeRename.bind(this);
        this.beforeNodeRemove = this.beforeNodeRemove.bind(this);

        this.onMouseOver = this.onMouseOver.bind(this);
        this.onNodeDragEnd = this.onNodeDragEnd.bind(this);
        this.onNodeDragLeave = this.onNodeDragLeave.bind(this);
        this.onNodeDragOver = this.onNodeDragOver.bind(this);
        this.onNodeDragStart = this.onNodeDragStart.bind(this);
        this.onNodeDrop = this.onNodeDrop.bind(this);

    }
    static getDerivedStateFromProps(props, state) {
        if (props.text != state.oldPropsText) {
            return {
                text: props.text,

            }
        }
    }
    /**
     * 展开/折叠
     */
    onNodeExpand() {
        //节点属性
        let row = new TreeNodeRow();//得到无数据
        for (let key in row) {
            row[key] = this.props[key] != undefined && this.props[key] != null ? this.props[key] : row[key];
        }
        this.setState({
            open: !this.state.open
        })
        this.props.onExpand && this.props.onExpand( !this.state.open,row.id, row.text, row)
    }


    /**
     * 失去焦点
     * @param {*} id 
     */
    onBlur(value) {
        let oldText = this.state.text;
        this.setState({
            text: value.trim(),
            rename: false,
        }, this.onNodeRename(oldText, value.trim()))
    }
    /**
    * 重命名之前
    */
    beforeNodeRename() {
        let row = new TreeNodeRow();
        for (let key in row) {
            row[key] = this.props[key] != undefined && this.props[key] != null ? this.props[key] : row[key];
        }
        let rename = true;
        if (this.props.beforeRename) {
            rename = this.props.beforeRename(row.id, row.text, row);
        }
        if (rename) {
            this.setState({
                rename: !!rename
            }, () => {
                let input = document.getElementById(this.state.textid);
                if (input) {
                    input.focus();
                }

            })
        }
    }

    /**
     * 重命名时键盘事件
     * @param {*} event 
     */
    onKeyUp(event) {
        let oldText = this.props.text;
        if (event.keyCode == 13) {
            this.setState({
                rename: false,
                text: event.target.value.trim()
            }, this.onNodeRename(oldText, event.target.value.trim()))
        }

    }


    /**
     * 重命名
     * @param {*} oldText 
     * @param {*} newText 
     */
    onNodeRename(oldText, newText) {
        let row = new TreeNodeRow();
        for (let key in row) {
            row[key] = this.props[key] != undefined && this.props[key] != null ? this.props[key] : row[key];
        }
        this.props.onRename && this.props.onRename(row.id, oldText, row, newText);
    }


    /**
     * 删除之前
     */
    beforeNodeRemove(index) {
        let remove = true;
        let row = new TreeNodeRow();
        for (let key in row) {
            row[key] = this.props[key] != undefined && this.props[key] != null ? this.props[key] : row[key];
        }
        if (this.props.beforeRemove) {

            remove = this.props.beforeRemove(row.id, row.text, row);
        }
        if (remove) {
            this.props.onRemove && this.props.onRemove(row.id, row.text, row)
        }
    }


    /**
     * 
     * 下面是处理拖动的事件
     */

    /**
     * 鼠标经过事件
     */
    onMouseOver(event) {
        event.stopPropagation();//阻止冒泡

    }

    /**
     * 拖动组件，拖动事件
     */
    onNodeDragStart(event) {
        if (this.props.draggAble) {
            let row = new TreeNodeRow();
            for (let key in row) {
                row[key] = this.props[key] != undefined && this.props[key] != null ? this.props[key] : row[key];
            }
            let draggAble = true;
            if (this.props.beforeDrag) {

                draggAble = this.props.beforeDrag((row.id, row.text, row));
            }
            if (draggAble) {
                window.localStorage.setItem("wasabi-drag-item", JSON.stringify(row));//用于拖动到其他地方
            }

        }


    }
    /**
     * 拖动组件，拖动结束 todo
     */
    onNodeDragEnd(event) {
        //todo 暂时不用处理
        event.preventDefault()
        event.stopPropagation();


    }
    /**
     * 容器经过事件,要阻止默认事件，否则浏览默认是搜索
     */
    onNodeDragOver(event) {
        event.preventDefault()
        event.stopPropagation();
        if (this.props.dropAble) {
            const domClientY = document.getElementById(this.state.nodeid).getBoundingClientRect().top;
            const mouseClientY = event.clientY;
            if (mouseClientY - domClientY < 10) {
                document.getElementById(this.state.nodeid).style.borderTop = "1px solid var(--border-color)";
                document.getElementById(this.state.nodeid).style.borderBottom = "none";
                document.getElementById(this.state.nodeid).style.backgroundColor = null;
                window.localStorage.setItem("wasabi-drag-type", "before");
            }

            else if (mouseClientY - domClientY < 30) {
                document.getElementById(this.state.nodeid).style.borderTop = "none";
                document.getElementById(this.state.nodeid).style.borderBottom = "none";
                document.getElementById(this.state.nodeid).style.backgroundColor = "var(--background-color)";
                window.localStorage.setItem("wasabi-drag-type", "in");
            }
            else {
                document.getElementById(this.state.nodeid).style.borderTop = "none";
                document.getElementById(this.state.nodeid).style.borderBottom = "1px solid var(--border-color)";
                document.getElementById(this.state.nodeid).style.backgroundColor = null;
                window.localStorage.setItem("wasabi-drag-type", "after");
            }
        }

    }
    /**
     * 容器离开事件
     * @param {} event 
     */
    onNodeDragLeave(event) {
        event.preventDefault()
        event.stopPropagation();
        document.getElementById(this.state.nodeid).style.borderTop = "none";
        document.getElementById(this.state.nodeid).style.borderBottom = "none";
        document.getElementById(this.state.nodeid).style.backgroundColor =null;

    }
    /**
     * 容器组件的停靠事件
     */
    onNodeDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        document.getElementById(this.state.nodeid).style.borderTop = "none";
        document.getElementById(this.state.nodeid).style.borderBottom = "none";
        document.getElementById(this.state.nodeid).style.backgroundColor = null;
        let drag = JSON.parse(window.localStorage.getItem("wasabi-drag-item"));
        let dragType = (window.localStorage.getItem("wasabi-drag-type"));
        if (!drag) {
            return;
        }
        if (this.props.dropAble) {//允许停靠
            let row = new TreeNodeRow();
            for (let key in row) {
                row[key] = this.props[key] != undefined && this.props[key] != null ? this.props[key] : row[key];
            }
            let dropAble = true;//可以停靠
            if (this.props.beforeDrop) {
                dropAble = this.props.beforeDrop(drag, row, dragType);//存在并且返回
            }
            if (dropAble) {
                window.localStorage.removeItem("wasabi-drag-item");
                window.localStorage.removeItem("wasabi-drag-type");
                this.props.onDrop && this.props.onDrop(drag, row, dragType);
            }
        }


    }
    render() {
        return <NodeView
            {...this.props}
            {...this.state}
            onNodeExpand={this.onNodeExpand}
            onBlur={this.onBlur}
            onKeyUp={this.onKeyUp}
            beforeNodeRename={this.beforeNodeRename}
            onNodeRename={this.onNodeRename}
            beforeNodeRemove={this.beforeNodeRemove}
            onNodeEdit={this.onNodeEdit}
            onMouseOver={this.onMouseOver}
            onNodeDragEnd={this.onNodeDragEnd}
            onNodeDragLeave={this.onNodeDragLeave}
            onNodeDragOver={this.onNodeDragOver}
            onNodeDragStart={this.onNodeDragStart}
            onNodeDrop={this.onNodeDrop}
        ></NodeView>

    }
}
TreeNode.propTypes = {
    isParent: PropTypes.bool,//是否是父节点
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,//值
    text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,//标题
    title: PropTypes.string,//提示信息
    iconCls: PropTypes.string,//默认图标
    iconClose: PropTypes.string,//[父节点]关闭图标
    iconOpen: PropTypes.string,//[父节点]打开图标
    open: PropTypes.bool,//是否处于打开状态
    checked: PropTypes.bool,//是否被勾选
    checkAble: PropTypes.bool,//是否允许勾选
    draggAble: PropTypes.bool,//是否允许拖动，
    dropAble: PropTypes.bool,//是否允许停靠
    href: PropTypes.string,//节点的链接
    hide: PropTypes.bool,//是否隐藏
    children: PropTypes.array,//子节点


    //after事件
    onClick: PropTypes.func,//单击的事件
    onDoubleClick: PropTypes.func,//双击事件
    onCheck: PropTypes.func,//勾选/取消勾选事件
    onCollapse: PropTypes.func,//折叠事件
    onExpand: PropTypes.func,//展开事件
    onNodeRename: PropTypes.func,//重命名事件
    onNodeEdit: PropTypes.func,//编辑事件
    onRemove: PropTypes.func,//删除事件
    onRightClick: PropTypes.func,//右键菜单
    onNodeDragEnd: PropTypes.func,//拖动事件
    onNodeDrop: PropTypes.func,//停靠事件
    onAsyncSuccess: PropTypes.func,//异步回调事件

    //before 事件
    beforeDrag: PropTypes.func,//拖动前事件
    beforeDrop: PropTypes.func,//停靠前事件
    beforeNodeRemove: PropTypes.func,//删除前事件
    beforeNodeRename: PropTypes.func,//重命名前事件
    beforeRightClick: PropTypes.func,//鼠标右键前事件

};
TreeNode.defaultProps = {
    iconCls: "icon-text",
    iconClose: "icon-folder",
    iconOpen: "icon-folder-open",
    open: true,
    half: false,
    draggAble: false,
    dropAble: false,
};
export default TreeNode;