/**
 * Created by zhiyongwang on 2016-04-14.
 * 能够翻转的层
 */
import React from "react";
import PropTypes from "prop-types";

import ("../sass/Layout/reverse.css");
class  Reverse extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isReverse:false,
            frontClassName:"",
            reverseClassName:"flip out",
            frontDisplay:"block",
            reverseDisplay:"none"
        }
    }  

   
    mouseoverHandler() {

       this.setState({
           frontClassName:"flip out",
           isReverse:true,
       })
        var  parent=this;
        setTimeout(
            function()
            {
             parent.setState({
                 frontDisplay:"none",
                 reverseDisplay:"block",
                 reverseClassName:"flip in"
             })
            },300
        )
    }
    mouseOutHandler() {
        this.setState({
            reverseClassName:"flip out",
            isReverse:false
        })
        var  parent=this;
        setTimeout(
            function()
            {
                parent.setState({
                    frontDisplay:"block",
                    reverseDisplay:"none",
                    frontClassName:"flip in"
                })
            },300
        )
    }
    onDblClick() {
        if(!this.props.dblAble)
        {
            return ;
        }
        this.reverseHandler();
    }
    getState()
    {//用获取状态用于父组件

        return this.state.isReverse;
    }
    reverseHandler() {//用于父组件调用
        if (this.state.isReverse) {

            this.mouseOutHandler();


        }
        else {

            this.mouseoverHandler()
        }

    }
    render() {
        var props=
        {
            style:this.props.style,
            className:this.props.className+" reverse"
        }
        return (
            <div  onDoubleClick={this.onDblClick}  {...props}>
                <div  ref="front" className={this.state.frontClassName} style={{display:this.state.frontDisplay}} >
                    {this.props.front}
                </div>
                <div  ref="reverse"  className={this.state.reverseClassName} style={{display:this.state.reverseDisplay}} >
                    {this.props.reverse}
                </div>
            </div>
        )
    }
}

Reverse.propTypes= {
    dblAble: PropTypes.bool,//是否允许双击翻转
    className: PropTypes.string,
};
 Reverse.defaultProps ={
        className:"",
        dblAble:true
    
};
export default Reverse;