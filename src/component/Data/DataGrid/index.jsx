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
 2021-05-28 创建table组件， 重新改造datagrid，将view,event,data分离，组件单一责任原则
 2021-09-06 修复列拖动改变宽度的问题
 固定列，复杂表头仍然有bug，需要检查
  021-11-28 重新实现紧凑宽度，调整宽度，固定表头，固定列等功能，优化渲染，列不再换行
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * 公共方法
 */
import func from '../../libs/func.js';

import mixins from '../../Mixins/mixins';



/**
 * 事件处理
 */
import eventHandler from './method/eventHandler.js';
import staticMethod from "./method/staticMethod"
import pasteExtend from './method/pasteExtend.js';
import Grid from "./View"
/**
 * 样式
 */
import './datagrid.css'
import './datagridetail.css'
class DataGrid extends Component {
    constructor(props) {
        super(props); 
        console.time("datagridm");   
        this.state = {
            fixTableId:func.uuid(),//表头table
            realTableId:func.uuid(),//真实table
            url: null,
            rawUrl: null,
            params: null, //参数
            rawParams: null,//保留旧的，用于对比
            pageIndex: this.props.pageIndex,//页号
            pageSize: this.props.pageSize,//分页大小
            sortName: this.props.sortName,//排序名称
            sortOrder: this.props.sortOrder,//排序方式

            /************这几个字段在 getDerivedStateFromProps 处理逻辑，这样提升性能 */
            rawFixedHeaders: null,//固定列的表头,保存用于更新
            rawHeaders: null,//原有默认列保存起来，用于更新判断
            headers: [], //页面中的headers
            data: [],//当前要渲染的数据
            rawData: null,//原始数据，在自动分页时与判断是否更新有用
            /************这几个字段在 getDerivedStateFromProps 处理逻辑，这样提升性能 */

            checkedData: new Map(),//勾选的数据
            checkedIndex: new Map(),//勾选的下标
            detailView: null, //详情行,
            detailIndex: null, //显示详情的行下标
            total: 0, //总记录数
            loading: this.props.url ? true : false, //显示正在加载图示
            footer: this.props.footer, //页脚
            updateUrl: this.props.updateUrl,
            editAble: this.props.editAble || this.props.addAble || this.props.importAble,//如果允许添加或者导入，自然就允许编辑
            editIndex: null, //当前处理编辑的列
            addData: new Map(), //新增的数据,因为有可能新增一个空的，然后再修改
            updateData: new Map(), //被修改过的数据，因为要判断曾经是否修改
            deleteData: [], //删除的数据
            urlReloadData: false,//传url时是否重新加载数据
            adjustWidth: false,//是否需要调整宽度

        };
        //绑定事件
        let baseCtors = [eventHandler, staticMethod, pasteExtend];
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor).forEach(name => {
                if (typeof baseCtor[name] == 'function') {
                    this[name] = this[name].bind(this);
                }
            });
        });

    }
    static getDerivedStateFromProps(props, state) {
        let newState = {
            adjustWidth: false,
        };//新的状态值
        if (props.url && (props.url != state.rawUrl || func.diff(props.params, state.rawParams))) {//以url的形式，url或者参数有变
            newState = {
                urlReloadData: true,//重新加载数据
                url: props.url,
                rawUrl: props.url,
                rawParams: func.clone(props.params),
                params: func.clone(props.params),
            }
        }
        //todo 此处理还要仔细研究 当数据量过大时，有问题
        if (props.data && props.data instanceof Array && func.diff(props.data, state.rawData,false)) {
            //如果传了死数据
            newState.adjustWidth = true;
            newState.rawData = props.data;
            try {
                //分页情况下，数据切割
                newState.data = props.pagination == true ? props.data.length >(state.pageSize || 20)
                    ? props.data.slice(((state.pageIndex || 1) - 1) * (state.pageSize || 20), (state.pageIndex || 1) * (state.pageSize || 20))
                    : props.data : props.data;
            }
            catch (e) {
                newState.data = func.shallowClone(props.data);
            }
            newState.total = props.total || props.data.length || 0
        }
        // 处理Headers,因为交叉表的表头是后期传入的 
        {
            let headerChange = false;
            //处理固定列
            if (func.diff(props.fixedHeaders, state.rawFixedHeaders)) {

                //有改变则更新headers等
                newState.rawFixedHeaders = func.clone(props.fixedHeaders);
                headerChange = true;
            }
            //处理非固定列
            if (func.diff(props.headers, state.rawHeaders)) {
                //有改变则更新headers等
                newState.rawHeaders = func.clone(props.headers);
                headerChange = true;
            }
            if (headerChange) {

                newState.adjustWidth = true;
                //标记固定列
                newState.headers = [].concat((newState.rawFixedHeaders || []).map((item) => { return { ...item, sticky: true } }), newState.rawHeaders || []);
                if (newState.headers && newState.headers instanceof Array) {
                    for (let i = 0; i < newState.headers.length; i++) {
                        if (newState.headers[i] instanceof Array) {
                           
                        }
                    }
                }

            }
        }
        return newState;
    }
    /**
     * 更新函数
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.timeEnd("datagridu")
        //重新加数据
        if (this.state.urlReloadData) {//需要请求数据
            this.reload();//调用
        }
        else if (this.state.adjustWidth ) { 
            //调整宽度
            this.setColumnWidth();
        }
    }
    componentDidMount() {
        console.timeEnd("datagridm")
        console.time("datagridu")
        if (this.state.urlReloadData) {//需要请求数据
            this.reload();
        }
        else if (this.state.adjustWidth) {//调整宽度
           this.setColumnWidth();
        
        }
    }
     /**
     * 调整每一列的宽度,方便后期拖动与固定列的效果
     */
      setColumnWidth(){
        this.headerWidth = {};//各列的宽度数据
        let columnIndex=0;//列下标
            if (this.props.detailAble) { columnIndex++; }
            if (this.props.rowNumber) { columnIndex++; }
            if (this.props.selectAble) {columnIndex++; }
          if(  document.getElementById(this.state.realTableId)&& document.getElementById(this.state.realTableId).children.length===2&&document.getElementById(this.state.realTableId).children[1].children.length)
          {//有数据才调整宽度
              for(let i=columnIndex;i< document.getElementById(this.state.realTableId).children[1].children[0].children.length;i++)
              {
                  let width=Math.ceil( document.getElementById(this.state.realTableId).children[1].children[0].children[i].getBoundingClientRect().width);
                  let name= document.getElementById(this.state.realTableId).children[1].children[0].children[i].getAttribute("name")
                  this.headerWidth[name]=width; 
              }
              this.setState({
                  adjustWidth:false
              })
              
            
          }
        
    
    }
    componentWillUnmount() {
        this.timeout && clearTimeout(this.timeout)
    }
    render() {
      
        return <Grid
            {...this.props}
            {...this.state}
            headerWidth={this.headerWidth || {}}
            data={ this.state.data}
            checkedAllHandler={this.checkedAllHandler}
            checkCurrentPageCheckedAll={this.checkCurrentPageCheckedAll}
            getKey={this.getKey}
            onClick={this.onClick}
            onDoubleClick={this.onDoubleClick}
            onChecked={this.onChecked}
            tableCellEditHandler={this.tableCellEditHandler}
            onSort={this.onSort}
            onDetail={this.onDetail}
            paginationHandler={this.paginationHandler}
            onPaste={this.onPaste}
            exportAble={this.props.exportAble}
            reload={this.reload}
            export={this.export.bind(this, false, "grid-")}
            upload={this.upload}
            onAdd={this.onAdd}
            onSave={this.onSave}
            onDrop={this.onDrop}
            onDragOver={this.onDragOver}
        ></Grid>

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
    addAble: PropTypes.bool,//是否允许添加
    editAble: PropTypes.bool, //是否允许编辑
    importAble: PropTypes.bool,//是否允许导入
    selectChecked: PropTypes.bool, //选择行的时候是否同时选中,false
    exportAble: PropTypes.bool,//是否允许导出
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
    fixedHeaders: PropTypes.array, //固定列设置
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
    onUpdate: PropTypes.func, //手动更新事件，父组件一定要有返回值,返回详情组件
    onDetail: PropTypes.func, //展示详情的函数，父组件一定要有返回值,返回详情组件
    onSave: PropTypes.func,//保存事件
    onPaste: PropTypes.func, //粘贴成功事件
    onDrop: PropTypes.func,//停靠事件
    loadSuccess: PropTypes.func,//异步加载数据后，对数据进行进一步加工

    /**
     * pivot 专门为交叉提供的属性
     */
    isPivot: PropTypes.bool,//是否是交叉表，需要设置最小宽度
};
DataGrid.defaultProps = {
    /**
     * 表格常用属性设置
     */

    selectChecked: false,
    exportAble: true,
    borderAble: true,

    /**
    * 分页
    */
    pagePosition: 'bottom', //默认分页在底部
    pagination: true,
    pageIndex: 1,
    pageSize: 20,
    sortName: 'id',
    sortOrder: 'desc',

    /**
   * 数据设置
   */
    headers: [],
    fixedHeaders: [],
    total: 0,
    /**
     * ajax请求参数
     */

    httpType: "POST",
    contentType: "application/x-www-form-urlencoded",

    /**
      * 数据源
      */
    dataSource: 'data', //
    footerSource: 'footer', //页脚数据源
    totalSource: 'total', //
};
mixins(DataGrid, [eventHandler, staticMethod, pasteExtend]);

export default DataGrid;
