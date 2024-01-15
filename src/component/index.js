/**
 * create by wangzhiyonglyk
 * 本项目在2015开始写组件，2016-03-02开始独立为了UI框架
 * date:2017-08-14 进行大改版
 * date 2020-11-20 调整组件，去掉不需要的组件
 * desc 2021-05-20 大改 主要数据这一块
 * date:2022-09-15 大改，着重于布局，表单，数据
 * date:2022-09-11 大改 重构表单组件，将上传组件纳入表单组件内
 * desc:框架入口
 */
import React from "react";
import "./Sass/base.css";
window.onerror = function (message, url, line, column, error) {
  console.log("log---onerror::::", message, url, line, column, error);
  return false;
};
if (React.version <= "17.0.0") {
  console.warn("请将react升级到了17+版本");
}
/*****************按钮组件******************/
import Tag from "./Buttons/Tag"; //标签
import Button from "./Buttons/Button/index.jsx"; //普通按钮
import LinkButton from "./Buttons/LinkButton/index.jsx"; //可移动，可带图标，可带链接的按钮
import Badge from "./Buttons/Badge/index.jsx"; //带数字标记组件
import Dropdown from "./Buttons/Dropdown/index.jsx"; //下拉菜单按钮
import DropdownItem from "./Buttons/Dropdown/DropdownItem.jsx"; //下拉菜单的选项
import Toolbar from "./Buttons/Toolbar/index.jsx"; //LinkButton按钮集合组件

/*****************数据组件******************/
import DataGrid from "./Data/DataGrid/index.jsx"; //数据列表组件
import Tree from "./Data/Tree/index.jsx"; //树的组件
import Transfer from "./Data/Transfer.jsx"; //穿梭框组件
import Progress from "./Data/Progress/index.jsx"; //进度条
import Track from "./Data/Track.jsx"; //物流跟踪
import Step from "./Data/Step/index.jsx"; //步骤条
import StepItem from "./Data/Step/StepItem"; //步骤条选项
import Avatar from "./Form/Avatar/index.jsx"; //头像上传组件
// import Pivot from "./Data/Pivot";//交叉表
import TreeGrid from "./Data/TreeGrid/index.jsx"; //树型表格
import Pagination from "./Data/Pagination/index.jsx"; //分页控件
import ContentMenu from "./Data/ContentMenu/index.jsx"; //右键菜单
import Color from "./Data/Color/index.jsx"; //调色板
import GlobalSearch from "./Data/GlobalSearch/index.jsx"; //全局搜索
import Excel from "./Data/Excel"; //Excel
/*******************表格组件*************************/
import { Table, TableBody, TableCell, TableHead, TableRow } from "./Data/Table";

/*******************表格组件*************************/

/*****************表单组件******************/
import SearchBar from "./Form/SearchBar/index.jsx"; //表单查询组件
import Form from "./Form/Form/index.jsx"; //表单提交组件
import Input from "./Form/Input/index.jsx"; //通用表单组件

/*****************日历组件******************/
import Calendar from "./Form/DatePicker/Calendar/index.jsx"; //日历组件

/*****************布局组件******************/
import Separator from "./Layout/Separator/index.jsx"; //分隔线
import Box from "./Layout/Box.jsx"; //箱子组件
import Drag from "./Layout/Drag.jsx"; //拖动组件
import Drop from "./Layout/Drop.jsx"; //停靠组件
import Layout from "./Layout/Layout.jsx"; //布局组件
import Center from "./Layout/Center.jsx"; //布局组件-中间
import Header from "./Layout/Header.jsx"; //布局组件-头部
import Footer from "./Layout/Footer.jsx"; //布局组件-底部
import Left from "./Layout/Left.jsx"; //布局组件-左侧
import Right from "./Layout/Right.jsx"; //布局组件-右侧

import Row from "./Layout/Row.jsx"; //布局组件-行
import Col from "./Layout/Col.jsx"; //布局组件-列

import Modal from "./Layout/Modal.jsx"; //模态层组件
import Panel from "./Layout/Panel.jsx"; //面板组件
import Resize from "./Layout/Resize.jsx"; //可调整大小组件

/*****************导航组件******************/
import Menus from "./Navigation/Menus.jsx"; //菜单组件
import MenuPanel from "./Navigation/MenuPanel.jsx"; //菜单面板组件
import MenuItem from "./Navigation/MenuItem.jsx"; //菜单节点组件
import Tabs from "./Navigation/Tabs/Tabs.jsx"; //页签组件
import TabPanel from "./Navigation/Tabs/TabPanel.jsx"; //页签面板组件
import Notice from "./Navigation/Notice/index.jsx"; //通知组件
import SlideMenu from "./Navigation/SlideMenu/index.jsx"; //右侧滑动菜单组件

/*****************消息组件******************/
import Msg from "./Info/Msg.jsx"; //消息组件

/*****************动画组件******************/
import RotateChart from "./Animate/RotateChart.jsx"; //旋转环
import PageIn from "./Animate/PageIn.jsx"; //放大弹出组件
import ProgressChart from "./Animate/ProgressChart"; //线性报表

import Slider from "./Animate/Slider";
import Scroll from "./Animate/Scroll";
/*****************功能组件******************/
import Upload from "./Form/Upload/index.jsx"; //上传组件
import Editor from "./Action/Editor.jsx"; //上传组件
import Article from "./Action/Article/index.jsx"; //文章编辑
import Single from "./Action/Single/index.jsx"; //单表组件
import Simulator from "./Action/Simulator/index.jsx"; //手机模拟器

/**************** 页面组件 ************************/
import Login from "./page/Login/index.jsx";
import System from "./page/System/index.jsx";

/*********************** 常用函数 *****************/
import func from "./libs/func/index.js"; //常用函数
import mixins from "./Mixins/mixins"; //mixins
import regs from "./libs/regs.js"; //常用的正则

window.$message = Msg;
export {
  Tag,
  Button,
  LinkButton,
  Toolbar,
  Badge,
  Dropdown,
  DropdownItem,
  DataGrid,
  Tree,
  Transfer,
  Progress,
  Step,
  StepItem,
  Avatar,
  TreeGrid,
  Pagination,
  ContentMenu,
  Color,
  GlobalSearch,
  Excel,
  Track,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Input,
  Form,
  SearchBar,
  Calendar,
  Separator,
  Box,
  Drag,
  Drop,
  Layout,
  Center,
  Header,
  Footer,
  Left,
  Right,

  Row,
  Col,
  Modal,
  Panel,
  Resize,
  Menus,
  MenuPanel,
  MenuItem,
  Tabs,
  Notice,
  TabPanel,
  SlideMenu,
  Msg,
  RotateChart,
  PageIn,
  ProgressChart,
  Slider,
  Scroll,
  Upload,
  Editor,
  Article,
  Single,
  Simulator,
  Login,
  System,
  func,
  mixins,
  regs,
};
