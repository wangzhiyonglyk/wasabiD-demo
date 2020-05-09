//create by wangzy
//date:2016-03-22
//edit 2019-12-18
//desc:模态窗口
import  React from "react";
import  ReactDOM from "react-dom";
import  MessageView from "./MessageView.jsx";
let  Message= {
    loading(){//正在加载
        if (!!document.getElementById("wasabi-loading")) {
            //存在
            let child=document.getElementById("wasabi-loading");
            document.body.removeChild(child);
            let info = document.createElement("div");
            info.id="wasabi-loading";
            document.body.appendChild(info);
            ReactDOM.render(<MessageView  type="loading" />, document.getElementById("wasabi-loading"));

        }
        else {
            let info = document.createElement("div");
            info.id="wasabi-loading";
            document.body.appendChild(info);
            ReactDOM.render(<MessageView  type="loading" />, document.getElementById("wasabi-loading"));
        }
    },
    hide(){
        let child=document.getElementById("wasabi-loading");
        document.body.removeChild(child);
      
    },
    info(msg,timeout) {
        if(!timeout)
        {
            timeout=1000;
        }
        if (!!document.getElementById("wasabi-info")) {
            //存在
            let child=document.getElementById("wasabi-info");
            document.body.removeChild(child);
            let info = document.createElement("div");
            info.id="wasabi-info";
            document.body.appendChild(info);
            ReactDOM.render(<MessageView  type="info" timeout={timeout} msg={msg}/>, document.getElementById("wasabi-info"));

        }
        else {
            let info = document.createElement("div");
            info.id="wasabi-info";
            document.body.appendChild(info);
            ReactDOM.render(<MessageView  type="info" timeout={timeout} msg={msg} />, document.getElementById("wasabi-info"));
        }

    },
    success(msg,timeout) {
        if(!timeout)
        {
            timeout=1000;
        }
        if (!!document.getElementById("wasabi-success")) {
            //存在
            let child=document.getElementById("wasabi-success");
            document.body.removeChild(child);
            let success = document.createElement("div");
            success.id="wasabi-success";
            document.body.appendChild(success);
            ReactDOM.render(<MessageView  type="success" timeout={timeout} msg={msg}/>, document.getElementById("wasabi-success"));

        }
        else {
            let success = document.createElement("div");
            success.id="wasabi-success";
            document.body.appendChild(success);
            ReactDOM.render(<MessageView  type="success" timeout={timeout} msg={msg} />, document.getElementById("wasabi-success"));
        }

    },
    error(msg,timeout) {
        if(!timeout)
        {
            timeout=1000;
        }
        if (!!document.getElementById("wasabi-error")) {
            //存在
            let child=document.getElementById("wasabi-error");
            document.body.removeChild(child);
            let error = document.createElement("div");
            error.id="wasabi-error";
            document.body.appendChild(error);
            ReactDOM.render(<MessageView  type="error" timeout={timeout} msg={msg}/>, document.getElementById("wasabi-error"));

        }
        else {
            let error = document.createElement("div");
            error.id="wasabi-error";
            document.body.appendChild(error);
            ReactDOM.render(<MessageView  type="error" timeout={timeout} msg={msg} />, document.getElementById("wasabi-error"));
        }

    },
    alert(msg){
        if (!!document.getElementById("wasabi-alert")) {
            //存在
            let child=document.getElementById("wasabi-alert");
            document.body.removeChild(child);
            let alert = document.createElement("div");
            alert.id="wasabi-alert";
            document.body.appendChild(alert);
            ReactDOM.render(<MessageView type="alert" msg={msg}  />, document.getElementById("wasabi-alert"));
        }
        else {
            let alert = document.createElement("div");
            alert.id="wasabi-alert";
            document.body.appendChild(alert);
            ReactDOM.render(<MessageView  type="alert" msg={msg}  />, document.getElementById("wasabi-alert"));
        }
    },
    confirm(msg,success,cancel) {
        if (!!document.getElementById("wasabi-confirm")) {
            //存在
            let child=document.getElementById("wasabi-confirm");
            document.body.removeChild(child);
            let confirm = document.createElement("div");
            confirm.id="wasabi-confirm";
            document.body.appendChild(confirm);
            ReactDOM.render(<MessageView type="confirm" msg={msg} OKHandler={success} cancelHandler={cancel} />, document.getElementById("wasabi-confirm"));
        }
        else {
            let confirm = document.createElement("div");
            confirm.id="wasabi-confirm";
            document.body.appendChild(confirm);
            ReactDOM.render(<MessageView  type="confirm" msg={msg}  OKHandler={success} cancelHandler={cancel}/>, document.getElementById("wasabi-confirm"));
        }
    }
};
export default Message;
