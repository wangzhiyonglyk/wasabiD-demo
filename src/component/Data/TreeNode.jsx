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
            rename: false,//是否处于重命名状态
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
    onClick(id, text) {
        this.props. onClick && this.props.onClick(id, text)

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
     * change事件
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
     * 自身的勾选动作
     * @param {*} id 
     */
    onselfChecked(value) {
        this.setState({
            checked: value == this.state.id,
            half: false
        },
        ()=>{
                //获取兄弟之间的勾选情况，来处理父节点的勾选
               this.brotherChecked(); 
                //触及树组件【即根】的onchecked
                console.log("ee")
              this.props.onChecked && this.props.onChecked(value == this.state.id, this.state.id, this.state.text, this.state.children);     
        }
        );

    }
    /**
     * 获取兄弟之间的勾选情况，来处理父节点的勾选
     */
    brotherChecked(){
         //获取兄弟节点的勾选情况，。
         let checked = this.props.getBrotherCheckedNum && this.props.getBrotherCheckedNum();
         if (checked && checked.num && checked.length == checked.num) {//全部勾选
             this.props.parentSetChecked && this.props.parentSetChecked(true);//处理父节点的
         }
         else if (checked && checked.num == 0) {//全部没有勾选
             this.props.parentSetChecked && this.props.parentSetChecked(false);//处理父节点的
         }
         else if (checked && checked.length != checked.num) {//部分勾选
             //半选/todo
             this.props.parentSetChecked && this.props.parentSetChecked("half");//处理父节点的
         }
        
     
    }
      /**
     * ，由父节点设置勾选情况
     * @param {*} checked 
     */
    setCheckedForParent(checked) {

        if (checked != "half") {
            this.setState({
                checked: checked,
                half: false
            },()=>{
                //再向上解决父节点的勾选情况
               this.brotherChecked();
               this.props.onChecked && this.props.onChecked(checked, this.state.id, this.state.text, this.state.children);     
            })
        }
        else {
            this.setState({
                half: checked == "half",
                checked: false,
            },()=>{ this.brotherChecked();})
        }

    }

    /**
     * 获取当前节点，包括子孙的已勾选的详情
     */
   getChecked(){
        //勾选的对象
        let checkedArr=[];
        if(this.state.checked){
            checkedArr.push({
                id:this.state.id,
                text:this.state.text,
                checked:this.state.checked
            })
        }
        if (this.state.children && this.state.children instanceof Array) {
            for (let ref in this.refs) {
                if (ref.indexOf("child") > -1) {
                 
                   checkedArr=[].concat(checkedArr,  this.refs[ref].getChecked());

                }
            }
        }
     
        return checkedArr;
   }

    /**
     * 获取自身的勾选情况
     */

    getselfChecked() {
        
        return this.state.checked
    }

     /**
     * 获取子节点的勾选数量
     */
    getchildCheckedNum() {
        let checked = {
            length: 0,
            num: 0
        }
        if (this.state.children && this.state.children instanceof Array) {
            for (let ref in this.refs) {
                if (ref.indexOf("child") > -1) {
                    checked.length++
                    if (this.refs[ref].getselfChecked()) {
                        checked.num++
                    }

                }
            }
        }
        return checked;
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
     * 由节点的父组件处理删除
     * @param {*} childIndex 
     */
    onRemoveForParent(childid, childText, subChildren) {
        let children = unit.clone(this.state.children);
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

        this.props.onRemove && this.props.onRemove(childid, childText, subChildren);
    }
    /**
     * 重命名之前
     */
    beforeRename() {
        let rename =true;
        if(this.props.beforeRename )
        {
            rename= this.props.beforeRename(this.state.id, this.state.text, this.state.children) 
        }       
        if (rename) {
            this.setState({
                rename: rename
            }, () => {
                let input = document.getElementById(this.state.textid);
                if(input){
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
        let remove =true;
        if(this.props.beforeRemove){
            remove=this.props.beforeRemove(this.state.id, this.state.text, this.state.children);
        } 
        if (remove) {
            this.props.parentRemoveChild && this.props.parentRemoveChild(this.state.id, this.state.text, this.state.children)
        }
    }
    
    onEdit(){
        this.props.onEdit&& this.props.onEdit(this.state.id, this.state.text, this.state.children);
    }
  

    /**
     * 获取节点数据
     */
    getData() {
        return this.state;
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
        if(this.state.dragAble){
            let dragAble=true;
            if(this.props.beforeDrag){
                dragAble=this.props.beforeDrag(this.state.id,this.state.text,this.state.children);
            }
            if(dragAble){
                let obj = unit.clone(this.state);
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
            this.props.onDrag&&this.props.onDrag(this.state.id, this.state.text, this.state.children);
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
        else if(this.state.dropAble){
            let dropAble=true;//可以停靠
            if(this.props.beforeDrop){
                dropAble= this.props.beforeDrop(node,this.state);//存在并且返回
            }
            if(dropAble){
                window.localStorage.setItem("moveed", "true");
                let children = unit.clone(this.state.children) || [];
                children.unshift(node); //不能前插
    
                this.setState({
                    children: children,
                    isParent: true,
                    open: true
                },()=>{this.props.onDrop&&this.props.onDrop(node,this.state)});
            }
          
        }
        document.getElementById(this.state.nodeid).style.borderTop = "none";
        window.localStorage.removeItem("treenode")

    }
    /**
     * 拖动后父节点删除
     */
    onDragForParent(childid, childText, subChildren) {
        this.onRemoveForParent(childid, childText, subChildren)

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
                //父节点

                let parent = { id: this.state.id, text: this.state.text, children: this.state.children };
                nodeControl.push(<TreeNode
                     {...this.props}
                     {...this.state}
                    {...item}
                    key={item.id}
                    parentRemoveChild={this.onRemoveForParent.bind(this)} parentSetChecked={this.setCheckedForParent.bind(this)} getBrotherCheckedNum={this.getchildCheckedNum.bind(this)}
                    ref={"child" + index}
                    half={this.state.half}
                    checked={this.state.checked}
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
            half={this.state.half}
            name={"node"+this.props.id}
            value={this.state.checked ? this.state.id : null} data={[{ value: this.state.id,text:"" }]} onSelect={this.onselfChecked.bind(this)}></Input>,
        <span key="2" draggable={this.props.dragAble} onDragEnd={this.onDragEnd.bind(this)} onDragStart={this.onDragStart.bind(this)} 
        onClick={this.onClick.bind(this, this.state.id, this.state.text)}  onDoubleClick={this.onDoubleClick.bind(this, this.state.id, this.state.text)}>  
         <i key="2" className={iconCls} style={{ marginRight: 3 }} onClick={this.onClick.bind(this, this.state.id, this.state.text)}></i>{this.state.text}&nbsp;&nbsp;</span>
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

};
export default TreeNode;