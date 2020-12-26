//create by wangzy
//date:2016-03-22
//desc:模态窗口

import React from "react";
import PropTypes from "prop-types";

import Button from "../Buttons/Button.jsx";
import Resize from "./Resize.jsx";
import events from "../libs/events.js";
import func from "../libs/func";
import dom from "../libs/dom";
import("../Sass/Layout/Modal.css");
import("../Sass/Buttons/button.css");
class Modal extends React.Component {
    constructor(props) {
        super(props);
        let style = (this.props.style && func.clone(this.props.style)) || {};
        let width = (this.props.style && this.props.style.width) ? parseInt(this.props.style.width) : 400;
        let height = (this.props.style && this.props.style.height) ? parseInt(this.props.style.height) : 400;
        style.width = width;
        style.height = height;
        style.left = style.left|| "calc(50% - " + (width / 2).toFixed(2) + "px)";
        style.top = style.top||"calc(50% - " + (height / 2).toFixed(2) + "px)";
        this.state = {
            title: this.props.title,
            style: style,
            visible: false,
        }
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseDownHandler = this.mouseDownHandler.bind(this);

        this.mouseUpHandler = this.mouseUpHandler.bind(this);
        this.OKHandler = this.OKHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
    }
    componentDidMount() {
        events.on(document, "mousedown", this.mouseDownHandler)
    }

    close() {//关闭事件
        console.log("close")
        this.setState({ visible: false });
        if (this.props.closedHandler != null) {
            this.props.closedHandler();
        }
    }

    open(title) {//打开事件
        this.setState({ visible: true, title: title ? title : this.state.title });
    }
    /**
     * 鼠标移动事件
     * @param {*} event 
     */
    mouseMoveHandler(event) {

        if (this.position != null) {
            let target = this.refs.resize.target();
            if(event.clientX - this.oldClientX>5||event.clientX - this.oldClientX<-5)
            {//防止抖动
                target.style.left = (this.position.left + event.clientX - this.oldClientX) + "px";
                target.style.top = (this.position.top + event.clientY - this.oldClientY) + "px";
            }
            
        }
    }
    /**
     * 鼠标按下事件
     * @param {*} event 
     */
    mouseDownHandler(event) {


        if ( dom.isDescendant(this.refs.header,event.target)|| event.target.className == "wasabi-modal-header") {
            events.on(document, "mousemove", this.mouseMoveHandler)
            events.on(document, "mouseup", this.mouseUpHandler)

            //记住原始位置
            this.oldClientX = event.clientX;
            this.oldClientY = event.clientY;
            let target = this.refs.resize.target();
            this.position = target.getBoundingClientRect();

        } else {
            this.position = null;
        }

    }

    /**
     * 鼠标松开事件
     * @param {*} event 
     */
    mouseUpHandler(event) {
        this.position = null;
        events.off(document, "mouseup", this.mouseUpHandler)
        events.off(document, "mousemove", this.mouseMoveHandler)
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
        //因为要提前调用children内容，所以不能在visible=false时，返回null
        let activename = "wasabi-modal-container ";
        if (this.state.visible == true) {
            activename = "wasabi-modal-container active";
        }
        let footer = null;
        let buttons = [];
        if (this.props.OKHandler) {
            buttons.push(
                <Button title="确定" key="ok" theme="primary" onClick={this.OKHandler}
                    style={{ width: 60, height: 30 }}></Button>
            )
            if (this.props.OKHandler) {
                buttons.push(
                    <Button title="取消" key="cancel" theme="cancel" onClick={this.cancelHandler}
                        style={{ width: 60, height: 30 }}></Button>
                )
            }
            footer = <div className="wasabi-modal-footer">
                {
                    buttons
                }
            </div>;
        }
        //如果有destroy销毁字段，在隐藏的时候破坏子组件，这样就可以把表单的内容清空
        return this.props.destroy && this.state.visible == false ? null : <div className={activename}>
            <div className={" wasabi-overlay " + (this.props.modal == true ? "active" : "")} onClick={this.close.bind(this)}></div>
            <Resize ref="resize"
                className={"wasabi-modal fadein " + this.props.className} style={this.state.style} resize={true}>
                <a className="wasabi-modal-close" onClick={this.close.bind(this)}></a>
                <div className="wasabi-modal-header" ref="header" style={{display:this.state.title?"block":"none"}} >
                    {this.state.title}
                </div>
                <div className="wasabi-modal-content" >
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

Modal.propTypes = {
    className: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    resize: PropTypes.bool,//是否可以改变大小
    modal: PropTypes.bool,//是否有遮罩层
    destroy: PropTypes.bool,//是否销毁
    closedHandler: PropTypes.func,//关闭事件
    OKHandler: PropTypes.func,//确定事件
    cancelHandler: PropTypes.func,
}

Modal.defaultProps = {
    className: "",
    style: {},
    resize: false,//是否可以改变大小
    modal: true,//默认有遮罩层
    destroy:false,
    closedHandler: null,
    OKHandler: null,//确定按钮的事件,
    cancelHandler: null,
}

export default Modal;