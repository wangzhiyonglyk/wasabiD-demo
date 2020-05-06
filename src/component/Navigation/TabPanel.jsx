/**
 * create by wangzhiyong
 * date:2017-08-20
 * desc:标签页的内容
 *
 */
import React from "react";
import PropTypes from "prop-types";
class TabPanel extends React.Component {
  constructor(props) {
    super(props);
    
  }
  static propTypes={
      title: PropTypes.any.isRequired,//标题是必须，可以是组件
      closeAble:PropTypes.bool,//是否可以关闭
      iconCls:PropTypes.string
  } 
  static defaultProps={
    closeAble:true,
    iconCls:"icon-txt"
  }
  render() {
    return this.props.children;
  }


}

export default TabPanel;
