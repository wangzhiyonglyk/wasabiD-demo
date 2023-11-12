/*
create by wangzhiyonglyk
date:2017-02-09
desc:圣杯布局
 */

import React from "react";
import PropTypes from "prop-types"; 
import func from "../libs/func";
import "../Sass/Layout/Layout.css";
class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id:func.randomStr(),
      centerid:func.randomStr(),
    };
    this.calWidthHeight = this.calWidthHeight.bind(this);
    this.onChange=this.onChange.bind(this)
  }
  static propTypes = {
    border: PropTypes.bool,
    resize: PropTypes.bool
  };
  static defaultProps = {
    border: true,
    resize: true,
  };
  calWidthHeight() {
    //计算center的高度与宽度
    let centerReduceHeight = 0;
    let centerReduceWidth = 0;
    let top = 0;
    let left = 0;
    React.Children.map(this.props.children, (child, index) => {
      if (child) {
        switch (child.props.type) {
          case "header":
            centerReduceHeight += child.props.height ? child.props.height : 42; 
            top = child.props.height ? child.props.height : 42;
            break;
          case "footer":
            centerReduceHeight += child.props.height ? child.props.height : 100;
            break;
          case "left":
            centerReduceWidth += child.props.width ? child.props.width : 100;
            left = child.props.width ? child.props.width : 100;
            break;
          case "right":
            centerReduceWidth += child.props.width ? child.props.width : 100;
            break;
        }
      }
    });

    return {
      reduceWidth: centerReduceWidth ? centerReduceWidth : 0, //这里是center要扣除的宽度
      reduceHeight: centerReduceHeight ? centerReduceHeight : 0, //不仅仅是center的高度是left,right的扣除高度
      top: top, //left center  right的位置
      left: left,
    };
  }
  /**
   * 容器内部调整宽高
   * @param {*} type 
   * @param {*} value 
   */
  onChange(type, value) {
  
    this.props.onChange&&this.props.onChange(type,value)
  }
  render() {
    let widthHeight = this.calWidthHeight(); //计算宽高
    return (
      <div
        className={"wasabi-layout clearfix " + (this.props.className || "")+(this.props.border?"":" noborder")}
        id={this.state.id}
        style={this.props.style}
      >
        {React.Children.map(this.props.children, (child, index) => {
          if (child) {
            switch (child.props.type) {
              case "center":
                return React.cloneElement(child, {
                  centerid: this.props.resize? this.state.centerid:null, 
                  onChange:this.onChange,
                  key: index,
                  ref: index,
                  ...widthHeight,
                });
              case "left":
                return React.cloneElement(child, { 
                  parentId:this.state.id,
                  centerid: this.props.resize? this.state.centerid:null, 
                  onChange:this.onChange,
                  key: index,
                  ref: index,
                  ...widthHeight,
                });
              case "right":
                return React.cloneElement(child, {
                  parentId:this.state.id,
                  centerid: this.props.resize? this.state.centerid:null, 
                  onChange:this.onChange,
                  key: index,
                  ref: index,
                  ...widthHeight,
                });
              // header，footer,其他
              default:
                return React.cloneElement(child, {
                  parentId: this.state.id,
                  centerid: this.props.resize? this.state.centerid:null, 
                  key: index,
                  onChange:this.onChange,
                  ref: index
                });
            }
          }
        })}
      </div>
    );
  }
}

export default Layout;
