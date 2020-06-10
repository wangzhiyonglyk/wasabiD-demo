import React, {Component} from "react"; //导入React 的核心库
import ReactDom from "react-dom"; //导入与 DOM 相关的功能
import "./index.css";//导入样式
import LoadingShow from "./loadingShow";//导图加载图片

class ShowLoading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hide: true
        }
    }
    //gotoBtn鼠标点击响应函数
    //用于提交输入框内容
    gotoEvt(){
        this.setState(           
            // 改变hide的值, 使得加载图标及遮罩层显示
            {hide: !this.state.hide}
        );
        // 5000ms后再次改变hide的值
        if(this.state.hide){//额外添加的定时器
            this.times = setTimeout(() => {
                this.setState(
                    {hide: !this.state.hide}
                )
            }, 5000)
        }
    }

    componentWillUnmount(){
        clearTimeout(this.times) //卸载组件后同时清除定时器,否则可能会发生内存泄漏
    }

    render() {
        return (
            <div className = "container">
                <input type = "button" 
                       style={{opacity: this.state.hide?"100%":"30%"}} //透明度设置
                       value = "GoTO" id="gotoBtn" className = "button-goto" 
                       onClick = {this.gotoEvt.bind(this)} />
                <div style = {{display: this.state.hide?"none":"block", //加载中显示设置
                     width: "100%", height: "100%"}} >
                    <LoadingShow></LoadingShow>
                </div>
            </div>
        );
    }
}
ReactDom.render(<ShowLoading/>,document.getElementById("root"));