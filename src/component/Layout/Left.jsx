/*
 create by wangzhiyong
 date:2017-02-09
 desc:圣杯布局，右侧
 */
import React from "react";
import PropTypes from "prop-types";

class Left extends  React.Component{
    constructor(props) {
        super(props);
    }
    static defaultProps = {
        className:"",
        title:"left",
        top:null,
        width:0,
        height:0
    }
    static propTypes={
        top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
        reduceHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }
    render() {
        return <div className={"wasabi-layout-left  layout-panel "+this.props.className} 
        style={{top:this.props.top,width:this.props.width,height: (this.props.reduceHeight?"calc(100% - "+(this.props.reduceHeight).toString()+"px":null) }}>
          {this.props.children}
        </div>
    }
}

export default  Left;