import React, {Component} from "react"; //导入React 的核心库
import ReactDom from "react-dom"; //导入与 DOM 相关的功能
import "./index.css";//导入样式
import Dialog from "./DialogDemo";//导入对话框组件

class Index extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            show:false    //是否显示对话框，默认不显示
        }
        //事件绑定
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }
    
    /**
     * 打开对话框
    */
    openDialog(){
        this.setState(
            {
                show:true,
            }
        )
    }
    /**
     * 关闭对话框
    */
    closeDialog(){
        this.setState(
            {
                show:false,
            }
        )
    }
    
    render() {
        return (
            <div className = "container">
                <input 
                    type = "button" 
                    value = "Show Dialog" 
                    className = "showBtn" 
                    onClick = {this.openDialog}
                />
                <div 
                    >
                    <Dialog 
                        drag={true}
                        resize={true}
                        show={this.state.show} 
                        closeDialog={this.closeDialog}            
                    ></Dialog>

                </div>
            </div>
        );
    }
}
ReactDom.render(<Index/>,document.getElementById("root"));