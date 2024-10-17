/*
 create by wangzhiyonglyk
 date:2017-02-09
 desc:圣杯布局，中间内容
 */
import React from "react";
class Center extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
      className={" wasabi-layout-center  layout-panel "+(this.props.className??"")}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Center;
