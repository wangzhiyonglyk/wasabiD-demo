/*
 create by wangzhiyonglyk
 date:2017-02-09
 desc:圣杯布局，底部
 */
import React from "react";
import PropTypes from "prop-types";
import func from "../libs/func";
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      id: func.randomStr(),
    }
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }
  static defaultProps = {
    type: "footer",
    resize:true,
  };
  static propTypes = {
   
    resize: PropTypes.bool,
   
  };
  componentDidMount() {
    //设置鼠标事件
    
     if (this.props.resize) {
      this.dom=document.getElementById(this.state.id)
      this.oldClientY = null;
      this.dom.addEventListener("mousemove", this.mouseMoveHandler); 
    }
  }
    /**
   * 鼠标按下事件
   * @param {*} event
   */
    mouseDownHandler(event) {
      if (event.target.style.cursor === "ns-resize") {
        document.addEventListener("mousemove", this.mouseMoveHandler);
        document.addEventListener("mouseup", this.mouseUpHandler);
        //记住原始位置
        this.oldClientY = event.clientY;
        this.oldHeight = this.dom.getBoundingClientRect().height// 使用这个更精确
    
      }
    }
  /**
     * 鼠标移动事件.
     * 
     * @param {*} event
     */
    mouseMoveHandler(event) {
      if (this.oldClientY !== null) {
        this.dom.style.height = this.oldHeight - (event.clientY - this.oldClientY) + "px";
    } else {
  
      let clientY = event && event.clientY;
      let position = this.dom.getBoundingClientRect();
      let topPosition = position.top;
      if (clientY - topPosition <=5&&clientY - topPosition >=0) {
        event.target.style.cursor = "ns-resize";
        this.dom.addEventListener("mousedown", this.mouseDownHandler);
      } else {  
        event.target.style.cursor = "pointer";
       
      }
    }
  }
    /**
     * 鼠标松开事件
     * @param {*} event
     */
    mouseUpHandler(event) {
      if (event.target.style.cursor === "ns-resize") {
        this.dom.removeEventListener("mousedown", this.mouseDownHandler);
        document.removeEventListener("mousemove", this.mouseMoveHandler);
        document.removeEventListener("mouseup", this.mouseUpHandler);
        let height = this.dom.getBoundingClientRect().height
        
        this.props.onChange && this.props.onChange("footer",height);
      }
      event.target.style.cursor = "pointer"
      this.oldClientY = null;
        this.oldHeight = null;
    }
  render() {
    return (
      <div
        id={this.state.id}
        className={"wasabi-layout-footer  layout-panel" + (this.props.className ?? "")}
        style={{
          ...this.props.style,
          height: this.props.height
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
Footer.propTypes = {};
export default Footer;
