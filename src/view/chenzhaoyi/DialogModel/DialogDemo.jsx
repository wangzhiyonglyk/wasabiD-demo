import React from "react";
import PropTypes from "prop-types";
import events from "component/Unit/events";
import Resize from "component/Layout/Resize";
import Message from "component/Unit/Message"
import("./dialogDemo.css");

class Dialog extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.state={
            inputValue:"",//输入框内容
            left:0, 
            top:0,
            min : 5,
        }
        //事件绑定
        this.okBtnEvent = this.okBtnEvent.bind(this);
        this.cancelBtnEvent=this.cancelBtnEvent.bind(this);
        this.closeBtnEvent = this.closeBtnEvent.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        //鼠标事件绑定
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    }
    componentDidMount(){//设置鼠标事件
        if(this.props.drag){//允许拖动
            events.on(document.body,"mousedown",this.mouseDownHandler);
            events.on(document.body,"mouseup",this.mouseUpHandler);
            events.on(document.body,"mousemove",this.mouseMoveHandler)
        }
    }
    componentWillUnmount(){
        events.off(document.body,"mousedown",this.mouseDownHandler);
        events.off(document.body,"mouseup",this.mouseUpHandler);
        events.off(document.body,"mousemove",this.mouseMoveHandler)
    }
    mouseDownHandler(event){//鼠标按下时，记录原始位置信息
         let ran = this.getRange(document.getElementById("dialogHeader"),event); 
        if(ran){
            this.ran=ran;
            //记录鼠标原始位置
            this.oldClientX=event.clientX;
            this.oldClientY=event.clientY;
            //记录div原始位置
            this.oldLeft=document.getElementsByClassName("resize  dialog")[0].getBoundingClientRect().left;
            this.oldTop=document.getElementsByClassName("resize  dialog")[0].getBoundingClientRect().top;
        }else{
            this.oldClientX=null;
            this.oldClientY=null;
        }
    }
    mouseUpHandler(event){//鼠标放开时，清空原始位置信息
        this.oldClientX=null;
        this.oldClientY=null;
        this.oldLeft=null;
        this.oldTop=null;
    }
    mouseMoveHandler(event){//鼠标移动时
        //移动到可移动位置时就变换鼠标样式
        this.getRange(document.getElementById("dialogHeader"),event); 
        if(this.oldClientX){//若为可拖动状态，则
            try {     
                document.getElementsByClassName("resize  dialog")[0].style.left = (this.oldLeft+(event.clientX-this.oldClientX))+"px";
                document.getElementsByClassName("resize  dialog")[0].style.top =(this.oldTop+(event.clientY-this.oldClientY))+"px";
           } catch (error) {
            } 
        }else{

        }
    }
    getRange(targetElement,event){
        //获取当前div位置信息
        let position = targetElement.getBoundingClientRect();
        let xPos = event.clientX;//当前鼠标横坐标
        let yPos = event.clientY;//当前鼠标纵坐标
        let offset = this.state.min;//范围
        let cursor = "";

        if((xPos>=position.left-offset && xPos<=position.left+position.width+offset) 
        && (yPos>=position.top-offset && yPos<=position.top+position.height+offset)){
            cursor = "move";
        }
        targetElement.style.cursor = cursor ? cursor : "default";
        return cursor;
    }
    render(){
        let style = {display: this.props.show?"block":"none"};//方法二
        return(
            <div className = "container-dialog">
                <div
                    className = "mask"
                    onClick={this.cancelBtnEvent}
                    style={style}
                ></div>
                <Resize className = "dialog" 
                    id="dialog"
                    style={style}
                >
                    <div className='dialog-header'
                    id="dialogHeader"
                    >
                        <span>Congratulation on finding this!</span>
                        <input
                            name=''
                            type='button'
                            className='closeBtn'
                            value="&times;"
                            onClick={this.closeBtnEvent}
                        />
                    </div>

                    
                        <div className='dialog-content'>
                             <input
                              type='text'
                              className='inputBox'
                              value= {this.state.inputValue}
                              onChange={this.handleInputChange}
                              placeholder="please input your nickname..."
                             />
                        </div>
                        <div className = "dialog-footer">
                                <input
                                    type='button'
                                    className='okBtn'
                                    value='Ok'
                                    style={{cursor:this.state.inputValue?"pointer":"not-allowed"}}
                                    disabled={this.state.inputValue?false:true}
                                    onClick={this.okBtnEvent}
                                />
                                <input
                                    type='button'
                                    className='cancelBtn'
                                    value='Cancel'
                                    onClick={this.cancelBtnEvent}
                                />
                        </div>
                </Resize>
            </div>
        )
    }
    /**
     * react状态绑定输入值
    */
    handleInputChange(e){
        this.setState({
            inputValue:e.target.value,
        })
    }
    /**
     * 提交输入框内容
    */
   okBtnEvent(){
    Message.success("Hello~"+this.state.inputValue+"!"); //成功输出输入框内容   
    this.setState({//清空输入框
        inputValue:"",
    })
    this.props.closeDialog();   //关闭对话框
    }
    /**
     * 取消对话框操作
    */
    cancelBtnEvent(){
        this.props.closeDialog();   //关闭对话框
        Message.info("You have canceled it!");
    }
    /**
     * 关闭对话框
    */
    closeBtnEvent(){ 
        this.props.closeDialog();   //关闭对话框
        Message.info("You have closed it!");
    }
}
Dialog.propTypes = {
    style:PropTypes.object,//样式，非空
    className:PropTypes.string,//类名
    drag:PropTypes.bool,//是否允许拖动
    resize:PropTypes.bool,//是否允许缩放
    show:PropTypes.bool,//是否显示对话框
    closeDialog:PropTypes.func,//关闭对话框
}
Dialog.defaultProps = {
    style:{},
    className:"",
    drag:false,
    resize:false,
    show:true,
    closeDialog:null
};
export default Dialog;