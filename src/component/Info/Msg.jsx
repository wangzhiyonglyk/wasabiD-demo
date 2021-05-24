//create by wangzhiyong
//date:2016-03-22
//edit 2019-12-18
//edit 2021-05-18 调整样式，loading仍然有问题
//desc:模态窗口
import React from "react";
import ReactDOM from "react-dom";
import MessageView from "./MessageView";
export default {
    loading() {//正在加载
        if (!!document.getElementById("wasabi-loading")) {
            //存在
            let child = document.getElementById("wasabi-loading");
            if (child) {
                document.body.removeChild(child);
            }

            let info = document.createElement("div");
            info.id = "wasabi-loading";
            document.body.appendChild(info);
            ReactDOM.render(<MessageView type="loading" />, document.getElementById("wasabi-loading"));

        }
        else {
            let info = document.createElement("div");
            info.id = "wasabi-loading";
            document.body.appendChild(info);
            ReactDOM.render(<MessageView type="loading" />, document.getElementById("wasabi-loading"));

        }
    },
    hide() {
        try {
            let child = document.getElementById("wasabi-loading");
            if (child) {
                document.body.removeChild(child);
            }
        }
        catch (e) {

        }
    },
    info(msg, timeout = 3000) {

        if (!!document.getElementById("wasabi-info")) {
            //存在
            let child = document.getElementById("wasabi-info");
            document.body.removeChild(child);
            let info = document.createElement("div");
            info.id = "wasabi-info";
            document.body.appendChild(info);
            ReactDOM.render(<MessageView type="info" timeout={timeout} msg={msg} />, document.getElementById("wasabi-info"));

        }
        else {
            let info = document.createElement("div");
            info.id = "wasabi-info";
            document.body.appendChild(info);
            ReactDOM.render(<MessageView type="info" timeout={timeout} msg={msg} />, document.getElementById("wasabi-info"));
        }

    },
    success(msg, timeout = 3000) {
        msg = msg || "操作成功"
        if (!!document.getElementById("wasabi-success")) {
            //存在
            let child = document.getElementById("wasabi-success");
            document.body.removeChild(child);
            let success = document.createElement("div");
            success.id = "wasabi-success";
            document.body.appendChild(success);
            ReactDOM.render(<MessageView type="success" timeout={timeout} msg={msg} />, document.getElementById("wasabi-success"));

        }
        else {
            let success = document.createElement("div");
            success.id = "wasabi-success";
            document.body.appendChild(success);
            ReactDOM.render(<MessageView type="success" timeout={timeout} msg={msg} />, document.getElementById("wasabi-success"));
        }

    },
    error(msg, timeout = 3000) {
        msg = msg || "服务器内部错误"
        if (!!document.getElementById("wasabi-error")) {
            //存在
            let child = document.getElementById("wasabi-error");
            document.body.removeChild(child);
            let error = document.createElement("div");
            error.id = "wasabi-error";
            document.body.appendChild(error);
            ReactDOM.render(<MessageView type="error" timeout={timeout} msg={msg} />, document.getElementById("wasabi-error"));

        }
        else {
            let error = document.createElement("div");
            error.id = "wasabi-error";
            document.body.appendChild(error);
            ReactDOM.render(<MessageView type="error" timeout={timeout} msg={msg} />, document.getElementById("wasabi-error"));
        }

    },
    alert(msg) {
        if (!!document.getElementById("wasabi-alert")) {
            //存在
            let child = document.getElementById("wasabi-alert");
            document.body.removeChild(child);
            let alert = document.createElement("div");
            alert.id = "wasabi-alert";
            document.body.appendChild(alert);
            ReactDOM.render(<MessageView type="alert" msg={msg} />, document.getElementById("wasabi-alert"));
        }
        else {
            let alert = document.createElement("div");
            alert.id = "wasabi-alert";
            document.body.appendChild(alert);
            ReactDOM.render(<MessageView type="alert" msg={msg} />, document.getElementById("wasabi-alert"));
        }
    },
    confirm(msg, success, cancel) {
        if (!!document.getElementById("wasabi-confirm")) {
            //存在
            let child = document.getElementById("wasabi-confirm");
            document.body.removeChild(child);
            let confirm = document.createElement("div");
            confirm.id = "wasabi-confirm";
            document.body.appendChild(confirm);
            ReactDOM.render(<MessageView type="confirm" msg={msg} OKHandler={success} cancelHandler={cancel} />, document.getElementById("wasabi-confirm"));
        }
        else {
            let confirm = document.createElement("div");
            confirm.id = "wasabi-confirm";
            document.body.appendChild(confirm);
            ReactDOM.render(<MessageView type="confirm" msg={msg} OKHandler={success} cancelHandler={cancel} />, document.getElementById("wasabi-confirm"));
        }
    }
};

