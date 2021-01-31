/*
滑动面板
create by wangzhiyong
date:2016-04-05
desc:滑动面板
*/
import React from "react";
import PropTypes from "prop-types";

import Toolbar from "../Buttons/Toolbar.jsx";
import Button from "../Buttons/Button.jsx";
import "../Sass/Layout/SlidePanel.css";
class SlidePanel extends React.Component {
    constructor(props) {
        super(props);
        let width = (this.props.style && this.props.style.width) ? this.props.style.width : window.screen.availWidth;

        this.state = {
            width: width,
            title: this.props.title,
            panelwidth: 0,//总宽度
            containerwidth: 0,//容器宽度
            leftwidth: 0,//左侧滑块宽度
            rightwidth: 0,//右侧内容宽度
            overlayOpacity: 0,//遮盖层透明度
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.buttonClick = this.buttonClick.bind(this);

    }
    static propTypes = {
        title: PropTypes.string,//标题
        buttons: PropTypes.array,//自定义按钮
        buttonClick: PropTypes.func,//按钮的单击事件,
    }
    static defaultProps = {
        title: "",
        buttons: [],
        buttonClick: null,
        url: null
    }

    open(title) {//打开事件，用于外部调用

        this.setState({
            title: title || this.state.title,
            containerwidth: this.state.width - 34,
            overlayOpacity: 0.5,
            panelwidth: this.state.width
        }, () => {
            this.props.onOpen && this.props.onOpen();
        });
    }
    close() {//关闭事件,用于外部调用
        this.setState({
            containerwidth: 0,
            overlayOpacity: 0,

        });
        setTimeout(() => {
            this.setState({
                panelwidth: 0
            }, () => {
                this.props.onClose && this.props.onClose();
            })

        }, 1000);//过渡效果结束后立即关闭
    }
  
    buttonClick(name, title) {
        if (this.props.buttonClick != null) {
            this.props.buttonClick(name, title);
        }
    }
    render() {


        return <div className={"wasabi-slidepanel "} style={{ width: this.state.panelwidth == 0 ? 0 : this.state.width }} >
            <div className="slide-overlay" onClick={this.close} style={{ width: this.state.panelwidth, opacity: this.state.overlayOpacity }}></div>
            <div className="slide-container" style={{ width: this.state.containerwidth }}>

                <div className="slide-header" >
                    <div className="title" onClick={this.close}><i className="icon-back" style={{ marginRight: 10 }}></i>{this.state.title}</div>
                    <div className="slide-toolbar"><Toolbar buttons={this.props.buttons} onClick={this.buttonClick}></Toolbar></div>

                </div>
                <div className="slide-body">
                    {
                        this.props.children
                    }

                </div>

            </div>
        </div>
    }
};
export default SlidePanel;