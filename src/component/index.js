/**
 * Created by wangzhiyong on 16/6/17.
 * edit by wangzhiyong 
 * date:2017-08-14 进行大改版
 * date 2020-11-20 调整组件，去掉不需要的组件
 * desc:框架入口
 */

import("./Sass/base.css");

/*****************按钮组件******************/
import Tag from "./Buttons/Tag";//标签
import Button from './Buttons/Button';//普通按钮
import LinkButton from './Buttons/LinkButton';//可移动，可带图标，可带链接的按钮
import Badge from "./Buttons/Badge";//带数字标记组件
import Dropdown from "./Buttons/Dropdown";//下拉菜单按钮
import DropdownItem from "./Buttons/Dropdown/DropdownItem";//下拉菜单的选项
import Toolbar from './Buttons/Toolbar';//LinkButton按钮集合组件

/*****************数据组件******************/
import DataGrid from './Data/DataGrid';//数据列表组件
import Tree from './Data/Tree.jsx';//树的组件
import Transfer from './Data/Transfer.jsx';//穿梭框组件
import Progress from './Data/Progress';//进度条
import Track from './Data/Track.jsx';//物流跟踪
import Step from './Data/Step';//进度条
import StepItem from './Data/Step/StepItem';//进度条
import Avatar from "./Data/Avatar";//头像上传组件
import Pivot from "./Data/Pivot";//交叉表
import TreeGrid from "./Data/TreeGrid";//树型表格
import Pagination from "./Data/Pagination";//分页控件

/*****************表单组件******************/
import SearchBar from './Form/SearchBar/index.jsx';//表单查询组件
import Form from './Form/Form';//表单提交组件
import Input from './Form/Input/index.jsx';//通用表单组件

import BaseInput from "./Form/BaseInput";//原生输入框
import Text from "./Form/Text";//文本
import None from "./Form/None";//空
import Rate from "./Form/Rate";//评分
import Select from "./Form/Select";//下拉框
import Switch from "./Form/Switch";//开关
import CheckBox from "./Form/CheckBox";//复选框
import CheckButton from "./Form/CheckButton";//复选按钮
import Radio from "./Form/Radio";//单选
import Picker from "./Form/Picker";//三级下拉
import TreePicker from "./Form/TreePicker";//树形下拉框
import DatePicker from "./Form/DatePicker";//日期/时间
import Password from "./Form/Password";//强密码
import Search from "./Form/Search";//搜索栏组件

/*****************日历组件******************/
import Calendar from './Form/DatePicker/Calendar';//日历组件

/*****************布局组件******************/
import Box from './Layout/Box.jsx';//箱子组件
import Drag from './Layout/Drag.jsx';//拖动组件
import Drop from './Layout/Drop.jsx';//停靠组件
import Layout from './Layout/Layout.jsx';//布局组件
import Center from './Layout/Center.jsx';//布局组件-中间
import Header from './Layout/Header.jsx';//布局组件-头部
import Footer from './Layout/Footer.jsx';//布局组件-底部
import Left from './Layout/Left.jsx';//布局组件-左侧
import Right from './Layout/Right.jsx';//布局组件-右侧
import Container from './Layout/Container.jsx';//布局组件-网格容器
import Row from './Layout/Row.jsx';//布局组件-行
import Col from './Layout/Col.jsx';//布局组件-列


import Modal from './Layout/Modal.jsx';//模态层组件
import Panel from './Layout/Panel.jsx';//面板组件
import Resize from './Layout/Resize.jsx';//可调整大小组件
import SlidePanel from './Layout/SlidePanel.jsx';//滑动面板

/*****************导航组件******************/
import Menus from './Navigation/Menus.jsx';//菜单组件
import MenuPanel from './Navigation/MenuPanel.jsx';//菜单面板组件
import MenuItem from './Navigation/MenuItem.jsx';//菜单节点组件
import Tabs from './Navigation/Tabs.jsx';//页签组件
import TabPanel from './Navigation/TabPanel.jsx';//页签面板组件



/*****************消息组件******************/
import Label from './Info/Label';//消息组件
import Msg from './Info/Msg.jsx';//消息组件

/*****************动画组件******************/
import RotateChart from "./Animate/RotateChart";//旋转环
import PageIn from "./Animate/PageIn";//放大弹出组件
import ProgressChart from "./Animate/ProgressChart";//线性报表

/*****************功能组件******************/
import Upload from './Action/Upload';//上传组件
import Editor from './Action/Editor.jsx';//上传组件
import Article from "./Action/Article";//文章编辑
import Single from "./Action/Single";//单表组件
import Simulator from "./Action/Simulator";//手机模拟器


/**************** 页面组件 ************************/
import Login from "./page/Login"
import System from "./page/System"

/*********************** 常用函数 *****************/
import func from './libs/func.js';//常用函数
import mixins from './Mixins/mixins';//mixins
import regs from "./Lang/regs";//常用的正则
export {
    Tag, Button, LinkButton, Toolbar, Badge, Dropdown, DropdownItem,
    DataGrid, Tree, Transfer, Progress, Step, StepItem, Avatar, Pivot, TreeGrid, Pagination,
    Input, Form, SearchBar,
    BaseInput, Text, None, Rate, Select, Switch, CheckBox, CheckButton, Radio, Picker, TreePicker, DatePicker,
    Password, Search,
    Calendar,
    Box, Drag, Drop, Layout, Center, Header, Footer, Left, Right, Container, Row, Col,
    Modal, Panel, Resize, SlidePanel,
    Menus, MenuPanel, MenuItem, Tabs, TabPanel, Track,
    Label, Msg,
    RotateChart, PageIn, ProgressChart,
    Upload, Editor, Article, Single, Simulator,
    Login, System,
    func, mixins, regs

}


