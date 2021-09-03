import React from "react";
import ReactDOM from "react-dom";
import { System } from "../../component"
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
      user = JSON.parse(user);
      nick = user.nick;
    }
    return <System
      nick={nick || "灰太狼，冲呀"}
      title={"后台管理系统"}

      menus={[
        {
          name:"message",
          title:"消息组件",
          iconCls:"icon-comment",
          url:"./msg.html"
        },
        {
          name: "buttons",
          title: "按钮",
          iconCls: "icon-button",
          url: "./button.html"
        },
        {
          title: "表单",
          name: "form",
          iconCls: "icon-form",
          children: [
            {
              name: "baseInput",
              title: "原始输入框",
              iconCls: "icon-font",
              url: "./baseInput.html"
            },
            {
              name: "password",
              title: "密码框",
              iconCls: "icon-key",
              url: "./password.html"
            },
            {
              name: "search",
              title: "搜索框",
              iconCls: "icon-search",
              url: "./search.html"
            },
            {
              name: "text",
              title: "普通输入框",
              iconCls: "icon-edit",
              url: "./text.html"
            },

            {
              name: "select",
              title: "下拉框",
              iconCls: "icon-caret-down",
              url: "./select.html"
            },
            {
              name: "picker",
              title: "级联选择",
              iconCls:"icon-angle-double-right",
              url: "./picker.html"
            },
            {
              name: "radio",
              title: "单选框",
              iconCls:"icon-circle",
              url: "./radio.html"
            },
            {
              name: "checkbox",
              title: "复选框",
              iconCls:"icon-select",
              url: "./checkbox.html"
            },
            {
              name: "checkbox",
              title: "复选按钮",
              iconCls:"icon-button",
              url: "./checkbutton.html"
            },
            {
              name: "switch",
              title: "开关",
              iconCls:"icon-switch",
              url: "./switch.html"
            },
            {
              name: "date",
              title: "日期",
              iconCls:"icon-date",
              url: "./date.html"
            },
            {
              name: "time",
              title: "时间",
              iconCls:"icon-time",
              url: "./time.html"
            },
            {
              name: "datetime",
              title: "日期时间",
              iconCls:"icon-date",
              url: "./checkbutton.html"
            },
            {
              name: "daterange",
              title: "日期范围",
              iconCls:"icon-date",
              url: "./daterange.html"
            },
            {
              name: "timerange",
              title: "时间范围",
              iconCls:"icon-time",
              url: "./timerange.html"
            },
            {
              name: "datetimerange",
              title: "日期时间范围",
              iconCls:"icon-date",
              url: "./datetimerange.html"
            },
            {
              name: "rate",
              title: "评分",
              iconCls:"icon-star",
              url: "./rate.html"
            },
            {
              name: "treepicker",
              title: "下拉树",
              iconCls:"icon-tree",
              url: "./treepicker.html"
            },
            {
              name: "gridpicker",
              title: "下拉表格",
              iconCls:"icon-table",
              url: "./gridpicker.html"
            },


          ]
        },
        {

          title: "数据",
          name: "data",
          iconCls: "icon-database",
          children: [
            {
              title: "头像",
              name: "avatar",
              iconCls: "icon-user",
              url: "./avatar.html"
            },
            {
              title: "右键菜单",
              name: "contentmenu",
              iconCls: "icon-bars",
              url: "./contentmenu.html"
            },
            {
              title: "分页",
              name: "pagination",
              iconCls: "icon-caret-right",
              url: "./pagination.html"
            },
            {
              title: "进度条",
              name: "progress",
              iconCls: "icon-con-tasks",
              url: "./pagination.html"
            },
            {
              title: "步骤",
              name: "step",
              iconCls: "icon-icon-arrowsh",
              url: "./step.html"
            },
            {
              title: "物流",
              name: "track",
              iconCls: "icon-icon-arrowsv",
              url: "./track.html"
            },
            {
              title: "普通表格",
              name: "table",
              iconCls: "icon-table",
              url: "./table.html"
            },
            {
              title: "数据表格",
              name: "datagrid",
              iconCls: "icon-database",
              url: "./datagrid.html"
            },
            {
              title: "树",
              name: "tree",
              iconCls: "icon-tree",
              url: "./tree.html"
            },
            {
              title: "树表格",
              name: "treegrid",
              iconCls: "icon-tree",
              url: "./treegrid.html"
            },
            {
              title: "交叉表",
              name: "pivot",
              iconCls: "icon-sum",
              url: "./pivot.html"
            },
            {
              title: "Excel",
              name: "excel",
              iconCls: "icon-excel",
              url: "./excel.html"
            },
          ]
        },
        {
          name: "nav",
          title: "导航",
          iconCls: "icon-daohang",
          children: [
            {
              name: "tabs",
              title: "标签页",
              iconCls: "icon-tab",
              url: "./tabs.html"
            },
            {
              name: "menu",
              title: "菜单",
              iconCls: "icon-bars",
              url: "./menus.html"
            }
          ]

        },
        {
          name: "layout",
          title: "布局",
          iconCls: "icon-layout",
          children: [
            {
              name: "row",
              title: "行",
              iconCls: "icon-row",
              url: "./row.html"
            },
            {
              name: "col",
              title: "列",
              iconCls: "icon-columns",
              url: "./col.html"
            },
            {
              name: "drag",
              title: "拖动容器",
              iconCls: "icon-arrow-salt",
              url: "./drag.html"
            },
            {
              name: "drop",
              title: "停靠容器",
              iconCls: "icon-clone",
              url: "./drop.html"
            },
            {
              name: "box",
              title: "统计容器",
              iconCls: "icon-layout",
              url: "./box.html"
            },
            {
              name: "layout",
              title: "圣杯布局",
              iconCls: "icon-layout",
              url: "./layout.html"
            },
            {
              name: "container",
              title: "网格容器",
              iconCls: "icon-align-center",
              url: "./container.html"
            },
            {
              name: "resize",
              title: "缩放容器",
              iconCls: "icon-arrow-salt",
              url: "./resize.html"
            },
            {
              name: "modal",
              title: "弹出层",
              iconCls: "icon-layout",
              url: "./modal.html"
            },
            {
              name: "panel",
              title: "面板",
              iconCls: "icon-layout",
              url: "./panel.html"
            },
            {
              name: "slidemenu",
              title: "滑动菜单",
              iconCls: "icon-layout",
              url: "./slidemenu.html"
            },

          ]

        },
        {
          name: "animate",
          title: "动画",
          iconCls: "",
          children: [
            {
              name: "pagein",
              title: "展现容器",
              iconCls: "icon-phone",
              url: "./pagein.html"
            },
            {
              name: "slider",
              title: "轮播",
              iconCls: "icon-phone",
              url: "./slider.html"
            },
            {
              name: "progressChart",
              title: "线性报表",
              iconCls: "icon-phone",
              url: "./progressChart.html"
            },
            {
              name: "totateChart",
              title: "环形报表",
              iconCls: "icon-phone",
              url: "./totateChart.html"
            },
          
          ]
        },
        {
          name: "action",
          title: "功能组件",
          iconCls: "",
          children: [
            {
              name: "upload",
              title: "上传组件",
              iconCls: "icon-cloud",
              url: "./upload.html"
            },
            {
              name: "editor",
              title: "富文本框",
              iconCls: "icon-word",
              url: "./editor.html"
            },
            {
              name: "simulator",
              title: "手机模拟器",
              iconCls: "icon-mobile",
              url: "./simulator.html"
            },
            {
              name: "article",
              title: "文章编辑",
              iconCls: "icon-archive",
              url: "./article.html"
            },
            {
              name: "single",
              title: "单表页面",
              iconCls: "icon-text",
              url: "./single.html"
            },
          ]
        },
        {

          title: "功能页面",
          name: "page",
          iconCls: "icon-sitemap",
          children: [
            {
              title: "登录",
              name: "login",
              iconCls: "icon-keyboardo",
              url:"./login.html",
            },
            {
              title: "系统主页",
              name: "system",
              iconCls: "icon-flag",
              url:"./sytem.html",
            },
            {
              title: "主页",
              name: "home",
              iconCls: "icon-home",
              url:"./home.html",
            }
          ]
        },
        {

          title: "常用函数",
          name: "func",
          iconCls: "icon-code",
          url: "./func.html"
        },
        {

          title: "系统介绍",
          name: "intro",
          iconCls: "icon-windows",
          url: "./intro.html"
        }
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
