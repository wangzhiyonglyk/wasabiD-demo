//create by wangzy
//date:2016-03-22
//desc:模态窗口
import React from "react";
import PropTypes from "prop-types";
import events from "../../component/Unit/events";
import("../Sass/Layout/resize.css");

class Resize extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
            width: this.props.width,
            height: this.props.height,
            min: 8,//最小尺度

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

            events.on(document,"mousemove",this.mouseMoveHandler);
            events.on(document,"mouseup",this.mouseUpHandler)
            events.on(document,"mousedown",this.mouseDownHandler)
          
        }

    }
    mouseDownHandler(event) {
    
        //鼠标按下事件,保存鼠标位置
      let dir=   this.getDirection(this.refs.resizediv,event);
      if(dir){
         this.dir=dir;//记住方向
         //记住原始位置
          this.oldClientX=event.clientX;
          this.oldClientY=event.clientY;

          //记住原始宽度与高度
          this. oldwidth=this.refs.resizediv.getBoundingClientRect().width;
          this. oldheight=this.refs.resizediv.getBoundingClientRect().height;

      }
      else{
          this.oldClientX=null;
          this.oldClientY=null;
      }
     

    }
    mouseUpHandler() {
        this.oldClientX = null;
        this.oldClientY = null;
        this. oldwidth=null;
        this.oldheight=null;
       
    }
    getBoundingClientRect(){
       return  this.refs.resizediv.getBoundingClientRect();
    }
    target(){
        return  this.refs.resizediv;
    }
    mouseMoveHandler(event) {//鼠标移动事件

       this.getDirection(this.refs.resizediv, event);//设置方向

            //设置拖动
        if (this.oldClientX) {
            //判断是否可以拖动

         let dir=this.dir;
            try {
              
              
                if(dir&&dir==("ew")){
                    this.refs.resizediv.style.width = (this.oldwidth+(event.clientX-this.oldClientX))+"px";
                }
                else if(dir&&dir==("ns")){
                    this.refs.resizediv.style.height = (this.oldheight+(event.clientY-this.oldClientY))+"px";
                }
                else if(dir){
                    this.refs.resizediv.style.width = (this.oldwidth+(event.clientX-this.oldClientX))+"px";
                    this.refs.resizediv.style.height = (this.oldheight+(event.clientY-this.oldClientY))+"px";
                }
             
             
                

            }
            catch (e) {

            }
        }
        else {
        }
       
    }
    //获取方向
    getDirection(targetElement,event) {
        //此处计算方向与光标图形分开，
        //当缩小时，要将方向向里多计算一点，否则缩小不流畅
        if(!targetElement){
            return;
        }
        let  xPos, yPos, offset;

        xPos = event.clientX;//
        yPos = event.clientY;//
        offset = this.state.min;

        let position=targetElement.getBoundingClientRect();//获取div的位置信息

        let cursor = "";
         if (yPos <= position.height+position.top+offset && yPos >= position.height+position.top - offset) {
                cursor += "ns";
            }
        
        if (xPos <= position.width+position.left + offset && xPos >= position.width+position.left - offset) {
            cursor += "ew";
        }
      
        cursor = cursor == "nsew" ? "nwse" : cursor;

        targetElement.style.cursor = cursor ? cursor + "-resize" : "default";//设置鼠标样式
       return cursor;
    }
    render() {

        let style=this.props.style?this.props.style:{};
    
        return (
            <div className={"resize  " + this.props.className} ref="resizediv"
                style={ style}>
                {this.props.children}
            </div>)
    }
}
Resize.propTypes = {
    style:PropTypes.object.isRequired,//样式
    className: PropTypes.string,//样式
    
    resize: PropTypes.bool,//是否允许调整大小
}
Resize.defaultProps = {
    style:{},
    className: "",
   
    resize: true,//默认是可以改变大小的


};
export default Resize;