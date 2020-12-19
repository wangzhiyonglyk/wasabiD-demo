/**
 *Created by wangzhiyong on 2016-04-05
 * desc:列表组件,由此组件开始独立重构所有组件,不再依赖
 * wasabi框架的第一个组件
 * 2016-06-09后开始调整整个样式
 * 2017-01-04 注意了,这里渲染分页与复制的CopyDataGrid不一样，因为CopyDataGrid宽度比较小可能放不下
 *2017-09-30 将固定表头功能先隐藏掉
 *2020-11月 统一修改bug
 2020-12-19开始 重新扩展表格功能，扩展表头，表尾 固定表头，拖动列，固定列，高度，宽表的适应，编辑，粘贴，导入excel等功能 将表格拆分更细
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import func from '../../libs/func.js';
import LinkButton from '../../Buttons/LinkButton.jsx';
import CheckBox from '../../Form/CheckBox.jsx';
import Input from '../../Form/Input.jsx';
import Radio from '../../Form/Radio.jsx';
import ClickAway from "../../libs/ClickAway.js";
import diff from '../../libs/diff.js';
import mixins from '../../Mixins/mixins';

import DataGridHandler from './DataGridHandler.js';
import DataGridExtend from './DataGridExtend.js';
import pasteExtend from './pasteExtend.js';
import SingleHeader from "./Header/SingleHeader"
import ComplexHeader from "./Header/ComplexHeader"
import SingleBody from "./Body/SingleBody";
import ComplexBody from "./Body/ComplexBody";
import('../../Sass/Data/DataGrid.css');
import('../../Sass/Data/DataGridDetail.css');
class DataGrid extends Component {
    constructor(props) {
        super(props);
        let data = [];
        if (this.props.data instanceof Array) {
            data = this.props.data;
        }
        this.state = {
            url: this.props.url,
            params: func.clone(this.props.params), //这里一定要复制,只有复制才可以比较两次参数是否发生改变没有,防止父组件状态任何改变而导致不停的查询
            pageIndex: this.props.pageIndex,//页号
            oldPageIndex: this.props.pageIndex,//用于刷新
            pageSize: this.props.pageSize,//分页大小
            sortName: this.props.sortName,//排序名称
            sortOrder: this.props.sortOrder,//排序方式
            rawData: this.props.data,//原始数据，在自动分页时有用
            data:
                this.props.pagination == true
                    ? data.length > this.props.pageSize ? data.slice((this.props.pageIndex - 1) * this.props.pageSize, this.props.pageSize) : data
                    : data, //只只保留当前的数据
            checkedData: new Map(),//勾选的数据
            checkedIndex: new Map(),//勾选的下标
            detailView: null, //详情行,
            detailIndex: null, //显示详情的行下标
            total: this.props.total || (this.props.data && this.props.data.length) || 0, //总记录数
            loading: this.props.url || this.props.headerUrl ? true : false, //显示正在加载图示
            footer: this.props.footer, //页脚
            headers: this.props.headers, //表头会可能后期才传送,也会动态改变
            height: this.props.height, //如果没有设置高度还要从当前页面中计算出来空白高度,以适应布局
            headerUrl: this.props.headerUrl,
            updateUrl: this.props.updateUrl,
            editAble: this.props.editAble,
            editIndex: null, //当前处理编辑的列
            addData: new Map(), //新增的数据,因为有可能新增一个空的，然后再修改
            updatedData: new Map(), //被修改过的数据，因为要判断曾经是否修改
            deleteData: [], //删除的数据
            reloadData: false,//是否重新加载数据
            reloadHeaderData: false,//是否重新加载header数据
        };
        //绑定事件
        let baseCtors = [DataGridHandler, DataGridExtend, pasteExtend];
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor).forEach(name => {
                if (typeof baseCtor[name] == 'function') {
                    this[name] = this[name].bind(this);
                }
            });
        });

        this.substitute = this.substitute.bind(this);//绑定

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
        if (nextProps.headerUrl && prevState.headerUrl != nextProps.headerUrl) {
            //有远程加载表头信息
            newState.reloadHeaderData = true;
        }
        if (nextProps.data && nextProps.data instanceof Array && diff(nextProps.data, prevState.rawData)) {
            //如果传了死数据

            newState.rawData = nextProps.data;
            newState.data = nextProps.pagination == true ? nextProps.data > prevState.pageSize
                ? nextProps.data.slice(((nextProps.pageIndex || prevState.pageIndex) - 1) * (nextProps.pageSize || prevState.pageSize), (nextProps.pageSize || prevState.pageSize))
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
        //重新加表头
        if (this.state.reloadHeaderData) {
            this.setState({
                reloadHeaderData: false,
            })
            this.getHeaderDataHandler();
        }
    }

    componentDidMount() {
        //渲染后再开始加载数据
        if (this.state.headerUrl) {
            //如果存在自定义列
            this.getHeaderDataHandler();
        }
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
        this.registerClickAway(this.hideMenuHandler, this.refs.grid);//注册全局单击事件
        // this.resizeTableWidthHandler();//固定的表头每一列的宽度
    }

    /**
      * 处理表头
      */
    renderHeader() {
        this.single = true;//是否简单的表头
        if (this.state.headers && this.state.headers instanceof Array) {
            for (let i = 0; i < this.state.headers.length; i++) {

                if (this.state.headers[i] instanceof Array) {
                    this.single = false;
                    break;
                }
            }
            return this.single ? this.renderSingleHeader() : this.renderComplexHeader();
        }
        else {
            return null;
        }


    }

    /**
     * 处理表体
     */
    renderBody() {
        return this.single ? this.renderSingleBody() : this.renderComplexBody();
    }
    substitute(str, obj) {
        //得到绑定字段的内容
        return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
            if (match.charAt(0) === '\\') {
                return match.slice(1);
            }
            return obj[name] === null || obj[name] === undefined ? '' : obj[name];
        });
    }
    renderTotal() {
        //渲染总记录数，当前记录的下标
        if (this.props.pagination && this.state.headers && this.state.headers.length > 0) {
            //设计了header
            let beginOrderNumber = 0;
            let endOrderNumber = 0; //数据开始序号与结束序号
            let total = this.state.total ? this.state.total : this.state.data ? this.state.data.length : 0; //总记录数
            let pageTotal = parseInt(this.state.total / this.state.pageSize); //共多少页
            pageTotal =
                this.state.total % this.state.pageSize > 0 ? pageTotal + 1 : pageTotal; //求余后得到最终总页数
            if (this.state.data instanceof Array && this.state.data.length > 0) {
                //计算开始序号与结束序号
                if (this.props.pagination) {
                    //有分页,计算当前页序号
                    beginOrderNumber =
                        this.state.pageSize * (this.state.pageIndex - 1) + 1;
                    endOrderNumber =
                        this.state.pageSize * (this.state.pageIndex - 1) +
                        this.state.data.length;
                } else {
                    //无分页
                    endOrderNumber = this.state.data.length;
                }
            }
            return (
                <div key='pagination-info' className=' pagination-info col-sm-6'>
                    显示 {beginOrderNumber} 至 {endOrderNumber} 项 共 {total} 项记录
                    <div
                        style={{ display: this.props.pagination ? 'inline-block' : 'none' }}
                    >
                        {' '}
            每页{' '}
                        <select
                            className='pagination-select'
                            value={this.state.pageSize}
                            onChange={this.pageSizeHandler}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={200}>200</option>
                            <option value={500}>500</option>
                            <option value={1000}>1000</option>
                        </select>{' '}
            条
          </div>
                </div>
            );
        } else {
            return null;
        }
    }

    renderPagination() {
        //显示分页控件
        let paginationComponent = null;
        if (this.props.pagination) {
            let pageAll = parseInt(this.state.total / this.state.pageSize); //共多少页
            if (this.state.total % this.state.pageSize > 0) {
                pageAll++; //求余后得到最终总页数
            }
            if (pageAll == 0) {
                //数据为空，直接返回
                return null;
            }

            if (pageAll > 7) {
                //大于7页，
                let pageComponent = []; //分页组件
                let firstIndex = 0; //第一个显示哪一页
                let lastIndex = 0; //最后一个显示哪一页
                let predisabledli = (
                    <li key='predis' className='paginate_button disabled'>
                        <a>...</a>
                    </li>
                ); //多余的分页标记
                let lastdisabledli = (
                    <li key='lastdis' className='paginate_button disabled'>
                        <a>...</a>
                    </li>
                ); //多余的分页标记
                if (this.state.pageIndex >= 4 && this.state.pageIndex <= pageAll - 3) {
                    //当前页号处于中间位置
                    firstIndex = this.state.pageIndex - 2;
                    lastIndex = this.state.pageIndex + 2;
                } else {
                    //非中间位置
                    if (this.state.pageIndex < 4) {
                        //靠前的位置
                        firstIndex = 2;
                        lastIndex = 6;
                        predisabledli = null; //设置为空
                    } else {
                        //靠后的位置
                        if (this.state.pageIndex > pageAll - 3) {
                            firstIndex = pageAll - 5;
                            lastIndex = pageAll - 1;
                            lastdisabledli = null; //设置为空
                        }
                    }
                }
                for (let i = firstIndex; i <= lastIndex; i++) {
                    pageComponent.push(
                        <li
                            key={'li' + i}
                            className={
                                'paginate_button ' +
                                (this.state.pageIndex * 1 == i ? 'active' : '')
                            }
                        >
                            <a onClick={this.paginationHandler.bind(this, i)}>{i}</a>
                        </li>
                    );
                }
                pageComponent.unshift(predisabledli);
                pageComponent.push(lastdisabledli);

                paginationComponent = (
                    <div className='pagination-number col-sm-6'>
                        <ul className='pagination'>
                            <li key={'lipre'} className='paginate_button '>
                                <a onClick={this.prePaginationHandler}>上一页</a>
                            </li>
                            <li
                                key={'lifirst'}
                                className={
                                    'paginate_button  ' +
                                    (this.state.pageIndex * 1 == 1 ? 'active' : '')
                                }
                            >
                                <a onClick={this.paginationHandler.bind(this, 1)}>{1}</a>
                            </li>
                            {pageComponent}

                            <li
                                key='lilast'
                                className={
                                    'paginate_button previous ' +
                                    (this.state.pageIndex * 1 == pageAll ? 'active' : '')
                                }
                            >
                                <a onClick={this.paginationHandler.bind(this, pageAll)}>
                                    {pageAll}
                                </a>
                            </li>
                            <li key='linext' className='paginate_button next'>
                                <a onClick={this.nextPaginationHandler}>下一页</a>
                            </li>
                        </ul>
                    </div>
                );
            } else {
                //小于7页直接显示

                let pagearr = [];

                for (let i = 0; i < pageAll; i++) {
                    let control = (
                        <li
                            key={'li' + i}
                            className={
                                'paginate_button ' +
                                (this.state.pageIndex * 1 == i * 1 + 1 ? 'active' : '')
                            }
                        >
                            <a onClick={this.paginationHandler.bind(this, i + 1)}>{i + 1}</a>
                        </li>
                    );
                    pagearr.push(control);
                }
                paginationComponent = (
                    <div className='pagination-number col-sm-6'>
                        <ul className='pagination'>
                            <li key={'lipre'} className='paginate_button previous'>
                                <a onClick={this.prePaginationHandler}>上一页</a>
                            </li>
                            {pagearr}
                            <li key='linext' className='paginate_button next'>
                                <a onClick={this.nextPaginationHandler}>下一页</a>
                            </li>
                        </ul>
                    </div>
                );
            }
        }
        return paginationComponent;
    }
    renderFooter() {
        //渲染页脚
        let tds = [];
        this.footerActualData = []; //,页脚的实际统计数据，用于返回
        if (this.state.footer instanceof Array && this.state.footer.length > 0) {
            //分页的情况下
            if (this.props.selectAble) {
                tds.push(<td key='footerselect' className='check-column'></td>);
            }
            this.state.headers.map((header, headerindex) => {
                if (!header || header.hide) {
                    return;
                }
               

                let footerchild = this.state.footer.filter(function (d) {
                    return d.name == header.name;
                });
                if (footerchild && footerchild.length > 0) {
                    if (
                        footerchild[0].value != null &&
                        footerchild[0].value != undefined
                    ) {
                        //如果有值
                        let obj = {};
                        obj[header.name] = footerchild[0].value;
                        this.footerActualData.push(obj);
                        tds.push(
                            <td key={headerindex + header.name}>{footerchild[0].value}</td>
                        );
                    } else {
                        //表明从本页数据统计
                        switch (footerchild[0].type) {
                            case 'sum':
                                let obj = {};
                                obj[header.name] = this.sumHandler(footerchild[0]);
                                this.footerActualData.push(obj);
                                if (obj[header.name] != null) {
                                    tds.push(
                                        <td key={header.name}>{'总计：' + obj[header.name]}</td>
                                    );
                                } else {
                                    tds.push(<td key={header.name}></td>);
                                }
                                break;
                            case 'avg':
                                let obj1 = {};
                                obj1[header.name] = this.avgHandler(footerchild[0]);
                                this.footerActualData.push(obj1);
                                if (obj[header.name] != null) {
                                    tds.push(
                                        <td key={headerindex + header.name}>
                                            {'平均值：' + obj1[header.name]}
                                        </td>
                                    );
                                } else {
                                    tds.push(<td key={headerindex + header.name}></td>);
                                }
                                break;
                            default:
                                tds.push(<td key={headerindex + header.name}></td>);
                        }
                    }
                } else {
                    tds.push(<td key={header.name + headerindex}></td>);
                }
            });

            return (
                <tr key='footertr' style={{ height: 36 }}>
                    {tds}
                </tr>
            );
        }
    }
 
    render() {
        let className = this.props.borderAble
            ? 'table '
            : 'table table-no-bordered';
        let headerControl = this.renderHeader(); //渲染两次，所以定义一个变量
        let style = this.props.style ? func.clone(this.props.style) : {};
        let height = null;
        if (style.height) {
            height = style.height;
            style.height = null;
        }
        return (
            /* excel粘贴事件 注册鼠标按下事件，从而隐藏菜单*/
            <div
                className={'wasabi-grid' + this.props.className}
                ref='grid'
                onPaste={this.onPaste}
                onMouseDown={this.gridMouseDownHandler}
                style={this.props.style}
            >
                {/* 头部分页 */}
                <div
                    className='wasabi-pagination row'
                    ref='toppagination'
                    style={{
                        display:
                            this.props.pagePosition == 'top' ||
                                this.props.pagePosition == 'both'
                                ? 'block'
                                : 'none'
                    }}
                >
                    {this.renderTotal()}
                    {this.renderPagination()}
                </div>
                {/* 表格容器 */}
                <div className='table-container'>
                    {/* 固定表头 */}
                    {/* <div className="table-fixed" ref="fixedTableContainer">
                        <table className={className} key="fixedTable" ref="fixedTable">
                            <thead>
                                <tr>
                                    {headerControl}
                                </tr>
                            </thead>
                        </table>
                    </div> */}
                    {/* 真实表格  监听滚动事件以便固定表头一起滚动*/}
                    <div
                        className='table-realTable'
                        ref='realTableContainer'
                        style={{ height: height }}
                        onScroll={this.tableBodyScrollHandler}
                    >
                        <table className={className} key='realTable' ref='realTable'>
                            {headerControl}
                            <tbody>{this.renderBody()}</tbody>
                            <tfoot>{this.renderFooter()}</tfoot>
                        </table>
                    </div>
                </div>
                {/* 底部分页 */}
                <div
                    className='wasabi-pagination row'
                    ref='bottompagination'
                    style={{
                        display:
                            this.props.pagePosition == 'bottom' ||
                                this.props.pagePosition == 'both'
                                ? 'block'
                                : 'none'
                    }}
                >
                    {this.renderTotal()}
                    {this.renderPagination()}
                </div>

                <div
                    className='wasabi-grid-loading'
                    style={{ display: this.state.loading == true ? 'block' : 'none' }}
                ></div>
                <div
                    className='wasabi-load-icon'
                    style={{ display: this.state.loading == true ? 'block' : 'none' }}
                ></div> 
              
            </div>
        );
    }
}
DataGrid.propTypes = {
    style: PropTypes.object,//对象
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //高度
    className: PropTypes.string,//
    selectAble: PropTypes.bool, // 是否显示选择，默认值 false
    singleSelect: PropTypes.bool, //是否为单选,默认值为 false
    detailAble: PropTypes.bool, //是否显示详情,默认值 false
    rowNumber: PropTypes.bool, //是否显示行号,true
    focusAble: PropTypes.bool, //是否显示焦点行，默认值 true
    editAble: PropTypes.bool, //是否允许编辑
    borderAble: PropTypes.bool, //是否显示表格边框，默认值 false

    clearChecked: PropTypes.bool, //刷新数据后是否清除选择,true
    selectChecked: PropTypes.bool, //选择行的时候是否同时选中,false
    pagination: PropTypes.bool, //是否分页,默认值 true

    pageIndex: PropTypes.number, //当前页号
    pageSize: PropTypes.number, //分页大小，默认30
    sortName: PropTypes.string, //排序字段,
    sortOrder: PropTypes.oneOf(['asc', 'desc']), //排序方式,默认asc,
    keyField: PropTypes.string, //关键字段
    headers: PropTypes.array, //表头设置
    footer: PropTypes.array, //页脚,
    total: PropTypes.number, // 总条目数，有url没用，默认为 0
    data: PropTypes.array, //当前页数据（json）

    url: PropTypes.string, //ajax地址
    httpHeaders: PropTypes.object,//请求的头部
    httpType: PropTypes.string,//请求类型
    contentType: PropTypes.string,//请求的参数传递类型
    backSource: PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源(旧版本)
    dataSource: PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源(新版本)
    footerSource: PropTypes.string, //页脚数据源,
    totalSource: PropTypes.string, //ajax的返回的数据源中哪个属性作为总记录数源

    params: PropTypes.object, //查询条件
    onClick: PropTypes.func, //单击事件
    onDoubleClick: PropTypes.func, //双击事件
    onChecked: PropTypes.func, //监听表格中某一行被选中/取消
    updateHandler: PropTypes.func, //手动更新事件，父组件一定要有返回值,返回详情组件
    detailHandler: PropTypes.func, //展示详情的函数，父组件一定要有返回值,返回详情组件
    pagePosition: PropTypes.oneOf(['top', 'bottom', 'both']), //分页栏的位置
    headerUrl: PropTypes.string, //自定义列地址
    updateUrl: PropTypes.string, //列更新的地址
    pasteSuccess: PropTypes.func //粘贴成功事件
};
DataGrid.defaultProps = {
    style: {},
    className: "",
    height: null,//toto
    selectAble: false,
    singleSelect: false,
    detailAble: false,
    rowNumber: true,
    focusAble: true,
    borderAble: true,
    clearChecked: true, //是否清空选择的
    selectChecked: false,
    pagination: true,
    pageIndex: 1,
    pageSize: 20,
    sortName: 'id',
    sortOrder: 'asc',
    keyField: 'id',
    headers: [],
    total: 0,
    data: null,
    url: null, //
    contentType: "application/x-www-form-urlencoded",
    httpHeaders: {},//http请求的头部字段
    httpType: "POST",
    backSource: 'data', //
    dataSource: 'data', //
    totalSource: 'total', //
    params: null,
    footer: null, //页脚
    onClick: null,
    onDoubleClick: null,
    onChecked: null,
    updateHandler: null,
    detailHandler: null,
    footerSource: 'footer', //页脚数据源
    pagePosition: 'bottom', //默认分页在底部
    headerUrl: null,
    editAble: false, //是否允许编辑
    updateUrl: null,
    pasteSuccess: null
};

mixins(DataGrid, [ClickAway, SingleHeader, ComplexHeader, SingleBody, ComplexBody, DataGridHandler, DataGridExtend, pasteExtend]);

export default DataGrid;
