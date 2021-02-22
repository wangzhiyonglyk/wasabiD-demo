/*
 create by wangzhiyong
 date:2016-04-05后开始独立改造
 edit 2019-12-18
 desc:图标 2021-02-11
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import('../Sass/Buttons/button.css');
class Icon extends Component {
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

  render() {
     return <i className={this.props.className+" "+this.props.iconCls} style={this.props.style}></i>;
  }
}
Icon.propTypes = {
  name: PropTypes.string, //按钮名称
  iconCls: PropTypes.string, //图标
  className:PropTypes.string,//样式
  style:PropTypes.object,//样式
  disabled:PropTypes.bool,//是否只读
};
Icon.defaultProps={
    name:"",
    iconCls:"",
    className:"",
    style:{},
    disabled:false,
}
  
export default Icon;
