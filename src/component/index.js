/**
 * Created by wangzy on 16/6/17.
 * edit by wangzhiyong 
 * date:2017-08-14 进行大改版
 * date 2020-11-20 调整组件，去掉不需要的组件
 * desc:框架入口
 */

'use strict';

/*****************按钮组件******************/
import  Button from  './Buttons/Button.jsx' ;//普通按钮
import  LinkButton from  './Buttons/LinkButton.jsx' ;//可移动，可带图标，可带链接的按钮
import Badge from "./Buttons/Badge.jsx";//带数字标记组件
import  Toolbar from  './Buttons/Toolbar.jsx' ;//LinkButton按钮集合组件

/*****************数据组件******************/
import  DataGrid from  './Data/DataGrid.jsx' ;//数据列表组件
import  Tree from  './Data/Tree.jsx' ;//树的组件
import  Transfer from  './Data/Transfer.jsx' ;//穿梭框组件


/*****************表单组件******************/
import  SearchBar from  './Form/SearchBar.jsx' ;//表单查询组件
import  Form from  './Form/Form.jsx' ;//表单提交组件
import  Input from  './Form/Input.jsx' ;//通用表单组件
import SearchBox from "./Form/SearchBox";//搜索栏组件
/*****************表单组件******************/




/*****************日期组件******************/
import  Time from  './Form/Time.jsx' ;//时间选择组件
import  DateD from  './Form/DateD.jsx' ;//日期选择组件
import  DateTime from  './Form/DateTime.jsx' ;//日期时间选择组件
import  TimeRange from  './Form/TimeRange.jsx' ;//时间范围选择组件
import  DateRange from  './Form/DateRange.jsx' ;//日期范围选择组件
import  DateTimeRange from  './Form/DateTimeRange.jsx' ;//日期时间范围选择组件

/*****************布局组件******************/
import  Box from  './Layout/Box.jsx' ;//箱子组件
import  Drag from  './Layout/Drag.jsx' ;//拖动组件
import  Drop from  './Layout/Drop.jsx' ;//停靠组件
import  Layout from  './Layout/Layout.jsx' ;//布局组件
import  Center from  './Layout/Center.jsx' ;//布局组件-中间
import  Header from  './Layout/Header.jsx' ;//布局组件-头部
import  Footer from  './Layout/Footer.jsx' ;//布局组件-底部
import  Left from  './Layout/Left.jsx' ;//布局组件-左侧
import  Right from  './Layout/Right.jsx' ;//布局组件-右侧
import  Container from  './Layout/Container.jsx' ;//布局组件-网格容器
import  Row from  './Layout/Row.jsx' ;//布局组件-行
import  Col from  './Layout/Col.jsx' ;//布局组件-列


import  Modal from  './Layout/Modal.jsx' ;//模态层组件
import  Panel from  './Layout/Panel.jsx' ;//面板组件
import  Resize from  './Layout/Resize.jsx' ;//可调整大小组件
import  SlidePanel from  './Layout/SlidePanel.jsx' ;//滑动面板

/*****************导航组件******************/
import  Menus from  './Navigation/Menus.jsx' ;//菜单组件
import  MenuPanel from './Navigation/MenuPanel.jsx' ;//菜单面板组件
import  MenuItem from './Navigation/MenuItem.jsx' ;//菜单节点组件
import  Tabs from  './Navigation/Tabs.jsx' ;//页签组件
import  TabPanel from './Navigation/TabPanel.jsx' ;//页签面板组件
import  Track from  './Navigation/Track.jsx' ;//物流跟踪


/*****************消息组件******************/
import  Label from  './Info/Label.jsx' ;//消息组件
import  Msg from  './Info/Msg.jsx' ;//消息组件



/*****************功能组件******************/


import  Upload from  './Action/Upload' ;//上传组件
import  Editor from  './Action/Editor.jsx' ;//上传组件

import  func from  './libs/func.js' ;//常用函数
import  ClickAway from  './libs/ClickAway.js' ;//全局单击事件



export   {
    Button,LinkButton,Toolbar, Badge,
    DataGrid,Tree,Transfer,
    SearchBar,Input,Form,SearchBox,
    Time,DateD,DateTime,DateTimeRange,TimeRange,DateRange,
    Box,Drag,Drop,Layout,Center,Header,Footer,Left,Right,Container,Row,Col,
    Modal,Panel,Resize,SlidePanel,
    Menus,MenuPanel,MenuItem,Tabs,TabPanel,Track,
    Label,Msg,
    Upload,Editor,
    func,ClickAway

}


