import React from "react";
import PropTypes from 'prop-types';
import Menus from "../../Navigation/Menus";
import MenuPanel from "../../Navigation/MenuPanel";
import MenuItem from "../../Navigation/MenuItem";
import Layout from "../../Layout/Layout";
import Left from "../../Layout/Left";
import Center from "../../Layout/Center";
import Header from "../../Layout/Header";
import Tabs from "../../Navigation/Tabs";
import Modal from "../../Layout/Modal";
import TabPanel from "../../Navigation/TabPanel";
import "./index.css";
class System extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leftWidth: 200,
      activeMenu: "",
      shortcuts: this.props.shortcuts,
      tabs: [],
      activeShortCuts: null,
      adminExpand: false
    };
  }

  componentDidMount() {


  }
  /**
   * 打开菜单
   * @param {*} item 
   */
  openMenu(item) {
    this.setState({
      activeMenu: item.title
    })
    let findIndex = null;
    let e = this.state.tabs.find((selfItem, index) => {
      if (selfItem.title == item.title) {
        findIndex = index;
        return true;
      }
      return false;
    });

    //如果没找到
    if (!e) {
      this.state.tabs.push(item);
      this.setState({
        tabs: this.state.tabs
      });
    } else {
      //如果找到了
      this.refs.tabs.changeActive(findIndex);
    }

  }
  /**
   * 快捷菜单单击事件
   * @param {*} index 
   * @param {*} name 
   * @param {*} title 
   */
  activeShortHandler(index, name, title,url) {
    this.setState({
      activeShortCuts: index,
    })
    if(url){//如果有url则会打开菜单
      this.openMenu({name:name,title:title,url:url});
    }
    this.props.shortcutsclick && this.this.shortcutsclick(name, babel);
  }
  /**
   * 个人设置
   */
  expandHandler() {
    this.setState({
      adminExpand: !this.state.adminExpand
    });
  }
 
/**
 * 菜单关闭
 * @param {*} index 
 */
  onMenuClose(index) {
    let tabs = this.state.tabs;
    tabs.splice(index, 1)
    this.setState({
      tabs: tabs,
    })
  }

  /**
   * 退出登陆
   */
  logout() {
    window.sessionStorage.clear();
    window.location.href = "./login.html"
  }
  render() {
    return (
      <Layout className="wasabi-system">
        <Header height={44}>
          <div className='header'>
            <div className='system'>
              {" "}
              <img className='logo' src={this.props.logo||require("./img/logo.png")}></img>
              <span className='title'>{this.props.title}</span>

            </div>
            <div className='user' onClick={this.expandHandler.bind(this)}>

              <i
                style={{

                  height: 44,
                  lineHeight: "44px",
                  color: "#fff",
                  marginLeft: 5
                }}
                className={"icon-user"}

              ></i>

              <span className='title'>{this.props.nick}</span>
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
                <dd className='user-menu' onClick={this.logout}>
                  <i className=' icon-switch' style={{ marginRight: 10 }}></i>
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
                      onClick={this.activeShortHandler.bind(this, index, item.name, item.title)}
                      className={
                        this.state.activeShortCuts == index ? "active" : ""
                      }
                    >
                      {" "}
                      <i className={item.iconCls}></i> {item.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Header>
        <Left width={this.state.leftWidth}>
          <Menus theme={this.props.theme||"default"}>
            {
              this.props.menus && this.props.menus.map((item, index) => {
                return <MenuPanel key={index} expand={item.expand!=null&&item.expand!=undefined?item.expand:true} name={item.name} title={item.title}>
                  {
                    item.children && item.children.map((route, index) => {
                      if (route.hide) {
                        return null;
                      }
                      return <MenuItem iconCls={route.iconCls} key={index} active={route.title == this.state.activeMenu} onClick={this.openMenu.bind(this, route)} name={route.name}>{route.title}</MenuItem>
                    })

                  }
                </MenuPanel>
              })
            }



          </Menus>
        </Left>
        <Center>
          <Modal ref="model"></Modal>
          <Tabs onClose={this.onMenuClose.bind(this)} ref="tabs" >
            {this.state.tabs.map(item => {
              return (
                <TabPanel key={item.title} title={item.title} iconCls={item.iconCls}>
                  <iframe
                    src={"./" + item.filename + ".html"}
                    style={{ width: "100%", height: "100%", border: "none" }}
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

System.propTypes = {
  title: PropTypes.string,//标题
  logo: PropTypes.string,//图标
  // [
  //   { name:"index", title: "首页",iconCls:"", href: "" },
  //   { name:"user", title: "个人设置",iconCls:"", href: "" },
  //   { name:"system", title: "系统设置",iconCls:"", href: "" },

  // ]
  shortcuts: PropTypes.array,//快捷访问菜单
  // [
  //   { name:"index", title: "首页",iconCls:"", href: "" },
  //   { name:"user", title: "个人设置",iconCls:"", href: "" },
  //   { name:"system", title: "系统设置",iconCls:"", href: "" },

  // ]
  menus: PropTypes.array,//菜单
  nick:PropTypes.string,//登陆用户昵称
}

export default System;