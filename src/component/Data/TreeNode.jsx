/*
 create by wangzhiyong
 date:2016-12-13
 desc:树节点组件
 edit 2020-10-24 勾选还是有缺陷
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "../Form/Input"
import func from "../libs/func"
class TreeNode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            rename: false,//是否处于重命名状态
            checkValue: false,//勾选状态，不选，半选，勾选
            nodeid: Math.random().toString(36).slice(-8) + 'node' + func.dateformat(new Date(), 'yyyyMMddHHmmss'),
            textid: Math.random().toString(36).slice(-8) + 'text' + func.dateformat(new Date(), 'yyyyMMddHHmmss'),
            children: func.clone(this.props.children)
        }
        this.onClick = this.onClick.bind(this);
        this.showHandler = this.showHandler.bind(this)
    }

    /**
     * 展开/折叠
     */
    showHandler() {
        this.setState({
            open: !this.state.open
        })
    }
    /**
     * 单击事件
     * @param {*} id 
     * @param {*} text 
     */
    onClick(id, text, children) {
        this.props.onClick && this.props.onClick(id, text, children)

    }
    /**
     * 双击事件
     * @param {*} id 
     * @param {*} text 
     */
    onDoubleClick(id, text) {
        this.props.onDoubleClick && this.props.onDoubleClick(id, text)
    }

    /**
     * 自身的勾选动作(为了区分tree传来的onchecked)
     * @param {*} id 
     */
    onNodeChecked(value) {
       if (this.props.checkStyle == "radio") {

            this.setState({
                checked: value == this.state.id,
            },()=>{
                if (this.props.radioType == "all") {//影响全局
                    if (value == this.state.id) {
                        this.props.onradioChecked&&this.props.onradioChecked(this.state.id, this.state.text,this.state.children);//直接调用单击事即可
                    } 
                }else {//影响当前层级
                    if(value==this.state.id){//勾选的时候
                        if(this.props.parent){
                            this.props.parentSetBrotherRadioChecked&& this.props.parentSetBrotherRadioChecked(this.state.id,this.state.text);
                            window.localStorage.setItem("checkedNode", JSON.stringify({ value: this.state.id, checked: value == this.state.id, text: this.state.text, children: this.state.children }))
                            setTimeout(() => {
                                let checkedNode = JSON.parse(window.localStorage.getItem("checkedNode"));
                                this.props.onChecked && this.props.onChecked(checkedNode.checked, checkedNode.id, checkedNode.text, checkedNode.children);
                                window.localStorage.removeItem("checkedNode");
                            }, 200);
                
                        }else{//第一级节点
                            this.props.onradioChecked&&this.props.onradioChecked(this.state.id, this.state.text,this.state.children);//直接调用单击事即可
                        }
                      
                    }
                    
                }
            })
           

        }
        else {
            //复选框
            window.localStorage.setItem("checkedNode", JSON.stringify({ value: this.state.id, checked: value == this.state.id, text: this.state.text, children: this.state.children }))
            this.setState({
                checked: value == this.state.id,
                checkValue: value == this.state.id ? "yes" : "no"
            },
                () => {

                    /**
                     * 处理子节点
                     */
                    if (this.props.checkType.y.indexOf("s") > -1) {//影响子节点
                        this.setChildrenChecked(value == this.state.id)
                    }

                    /**
                     * 处理父节点
                     */
                    if (this.props.checkType.y.indexOf("p") > -1) {//影响父节点
                        //获取兄弟之间的勾选情况，来处理父节点的勾选
                        this.nodeGetBrotherCheckedNumForParent();
                    }
                    else {
                        //不影响父节点，直接回调
                        //todo 父节点，及子节点都会异步改变，回调的时间不定，暂时使用这个方法
                        setTimeout(() => {
                            this.props.onChecked && this.props.onChecked(value == this.state.id, this.state.id, this.state.text, this.state.children);
                        }, 200);

                    }


                }
            );
        }


    }

    /**
     * 通过父节点获取子节点勾选情况来获取兄弟之间的勾选情况，从来判断父节点的勾选情况
     */
    nodeGetBrotherCheckedNumForParent() {
        //获取兄弟节点的勾选情况，。
        let checked = this.props.parentGetChildCheckedNum && this.props.parentGetChildCheckedNum();

        if (checked && checked.length == checked.checkedNum) {//全部勾选
            this.props.parentSetChecked && this.props.parentSetChecked("yes");//影响父节点
        }
        else if (checked && checked.noNum == checked.length) {//全部没有勾选
            this.props.parentSetChecked && this.props.parentSetChecked("no");//影响父节点
        }
        else if (checked) {//部分勾选
            //半选/todo
            this.props.parentSetChecked && this.props.parentSetChecked("half");//影响父节点
        } else {//说明已经是第一级节点了
            setTimeout(() => {
                let checkedNode = JSON.parse(window.localStorage.getItem("checkedNode"));
                this.props.onChecked && this.props.onChecked(checkedNode.checked, checkedNode.id, checkedNode.text, checkedNode.children);
                window.localStorage.removeItem("checkedNode");
            }, 200);

        }


    }

    /**
    * 父节点获取子节点的勾选数量
    */
    parentGetChildCheckedNum() {
        let checked = {
            length: 0,
            checkedNum: 0,
            halfNum: 0,
            noNum: 0
        }
        if (this.state.children && this.state.children instanceof Array) {
            for (let ref in this.refs) {
                if (ref.indexOf("child") > -1) {
                    checked.length++
                    if (this.refs[ref].getNodeSelfCheckedValue() == "yes") {
                        checked.checkedNum++
                    }
                    else if (this.refs[ref].getNodeSelfCheckedValue() == "half") {
                        checked.halfNum++
                    }
                    else {
                        checked.noNum++;
                    }
                }
            }
        }
        return checked;
    }

    /**
   *  为父节点设置勾选情况，不处理子节点了
   * @param {*} childIsAllChecked 子节点的勾选情况
   */
    parentSetChecked(childIsAllChecked) {

        this.setState({
            checked: childIsAllChecked == "yes" ? true : false,
            checkValue: childIsAllChecked
        }, () => {

            if (this.props.checkStyle == "checkbox" && this.props.checkType.y.indexOf("p") > -1) {//影响父节点
                //获取兄弟之间的勾选情况，来处理父节点的勾选
                this.nodeGetBrotherCheckedNumForParent();

            }
        })




    }

    /**
     * 单选按钮时，checkType="level"时，通过处理兄弟节点的勾选
     * @param {*} childId 
     * @param {*} childText 
     * @param {*} childChecked 
     */
    parentSetBrotherRadioChecked(childId,childText){
        //只能false
        this.setChildrenChecked(false,{id:childId,text:childText});

    }
    
    /**
    * 重命名
    * /
   /**
   * 重命名change事件
   * @param {*} id 
   */
    onChange(id) {

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
                rename: false,
                text: event.target.value.trim()
            }, this.onRename(oldText, event.target.value.trim()))
        }

    }

    /**
     * 重命名
     * @param {*} oldText 
     * @param {*} newText 
     */
    onRename(oldText, newText) {
        this.props.onRename && this.props.onRename(this.state.id, oldText, newText, this.state.children);
    }

    /**
     * 重命名之前
     */
    beforeRename() {
        let rename = true;
        if (this.props.beforeRename) {
            rename = this.props.beforeRename(this.state.id, this.state.text, this.state.children)
        }
        if (rename) {
            this.setState({
                rename: rename
            }, () => {
                let input = document.getElementById(this.state.textid);
                if (input) {
                    input.focus();
                    input.select();
                }

            })
        }
    }
    /**
     * 删除之前
     */
    beforeRemove(index) {
        let remove = true;
        if (this.props.beforeRemove) {
            remove = this.props.beforeRemove(this.state.id, this.state.text, this.state.children);
        }
        if (remove) {
            this.props.parentRemoveChild && this.props.parentRemoveChild(this.state.id, this.state.text, this.state.children)
        }
    }

    /**
     * 由节点的父组件处理删除
     * @param {*} childIndex 
     */
    parentRemoveChild(childid, childText, subChildren) {
        let children = func.clone(this.state.children);
        let childIndex = null;
        for (let i = 0; i < children.length; i++) {
            if (children[i].id == childid) {
                childIndex = i; break;
            }
        }
        if (childIndex != null) {
            children.splice(childIndex, 1);
            this.setState({
                children: children
            })
        }
        //父节点删除后再调用删除后的事件
        this.props.onRemove && this.props.onRemove(childid, childText, subChildren);
    }

    onEdit() {
        this.props.onEdit && this.props.onEdit(this.state.id, this.state.text, this.state.children);
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
     * 拖动事件
     */
    onDragStart(event) {
        if (this.state.dragAble) {
            let dragAble = true;
            if (this.props.beforeDrag) {
                dragAble = this.props.beforeDrag(this.state.id, this.state.text, this.state.children);
            }
            if (dragAble) {
                let obj = func.clone(this.state);
                window.localStorage.setItem("treenode", JSON.stringify(obj));
            }

        }


    }
    /**
     * 拖动结束。todo 要优化
     */
    onDragEnd(event) {
        event.preventDefault()
        event.stopPropagation();

        if (window.localStorage.getItem("moveed")) {
            window.localStorage.removeItem("moveed");
            this.props.parentRemoveChild && this.props.parentRemoveChild(this.state.id, this.state.text, this.state.children);
            this.props.onDrag && this.props.onDrag(this.state.id, this.state.text, this.state.children);
        }

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

        if ((node.id == this.state.id && node.text == this.state.text) || (node.parent && node.parent.id == this.state.id && node.parent.text == this.state.text)) {
            //相同，不处理
        }
        else if (this.state.dropAble) {
            let dropAble = true;//可以停靠
            if (this.props.beforeDrop) {
                dropAble = this.props.beforeDrop(node, this.state);//存在并且返回
            }
            if (dropAble) {
                window.localStorage.setItem("moveed", "true");
                let children = func.clone(this.state.children) || [];
                children.unshift(node); //不能前插

                this.setState({
                    children: children,
                    isParent: true,
                    open: true
                }, () => { this.props.onDrop && this.props.onDrop(node, this.state) });
            }

        }
        document.getElementById(this.state.nodeid).style.borderTop = "none";
        window.localStorage.removeItem("treenode")

    }
    /**
     * 拖动后父节点删除
     */
    onDragForParent(childid, childText, subChildren) {
        this.parentRemoveChild(childid, childText, subChildren)

    }

    /**
     * refs方法
     */
    /**
     * 获取当前节点，包括子孙的已勾选的详情
     */
    getNodeChecked() {
        //勾选的对象
        let checkedArr = [];
        if (this.state.checked) {
            checkedArr.push({
                id: this.state.id,
                text: this.state.text,
                checked: this.state.checked
            })
        }
        if (this.state.children && this.state.children instanceof Array && this.state.children.length > 0) {
            for (let ref in this.refs) {
                if (ref.indexOf("child") > -1) {

                    checkedArr = [].concat(checkedArr, this.refs[ref].getNodeChecked());

                }
            }
        }
        return checkedArr;
    }
    /**
     * 获取自身的勾选情况
     */

    getNodeSelfChecked() {
        return this.state.checked
    }
    /**
     * 设置节点勾选情况，包括子节点的
     * @param {*} checked 
     */
    setNodeChecked(checked) {
        this.setState({
            checked: checked
        }, () => {
            if (this.props.checkType.y.indexOf("s") > -1 || checked == false && this.props.checkType.n.indexOf("s") > -1) {
                if (this.state.children && this.state.children instanceof Array && this.state.children.length > 0) {
                    for (let ref in this.refs) {
                        if (ref.indexOf("child") > -1) {
                            this.refs[ref].setNodeChecked(checked);
                        }
                    }
                }
            }
        })
    }

    /**
     * 设置自身节点勾选情况
     * @param {*} checked 
     * @param {*} raidoNode 
     */
    setNodeSelfChecked(checked,raidoNode=null){
        if(raidoNode&&raidoNode.id==this.state.id){
            //不处理这个子节点，专门为单选的【level]处理
        }
        else{
            this.setState({
                checked: checked
            })
        }
       
    }
  /**
   * 设置子节点勾选情况
   * @param {*} checked 
   * @param {*} radioNode 单独设置某个节点
   */
    setChildrenChecked(checked,radioNode=null) {

        if (this.props.checkStyle=="checkbox" &&(this.props.checkType.y.indexOf("s") > -1 || checked == false && this.props.checkType.n.indexOf("s") > -1)) {
            //复选勾选的时候
            if (this.state.children && this.state.children instanceof Array && this.state.children.length > 0) {
                for (let ref in this.refs) {
                    if (ref.indexOf("child") > -1) {
                        this.refs[ref].setNodeChecked(checked);
                    }
                }
            }
        }  if (this.props.checkStyle=="radio") {
        
            if (this.state.children && this.state.children instanceof Array && this.state.children.length > 0) {
                for (let ref in this.refs) {
                    if (ref.indexOf("child") > -1) {
                        //
                      
                     
                        this.refs[ref].setNodeSelfChecked(checked,radioNode);//改变子节点
                        if(this.props.radioType=="all"){//如果是全部则继续改变子节点
                            this.refs[ref].setChildrenChecked(checked,radioNode);//子孙节点
                        }
                    }
                }
            }
        }
    }

    /**
   * 获取自身的勾选情况字符串值
   */
    getNodeSelfCheckedValue() {
        return this.state.checkValue
    }
    /**
    * 获取节点数据
    */
    getNodeData() {
        return this.state;
    }
    render() {
        let nodeControl = [];
        let tip = this.state.tip ? this.state.tip : this.state.text;//提示信息
        if (this.state.children instanceof Array) {
            this.state.children.map((item, index) => {

                let isParent = false;//是否为父节点
                if (item.isParent == true || (item.children instanceof Array && item.children.length > 0)) {//如果明确规定了，或者子节点不为空，则设置为父节点
                    isParent = true;
                }
                else {

                }
                //父节点 toto 先保留，后期有用
           
                let parent = { id: this.state.id, text: this.state.text, children: this.state.children };
                nodeControl.push(<TreeNode
                    {...this.props}
                    {...this.state}
                    {...item}
                    key={item.id}
                    parentRemoveChild={this.parentRemoveChild.bind(this)}
                    parentSetChecked={this.parentSetChecked.bind(this)}
                    parentGetChildCheckedNum={this.parentGetChildCheckedNum.bind(this)}
                    parentSetBrotherRadioChecked={this.parentSetBrotherRadioChecked.bind(this)}
                    ref={"child" + index}
                    half={(this.state.checkValue||item.checkValue) == "half"}
                    checked={this.props.inputValue?this.props.inputValue.indexOf(","+item.id+",")>-1?true:false:this.state.checked}
                    isParent={isParent} parent={parent}

                    selectid={this.props.selectid} />);
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
        let nodeEement = [<Input key="1" forceChange={true} type={this.props.checkStyle || "checkbox"}
            hide={this.props.checkAble ? false : this.props.checkAble ? false : true}
            half={this.state.checkValue == "half"}
            name={"node" + this.props.id}
            value={this.state.checked ? this.state.id:""} data={[{ value: this.state.id, text: "" }]}
            onSelect={this.onNodeChecked.bind(this)}></Input>,
        <span key="2" draggable={this.props.dragAble} onDragEnd={this.onDragEnd.bind(this)} onDragStart={this.onDragStart.bind(this)}
            onClick={this.onClick.bind(this, this.state.id, this.state.text)} onDoubleClick={this.onDoubleClick.bind(this, this.state.id, this.state.text)}>
            <i key="2" className={iconCls} style={{ marginRight: 3 }} onClick={this.onClick.bind(this, this.state.id, this.state.text, this.state.children)}></i>{this.state.text}&nbsp;&nbsp;</span>
        ]
        //判断是否可以拖动

        return <li ref="node" style={{ display: this.state.hide ? "none" : "block" }} onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)} onDragLeave={this.onDragLeave.bind(this)} >

            <div id={this.state.nodeid} className={this.props.selectid == this.state.id ? "selected" : ""} >
                <i className={this.state.open ? "icon-drop" : "icon-zright"} style={{ opacity: this.state.isParent ? 1 : 0 }} onClick={this.showHandler}></i>
                <a href={this.state.href} title={tip}  >
                    {this.state.rename ? <Input type="text" id={this.state.textid} required={true} onBlur={this.onBlur.bind(this)} onKeyUp={this.onKeyUp.bind(this)}
                        name={"key" + this.state.id} value={this.state.text} onChange={this.onChange.bind(this)}></Input> : nodeEement}
                </a>
                {
                    !this.state.rename && this.props.renameAble ? <i key="edit" className={"icon-edit"} title="重命名" onClick={this.beforeRename.bind(this)} style={{ fontSize: 12, transform: "translateY(1px)" }}></i> : null
                }
                {
                    !this.state.rename && this.props.removeAble ? <i key="delete" className={"icon-remove"} title="删除" onClick={this.beforeRemove.bind(this)} style={{ fontSize: 13, transform: "translateY(2px)" }}></i> : null
                }
                {
                    !this.state.rename && this.props.editAble ? <i key="set" className={"icon-setting"} title="编辑" onClick={this.onEdit.bind(this)} style={{ fontSize: 13, transform: "translateY(2px)" }}></i> : null
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
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,//值
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
    children: PropTypes.array,//子节点


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

};
TreeNode.defaultProps = {
    isParent: false,
    id: null,
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
    children: [],

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

};
export default TreeNode;