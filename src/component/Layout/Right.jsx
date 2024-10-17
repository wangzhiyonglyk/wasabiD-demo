/*
 create by wangzhiyonglyk
 date:2017-02-09
 desc:圣杯布局，右侧
 */
import React from "react";
import PropTypes from "prop-types";
import func from "../libs/func";
class Right extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: func.randomStr(),
    };
    this.targets = []; //用于清除
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }
  static defaultProps = {
    type: "right",
    resize:true,
  };
  static propTypes = {
    resize: PropTypes.bool
  };

  componentDidMount() {
    //设置鼠标事件
   if (this.props.resize) {
     this.dom = document.getElementById(this.state.id)
     this.oldClientX = null
     this.dom.addEventListener("mousemove", this.mouseMoveHandler);
   }
 }
   
  
  /**
   * 鼠标按下事件
   * @param {*} event
   */
  mouseDownHandler(event) {
    if (event.target.style.cursor === "ew-resize") {
      document.addEventListener("mousemove", this.mouseMoveHandler);
      document.addEventListener("mouseup", this.mouseUpHandler);
      //记住原始位置
      this.oldClientX = event.clientX;
      this.oldWidth = this.dom.getBoundingClientRect().width// 使用这个更精确
   

    }
  }
/**
   * 鼠标移动事件
   * @param {*} event
   */
  mouseMoveHandler(event) {
    if (this.oldClientX !== null) {
      this.dom.style.width = this.oldWidth - (event.clientX - this.oldClientX) + "px";
  } else {
    let clientX = event && event.clientX;
    let position = this.dom.getBoundingClientRect();
      let leftPosition = position.left 
    if (clientX-leftPosition >=0&&clientX-leftPosition <= 5) {
      event.target.style.cursor = "ew-resize";
      this.dom.addEventListener("mousedown", this.mouseDownHandler);
    } else {
      event.target.style.cursor = "pointer"
    }
  }
}
  /**
   * 鼠标松开事件
   * @param {*} event
   */
  mouseUpHandler(event) {
    if (event.target.style.cursor === "ew-resize") {
   
      this.dom.removeEventListener("mousedown", this.mouseDownHandler);
      document.removeEventListener("mousemove", this.mouseMoveHandler);
      document.removeEventListener("mouseup", this.mouseUpHandler);
      let width = this.dom.getBoundingClientRect().width
      this.props.onChange && this.props.onChange("right",width);
    }
    event.target.style.cursor = "pointer";

    this.oldClientX = null;
      this.oldWidth = null;
  }
  render() {
    return (
      <div
        className={"wasabi-layout-right  layout-panel "}
        id={this.state.id}
        style={{
          ...this.props.style,

          width: this.props.width,
         
        }}
      >
     
        {this.props.children}
      </div>
    );
  }
}

export default Right;
