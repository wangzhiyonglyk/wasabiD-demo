//create by wangzhiyonglyk
//date:2016-03-22
//desc:模态窗口

import React from "react";
import PropTypes from "prop-types";

import Button from "../Buttons/Button";
import Resize from "./Resize.jsx";
import func from "../libs/func";
import "./Modal.css";
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.resizeref = React.createRef();
    this.state = {
      headerid: func.uuid(),
      title: this.props.title,
      visible: !!this.props.visible,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);

    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  componentDidMount() {
    let headercontrol = document.getElementById(this.state.headerid);
    if(headercontrol){
      headercontrol.addEventListener("mousedown", this.mouseDownHandler);
    }
  }

  close() {
    //关闭事件
    window.modalZindex = window.modalZindex || 10;
    window.modalZinde -= 1;
    this.setState({ visible: false });
    this.props?.onClose && this.props?.onClose();
  }

  open(title) {
    //打开事件
    window.modalZindex = window.modalZindex || 8;
    window.modalZindex += 1;
    this.setState({ visible: true, title: title ? title : this.state.title });
    this.resizeref.current?.setPosition()
  }
  /**
   * 鼠标移动事件
   * @param {*} event
   */
  mouseMoveHandler(event) {
    if (this.position !== null) {
      let target = this.resizeref.current.getTarget();
      if (target&&(
        event.clientX - this.oldClientX > 5 ||
        event.clientX - this.oldClientX < -5)
      ) {
        //防止抖动
        target.style.left =
          this.position.left + event.clientX - this.oldClientX + "px";
        target.style.top =
          this.position.top + event.clientY - this.oldClientY + "px";
      }
    }
  }
  /**
   * 鼠标按下事件
   * @param {*} event
   */
  mouseDownHandler(event) {
    document.addEventListener("mousemove", this.mouseMoveHandler);
    document.addEventListener("mouseup", this.mouseUpHandler);

    //记住原始位置
    this.oldClientX = event.clientX;
    this.oldClientY = event.clientY;
    let target = this.resizeref.current.getTarget();
    this.position = target.getBoundingClientRect();
  }

  /**
   * 鼠标松开事件
   * @param {*} event
   */
  mouseUpHandler(event) {
    this.position = null;
    document.removeEventListener("mouseup", this.mouseUpHandler);
    document.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  onConfirm() {
    if (this.props.onConfirm !== null) {
      this.props.onConfirm();
    }
  }
  onCancel() {
    this.close(); //关闭
    if (this.props.onCancel !== null) {
      this.props.onCancel();
    }
  }
  render() {
    let style = func.clone(this.state.style) || {};
    style.zIndex = window.modalZindex + 1 || 10;
    //因为要提前调用children内容，所以不能在visible=false时，返回null
    let activename = "wasabi-modal-container ";
    if (this.state.visible == true) {
      activename = "wasabi-modal-container active";
    }
    let footer = null;
    if(this.props.onConfirm||this.props.onCancel){
      let buttons = [];
      buttons.push(
        <Button
          title="取消"
          key="cancel"
          theme="cancel"
          onClick={this.onCancel}
        >
          取消
        </Button>
      );
      buttons.push(
        <Button title="确定" key="ok" theme="primary" onClick={this.onConfirm}>
          确定
        </Button>
      );
  
      footer = <div className="wasabi-modal-footer">{buttons}</div>;
    }
    //如果有 destroy 销毁字段，在隐藏的时候破坏子组件，这样就可以把表单的内容清空
    return (
      <div className={activename}>
     
        <Resize
          ref={this.resizeref}
          className={
            "wasabi-modal " +
            (this.props.className??"")+
            (this.state.visible ? " wasabi-fade-in" : " wasabi-fade-out") 
           
          }
          style={style}
          resize={true}
        >
          
         {this.props.showHeadeer!==false? <div className={"wasabi-modal-header "+(this.props.header_className??"")} 
          style={this.props.header_style}
          id={this.state.headerid}>
           <span> {this.state.title}</span><i
            className="icon-close wasabi-modal-close"
            onClick={this.close.bind(this)}
          ></i>
          </div>:null}
          <div className={"wasabi-modal-content "+(this.props.body_className??"")} 
          style={this.props.body_style}
          >
            {this.props.destroy && this.state.visible == false
              ? null
              : this.props.children}
          </div>
          {footer}
        </Resize>
      </div>
    );
  }
}

Modal.propTypes = {
  className: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  header_className: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  body_className: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  header_style: PropTypes.object,
  body_style: PropTypes.object,
  showHeadeer: PropTypes.bool,//是否显示头部
  resize: PropTypes.bool, //是否可以改变大小
  destroy: PropTypes.bool, //是否销毁
  onClose: PropTypes.func, //关闭事件
  onConfirm: PropTypes.func, //确定事件
  onCancel: PropTypes.func, //取消事件
};

Modal.defaultProps = {
  className: "",
  resize: false, //是否可以改变大小
  destroy: true,
  onClose: null,
  onConfirm: null, //确定按钮的事件，
  onCancel: null, //取消事件
};

export default Modal;
