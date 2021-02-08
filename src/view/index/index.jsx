import React from "react";
import ReactDOM from "react-dom";
import {System} from "../../component"
import api from "../../libs/api"
class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

    api.message();
    api.location();
  }

  render() {
    let user = window
      .sessionStorage
      .getItem("user");
    let nick = "";
    if (user) {
      user = JSON.parse(user);
      nick = user.nick;
    }
    return <System
      nick={nick}
      title={"BI大数据分析系统"}
      shortcuts={[
      {
        name: "index",
        title: "主页",
        iconCls: "icon-home",
        url: "./home.html"
      }, {
        name: "user",
        title: "个人设置",
        iconCls: "icon-users",
        url: "./user.html"
      }, {
        name: "system",
        title: "系统设置",
        iconCls: "icon-set",
        url: "./system.html"
      }
    ]}
      menus={[
      {
        title: "系统管理",
        name: "system",
        children: [
          {
            name: "index",
            title: "首页",
            iconCls: "icon-home",
            url: "./pivot.html"
          }, {
            name: "user",
            title: "个人设置",
            iconCls: "icon-users",
            url: "./home.html"
          }, {
            name: "system",
            title: "系统设置",
            iconCls: "icon-set",
            url: "./system.html"
          }
        ]
      }, {
        title: "系统管理",
        name: "system",
        children: [
          {
            name: "index",
            title: "首页",
            iconCls: "icon-home",
            url: "./pivot.html"
          }, {
            name: "user",
            title: "个人设置",
            iconCls: "icon-users",
            url: "./user.html"
          }, {
            name: "system",
            title: "系统设置",
            iconCls: "icon-set",
            url: "./system.html"
          }
        ]
      }
    ]}></System>
  }
}
ReactDOM.render(
  <Index/>, document.getElementById("root"));
