/**
 *Created by wangzhiyong on 2016-04-05
 * desc:列表组件,由此组件开始独立重构所有组件,不再依赖
 * wasabi框架的第一个组件
 * 2016-06-09后开始调整整个样式
 * 2017-01-04 注意了,这里渲染分页与复制的CopyDataGrid不一样，因为CopyDataGrid宽度比较小可能放不下
 *2017-09-30 将固定表头功能先隐藏掉
 *2020-11月 统一修改bug
 2020-12-19开始 重新扩展表格功能，扩展表头，表尾 固定表头，拖动列，固定列，高度，宽表的适应，编辑，粘贴，导入excel等功能 将表格拆分更细
 desc 简单表头，与复杂表头是为了处理兼容性问题
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * 公共方法
 */
import func from '../../libs/func.js';
import ClickAway from "../../libs/ClickAway.js";
import diff from '../../libs/diff.js';
import mixins from '../../Mixins/mixins';



/**
 * 事件处理
 */
import eventHandler from './method/eventHandler.js';
import editHandler from './method/editHandler.js';
import staticMethod from "./method/staticMethod"
import pasteExtend from './method/pasteExtend.js';

/**
 * ui处理
 */
import render from "./render"
import SingleHeader from "./Header/SingleHeader"
import ComplexHeader from "./Header/ComplexHeader"
import ColGroup from "./Body/ColGroup"
import SingleBody from "./Body/SingleBody";
import ComplexBody from "./Body/ComplexBody";

/**
 * 样式
 */
import('../../Sass/Data/DataGrid.css');
import('../../Sass/Data/DataGridDetail.css');
class DataGrid extends Component {
    constructor(props) {
        super(props);
        let data = [];
        this.containerWidth = 0;//表格的宽度
        if (this.props.data instanceof Array) {
            data = this.props.data;
        }
     
        this.state = {
            gridcontainerid: func.uuid(),
            realTableid:func.uuid(),
            url: this.props.url,
            params: func.clone(this.props.params), //这里一定要复制,只有复制才可以比较两次参数是否发生改变没有,防止父组件状态任何改变而导致不停的查询
            pageIndex: this.props.pageIndex,//页号
            oldPageIndex: this.props.pageIndex,//用于刷新
            pageSize: this.props.pageSize,//分页大小
            sortName: this.props.sortName,//排序名称
            sortOrder: this.props.sortOrder,//排序方式
            headers: this.props.headers, //表头会可能后期才传送,也会动态改变
            rawData: this.props.data,//原始数据，在自动分页时有用
            data: this.props.pagination == true
                ? data.length > this.props.pageSize ? data.slice((this.props.pageIndex - 1) * this.props.pageSize, this.props.pageSize) : data
                : data, //只只保留当前的数据
            checkedData: new Map(),//勾选的数据
            checkedIndex: new Map(),//勾选的下标
            detailView: null, //详情行,
            detailIndex: null, //显示详情的行下标
            total: this.props.total || (this.props.data && this.props.data.length) || 0, //总记录数
            loading: this.props.url ? true : false, //显示正在加载图示
            footer: this.props.footer, //页脚
            updateUrl: this.props.updateUrl,
            editAble: this.props.editAble,
            editIndex: null, //当前处理编辑的列
            addData: new Map(), //新增的数据,因为有可能新增一个空的，然后再修改
            updatedData: new Map(), //被修改过的数据，因为要判断曾经是否修改
            deleteData: [], //删除的数据
            reloadData: false,//是否重新加载数据,用于强制刷新
        };
        //绑定事件
        let baseCtors = [eventHandler, editHandler, staticMethod, pasteExtend];
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor).forEach(name => {
                if (typeof baseCtor[name] == 'function') {
                    this[name] = this[name].bind(this);
                }
            });
        });
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let newState = {};
        if (nextProps.url && nextProps.params &&
            diff(nextProps.params, prevState.params)) {//如果有url
            newState = {
                reloadData: true,
                url: nextProps.url,
                params: nextProps.params,
            }
        }
        if (
            nextProps.headers && diff(nextProps.headers, prevState.headers)
        ) {
            //存在着这种情况,后期才传headers,所以要更新一下   
            newState.headers = nextProps.headers;
        }

        if (nextProps.data && nextProps.data instanceof Array && diff(nextProps.data, prevState.rawData)) {
            //如果传了死数据
            newState.rawData = nextProps.data;
            newState.data = nextProps.pagination == true ? nextProps.data.length > prevState.pageSize
                ? nextProps.data.slice(((prevState.pageIndex)- 1) *  prevState.pageSize, prevState.pageSize)
                : nextProps.data : nextProps.data;
            newState.total = nextProps.total || nextProps.data.length || 0

        }
        if (nextProps.pageIndex != prevState.oldPageIndex) {

        }
        if (func.isEmptyObject(newState)) {
            return null;
        }
        else {
            return newState;
        }

    }
    /**
     * 更新函数
     */
    componentDidUpdate() {
        //重新加数据
        if (this.state.reloadData) {
            this.setState({
                reloadData: false,
            })
            this.reload();
        }
      //处理出现滚动条的现象
        this.containerWidth = document.getElementById(this.state.gridcontainerid).getBoundingClientRect().width || document.getElementById(this.state.gridcontainerid).clientWidth;
       if(this.containerWidth<this.tableWidth){
           //说明出现了滚动条，重新计算一下
           this.computeHeaderStyleAndColumnWidth();
       }
    }

    componentDidMount() {

        if (this.state.url) {
            //如果存在url,
            this.updateHandler(
                this.state.url,
                this.state.pageSize,
                this.state.pageIndex,
                this.state.sortName,
                this.state.sortOrder,
                this.state.params
            );
        }
        this.computeHeaderStyleAndColumnWidth();//计算列，宽度等参数

    }


    /**
     * 计算出是表头是简单表头，还是复杂表头
     */
    computeHeaderStyleAndColumnWidth() {
        //数据网格的宽度
        this.containerWidth = document.getElementById(this.state.gridcontainerid).getBoundingClientRect().width || document.getElementById(this.state.gridcontainerid).clientWidth;
        this.containerWidth=  this.containerWidth-1;//除去边框的问题
        this.single = true;//是否简单的表头
        this.columnSum = 0;//总列数
        this.releaseWidth = this.containerWidth;//剩余可分配宽度
        this.releaseColumn = 0;//剩余要计算宽度的列
        this.preColumnWidth = 0;//每一列的宽度
        this.tableWidth = 0;//表格宽度，因为有可能表格列都设置宽度，总宽度不够网格的整体宽表

        if (this.state.headers && this.state.headers instanceof Array) {
            for (let i = 0; i < this.state.headers.length; i++) {

                if (this.state.headers[i] instanceof Array) {
                    this.single = false;//复杂表头
                    for (let j = 0; j < this.state.headers[i].length; j++) {
                        if (this.state.headers[i][j].colSpan && this.state.headers[i][j].colSpan > 1) {
                            //不算一列

                            continue;
                        }
                        else {
                            //算一列
                            this.columnSum++;
                            if (this.state.headers[i][j].width) {
                                //设置了宽度
                                try {
                                    this.tableWidth += this.state.headers[i][j].width;//计算表格宽度
                                    this.releaseWidth = this.releaseWidth - parseFloat(this.state.headers[i][j].width);
                                    this.releaseColumn++;
                                }
                                catch (e) {
                                    console.error("宽度设置错误", e);
                                }

                            }
                        }
                    }

                } else {
                    if (this.state.headers[i].colSpan && this.state.headers[i].colSpan > 1) {
                        continue;
                    }
                    else {
                        //算一列
                        this.columnSum++;
                        if (this.state.headers[i].width) {
                            //设置了宽度
                            try {
                                this.tableWidth += this.state.headers[i].width;//计算表格宽度
                                this.releaseWidth = this.releaseWidth - parseFloat(this.state.headers[i].width);
                                this.releaseColumn++;
                            }
                            catch (e) {
                                console.error("宽度设置错误", e);
                            }

                        }
                    }
                }
            }
            if(this.props.detailAble){//存在详情列
                this.releaseWidth -= 30;
                this.tableWidth += 30;
            }
            if (this.props.selectAble) {//存在勾选列
                this.releaseWidth -= 37;
                this.tableWidth += 37;
            }
            if (this.props.rowNumber) {////存在序号列
                this.releaseWidth -= 60;
                this.tableWidth += 60;
            }
            this.releaseColumn = this.columnSum - this.releaseColumn;//剩余要分配的列
            if (this.releaseColumn) {//防止有0的情况
                try {
                    this.preColumnWidth = parseInt((this.releaseWidth) / this.releaseColumn);//得到剩余要分配的列的平均宽度
                    this.tableWidth += this.releaseWidth;//得到表格的宽度
                }
                catch (e) {
                    console.error("计算宽度报错", e);
                }

            }
            this.setState({})

        }
    }


    render() {
        let style=func.clone(this.props.style)||{};
        return (
            /* excel粘贴事件 注册鼠标按下事件，从而隐藏菜单*/
            <div
                className={'wasabi-grid' + this.props.className}
                id={this.state.gridcontainerid}
                ref='grid'
                onPaste={this.onPaste}

                style={style}
            >
                {this.containerWidth > 0 ? this.renderGrid() : null}
            </div>
        );
    }
}
DataGrid.propTypes = {

    /**
     * 表格常用属性设置
     */
    style: PropTypes.object,//样式对象
    className: PropTypes.string,//样式
    selectAble: PropTypes.bool, // 是否显示选择，默认值 false
    singleSelect: PropTypes.bool, //是否为单选,默认值为 false
    detailAble: PropTypes.bool, //是否显示详情,默认值 false
    rowNumber: PropTypes.bool, //是否显示行号,true
    focusAble: PropTypes.bool, //是否显示焦点行，默认值 true
    borderAble: PropTypes.bool, //是否显示表格边框，默认值 false
    editAble: PropTypes.bool, //是否允许编辑
    clearChecked: PropTypes.bool, //刷新数据后是否清除选择,true
    selectChecked: PropTypes.bool, //选择行的时候是否同时选中,false



    /**
     * 分页
     */
    pagePosition: PropTypes.oneOf(['top', 'bottom', 'both']), //分页栏的位置
    pagination: PropTypes.bool, //是否分页,默认值 true
    pageIndex: PropTypes.number, //当前页号
    pageSize: PropTypes.number, //分页大小，默认30
    sortName: PropTypes.string, //排序字段,
    sortOrder: PropTypes.oneOf(['asc', 'desc']), //排序方式,默认asc,


    /**
     * 数据设置
     */
    headers: PropTypes.array, //表头设置
    footer: PropTypes.array, //页脚,
    total: PropTypes.number, // 总条目数，有url没用，默认为 0
    data: PropTypes.array, //当前页数据（json）



    /**
     * ajax请求参数
     */
    url: PropTypes.string, //ajax地址
    updateUrl: PropTypes.string, //列更新的地址
    httpType: PropTypes.string,//请求类型
    contentType: PropTypes.string,//请求的参数传递类型
    httpHeaders: PropTypes.object,//请求的头部
    params: PropTypes.object, //查询条件

    /**
     * 数据源
     */
    dataSource: PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源
    footerSource: PropTypes.string, //页脚数据源,
    totalSource: PropTypes.string, //ajax的返回的数据源中哪个属性作为总记录数源


    /**
     * 事件
     */
    onClick: PropTypes.func, //单击事件
    onDoubleClick: PropTypes.func, //双击事件
    onChecked: PropTypes.func, //监听表格中某一行被选中/取消
    updateHandler: PropTypes.func, //手动更新事件，父组件一定要有返回值,返回详情组件
    detailHandler: PropTypes.func, //展示详情的函数，父组件一定要有返回值,返回详情组件
    pasteSuccess: PropTypes.func //粘贴成功事件
};
DataGrid.defaultProps = {
    /**
     * 表格常用属性设置
     */
    style: {},
    className: "",
    selectAble: false,
    singleSelect: false,
    detailAble: false,
    rowNumber: true,
    focusAble: true,
    borderAble: true,
    editAble: false,
    clearChecked: true, //是否清空选择的
    selectChecked: true,

    /**
    * 分页
    */
    pagePosition: 'bottom', //默认分页在底部
    pagination: true,
    pageIndex: 1,
    pageSize: 20,
    sortName: 'id',
    sortOrder: 'asc',

    /**
   * 数据设置
   */
    headers: [],
    footer: [],
    total: 0,
    data: null,


    /**
     * ajax请求参数
     */
    url: null, //
    updateUrl: null,
    httpType: "POST",
    contentType: "application/x-www-form-urlencoded",
    httpHeaders: {},//http请求的头部字段
    params: null,

    /**
      * 数据源
      */
    dataSource: 'data', //
    footerSource: 'footer', //页脚数据源
    totalSource: 'total', //


    /**
     * 事件
     */
    onClick: null,
    onDoubleClick: null,
    onChecked: null,
    updateHandler: null,
    detailHandler: null,
    pasteSuccess: null
};

mixins(DataGrid, [ClickAway, render, SingleHeader, ComplexHeader, ColGroup, SingleBody, ComplexBody, eventHandler, editHandler, staticMethod, pasteExtend]);

export default DataGrid;
