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
import func from "../../libs/func"
import "./index.css";
import LinkButton from "../../Buttons/LinkButton";
class System extends React.Component {
  constructor(props) {
    super(props);
    this.tabsref = React.createRef();
    this.modalref = React.createRef();

    this.state = {
      leftWidth: this.props.leftWidth || 210,
      groupTitle:"",
      activeMenu: "",
      tabs: [],
      activeShortCuts: null,
      userExpand: false,
      systemExpand:false,
    };
    this.setLeftWidth = this.setLeftWidth.bind(this);
  }

  componentDidMount() {
    let receiveMessage = (event) => {
      if (event.data) {
        let data = (event.data);
        if (data && data.type == "openTab") {

          this.openMenu(data)
        }
      }
    }
    window.addEventListener("message", receiveMessage, false);
  }

  setLeftWidth() {
    if (this.state.leftWidth === 0) {
      this.setState({
        leftWidth: this.props.leftWidth || 210,
      })
    }
    else {
      this.setState({
        leftWidth: 0,
      })
    }
  }
  /**
   * 打开菜单
   * @param {*} route 
   */
  openMenu(route,group) {

    this.setState({
      activeMenu: route.title,
      groupTitle:group&&group.title||"",
    })
    let findIndex = null;
    let e = this.state.tabs.find((selfItem, index) => {
      if (selfItem.title == route.title) {
        findIndex = index;
        return true;
      }
      return false;
    });

    //如果没找到
    if (!e) {
      this.state.tabs.push(route);
      this.setState({
        tabs: this.state.tabs
      });
    } else {
      //如果找到了
      this.tabsref.current.changeActive(findIndex);
      //刷新
      document.getElementById(route.title).contentWindow.location.href = route.url;
    }

  }

  /**
 * 菜单关闭
 * @param {*} index 
 */
  closeMenu(index) {
    let tabs = this.state.tabs;
    tabs.splice(index, 1)
    this.setState({
      tabs: tabs,
    })
  }
  /**
   * 快捷菜单单击事件
   * @param {*} index 
   * @param {*} name 
   * @param {*} title 
   */
  activeShortHandler(index, name, title, url) {
    this.setState({
      activeShortCuts: index,
    })
    if (url) {//如果有url则会打开菜单
      this.openMenu({ name: name, title: title, url: url });
    }
    this.props.shortcutsClick && this.this.shortcutsClick(name, babel);
  }
  /**
   * 个人设置
   */
  userExpand() {
    this.setState({
      userExpand: !this.state.userExpand
    });
  }

/**
   * 个人设置
   */
  systemExpand() {
    this.setState({
      systemExpand: !this.state.systemExpand
    });
  }


  /**
   * 退出登陆
   */
  logout() {
    window.sessionStorage.clear();
    window.location.href = "./login.html"
  }
  render() {
    return <Layout className={"wasabi-system " + this.props.theme}>
      <Left width={this.state.leftWidth}>
        <div className={"system " + this.props.theme}>
          <img className='logo' src={this.props.logo || require("./img/logo.png")}></img>
          <span className='title'>{this.props.title}</span>
        </div>
        <Menus theme={this.props.theme || "black"}>
          {
            this.props.menus && this.props.menus.map((item, index) => {
              if (item.children && item.children.length > 0) {
                return <MenuPanel iconCls={item.iconCls} key={index} expand={item.expand != null && item.expand != undefined ? item.expand : true} name={item.name} title={item.title}>
                  {
                    item.children && item.children.map((route, subIndex) => {
                      if (route.hide) {
                        return null;
                      }
                      return <MenuItem iconCls={route.iconCls} key={index + "-" + subIndex} active={route.title == this.state.activeMenu} onClick={this.openMenu.bind(this, route,item)} name={route.name}>{route.title}</MenuItem>
                    })

                  }
                </MenuPanel>
              }
              else {
                return <MenuPanel iconCls={item.iconCls} key={index} onClick={this.openMenu.bind(this, item)} name={item.name} title={item.title}></MenuPanel>
              }

            })
          }



        </Menus>
      </Left>
      <Center>
        <Layout>
          <Header height={42}>
            <div className='header'>
              <LinkButton onClick={this.setLeftWidth} iconCls="icon-bars" theme="info" style={{ float: "left", marginLeft: 10, marginTop: 5,width:30,height:30 }}></LinkButton>
             
             <span style={{marginLeft:10,fontSize:16}}>{this.state.groupTitle?this.state.groupTitle+"  /  ":""}{this.state.activeMenu}</span>

              <div className='system' onClick={this.systemExpand.bind(this)}>
              <i
                  style={{
                    height: 42,
                    lineHeight: "42px",
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                  title="系统设置"
                  className={"icon-setting"}

                ></i>
            
              </div>
            
              <div className='user' onClick={this.userExpand.bind(this)}>
              <img
                  style={{
                    height: 42,
                    lineHeight: "42px",
                    marginLeft: 5,
                    marginRight: 5,
                    borderRadius:"50%",
                    verticalAlign: "baseline"
                  }}
                  src={this.props.headerImg || require("./img/header.jpg")}

                ></img>
            
              
                <span className='title'>{this.props.nick}</span>
                <dl
                  className={
                    this.state.userExpand ? "user-menus show" : "user-menus hide"
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
              <div className='system' onClick={this.systemExpand.bind(this)}>
              <i
                  style={{
                    height: 42,
                    lineHeight: "42px",
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                  title="消息"
                  className={"icon-bell"}

                ></i>
            
              </div>
              <div className='system' onClick={this.systemExpand.bind(this)}>
              <i
                  style={{
                    height: 42,
                    lineHeight: "42px",
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                  title="搜索"
                  className={"icon-search"}

                ></i>
            
              </div>
              <div className='nav'>
                {" "}
                <ul>
                  {this.props.shortcuts && this.props.shortcuts.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={this.activeShortHandler.bind(this, index, item.name, item.title, item.url)}
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
          <Center>
            <Modal ref={this.modalref}></Modal>
            <Tabs onClose={this.closeMenu.bind(this)} ref={this.tabsref} >
              {this.state.tabs && this.state.tabs.map(item => {
                return (
                  <TabPanel key={item.title} title={item.title} iconCls={item.iconCls}>
                    <iframe
                      id={item.title}
                      src={item.url}
                      style={{ width: "100%", height: "calc(100% - 10px)", border: "none" }}
                    >

                    </iframe>
                  </TabPanel>
                );
              })}
            </Tabs>

          </Center>
        </Layout>
      </Center>
    </Layout>
  }
}

System.propTypes = {
  title: PropTypes.string,//标题
  logo: PropTypes.string,//图标
  theme: PropTypes.string,//主题
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
  nick: PropTypes.string,//登陆用户昵称
}
System.defaultProps = {
  theme: "black",
}

export default System;