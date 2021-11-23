import React from "react";
import ReactDOM from "react-dom";
import { System } from "wasabiD"

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    let user = window
      .sessionStorage
      .getItem("user");
    let nick = "";
    if (user) {
      try{
        user = JSON.parse(user);
        nick = user.nick;
      }
      catch(e){
        
      }
  
    }
    return <System
      nick={nick || "灰太狼"}
      logo={require("./logo03.png")}
      title={"多益计算机-管理中心"}

      menus={[
         {
           title:"用户中心",
           iconCls:"icon-user",
           url:"http://www.xiaopeng.com",
           children:[
             {
               title:"用户管理",
               url:"./users.html"
               
             },
             {
               title:"登录记录",

             },
             {
               title:"修改密码",
               url:"./changePassword.html"
             }
           ]
         },
         
         {
          title:"数据",
          children:[
            {
              title:"datagrid",
              url:"./datagrid.html"
            },
            {
              title:"用户角色"
            },
            {
              title:"角色分配"
            },
            {
              title:"权限分配"
            },
          ]
         },
         {
           title:"系统设置",
         

         },
      ]}
  
      notices={[
        { title: "你收到了 14 份新周报", date: "2021-07-28 10:10:10", iconCls: <img style={{ width: 32, height: 32 }} src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"></img> },
                            { title: "你推荐的 曲妮妮 已通过第三轮面试", date: "2021-07-28 10:10:10", iconCls: <img style={{ width: 32, height: 32 }} src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"></img> },
                            { title: "这种模板可以区分多种通知类型", date: "2021-07-28 10:10:10", iconCls: <img style={{ width: 32, height: 32 }} src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"></img> },
                            { title: "左侧图标用于区分不同的类型", date: "2021-07-28 10:10:10", iconCls: <img style={{ width: 32, height: 32 }} src="https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png"></img> },
      ]}
      
      ></System>
  }
}
ReactDOM.render(
  <Index />, document.getElementById("root"));
