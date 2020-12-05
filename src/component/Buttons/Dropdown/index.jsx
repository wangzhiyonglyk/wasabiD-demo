/*
 create by wangzy
 date:2020-12-06
 desc:下拉菜单按钮
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickAway from "../../libs/ClickAway.js";
import mixins from '../../Mixins/mixins';
import Button from "../Button"
import LinkButton from "../LinkButton"
import('./index.css');

class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuShow: false,
        }
        this.onClick = this.onClick.bind(this);
        this.menuClickHandler = this.menuClickHandler.bind(this)
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
    }
    componentDidMount() {
        this.registerClickAway(this.hideMenu, this.refs.wasabidropdown);//注册全局单击事件
    }

    onClick() {
        this.props.onClick && this.props.onClick(this.props.name, this.props.title);

    }
    menuClickHandler(index, menuName) {
        this.setState({
            menuShow: false
        })
        this.props.menuClick && this.props.menuClick(index, menuName);
    }
    showMenu() {
        this.setState({
            menuShow: true
        })
        this.bindClickAway();//绑定全局单击事件
    }
    hideMenu() {
        this.setState({
            menuShow: false
        })
        this.unbindClickAway();//卸载全局单击事件
    }
    render() {
        let props = {
            className:
                'wasabi-dropdown ' 
               +(this.props.plain?"":" unplain ")+
                this.props.theme +
                this.props.className,
            style: this.props.style ? this.props.style : {},
            disabled: this.props.disabled == true ? 'disabled' : null,
            //文字提示
            title: this.props.title
        };
        let buttonControl = [];
        if (this.props.plain) {
            buttonControl.push(<LinkButton key={1} disabled={this.props.disabled} iconCls={this.props.iconCls} name={this.props.name} onClick={this.onClick} theme={this.props.theme} size={this.props.size} title={this.props.title}>{this.props.label}</LinkButton>
            );
            buttonControl.push(<LinkButton  key={2} disabled={this.props.disabled} iconCls={this.props.menuIconCls} className="wasabi-dropdown-arrow" onClick={this.showMenu} name={this.props.name} theme={this.props.theme} size={this.props.size} title={this.props.title}></LinkButton>
            )
        }
        else {
            buttonControl.push(<Button   key={1} disabled={this.props.disabled} iconCls={this.props.iconCls} name={this.props.name} onClick={this.onClick} theme={this.props.theme} size={this.props.size} title={this.props.title}>{this.props.label}</Button>
            );
            buttonControl.push(<Button  key={2} disabled={this.props.disabled} iconCls={this.props.menuIconCls} className="wasabi-dropdown-arrow" onClick={this.showMenu} name={this.props.name} theme={this.props.theme} size={this.props.size} title={this.props.title}></Button>
            )
        }
        return <div ref="wasabidropdown"  {...props} >
            {
                buttonControl
            }

            <ul className={"wasabi-dropdown-menu "  +(this.props.plain?"":" unplain ")}  style={{ display: this.state.menuShow ? "block" : "none" }}>
                {
                    React.Children.map(this.props.children, (child, index) => {
                        return React.cloneElement(child, { index: index, key: index, onClick: this.menuClickHandler })
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

    onClick: PropTypes.func, //按钮单击事件
    style: PropTypes.object, //样式
    className: PropTypes.string, //自定义样式
    disabled: PropTypes.bool,//按钮是否无效
    plain: PropTypes.bool //按钮是否是平铺
};
Dropdown.defaultProps = {
    name: '',
    title: null,
    label: "",//按钮的文字
    iconCls: "",
    menuIconCls:"icon-arrow-down",//默认向下箭头
    theme: 'primary',
    size: 'default',
    style: {},
    className: '',
    onClick: null,
    disabled: false,
    plain: false,
};

mixins(Dropdown, [ClickAway]);

export default Dropdown;