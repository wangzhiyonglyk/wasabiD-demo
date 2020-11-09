/**
 * Created by wangzhiyong on 2016/12/12.
 * 
 */
import React from "react";
import ReactDOM from "react-dom";

import dom from "./dom.js";
import  Events from './events';
let ClickAway= {

    componentWillUnmount () {
        this.unbindClickAway();
    },

    bindClickAway () {//绑定事件
        const fn = this.getClickAwayEvent();//得到要执行事件
        Events.on(document, 'click', fn);
        Events.on(document, 'touchstart', fn);
    },

    unbindClickAway () {//解除绑定事件
        const fn = this.getClickAwayEvent();
        Events.off(document, 'click', fn);
        Events.off(document, 'touchstart', fn);
    },

    registerClickAway (onClickAway, target) {//注册绑定事件
        this.clickAwayTarget = target;//保存目标节点
        this.onClickAway = onClickAway;//保存事件
    },

    /**
     * 获取要执行事件
     */
    getClickAwayEvent () {
        
        let fn = this._clickAwayEvent;//获取单击时执行的事件
        if (!fn) {//第一次不存在的时候
            fn = (event) => {
              
                let el = this.clickAwayTarget || ReactDOM.findDOMNode(this);
                // Check if the target is inside the current component
                if (event.target !== el && !dom.isDescendant(el, event.target)) {//是否目标节点或者子孙节点
                    this.onClickAway&&this.onClickAway();
                }
            }
            this._clickAwayEvent = fn;
        }
        return fn;
    }
}
export default ClickAway;
