/*
 create by wangzhiyong
 date:2020-11-11 create
 desc:标记组件

 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import('./index.css');
class Badge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hide:this.props.hide,
            oldPropsHide:this.props.hide,
        }
    }
    static getDerivedStateFromProps(props, state) {
        if(props.hide!=state.oldPropsHide){
            return {
                hide:props.hide
            }
        }
        return null;
    }
    hide(hide){
        this.setState({
            hide:hide
        })
    }

    render() {
        return <div className={"wasabi-badge " +this.props.className } style={this.props.style}>
            {this.props.children}
            <sup className="wasabi-badge__content is-fixed" style={{display:this.state.hide?"none":"block"}}>{this.props.tag>this.props.max?this.props.max+"+":this.props.tag}</sup></div>
    }
}
Badge.propTypes={
    tag:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),//标签
    max:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),//最大值
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
      style:PropTypes.object,//样式
      hide:PropTypes.bool
}
Badge.defaultProps={
    tag:"",
    max:"",
    theme:"default",
    style:null,
    hide:false
}

export default Badge;