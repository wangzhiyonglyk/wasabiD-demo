import React from "react";
import ReactDOM from "react-dom";

import Menus from "../../component/Navigation/Menus";
import MenuPanel from "../../component/Navigation/MenuPanel";
import Layout from "../../component/Layout/Layout";
import Left from "../../component/Layout/Left";
import Center from "../../component/Layout/Center";
import Header from "../../component/Layout/Header";
import Tabs from "../../component/Navigation/Tabs";
import TabPanel from "../../component/Navigation/TabPanel";
// import Input from '../../component/Form/Input';
// import LinkButton from '../../component/Buttons/LinkButton';

import { zhongyinRoutes } from "@/view/router";
import "./index.css";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leftWidth: 200,
      shortcuts: [
        { title: "首页", href: "" },
        { title: "个人设置", href: "" },
        { title: "系统设置", href: "" },
        { title: "最新订单", href: "" }
      ],
      tabs: [],
      activeShortCuts: null,
      adminExpand: false
    };
  }

  componentDidMount() {}
  open(item) {
   let findIndex=null;
    let e = this.state.tabs.find((selfItem ,index)=> {
      if (selfItem.title == item.title) {
        findIndex=index;
        return true;
      }
      return false;
    });
  
    if (!e) {
      item.title = item.name; //
    
      this.state.tabs.push(item);
      this.setState({
        tabs: this.state.tabs
      });
    }else{

      this.refs.tabs.changeActive(findIndex);
    }
   
  }
  activeShortHandler(index) {
    this.setState({
      activeShortCuts: index
    });
  }
  expandHandler() {
    this.setState({
      adminExpand: !this.state.adminExpand
    });
  }
  menuHandler() {
    this.setState({
      leftWidth: this.state.leftWidth == 200 ? 0 : 200
    });
  }
  onMenuClose(index,activeIndex){
 let tabs=this.state.tabs;
 tabs.splice(index,1)
    this.setState({
      tabs:tabs,
    })
  }
  render() {
    return (
      <Layout>
        <Header height={45}>
          <div className='header'>
            <div className='system'>
              {" "}
              <img className='logo' src={require("./image/logo.png")}></img>
              <span className='title'>业务后台管理系统</span>
              <img
                className='logo'
                onClick={this.menuHandler.bind(this)}
                src={require("./image/menu.png")}
                style={{
                  width: 16,
                  height: 16,
                  marginTop: 16,
                  marginLeft: 10
                }}
              ></img>
            </div>
            <div className='user'>
              <img
                className='userheader'
                src={require("./image/userheader.png")}
              ></img>
              <i
                style={{
                  float: "right",
                  height: 44,
                  lineHeight: "44px",
                  color: "#fff",
                  marginLeft: 5
                }}
                className={this.state.adminExpand ? "icon-up" : "icon-down"}
                onClick={this.expandHandler.bind(this)}
              ></i>

              <span className='title'>超级管理员</span>
              <dl
                className={
                  this.state.adminExpand ? "user-menus show" : "user-menus hide"
                }
              >
                <dd className='user-menu'>
                  <i className=' icon-user' style={{ marginRight: 10 }}></i>
                  <cite>个人资料</cite>
                </dd>
                <dd className='user-menu'>
                  <i className=' icon-edit' style={{ marginRight: 10 }}></i>
                  <cite>修改密码</cite>
                </dd>
                <dd className='user-menu'>
                  <i className=' icon-close' style={{ marginRight: 10 }}></i>
                  <cite>退出</cite>
                </dd>
              </dl>
            </div>
            <div className='nav'>
              {" "}
              <ul>
                {this.state.shortcuts.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={this.activeShortHandler.bind(this, index)}
                      className={
                        this.state.activeShortCuts == index ? "active" : ""
                      }
                    >
                      {" "}
                      {item.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Header>
        <Left width={this.state.leftWidth}>
          <Menus theme='default   '>
            {zhongyinRoutes.map((route, index) => {
              if (route.menu) {
                return (
                  <MenuPanel key={index} title={route.name} expand={true}>
                    {route.menu.map((item, idx) => {
                      return (
                        <a
                          key={index + idx + ""}
                          onClick={this.open.bind(this, item)}
                          style={{ textAlign: "left", marginLeft: "40px" }}
                        >
                          <span className='icon-txt menuicon'>
                            {item.name}
                          </span>
                        </a>
                      );
                    })}
                  </MenuPanel>
                );
              } else {
                return <div></div>;
              }
            })}

           
          </Menus>
        </Left>
        <Center>
         
          <Tabs onClose={this.onMenuClose.bind(this)} ref="tabs" >
            {this.state.tabs.map(item => {
              return (
                <TabPanel key={item.title} title={item.title} iconCls={item.iconCls}>
                  <iframe
                    src={item.src}
                    style={{ width: "100%", height: "100%" }}
                  ></iframe>
                </TabPanel>
              );
            })}
          </Tabs>
        </Center>
      </Layout>
    );
  }
}
ReactDOM.render(<Index />, document.getElementById("root"));
