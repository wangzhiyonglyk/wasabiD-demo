/*
 create by wangzhiyong
 date:2016-04-05后开始独立改造
 edit 2019-12-18
 desc:按钮组件,从linkbutton独立出来
 */
import React from 'react';
import PropTypes from 'prop-types';
import func from "../../libs/func"
import ripple from "./ripple"
import('./button.css');
class Button extends React.PureComponent {
    constructor(props) {
        super(props);
        this.buttonid = func.uuid();
        this.ripple={};
        this.onClick = this.onClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
    }
    componentDidMount() {
        try{
            ripple(document.getElementById(this.buttonid));
        }
        catch(e){
            console.log("ripple error",e)
        }
     
    }
    onClick(event) {
        if (this.props.disabled === true) {
            return;
        }
        this.props.onClick && this.props.onClick(this.props.name, this.props.title, event);
    }
    onDoubleClick(event) {
        if (this.props.disabled === true) {
            return;
        }
        this.props.onDoubleClick && this.props.onDoubleClick(this.props.name, this.props.title, event);
    }
    render() {
        let props = {
            className: " wasabi-button " + (this.props.theme || "default") + ' size-' + (this.props.size || "default") + ' ' + this.props.className,
            style: this.props.style ? this.props.style : {},
            disabled: this.props.disabled === true ? 'disabled' : null,
            //文字提示
            title: this.props.title
        };
        return (this.props.children || this.props.title || this.props.iconCls) ? <button {...props} id={this.buttonid} onDoubleClick={this.onDoubleClick} onClick={this.onClick} type='button' >
            {this.props.iconCls && this.props.iconAlign === "left" ? <i className={"wasabi-button-icon " + this.props.iconCls}></i> : null}
            {this.props.children || this.props.title ? <span style={{ marginLeft: this.props.iconAlign === "left" ? 5 : 0, marginRight: this.props.iconAlign === "right" ? 5 : 0 }}>{this.props.children ? this.props.children : this.props.title}</span> : null}
            {this.props.iconCls && this.props.iconAlign === "right" ? <i className={"wasabi-button-icon " + this.props.iconCls}></i> : null}
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
    iconAlign: "left",
    theme: 'primary',
    size: 'default',
    style: {},
    className: '',


};
export default Button;
