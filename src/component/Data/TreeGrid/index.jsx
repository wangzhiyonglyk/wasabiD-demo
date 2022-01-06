/**
 * create by wangzhiyong 树型表格
 * date:2021-03-30
 * 2021-11-28 完善组件，修复bug，重新调整样式，完善下划线，文字，图标，勾选，选中样式
 *   2022-01-06 因为加了一虚拟列表 重构 拆分业务与视图
 * 
 */


 import React, { Component } from "react";
 import TreeContainer from "../Tree/TreeContainer"
 import loadDataHoc from "../../loadDataHoc";

 export default loadDataHoc(TreeContainer, "treegrid");