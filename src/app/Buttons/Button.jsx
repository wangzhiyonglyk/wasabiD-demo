/*
 create by wangzhiyong
 date:2016-04-05后开始独立改造
 edit 2019-12-18
 desc:按钮组件,从linkbutton独立出来
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import func from "../libs/func.js";
import('../Sass/Buttons/button.css');
class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onClick = this.onClick.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    if (this.props.disabled == true) {
      return;
    }
    this.props.onClick && this.props.onClick(this.props.name, this.props.title, event);
  }
  onDoubleClick(event) {
    event.preventDefault();
    if (this.props.disabled == true) {
      return;
    }
    this.props.onDoubleClick && this.props.onDoubleClick(this.props.name, this.props.title, event);
  }
  render() {

    let props = {
      className:
        'wasabi-button ' +
        this.props.theme +
        ' size-' +
        this.props.size +
        ' ' +
        this.props.className,
      style: this.props.style ? this.props.style : {},
      disabled: this.props.disabled == true ? 'disabled' : null,
      //文字提示
      title: this.props.title
    };
    return (this.props.children || this.props.title || this.props.iconCls) ? <button {...props} onDoubleClick={this.onDoubleClick} onClick={this.onClick} type='button' >
      {this.props.iconCls && this.props.iconAlign == "left" ? <i className={"left " + this.props.iconCls}></i> : null}
      <span>{this.props.children ? this.props.children : this.props.title}</span>
      {this.props.iconCls && this.props.iconAlign == "right" ? <i className={"right " + this.props.iconCls}></i> : null}
    </button> : null
  }
}
Button.propTypes = {
  name: PropTypes.string, //按钮名称
  title: PropTypes.string, //按钮提示信息
  iconCls: PropTypes.string, //图标
  iconAlign: PropTypes.oneOf(["left", "right"]),//图标的位置
  theme: PropTypes.oneOf([
    //主题
    'primary',
    'default',
    'success',
    'info',
    'warning',
    'danger',
    'cancel'
  ]),
  size: PropTypes.oneOf([
    //按钮大小
    'large',
    'default',
    'small',
    "mini"
  ]),
  onClick: PropTypes.func, //按钮单击事件
  style: PropTypes.object, //样式
  className: PropTypes.string, //自定义样式
  disabled: PropTypes.bool //按钮是否无效
};
Button.defaultProps = {
  name: '',
  title: null,
  iconCls: "",
  iconAlign: "left",
  theme: 'primary',
  size: 'default',
  style: {},
  className: '',
  onClick: null,
  disabled: false
};
export default Button;
