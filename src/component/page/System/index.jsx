import React from "react";
import PropTypes from 'prop-types';
import Menus from "../../Navigation/Menus";
import MenuPanel from "../../Navigation/MenuPanel";
import MenuItem from "../../Navigation/MenuItem";
import Layout from "../../Layout/Layout";
import Left from "../../Layout/Left";
import Center from "../../Layout/Center";
import Header from "../../Layout/Header";
import Tabs from "../../Navigation/Tabs/Tabs";
import Modal from "../../Layout/Modal";
import TabPanel from "../../Navigation/Tabs/TabPanel";
import func from "../../libs/func"
import "./index.css";
import LinkButton from "../../Buttons/LinkButton";
import Container from "../../Layout/Container";
import SlideMenu from "../../Navigation/SlideMenu";
import Separator from "../../Layout/Separator";
import Notice from "../../Navigation/Notice";
import GlobalSearch from "../../Data/GlobalSearch"
import dom from "../../libs/dom";
class System extends React.Component {
  constructor(props) {
    super(props);
    this.tabsref = React.createRef();
    this.sidemenu = React.createRef();
    this.globalsearch=React.createRef();
    this.isfullScreen=false;
    this.state = {
      leftWidth: this.props.leftWidth || 210,
      groupTitle: "",
      activeMenu: "",
      tabs: [],
      activeShortCuts: null,
      userExpand: false,
      noticeExpand:false,
    };
    this.setLeftWidth = this.setLeftWidth.bind(this);
    this.close=this.close.bind(this)
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
    document.addEventListener('fullscreenchange', ()=>{
      if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        this.isfullScreen=false;
      }
    });
  }

  close(event){
    if(!dom.isDescendant(this.target,event.target)){
      this.setState({
        noticeExpand:false,
        userExpand: false
      });
      document.removeEventListener("click",this.close)
    }
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
  openMenu(route, group) {

    this.setState({
      activeMenu: route.title,
      groupTitle: group && group.title || "",
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
  userExpand(event) {
    this.target=event.target;
    event.stopPropagation();
    this.setState({
      noticeExpand:false,
      userExpand: true
    },()=>{
      document.addEventListener("click",this.close)
    });
  }
  noticeExpand(event){
    this.target=event.target;
    event.stopPropagation();
    this.setState({
      userExpand:false,
      noticeExpand:true
    },()=>{
      document.addEventListener("click",this.close)
    });
  }

  /**
     * 系统设置
     */
  systemOpen() {
    this.setState({
      userExpand:false,
      noticeExpand:false,
    })
    this.sidemenu.current.open();
  }

  /**
   * 系统设置关闭
   */
  systemClose() {
    this.sidemenu.current.close();
  }
  /**
   * 全屏
   */
  fullScreen(){
    if(this.isfullScreen){
      this.isfullScreen=false;
      dom.exitFullscreen()
    }
    else{
      this.isfullScreen=true;
      dom.fullScreen();
    }
  }
  /**
   * 打开全局搜索
   */
  searchOpen(){
    this.setState({
      userExpand:false,
      noticeExpand:false,
    })
    this.globalsearch.current.open()
  }

  /**
   * 退出登陆
   */
  logout() {
    window.sessionStorage.clear();
    window.location.href = "./login.html"
  }
  render() {
    let navTheme=window.localStorage.getItem("navTheme")||"left";
    let systemTheme=window.localStorage.getItem("systemTheme")||"primary";
    let menuTheme=window.localStorage.getItem("menuTheme")||"black";
    let headerTheme=window.localStorage.getItem("headerTheme")||"white";
    return <Container>
      <Layout className={"wasabi-system " + this.props.theme}>
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
                        return <MenuItem iconCls={route.iconCls} key={index + "-" + subIndex} active={route.title == this.state.activeMenu} onClick={this.openMenu.bind(this, route, item)} name={route.name}>{route.title}</MenuItem>
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
                <LinkButton onClick={this.setLeftWidth} iconCls="icon-bars" theme="info" style={{ float: "left", marginLeft: 10, marginTop: 5, width: 30, height: 30 }}></LinkButton>

                <span style={{ marginLeft: 10 }}>{this.state.groupTitle ? this.state.groupTitle + "  /  " : ""}{this.state.activeMenu}</span>

                <div className='system-icon' onClick={this.systemOpen.bind(this)}>
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
                <div className='system-icon' onClick={this.fullScreen.bind(this)}>
                  <i
                    style={{
                      height: 42,
                      lineHeight: "42px",
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                    title="全屏"
                    className={"icon-arrow-salt"}

                  ></i>

                </div>
                <div className='user' onClick={this.userExpand.bind(this)}>
                  <img
                    style={{
                      height: 30,
                      lineHeight: "30px",
                      marginLeft: 5,
                      marginRight: 5,
                      borderRadius: "50%",
                      transform: "translateY(-2px)"
                    }}
                    src={this.props.headerImg || require("./img/header.jpg")}

                  ></img>


                  <span className='title'>{this.props.nick}</span>
                  <dl
                    className={
                      this.state.userExpand ? "icon-menus show" : "icon-menus hide"
                    }
                  >
                    <dd className='user-menu'>
                      <i className=' icon-user' style={{ marginRight: 10 }}></i>
                      <span>个人资料</span>
                    </dd>
                    <dd className='user-menu'>
                      <i className=' icon-edit' style={{ marginRight: 10 }}></i>
                      <span>修改密码</span>
                    </dd>
                    <dd className='user-menu' onClick={this.logout}>
                      <i className=' icon-switch' style={{ marginRight: 10 }}></i>
                      <span>退出</span>
                    </dd>
                  </dl>
                </div>        
                <div className='system-icon' onClick={this.noticeExpand.bind(this)}>
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
                  <div  className={
                      this.state.noticeExpand ? "icon-menus notice show" : "icon-menus notice hide"
                    } style={{width:360,border:"none",left:-100}}>
                  <Notice data={[
                    {title:"你收到了 14 份新周报",date:"2021-07-28 10:10:10",iconCls:<img style={{width:32,height:32}} src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"></img> },
                    {title:"你推荐的 曲妮妮 已通过第三轮面试",date:"2021-07-28 10:10:10",iconCls:<img  style={{width:32,height:32}} src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"></img> },
                    {title:"这种模板可以区分多种通知类型",date:"2021-07-28 10:10:10",iconCls:<img   style={{width:32,height:32}} src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"></img> },
                    {title:"左侧图标用于区分不同的类型",date:"2021-07-28 10:10:10",iconCls:<img  style={{width:32,height:32}} src="https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png"></img> },
                    
                ]}></Notice>
                  </div>
                </div>           
                <div className='system-icon' onClick={this.searchOpen.bind(this)}>
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
      <SlideMenu ref={this.sidemenu}>
        <div style={{ fontSize: 16, height: 60, borderBottom: "1px solid var(--border-color)", lineHeight: "60px", paddingLeft: 20, marginBottom: 60 }}>
          <span>系统设置</span>
          <LinkButton theme="danger" onClick={this.systemClose.bind(this)} iconCls="icon-close" style={{ float: "right", marginRight: 20, marginTop: 22 }}></LinkButton>
        </div>
        <Separator key="0">导航栏模式</Separator>
        <div key="d0" style={{ display: "flex", justifyContent: "space-around" }}>
          <img key="1" style={{border: navTheme==="left"? "2px solid var(--primary-color)":null,borderRadius:4}} src={require("./img/left.png")}></img>
          <img key="2"  style={{border: navTheme==="lefttop"? "2px solid var(--primary-color)":null,borderRadius:4}} src={require("./img/lefttop.png")}></img>
          <img key="3"  style={{border: navTheme==="top"? "2px solid var(--primary-color)":null,borderRadius:4}} src={require("./img/top.png")}></img>
        </div>
        <Separator key="1">系统主题</Separator>
        <div key="d1" style={{ display: "flex", justifyContent: "space-around" }}>
          <span key="1" className="wasabi-theme-box" style={{ backgroundColor: "var(--primary-color)" }}>  {systemTheme==="primary"?<i className="icon-check" style={{color:"white"}}></i>:null}</span>
          <span key="2" className="wasabi-theme-box" style={{ backgroundColor: "var(--success-color)" }}>  {systemTheme==="success"? <i className="icon-check" style={{color:"white"}}></i>:null}</span>
          <span key="3" className="wasabi-theme-box" style={{ backgroundColor: "var(--warning-color)" }}>   {systemTheme==="warning"?<i className="icon-check" style={{color:"white"}}></i>:null}</span>
          <span key="4" className="wasabi-theme-box" style={{ backgroundColor: "var(--danger-color)" }}>  {systemTheme==="danger"? <i className="icon-check" style={{color:"white"}}></i>:null}</span>

        </div>
        <Separator key="2">菜单主题</Separator>
        <div key="d2" style={{ display: "flex", justifyContent: "space-around" }}>
         
          <span key="1" className="wasabi-theme-box" style={{ backgroundColor: "#001529" }}>   {menuTheme==="black"?   
           <i className="icon-check" style={{color:"white"}}></i>:null}</span>
          <span key="2" className="wasabi-theme-box" style={{ backgroundColor: "white", border: "1px solid var(--border-color)" }}>
          {menuTheme==="white"?  <i className="icon-check"></i>:null}
          </span>

        </div>
        <Separator key="3">顶栏主题</Separator>
        <div key="d3" style={{ display: "flex", justifyContent: "space-around" }}>
          <span key="1" className="wasabi-theme-box" style={{ backgroundColor: "white", border: "1px solid var(--border-color)" }}> {headerTheme==="white"?    <i className="icon-check"></i>:null}</span>
          <span key="2" className="wasabi-theme-box" style={{ backgroundColor: "#001529" }}>   {headerTheme==="black"?    <i className="icon-check" style={{color:"white"}}></i>:null}</span>
          <span key="3" className="wasabi-theme-box" style={{ backgroundColor: "var(--primary-color)" }}>  {headerTheme==="primary"?     <i className="icon-check" style={{color:"white"}}></i>:null}</span>
          <span key="4" className="wasabi-theme-box" style={{ backgroundColor: "var(--success-color)" }}>  {headerTheme==="success"?     <i className="icon-check" style={{color:"white"}}></i>:null}</span>
          <span key="5" className="wasabi-theme-box" style={{ backgroundColor: "var(--warning-color)" }}>  {headerTheme==="warning"?     <i className="icon-check" style={{color:"white"}}></i>:null}</span>
          <span key="6" className="wasabi-theme-box" style={{ backgroundColor: "var(--danger-color)" }}>   {headerTheme==="danger"?    <i className="icon-check" style={{color:"white"}}></i>:null}</span>
        </div>
    
      </SlideMenu>
      <GlobalSearch ref={this.globalsearch}></GlobalSearch>
    </Container>
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