/*
 create by wangzhiyong
 date:2020-12-06
 desc:下拉菜单按钮
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from "../Button"
import LinkButton from "../LinkButton"
import dom from "../../libs/dom"
import func from "../../libs/func"
import('./index.css');

class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.wasabidropdown = React.createRef();
        this.state = {
            containerid: func.uuid(),
            menuShow: false,
        }

        this.menuClickHandler = this.menuClickHandler.bind(this)
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
    }

    menuClickHandler(index, menuName) {
        this.setState({
            menuShow: false
        })
        this.props.onClick && this.props.onClick(index, menuName);
    }
    showMenu() {
        if (this.props.disabled) {
            return;
        }
        this.setState({
            menuShow: true
        })
        document.addEventListener("click", this.hideMenu)
    }
    hideMenu(event) {
        if (!dom.isDescendant(document.getElementById(this.state.containerid), event.target)) {
            this.setState({
                menuShow: false
            })
            document.removeEventListener("click", this.hideMenu)
        }


    }
    shouldComponentUpdate(nextProps, nextState) {
        if (func.diffOrder(nextProps, this.props)) {
            return true;
        }
        if (func.diff(nextState, this.state)) {
            return true;
        }
        return false;
    }
    render() {
        let props = {
            className:
                'wasabi-dropdown '
                + (this.props.plain ? "" : " unplain ") +
                this.props.theme +
                this.props.className,
            style: this.props.style ? this.props.style : {},
            disabled: this.props.disabled == true ? 'disabled' : null,
            //文字提示
            title: this.props.title
        };
        return <div ref={this.wasabidropdown}  {...props} id={this.state.containerid} >
            <LinkButton disabled={this.props.disabled} key={1} disabled={this.props.disabled} iconCls={this.props.iconCls} name={this.props.name} onClick={this.showMenu} theme={this.props.theme} size={this.props.size} title={this.props.title}>{this.props.label}</LinkButton>
            <ul className={"wasabi-dropdown-menu " + (this.props.plain ? " " : " unplain ") + this.props.size} style={{ display: this.state.menuShow ? "block" : "none" }}>
                {
                    React.Children.map(this.props.children, (child, index) => {
                        if (child) {
                            return React.cloneElement(child, { index: index, key: index, onClick: this.menuClickHandler })
                        }
                        return null;

                    })
                }

            </ul>
        </div>
    }
}

Dropdown.propTypes = {
    name: PropTypes.string, //按钮名称
    title: PropTypes.string, //按钮提示信息
    iconCls: PropTypes.string, //按钮图标
    menuIconCls: PropTypes.string, //菜单按钮图标
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
    menuClick: PropTypes.func, //按钮单击事件
    style: PropTypes.object, //样式
    className: PropTypes.string, //自定义样式
    disabled: PropTypes.bool,//按钮是否无效
    plain: PropTypes.bool //按钮是否是平铺
};
Dropdown.defaultProps = {
    menuIconCls: "icon-arrow-down",//默认向下箭头
    theme: 'primary',
    size: 'default',
};



export default Dropdown;