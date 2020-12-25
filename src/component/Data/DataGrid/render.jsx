import React, { Component } from 'react';
import PropTypes from 'prop-types';

import func from '../../libs/func.js';
export default {


    /**
     *渲染列的样式
     */
    renderColGruop(fixed = false) {
        let colgroup = [];
        if (
            !(this.state.data instanceof Array) ||
            !(this.state.headers instanceof Array)
        ) {
            return;
        }
        if (this.props.detailAble) {
            colgroup.push(<col key="wasabi-check-column" name="wasabi-check-column" width={30}></col>)
        }
        //处理序号列的宽度
        if (this.props.rowNumber) {
            colgroup.push(<col key="wasabi-order-column" name="wasabi-order-column" width={60}></col>)
        }
        //处理选择列的宽度
        if (this.props.selectAble) {
            colgroup.push(<col key="wasabi-check-column" name="wasabi-check-column" width={37}></col>)
        }
        if (this.single) {
            colgroup = this.renderSingleColGroup(colgroup, fixed);
        }
        else {

            colgroup = this.renderComplexColGroup(colgroup);
        }
        return <colgroup>{colgroup}</colgroup>;

    },
    /**
     * 固定列的样式
     */
    renderFixedColGruop() {
        return this.renderColGruop(true);
    },
    /**
    * 处理表头
    */
    renderHeader() {

        return this.single ? this.renderSingleHeader() : this.renderComplexHeader();
    },
    /**
     * 处理固定列的表头
     */
    renderFixedHeader() {
        return this.single ? this.renderSingleHeader(true) : this.renderComplexHeader();
    },

    /**
     * 处理表体
     */
    renderBody() {
        return this.single ? this.renderSingleBody() : this.renderComplexBody();
    },
    /**
     * 处理固定列的表体
     */
    renderFixedBody() {
        return this.single ? this.renderSingleBody(true) : this.renderComplexBody();
    },
    /**
     * 得到单元格内容
     * @param {*} str 
     * @param {*} obj 
     */
    substitute(str, obj) {
        //得到绑定字段的内容
        return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
            if (match.charAt(0) === '\\') {
                return match.slice(1);
            }
            return obj[name] === null || obj[name] === undefined ? '' : obj[name];
        });
    },
    /**
     * 渲染总记录数
     */
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
                    显示&nbsp;{beginOrderNumber} &nbsp;至&nbsp; {endOrderNumber}&nbsp;项&nbsp;共&nbsp; {total} &nbsp;项记录
                    <div
                        style={{ display: this.props.pagination ? 'inline-block' : 'none' }}
                    >每页&nbsp;
                        <select
                            className='pagination-select'
                            value={this.state.pageSize}
                            onChange={this.pageSizeHandler}
                        >
                            <option key="1" value={10}>10</option>
                            <option key="2" value={20}>20</option>
                            <option key="3" value={30}>30</option>
                            <option key="4" value={50}>50</option>
                            <option key="5" value={100}>100</option>
                            <option key="6" value={200}>200</option>
                            <option key="7" value={500}>500</option>
                            <option key="8" value={1000}>1000</option>
                        </select>&nbsp;条&nbsp;&nbsp;
                        {<i title="刷新" style={{ fontSize: 16, cursor: "pointer" }} className="icon-refresh" onClick={this.reload.bind(this, this.state.params, this.state.url)}></i>}
                        &nbsp;&nbsp;
                        {
                            <div style={{ display: "inline-block", height: 20, position: "relative", width: 30 }}> <i title="导出" style={{ cursor: "pointer", fontSize: 20, position: "absolute", top: 5 }} className="icon-excel" onClick={this.export.bind(this, false, "grid-")}></i></div>
                        }

                    </div>
                </div>
            );
        } else {
            return null;
        }
    },
    /**
     * 分页
     */
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
                    <div key="pagination-number" className='pagination-number col-sm-6'>
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
                    <div key="pagination-number" className='pagination-number col-sm-6'>
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
    },
    /**
     * 表尾
     */
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
    },
    /**
     * 真实的表格
     */
    renderRealTable(height) {

        return <div className='table-container' key="table-container"     style={{ height: height }} >
            <div>
                
            </div>
            <div key="table-fixedTableBody" className="table-boby-fixed" >
                <table style={{ width: this.fixedTableWidth ? this.fixedTableWidth : "100%" }} className={this.props.borderAble ? ' table ' : ' table table-no-bordered '}  >
                    {
                        /**colgroup */
                        this.renderFixedColGruop()
                    }
                     {/* 表头 */}
                     {this.renderFixedHeader()}
                    {/* 表体 */}
                    <tbody>{this.renderFixedBody()}</tbody>
                    {/* 表尾  todo */}
                    {/* <tfoot>{this.renderFooter()}</tfoot> */}
                </table>

            </div>
            <div key="table-realTable"
                className={'table-realTable ' }
                ref='realTableContainer'
            >
                <table style={{ width: this.tableWidth ? this.tableWidth : "100%" }} className={this.props.borderAble ? ' table ' : ' table table-no-bordered '} ref="realTable" >
                    {
                        /**colgroup */
                        this.renderColGruop()
                    }
                    {/* 表头 */}
                    {this.renderHeader()}
                    {/* 表体 */}
                    <tbody>{this.renderBody()}</tbody>
                    {/* 表尾 */}
                    {/* <tfoot>{this.renderFooter()}</tfoot> */}
                </table>
            </div>


        </div >
    },
    /**
     * 渲染全部网格组件
     */
    renderGrid(height) {
        let grid = [];

        /* 头部分页 */
        grid.push(
            <div
                className='wasabi-pagination '
                ref='toppagination'
                key="toppagination"
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
            </div>)

        {/* 真实表格容器 */ }
        grid.push(this.renderRealTable(height))

        {/* 底部分页 */ }
        grid.push(<div
            key="bottompagination"
            className='wasabi-pagination '
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
        </div>)
        /* 加载动画 */
        grid.push(<div
            className='wasabi-grid-loading'
            key="wasabi-grid-loading-div"
            style={{ display: this.state.loading == true ? 'block' : 'none' }}
        ></div>)
        grid.push(<div
            key="wasabi-grid-loading-icon"
            className='wasabi-load-icon'
            style={{ display: this.state.loading == true ? 'block' : 'none' }}
        ></div>)
        return grid;
    }
}