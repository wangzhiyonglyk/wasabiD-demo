//create by wangzy
//date:2016-03-22
//desc:模态窗口
import React from "react";
import PropTypes from "prop-types";

import("../Sass/Layout/resize.css");
class Resize extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            min: 8,

        }
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);

    }

    componentWillReceiveProps(nextProps) {

    }
    componentDidMount() {//设置鼠标事件
        if (this.props.resize) {
            //允许改变大小

            document.onmousemove = this.mouseMoveHandler;
            document.onmouseup = this.mouseUpHandler;
            document.onmousedown = this.mouseDownHandler;
        }

    }
    mouseDownHandler(event) {
        //鼠标按下事件,保存鼠标位置


        if (this.dir) {
            this.oldClientX = event.clientX;
            this.oldClientY = event.clientY;
            this.oldwidth = this.state.width;
            this.oldheight = this.state.height;
        }
        else {
            this.oldClientX = null;
            this.oldClientY = null;
            this.oldwidth = this.state.width;
            this.oldheight = this.state.height;
        }

    }
    mouseUpHandler() {
        this.oldClientX = null;
        this.oldClientY = null;
        this.oldwidth = this.newwidth;
        this.oldheight = this.newheight;
        this.setState({
            width: this.newwidth,
            height: this.newheight
        })
    }
    mouseMoveHandler(event) {//鼠标移动事件
        this.getDirection(event);//设置方向
        if (this.oldClientX) {
            //判断是否可以拖动

            try {
                var newwidth = this.state.width;//先等于旧的
                var newheight = this.state.height;//先等于旧的
                if (dir.indexOf("e") > -1) {//改变宽度
                    newwidth = Math.max(this.state.min, this.oldwidth + event.clientX - this.oldClientX);
                }
                if (dir.indexOf("s") > -1) {//改变高度
                    if (this.props.onlyWidth == false) {//允许改变高度
                        newheight = Math.max(this.state.min, this.oldheight + event.clientY - this.oldClientY);
                    }
                }



                this.refs.resizediv.style.width = newwidth + "px";
                this.refs.resizediv.style.height = newheight + "px";
                this.newwidth = newwidth;
                this.newheight = newheight;

            }
            catch (e) {

            }
        }
        else {
        }
        //取消默认事件
        //window.event.returnValue = false;
        //window.event.cancelBubble = true;
    }
    getDirection(event) {
        //此处计算方向与光标图形分开，
        //当缩小时，要将方向向里多计算一点，否则缩小不流畅
        var xPos, yPos, offset;

        xPos = event.offsetX;
        yPos = event.offsetY;
        offset = this.state.min;
        let cursor = "";
        if (this.props.onlyWidth == false) {//允许改变高度
            if (yPos <= this.refs.resizediv.offsetHeight + offset && yPos >= this.refs.resizediv.offsetHeight - offset) {
                cursor += "ns";
            }
        }
        if (xPos <= this.refs.resizediv.offsetWidth + offset && xPos >= this.refs.resizediv.offsetWidth - offset) {
            cursor += "ew";
        }
        cursor = cursor == "nsew" ? "nwse" : cursor;

        this.refs.resizediv.style.cursor = cursor ? cursor + "-resize" : "default";//设置鼠标样式
        this.dir = cursor;
    }
    render() {

       
        return (
            <div className={"resize  " + this.props.className} ref="resizediv"
                style={{
                    width: this.state.width,
                    height: this.props.onlyWidth == true ? "auto" : this.state.height,
                     left: this.props.left,
                      top: this.props.top, 
                    
                       zIndex: 8
                    
                }}
            >

                {this.props.children}
            </div>)
    }
}
Resize.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    left: PropTypes.number,
    top: PropTypes.number,
    onlyWidth: PropTypes.bool,//是否只允许改变宽度
    className: PropTypes.string,
    resize: PropTypes.bool,//
}
Resize.defaultProps = {
    width: 400,
    height: 400,
    left: 0,
    top: 0,
    onlyWidth: false,
    className: "",
    resize: true,//默认是可以改变大小的


};
export default Resize;