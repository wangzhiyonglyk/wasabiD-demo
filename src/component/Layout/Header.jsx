/*
 create by wangzhiyonglyk
 date:2017-02-09
 desc:圣杯布局，头部
 */
import React from "react";
import PropTypes from "prop-types";
import func from "../libs/func";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldHeight: null,
      height: null,
      id: func.randomStr(),
   
    }
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  static defaultProps = {
    type: "header",
    resize:true,
    height: null,
  };
  static propTypes = {
    resize: PropTypes.bool,
    height:PropTypes.number,
  };
  static getDerivedStateFromProps(props, state) {
    if (props.height !== state.oldHeight) {
     return  {
      height: props.height,
      oldHeight:props.height
       }
    }
    return null
  }
  componentDidMount() {
    //设置鼠标事件
     this. center = document.getElementById(this.props.centerid);
     if (this.center&&this.props.resize) {
      this.dom=document.getElementById(this.state.id)
      this.parentDom = document.getElementById(this.props.parentId)
      if (this.parentDom) {
        for (let i = 0; i < this.parentDom.children.length; i++){
          let child = this.parentDom.children[i]
          if (child.className.indexOf("wasabi-layout-left") > -1) {
            this.left = child;
          }
          if (child.className.indexOf("wasabi-layout-right") > -1) {
            this.right = child;
          }
        }
      }
  
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
        this.oldCenterHeight= this.center.getBoundingClientRect().height// 使用这个更精确
  
      }
    }
  /**
     * 鼠标移动事件.
     * 
     * @param {*} event
     */
    mouseMoveHandler(event) {
      if (this.oldClientY !== null) {
        this.dom.style.height = this.oldHeight + (event.clientY - this.oldClientY) + "px";
        this.center.style.top = this.dom.style.height
        this.center.style.height = this.oldCenterHeight - (event.clientY - this.oldClientY) + "px";
        if (this.left) {
          this.left.style.top = this.dom.style.height
          this.left.style.height = this.oldCenterHeight - (event.clientY - this.oldClientY) + "px";
        }
        if (this.right) {
          this.right.style.top = this.dom.style.height
          this.right.style.height = this.oldCenterHeight - (event.clientY - this.oldClientY) + "px";
        }

    } else {
  
      let clientY = event && event.clientY;
      let position = this.dom.getBoundingClientRect();
      let topPosition = position.top + position.height;
      if (topPosition - clientY <= 5) {
       
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
        this.setState({
          height:height
        })
        this.props.onChange && this.props.onChange("header",height);
      }
      event.target.style.cursor = "pointer"
      this.oldClientY = null;
        this.oldHeight = null;
    }
  render() {
    return (
      <div
        id={this.state.id}
        className={
          "wasabi-layout-header  layout-panel " + (this.props.className ?? "")
        }
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

export default Header;
