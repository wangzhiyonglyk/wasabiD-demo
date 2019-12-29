/*
create by wangzhiyong
date:2017-02-09
desc:圣杯布局
 */

import React from 'react';
import PropTypes from "prop-types";

import ("../Sass/Layout/Layout.css");
class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.calWidthHeight = this.calWidthHeight.bind(this);
    }
    static propTypes = {
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }
    static defaultProps = {
        width: "100%",
        height: null
    }
    calWidthHeight() {
        //计算center的高度与宽度
        let centerReduceHeight = 0;
        let centerReduceWidth = 0;
        let top = 0;
        let left=0;
        React.Children.map(this.props.children, (child, index) => {
            switch (child.props.title) {
                case "header":
                    centerReduceHeight += child.props.height ? child.props.height : 100;//默认100
                    top = child.props.height ? child.props.height : 100;
                    break;
                case "footer":
                    centerReduceHeight += child.props.height ? child.props.height : 100;
                    break;
                case "left":
                    centerReduceWidth += child.props.width ? child.props.width : 100;
                    left =child.props.width ? child.props.width : 100;
                    break;
                case "right":
                    centerReduceWidth += child.props.width ? child.props.width : 100;
                    break;

            }
        })
        return {
            reduceWidth: centerReduceWidth ? centerReduceWidth : null,//这里是center要扣除的宽度
            reduceHeight: centerReduceHeight ? centerReduceHeight : null,//不仅仅是center的高度是left,right的扣除高度
            top: top,//left center  right的位置
            left:left
           
        }
    }
    render() {
        let widthHeight = this.calWidthHeight();//计算宽高
        return <div className={"wasabi-layout clearfix"}
            style={{ width: this.props.width, height: this.props.height }}  >
            {
                React.Children.map(this.props.children, (child, index) => {
                 
                    switch (child.props.title) {
                        case "center":
                            return React.cloneElement(child, { key: index, ref: index, ...widthHeight });
                        case "left":
                            return React.cloneElement(child, { key: index, ref: index, ...widthHeight });
                        case "right":
                            return React.cloneElement(child, { key: index, ref: index, ...widthHeight });
                        default:
                            return React.cloneElement(child, { key: index, ref: index });

                    }
                })
            }</div>
    }
}

export default Layout;