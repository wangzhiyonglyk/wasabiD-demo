import React from "react";
import ReactDOM from "react-dom";
import {Msg,Button} from "../../component"
function MsgView(){
    
    return  <div>
        <Button key="1" onClick={()=>{
        Msg.alert("普通消息")
    }}>弹出普通信息</Button>
      <Button key="2" onClick={()=>{
        Msg.success("成功消息")
    }}>弹出成功信息</Button>
      <Button key="3" onClick={()=>{
        Msg.error("错误消息")
    }}>弹出错误消息信息</Button>
      <Button key="4" onClick={()=>{
        Msg.confirm("确认对话框")
    }}>弹出确认对话框信息</Button>
        <Button key="5" onClick={()=>{
        Msg.loading()
    }}>正在加载</Button>
          <Button key="6" onClick={()=>{
        Msg.hide()
    }}>隐藏加载</Button>
    </div>

}
ReactDOM.render(
    <MsgView />, document.getElementById("root"));
  