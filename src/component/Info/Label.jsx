/**
 * Created by wangzhiyong on 16/9/28.
 * desc 将表单组件中的label单独出来,
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import func from "../libs/func"
import ClickAway from "../libs/ClickAway.js";
import mixins from '../Mixins/mixins';
class Label extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controlid:func.uuid(),
            left:0,
            showHelp: false,

        }
        this.helpHandler=this.helpHandler.bind(this)
    }
    componentDidMount() {
        this.registerClickAway(this.hideHelp, document.getElementById(this.state.controlid));//注册全局单击事件
      }
     
    helpHandler(event) {
        event.stopPropagation();//阻止冒泡
        this.bindClickAway();//绑定全局单击事件
        document.getElementById(this.state.controlid).getBoundingClientRect().width;
        this.setState({
            showHelp: !this.state.showHelp,
            left: document.getElementById(this.state.controlid).getBoundingClientRect().width
        })
    }
    hideHelp() {//给父组件调用
        this.setState({
            showHelp: false,
            left:0
        })
        this.unbindClickAway();//卸载全局单击事件
    }

    onClick(){
        if(this.props.readOnly||this.props.disabled ){
            return;
        }
        this.props.onClick&&this.props.onClick(this.props.children||this.props.name);
    }

    render() {
        let style = this.props.style ? this.props.style : {};
        return <div id={this.state.controlid} className={"wasabi-form-group-label " +  (this.props.readOnly||this.props.disabled ? " readOnly " : "") +(this.props.required ? " required" : "")}
            style={style}>
            <label>{this.props.children || this.props.name}
                <a className="help" onClick={this.helpHandler.bind(this)}
                    style={{ display: (this.props.help ? "inline-block" : "none") }}>?</a>
                    <div className="heip-text" style={{ display: (this.state.showHelp ? "block" : "none") ,left:this.state.left}} >{this.props.help}</div></label>
        </div>


    }
}

Label.propTypes = {

    name: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element, PropTypes.node]),//名称
    hide: PropTypes.bool,//是否隐藏
    help: PropTypes.string,//帮助文字
    required: PropTypes.bool,//是否必填项
};
Label.dfaultProps = {

    name: "",
    hide: false,
    help: null,
    required: false


};
mixins(Label,[ClickAway])
export default Label;