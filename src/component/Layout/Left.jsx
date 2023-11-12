/*
 create by wangzhiyonglyk
 date:2017-02-09
 desc:圣杯布局，左侧
 */
import React from "react";
import PropTypes from "prop-types";
import func from "../libs/func";

class Left extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldWidth: null,
      width: null,
      id: func.randomStr(),
   
    };
   
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }
  static defaultProps = {
    type: "left",
    resize: true,
    width: 0,
    
  };
  static propTypes = {
   resize: PropTypes.bool,
    width:PropTypes.number,
  
  };
  static getDerivedStateFromProps(props, state) {
    if (props.width !== state.oldWidth) {
     return  {
        width: props.width,
        oldWidth:props.width
       }
    }
    return null
  }
  componentDidMount() {
     //设置鼠标事件
     this. center =document.getElementById(this.props.centerid);
     if (this.center&&this.props.resize) {
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
      this.oldCenterWidth= this.center.getBoundingClientRect().width// 使用这个更精确

    }
  }
/**
   * 鼠标移动事件
   * @param {*} event
   */
  mouseMoveHandler(event) {
   
    if (this.oldClientX !== null) {
      this.dom.style.width = this.oldWidth + (event.clientX - this.oldClientX) + "px";
      this.center.style.left = this.oldWidth + (event.clientX - this.oldClientX) + "px";
      this.center.style.width = this.oldCenterWidth - (event.clientX - this.oldClientX) + "px";
  } else {

    let clientX = event && event.clientX;
    let position = this.dom.getBoundingClientRect();
    let leftPosition = position.left + position.width;
    if (leftPosition - clientX <= 5) {
     
      event.target.style.cursor = "ew-resize";
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
    if (event.target.style.cursor === "ew-resize") {
      this.dom.removeEventListener("mousedown", this.mouseDownHandler);
      document.removeEventListener("mousemove", this.mouseMoveHandler);
      document.removeEventListener("mouseup", this.mouseUpHandler);
      let width = this.dom.getBoundingClientRect().width
      this.setState({
        width:width
      })
      this.props.onChange && this.props.onChange("left",width);
    }
    event.target.style.cursor = "pointer"
    this.oldClientX = null;
      this.oldWidth = null;
  }

  render() {
    return (
      <div
        className={
          "wasabi-layout-left  layout-panel " + (this.props.className ?? "")
        }
        id={this.state.id}
        style={{
          ...this.props.style,
          top: this.props.top,
          width: this.state.width,
          height: this.props.reduceHeight!==null&&this.props.reduceHeight!==undefined
            ? "calc(100% - " + this.props.reduceHeight.toString() + "px"
            : null,
        }}
      >
       
        {this.props.children}
      </div>
    );
  }
}

export default Left;
