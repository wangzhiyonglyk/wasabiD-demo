/**
 * Created by wangzhiyong on 2016/12/12.
 * 从rctui框架中复制过来,加以改造
 * edit date:2021-04-26
 */

'use strict';

let dom = {
    //整数化
    tryParseInt: function (p) {
        if (!p) {
            return 0;
        }
        const pi = parseInt(p);
        return pi || 0;
    },


    /**
     * 是否为子孙节点
     * @param {*} parent 
     * @param {*} child 
     * @returns 
     */
    isDescendant: function (parent, child) {
        let node = child.parentNode;

        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    },

    /**
     * 计算在页面中的位置
     * @param {*} el 
     * @returns 
     */
    offset: function (el) {
        const rect = el.getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    },

    /**
     * 得到元素包含外部的宽度
     * @param {*} el 
     * @returns 
     */
    getOuterHeight: function (el) {
        let height = el.clientHeight
            + this.tryParseInt(el.style.borderTopWidth)
            + this.tryParseInt(el.style.borderBottomWidth)
            + this.tryParseInt(el.style.marginTop)
            + this.tryParseInt(el.style.marginBottom);
        return height;
    },

    /**
     * 页面上滚的高度
     * @returns 
     */
    getScrollTop: function () {
        const dd = document.documentElement;
        let scrollTop = 0;
        if (dd && dd.scrollTop) {
            scrollTop = dd.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    },

    /**
     * 元素是不是不可见
     * @param {*} el 元素
     * @param {*} pad 间距
     * @returns 
     */
    overView: function (el, pad = 0) {
        let height = window.innerHeight || document.documentElement.clientHeight;
        let bottom = el.getBoundingClientRect().bottom + pad;
        return bottom > height;
    },
    /**
     * 
     * @param {*} el 元素节点
     * @param {*} attr css样式属性，非驼峰写法
     * @returns 
     */
    computedStyle: function (el, attr) {
        let attrValue;
        if (el.currentStyle) {
            attrValue = el.currentStyle[attr]
        } else if (window.getComputedStyle) {
            attrValue = window.getComputedStyle(el, null)[attr];
        }
        return attrValue;
    },



};
export default dom;