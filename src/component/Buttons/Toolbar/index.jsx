/**
 * Created by wangzhiyong on
 * date:2016-04-05后开始独立改造
 * edit 2019-12-18
 * desc:按钮工具栏
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinkButton from '../LinkButton';
import Button from '../Button';
import('./toolbar.css');

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {};
  }
  onClick(name, title, event) {
   this.props.onClick&& this.props.onClick(name, title, event); //执行父组件的事件
  }
  render() {
    let props = {
      className: this.props.className + ' wasabi-toolbar',
      style: this.props.style
    };
    var buttonlist = [];
     this.props.buttons&& this.props.buttons.map((child, index) => {
        if (this.props.type == 'button') {
          buttonlist.push(
            <Button key={index} {...child} onClick={this.onClick}>{this.props.title}</Button>
          );
        } else {
          buttonlist.push(
            <LinkButton
              key={index}
              {...child}
              onClick={this.onClick}
            >{this.props.title}</LinkButton>
          );
        }
      });
    return <div {...props}>{buttonlist}</div>;
  }
}

Toolbar.propTypes = {
  buttons: PropTypes.array.isRequired,
  type: PropTypes.oneOf([
    //类型
    'button',
    'link'
  ]),
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func
};
Toolbar.defaultProps = {
  type: 'button',
};

export default Toolbar;
