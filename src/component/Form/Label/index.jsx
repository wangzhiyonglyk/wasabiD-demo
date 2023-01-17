/**
 * Created by wangzhiyong on 16/9/28.
 * desc 将表单组件中的label单独出来,
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import func from "../../libs/func"
import "./Label.css"
class Label extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            controlid: func.uuid(),
        }
        this.onClick = this.onClick.bind(this)
    }
    /**
     * 单击事件
     * @returns 
     */
    onClick(event) {
        this.props.onClick && this.props.onClick(event);
    }

    render() {
       
        return this.props.children?<div id={this.state.controlid}
            title={this.props.title}
            className={"wasabi-label " + (this.props.className || "")}
            style={ this.props.style}>
            {this.props.required ? <span style={{ color: "var(--danger-color)" ,transform:"translateY(2px)",display:"inline-block"}}>*</span> : null} {this.props.children}
        </div>:null


    }
}

Label.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    required: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string,PropTypes.element,PropTypes.node]),//标题
};


export default Label;