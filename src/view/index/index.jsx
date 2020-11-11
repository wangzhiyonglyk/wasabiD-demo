import React from "react";
import ReactDOM from "react-dom";

import Menus from "../../component/Navigation/Menus";
import MenuPanel from "../../component/Navigation/MenuPanel";
import MenuItem from "../../component/Navigation/MenuItem";
import Layout from "../../component/Layout/Layout";
import Left from "../../component/Layout/Left";
import Center from "../../component/Layout/Center";
import Header from "../../component/Layout/Header";
import Tabs from "../../component/Navigation/Tabs";
import Modal from "../../component/Layout/Modal";
import TabPanel from "../../component/Navigation/TabPanel";
import configMenu from '../../../config/index'
import "./index.css";
import api from "../../libs/api"
class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leftWidth: 200,
      activeMenu:"",
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

  componentDidMount() {
    //this.refs.model.open();
    api.message();
    api.location();
  }
  open(item) {
    this.setState({
      activeMenu:item.title
    })
   let findIndex=null;
    let e = this.state.tabs.find((selfItem ,index)=> {
      if (selfItem.title == item.title) {
        findIndex=index;
        return true;
      }
      return false;
    });
  
    if (!e) {
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
 this.refs.model.open();
 tabs.splice(index,1)
    this.setState({
      tabs:tabs,
    })
  }
  render() {
    return (
      <Layout>
        <Header height={44}>
          <div className='header'>
            <div className='system'>
              {" "}
              <img className='logo' src={require("./image/logo.png")}></img>
              <span className='title'>业务后台管理系统</span>
           
            </div>
            <div className='user'>
             
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
          <Menus theme='default'>
          <MenuPanel  expand={true} title={"订单管理"}>
          {configMenu.map((route, index) => {
              return   <MenuItem key={index} active={route.title==this.state.activeMenu} onClick={this.open.bind(this,route)}>{route.title}</MenuItem>
            })}
                  </MenuPanel>
            
           
          </Menus>
        </Left>
        <Center>
         <Modal ref="model"></Modal>
          <Tabs onClose={this.onMenuClose.bind(this)} ref="tabs" >
            {this.state.tabs.map(item => {
              return (
                <TabPanel key={item.title} title={item.title} iconCls={item.iconCls}>
                  <iframe
                    src={"./"+item.filename+".html"}
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
