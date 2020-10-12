//create by wangzy
//date:2016-03-22
//desc:模态窗口

import React from "react";
import PropTypes from "prop-types";

import  Button from "../Buttons/Button.jsx";
import  Resize from "./Resize.jsx";
import events from "../Unit/events.js";
import ("../Sass/Layout/Modal.css");
import ("../Sass/Buttons/button.css");
class Modal extends  React.Component {
    constructor(props) {
        super(props);
        let width=(this.props.style&&this.props.style.width)?this.props.style.width:400;
        let height=(this.props.style&&this.props.style.height)?this.props.style.height:400;
        
        this.state = {
            title:this.props.title,
            width:width,
            height:height,
            visible: false,
            left: (document.body.clientWidth - width) / 2,
            top: 50,
            oldLeft: (document.body.clientWidth - width) / 2,
            oldTop: 50,
            moveX: null,
            moveY: null,
        }
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseOutHandler = this.mouseOutHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
        this.OKHandler = this.OKHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        let width=(nextProps.style&&nextProps.style.width)?nextProps.style.width:this.state.width;
        let height=(nextProps.style&&nextProps.style.height)?nextProps.style.height:this.state.height;
        
        this.setState({
               ...nextProps,
               width:width,
               height:height,
            }
        );

    }
    close() {//关闭事件
        this.setState({visible: false});
        if (this.props.closedHandler != null) {
            this.props.closedHandler();
        }
    }

    open(title) {//打开事件
        this.setState({visible: true,title:title});
    }

    mouseMoveHandler(event) {
        return;
        if (this.position != null & event.target.className == "wasabi-modal-header") {
            let target= this.refs.resize.target();
          target.style.left+=event.clientX-this.oldClientX;
           target.style.top+=event.clientY-this.oldClientY;
        }


    }

    mouseDownHandler(event) {
        return ;
        let position=   this.refs.resize.getBoundingClientRect();
      if(position){
         this.position=position;//记住方向
         //记住原始位置
          this.oldClientX=event.clientX;
          this.oldClientY=event.clientY;
    }
}

    mouseOutHandler(event) {
        this.position=null;
    }

    mouseUpHandler(event) {
        this.position=null;
    }

    OKHandler() {
        if (this.props.OKHandler != null) {
            this.props.OKHandler();
        }
    
    }

    cancelHandler() {
        if (this.props.cancelHandler != null) {
            this.props.cancelHandler();
        }
        this.close();//关闭
    }

    render() {

        if(!this.state.visible){
return null;
        }
        let activename = "wasabi-modal-container ";
        if (this.state.visible == true) {
            activename = "wasabi-modal-container active";
        }
      
       
        let footer = null;
        let buttons = [];
            if (this.props.OKHandler) {
                buttons.push(
                    <Button title="确定" key="ok" theme="primary" onClick={this.OKHandler}
                            style={{width: 60, height: 30}}></Button>
                )         
            if (this.props.OKHandler) {
                buttons.push(
                    <Button title="取消" key="cancel" theme="cancel" onClick={this.cancelHandler}
                            style={{width: 60, height: 30, backgroundColor: "gray"}}></Button>
                )
            }
            footer = <div className="wasabi-modal-footer">
                {
                    buttons
                }
            </div>;
        }
        return <div className={activename}>
            <div className={" wasabi-overlay " + (this.props.modal == true ? "active" : "")}></div>
            <Resize ref="resize"
                    className={"wasabi-modal fadein "+ this.props.className}  style={this.props.style} resize={this.props.resize}>
                <a className="wasabi-modal-close" onClick={this.close}></a>
                <div className="wasabi-modal-header" ref="header" onMouseMove={this.mouseMoveHandler}
                     onMouseDown={this.mouseDownHandler}
                     onMouseUp={this.mouseUpHandler}
                     onMouseOut={this.mouseOutHandler}
                >
                    <div style={{display: "inline"}}>{this.state.title}</div>
                </div>

                <div className="wasabi-modal-content" style={{height: this.state.height - 40}}>
                    {
                        this.props.children
                    }
                </div>
                {
                    footer
                }
            </Resize>
        </div>


    }
}

Modal.propTypes={
    className:PropTypes.oneOfType([PropTypes.number, PropTypes.string]), 
    style:PropTypes.object,
    resize: PropTypes.bool,
    closedHandler: PropTypes.func,
    OKHandler: PropTypes.func,
    cancelHandler: PropTypes.func,
}

Modal.defaultProps={
   className:"",
   style:{},
    width: 400,//宽度
    height: 400,//高度
    resize: false,//是否可以改变大小
    modal: true,//默认有遮罩层
    OKHandler: null,//确定按钮的事件,
}

export default  Modal;